/*
*   Imports
*/

import Vue from 'vue'


/*
*   Mutation name constants.
*/

export const SAVE_SOURCE_MAPS = 'SAVE_SOURCE_MAPS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const TOGGLE_NARRATIVE = 'TOGGLE_NARRATIVE'
export const TOGGLE_MAP_ENABLED = 'TOGGLE_MAP_ENABLED'
export const SAVE_GEOJSON = 'SAVE_GEOJSON'
export const UPDATE_VECTOR_FEATURE_GROUPS = 'UPDATE_VECTOR_FEATURE_GROUPS'
export const SAVE_BOUNDS = 'SAVE_BOUNDS'
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

    [SAVE_SOURCE_MAPS]: (state, sourceMaps) => state.sourceMaps = sourceMaps,


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
    *   Opens or closes a map's informational narrative.
    */

    [TOGGLE_NARRATIVE]: (state, map) => {

        if (state.narrative === map.id) state.narrative = null
        else state.narrative = map.id

    },


    /*
    *   Sets a proposal or baemap as enabled (visible, checked).
    */

    [TOGGLE_MAP_ENABLED]: (state, map) => {

        state.mapEnabled = { ...state.mapEnabled, [map.id]: !state.mapEnabled[map.id] }

    },


    /*
    *   Saves downloaded GeoJSON (keyed by source URL) to state.
    */

    [SAVE_GEOJSON]: (state, { url, geoJSON }) => state.geoJSON = {
        
        ...state.geoJSON,
        [url]: geoJSON,

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

    [SAVE_BOUNDS]: (state, bounds) => state.bounds = bounds,
    

    /*
    *   Saves layer opacity to state.
    */

    [SET_LAYER_OPACITY]: (state, layer) => {

        if (layer.opacity === 1) Vue.delete(state.layerOpacity, layer.url)
        else Vue.set(state.layerOpacity, layer.url, layer.opacity)

    },


    /*
    *   Activates the passed map and its basemap.
    */

    [SET_MAP_VIEW]: (state, map) => {

        state.layerOpacity = { [map.raster_url]: .5 }
        state.mapEnabled = { [map.id]: true, [map.linked_basemap]: true, }

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


    /*
    *   Saves whether a proposal map's feature sets are enabled
    *   (checked) to state.
    */

    [SET_FEATURE_SETS_ENABLED]: (state, { map, enabled }) => {

        state.featureSetsEnabled = {

            ...state.featureSetsEnabled,
            [map.id]: enabled,

        }

    },

}
