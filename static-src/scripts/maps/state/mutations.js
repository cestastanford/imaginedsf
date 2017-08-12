/*
*   Imports
*/

import Vue from 'vue'


/*
*   Mutation name constants.
*/

export const SAVE_DOWNLOADED_MAPS = 'SAVE_DOWNLOADED_MAPS'
export const SAVE_DOWNLOADED_MAP_LAYERS = 'SAVE_DOWNLOADED_MAP_LAYERS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const TOGGLE_INFORMATION_VISIBLE = 'TOGGLE_INFORMATION_VISIBLE'
export const TOGGLE_MAP_ENABLED = 'TOGGLE_MAP_ENABLED'
export const SAVE_DOWNLOADED_GEOJSON = 'SAVE_DOWNLOADED_GEOJSON'
export const UPDATE_VECTOR_FEATURE_GROUPS = 'UPDATE_VECTOR_FEATURE_GROUPS'
export const SAVE_MAP_BOUNDS = 'SAVE_MAP_BOUNDS'
export const SET_LAYER_OPACITY = 'SET_LAYER_OPACITY'
export const SET_VECTOR_FEATURE_GROUP_STATUS = 'SET_VECTOR_FEATURE_GROUP_STATUS'
export const SET_MAP_VIEW = 'SET_MAP_VIEW'
export const SET_MAP_DATES = 'SET_MAP_DATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_FEATURE_SETS_ENABLED = 'SET_FEATURE_SETS_ENABLED'


/*
*   Recursively sets hierarchical vector feature group statuses.
*/

const setParentGroupStatusFromChildren = parent => {

    let anyChecked = false
    let anyUnchecked = false
    parent.children.forEach(child => {

        if (child.isParent) setParentGroupStatusFromChildren(child)
        if (child.checked) anyChecked = true
        if (!child.checked || child.indeterminate) anyUnchecked = true

    })

    Vue.set(parent, 'checked', anyChecked)
    Vue.set(parent, 'indeterminate', anyChecked && anyUnchecked)

}

const setChildrenGroupStatusFromParent = (parent, checked) => {

    parent.children.forEach(child => {

        Vue.set(child, 'checked', checked)
        Vue.set(child, 'indeterminate', false)
        if (child.isParent) setChildrenGroupStatusFromParent(child, checked)

    })

}


/*
*   Default export object of mutations.
*/

export default {


    /*
    *   Saves source maps to state.
    */

    [SAVE_DOWNLOADED_MAPS]: (state, maps) => state.sourceMaps = maps,


    /*
    *   Saves source map layers to state.
    */

    [SAVE_DOWNLOADED_MAP_LAYERS]: (state, mapLayers) => state.sourceMapLayers = mapLayers,


    /*
    *   Sets serializable state from a URL hash string.
    */

    [APPLY_HASH_STATE]: (state, parameterString) => {

        let parameters
        try {
            parameters = JSON.parse(decodeURI(parameterString))
        } catch (e) {
            console.warn('Hash parameter parse failed: ' + parameterString)
        }

        if (parameters) for (let key in parameters) {

            if (parameters[key]) state[key] = parameters[key]

        }

    },


    /*
    *   Shows or hides a map's Information section.
    */

    [TOGGLE_INFORMATION_VISIBLE]: (state, map) => {

        if (state.informationVisible === map.id) state.informationVisible = null
        else state.informationVisible = map.id

    },


    /*
    *   Sets a proposal or baemap as enabled (visible, checked).
    */

    [TOGGLE_MAP_ENABLED]: (state, map) => {

        state.mapEnabled = { ...state.mapEnabled, [map.id]: !state.mapEnabled[map.id] }

    },


    /*
    *   Saves downloaded GeoJSON (keyed by layer ID) to state.
    */

    [SAVE_DOWNLOADED_GEOJSON]: (state, { layerId, geoJSON }) => state.downloadedGeoJSON = {
        
        ...state.downloadedGeoJSON,
        [layerId]: geoJSON,

    },


    /*
    *   Updates the available vector feature groups in state.  Currently
    *   this is just placeholder code; it should be generated from
    *   downloaded GeoJSON.
    */

    [UPDATE_VECTOR_FEATURE_GROUPS]: state => {

        state.vectorFeatureGroups = [

            {
                key: 'BUILDING_TYPE',
                value: 'APARTMENT',
                label: 'Apartments',
                checked: true,
            },
            {
                isParent: true,
                label: 'Roads',
                children: [
                    {
                        key: 'ROAD_TYPE',
                        value: 'FREEWAY',
                        label: 'Freeways',
                        checked: false,
                    },
                    {
                        key: 'ROAD_TYPE',
                        value: 'STREET',
                        label: 'Streets',
                        checked: true,
                    },
                ],
            },

        ]

        setParentGroupStatusFromChildren({ children: state.vectorFeatureGroups })

    },


    /*
    *   Saves updated vector feature group visibility to state.
    */

    [SET_VECTOR_FEATURE_GROUP_STATUS]: (state, { group, checked }) => {

        Vue.set(group, 'checked', checked)
        Vue.set(group, 'indeterminate', false)
        if (group.isParent) setChildrenGroupStatusFromParent(group, checked)
        setParentGroupStatusFromChildren({ children: state.vectorFeatureGroups })

    },


    /*
    *   Saves map bounds to state.
    */

    [SAVE_MAP_BOUNDS]: (state, mapBounds) => state.mapBounds = mapBounds,
    

    /*
    *   Saves layer opacity to state.
    */

    [SET_LAYER_OPACITY]: (state, layer) => {

        if (layer.opacity === 1) Vue.delete(state.layerOpacity, layer.id)
        else Vue.set(state.layerOpacity, layer.id, layer.opacity)

    },


    /*
    *   Activates the passed map and its basemap.
    */

    [SET_MAP_VIEW]: (state, map) => {

        //  Enables the proposal map
        state.mapEnabled = { [map.id]: true }

        //  Enables the linked basemap, if present
        if (map.linked_basemap) state.mapEnabled = { ...state.mapEnabled, [map.linked_basemap]: true }
        
        //  Hides all layers from the proposal map
        map.primaryLayers.forEach(layer => state.layerOpacity[layer.id] = 0)
        map.secondaryLayers && map.secondaryLayers.forEach(layer => state.layerOpacity[layer.id] = 0)
        
        //  Shows the first primary raster layer from the proposal map
        const firstPrimaryRasterLayer = map.primaryLayers.filter(layer => state.sourceMapLayers[layer.id].source_type === WMS_LAYER_TYPE)[0]
        Vue.delete(state.layerOpacity, firstPrimaryRasterLayer.id)

        //  Shows the basemap layer
        Vue.delete(state.layerOpacity, state.sourceMaps[map.linked_basemap].basemap_layer)

    },


    /*
    *   Enables maps that fall between the passed dates.
    */

    [SET_MAP_DATES]: (state, dates) => {

        for (let key in state.sourceMaps) {

            const map = state.sourceMaps[key]
            if (map.year && +map.year >= dates[0] && +map.year <= dates[1]) {
                
                state.mapEnabled = { ...state.mapEnabled, [map.id]: true }
            
            } else state.mapEnabled = { ...state.mapEnabled, [map.id]: false }

        }

    },


    /*
    *   Saves the searched-for address to state.
    */

    [SET_ADDRESS]: (state, address) => state.address = address,

}
