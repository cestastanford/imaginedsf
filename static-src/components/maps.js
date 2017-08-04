/*
*   Imports libraries.
*/

import Vue from 'vue'
import Vuex from 'vuex'


/*
*   Imports utilities and subcomponents.
*/

import InteractiveMaps from './maps-components/interactive-maps.vue'
import MapEmbed from './maps-components/map-embed.vue'


/*
*   Defines state management action constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
export const SAVE_SOURCE_MAPS = 'SAVE_SOURCE_MAPS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const TOGGLE_NARRATIVE = 'TOGGLE_NARRATIVE'
export const TOGGLE_MAP_ENABLED = 'TOGGLE_MAP_ENABLED'
export const DOWNLOAD_GEOJSON = 'DOWNLOAD_GEOJSON'
const SAVE_GEOJSON = 'SAVE_GEOJSON'
const UPDATE_VECTOR_FEATURE_GROUPS = 'UPDATE_VECTOR_FEATURE_GROUPS'
export const SAVE_BOUNDS = 'SAVE_BOUNDS'
export const SET_LAYER_OPACITY = 'SET_LAYER_OPACITY'
export const SET_VECTOR_FEATURE_GROUP_STATUS = 'SET_VECTOR_FEATURE_GROUP_STATUS'
export const SET_MAP_VIEW = 'SET_MAP_VIEW'
export const SET_MAP_DATES = 'SET_MAP_DATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_FEATURE_SETS_ENABLED = 'SET_FEATURE_SETS_ENABLED'


/*
*   Defines map type constants.
*/

export const PROPOSAL_MAP_TYPE = 'proposal'
export const BASEMAP_TYPE = 'basemap'


/*
*   Defines layer type constants.
*/

export const WMS_LAYER_TYPE = 'wms'
export const GEOJSON_LAYER_TYPE = 'geojson'


/*
*   Boundaries of San Francisco for map defaults.
*/

export const SAN_FRANCISCO_BOUNDS = [ [ 37.813996, -122.529439 ], [ 37.702302, -122.348852 ] ]


/*
*   Strings to use for raster and vector layers in proposal maps.
*/

const RASTER_LAYER_LABEL = 'Raster Map'
const VECTOR_LAYER_LABEL = 'Vector Map'


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
*   Sets up state management and binds the root element.
*/

const initComponent = (el, Component) => {

    Vue.use(Vuex)
    const store = new Vuex.Store({

        strict: process.env.NODE_ENV !== 'production',
        state: {

            sourceMaps: {},
            mapEnabled: {},
            narrative: null,
            address: null,
            layerOpacity: {},
            bounds: null,
            geoJSON: {},
            vectorFeatureGroups: [],
            featureSetsEnabled: {},

        },

        getters: {


            hashState: state => {
                
                const hashStateObject = {}
                if (Object.keys(state.mapEnabled).length) hashStateObject.mapEnabled = state.mapEnabled
                if (state.narrative) hashStateObject.narrative = state.narrative
                if (state.address) hashStateObject.address = state.address
                if (Object.keys(state.layerOpacity).length) hashStateObject.layerOpacity = state.layerOpacity
                if (state.bounds) hashStateObject.bounds = state.bounds
                if (Object.keys(state.featureSetsEnabled).length) hashStateObject.featureSetsEnabled = state.featureSetsEnabled
                if (Object.keys(hashStateObject).length) return encodeURI(JSON.stringify(hashStateObject))
                else return ''

            },

            allMapsOfType: state => mapType => {
                
                const maps = []
                for (let key in state.sourceMaps) {
                    const map = state.sourceMaps[key]
                    if (map.map_type === mapType) maps.push(map)
                }
                
                return maps

            },

            isMapEnabled: state => map => state.mapEnabled[map.id],
            isNarrativeVisible: state => map => state.narrative === map.id,
            visibleNarrative: state => state.sourceMaps[state.narrative],
            mapBounds: state => state.bounds || SAN_FRANCISCO_BOUNDS,
            layerOpacity: state => url => {
                
                if (state.layerOpacity[url] !== undefined) {
                    return state.layerOpacity[url]
                } else return 1

            },

            rasterLayer: (state, getters) => map => map.raster_url ? {

                map,
                name: RASTER_LAYER_LABEL,
                type: WMS_LAYER_TYPE,
                url: map.raster_url,
                opacity: getters.layerOpacity(map.raster_url)

            } : null,

            vectorLayer: (state, getters) => map => map.vector_url ? {

                map,
                name: VECTOR_LAYER_LABEL,
                type: GEOJSON_LAYER_TYPE,
                url: map.vector_url,
                geoJSON: state.geoJSON[map.vector_url],
                opacity: getters.layerOpacity(map.vector_url),

            } : null,

            featureSets: (state, getters) => map => {

                return map.feature_urls ? map.feature_urls.map(feature => ({

                    map,
                    name: feature.title,
                    type: GEOJSON_LAYER_TYPE,
                    url: feature.url,
                    geoJSON: state.geoJSON[feature.url],
                    opacity: getters.layerOpacity(feature.url),
                    isFeatureSet: true,

                })) : []

            },

            featureSetsEnabled: state => map => {

                const enabled = state.featureSetsEnabled[map.id]
                if (enabled || enabled === false) return enabled
                else return true

            },

            allMapLayers: (state, getters) => {

                let layers = []

                for (let key in state.sourceMaps) {
                    const map = state.sourceMaps[key]
                    if (getters.isMapEnabled(map)) layers = [

                        ...layers,
                        getters.rasterLayer(map),
                        getters.vectorLayer(map),
                        ...getters.featureSets(map),

                    ]
                }
                
                return layers.filter(layer => layer !== null)

            },

            vectorFeatureGroups: state => state.vectorFeatureGroups,

            //  This is a placeholder for when we know more about
            //  the vector feature groups.
            isFeatureVisible: (state, getters) => properties => true,

            sourceMapFromID: state => id => state.sourceMaps[id],
            mapDates: state => {

                const dates = []
                for (let key in state.sourceMaps) {

                    const map = state.sourceMaps[key]
                    if (map.year) dates.push(+map.year)

                }
                
                return dates

            },

            address: state => state.address,

        },

        mutations: {

            [SAVE_SOURCE_MAPS]: (state, sourceMaps) => state.sourceMaps = sourceMaps,
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

            [TOGGLE_NARRATIVE]: (state, map) => {

                if (state.narrative === map.id) state.narrative = null
                else state.narrative = map.id
            
            },

            [TOGGLE_MAP_ENABLED]: (state, map) => {

                state.mapEnabled = { ...state.mapEnabled, [map.id]: !state.mapEnabled[map.id] }

            },

            [SAVE_GEOJSON]: (state, { url, geoJSON }) => state.geoJSON = {
                
                ...state.geoJSON,
                [url]: geoJSON,

            },

            [UPDATE_VECTOR_FEATURE_GROUPS]: state => {

                state.vectorFeatureGroups = [

                    //  This is just an example; it should be dynamically
                    //  generated from downloaded GeoJSON.

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

            [SET_VECTOR_FEATURE_GROUP_STATUS]: (state, { group, checked }) => {

                Vue.set(group, 'checked', checked)
                Vue.set(group, 'indeterminate', false)
                if (group.isParent) setChildrenGroupStatusFromParent(group, checked)
                setParentGroupStatusFromChildren({ children: state.vectorFeatureGroups })
            
            },
            
            [SAVE_BOUNDS]: (state, bounds) => state.bounds = bounds,
            [SET_LAYER_OPACITY]: (state, layer) => {

                if (layer.opacity === 1) Vue.delete(state.layerOpacity, layer.url)
                else Vue.set(state.layerOpacity, layer.url, layer.opacity)

            },

            [SET_MAP_VIEW]: (state, map) => {

                state.layerOpacity = { [map.raster_url]: .5 }
                state.mapEnabled = { [map.id]: true, [map.linked_basemap]: true, }

            },

            [SET_MAP_DATES]: (state, dates) => {

                for (let key in state.sourceMaps) {

                    const map = state.sourceMaps[key]
                    if (map.year && +map.year >= dates[0] && +map.year <= dates[1]) {
                        
                        state.mapEnabled = { ...state.mapEnabled, [map.id]: true }
                    
                    } else state.mapEnabled = { ...state.mapEnabled, [map.id]: false }

                }

            },

            [SET_ADDRESS]: (state, address) => state.address = address,
            [SET_FEATURE_SETS_ENABLED]: (state, { map, enabled }) => {

                state.featureSetsEnabled = {

                    ...state.featureSetsEnabled,
                    [map.id]: enabled,

                }

            },

        },

        actions: { 

            [REQUEST_MAPS]: async ({ commit }) => {

                const REQUEST_URL = document.documentElement.dataset.rootUrl + '/wp-json/imaginedsf/maps'
                const response = await fetch(REQUEST_URL)
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`, response)
                }

                const responseBody = await response.json()
                const sourceMaps = {}
                responseBody.forEach(responseObject => {

                    const map = {
                        id: responseObject.ID,
                        title: responseObject.post_title,
                        ...responseObject.fields,
                    }

                    sourceMaps[map.id] = map

                })

                commit(SAVE_SOURCE_MAPS, sourceMaps)

            },

            [DOWNLOAD_GEOJSON]: async ({ commit }, url) => {

                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`, response)
                }

                const geoJSON = await response.json()
                commit(SAVE_GEOJSON, { url, geoJSON })
                commit(UPDATE_VECTOR_FEATURE_GROUPS)

            }

        },

    })

    new Vue({
        
        el,
        store,
        render(h) { 

            return h(Component, {

                props: {

                    hash: (this.$el.attributes.hash ? this.$el.attributes.hash.value : '')

                },

            })

        },

    })

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    //  Initializes map on Interactive Maps page
    const el = document.querySelector('#maps')
    if (el) initComponent(el, InteractiveMaps)

    //  Initializes embedded maps
    const els = document.querySelectorAll('map-embed')
    els.forEach(el => initComponent(el, MapEmbed))

})
