/*
*   Imports libraries.
*/

import Vue from 'vue'
import Vuex from 'vuex'


/*
*   Imports utilities and subcomponents.
*/

import InteractiveMaps from './maps-components/interactive-maps.vue'


/*
*   Defines state management action constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
export const SET_SOURCE_MAPS = 'SET_SOURCE_MAPS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const TOGGLE_NARRATIVE = 'TOGGLE_NARRATIVE'
export const TOGGLE_MAP_ENABLED = 'TOGGLE_MAP_ENABLED'


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
*   Requests and processes maps from WordPress.
*/

const requestMaps = async ({ commit }) => {

    const REQUEST_URL = '/wp-json/imaginedsf/maps'
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

    commit(SET_SOURCE_MAPS, sourceMaps)

}


/*
*   Sets up state management and binds the root element.
*/

const initRootComponent = (el) => {

    Vue.use(Vuex)
    const store = new Vuex.Store({

        strict: process.env.NODE_ENV !== 'production',
        state: {

            sourceMaps: {},
            mapEnabled: {},
            narrative: null,
            address: null,
            layerOpacity: {},

        },

        getters: {

            hashState: state => {
                
                const hashStateObject = {}
                if (Object.keys(state.mapEnabled).length) hashStateObject.mapEnabled = state.mapEnabled
                if (state.narrative) hashStateObject.narrative = state.narrative
                if (state.address) hashStateObject.address = state.address
                if (Object.keys(state.layerOpacity).length) hashStateObject.layerOpacity = state.layerOpacity
                return encodeURI(JSON.stringify(hashStateObject))

            },

            allMapsOfType: state => mapType => {
                
                const proposalMaps = []
                for (let key in state.sourceMaps) {
                    const map = state.sourceMaps[key]
                    if (map.map_type === mapType) proposalMaps.push(map)
                }
                
                return proposalMaps

            },

            isMapEnabled: state => map => state.mapEnabled[map.id],
            mapLayers: (state, getters) => {

                const layers = []
                for (let key in state.sourceMaps) {
                    const map = state.sourceMaps[key]
                    if (getters.isMapEnabled(map)) {

                        if (map.raster_url) layers.push({

                            type: WMS_LAYER_TYPE,
                            opacity: state.layerOpacity[map.raster_url] || 1,
                            url: map.raster_url,

                        })

                        if (map.vector_url) layers.push({

                            type: GEOJSON_LAYER_TYPE,
                            opacity: state.layerOpacity[map.vector_url] || 1,
                            url: map.vector_url,

                        })

                        if (map.feature_urls) map.feature_urls.forEach(url => layers.push({

                            type: GEOJSON_LAYER_TYPE,
                            opacity: state.layerOpacity[url] || 1,
                            url: url.url,

                        }))

                    }
                }
                
                return layers

            },

        },

        mutations: {

            [SET_SOURCE_MAPS]: (state, sourceMaps) => state.sourceMaps = sourceMaps,
            [APPLY_HASH_STATE]: (state, parameterString) => {

                let parameters
                try {
                    parameters = JSON.parse(decodeURI(parameterString))
                } catch (e) {
                    console.warn('Hash parameter parse failed: ' + parameterString)
                }

                if (parameters) {

                    if (parameters.mapEnabled) for (let index in parameters.mapEnabled) {
                        
                        if (state.sourceMaps[index]) {
                            
                            state.mapEnabled = {

                                ...state.mapEnabled,
                                [index]: parameters.mapEnabled[index],

                            }
                        
                        }
                    
                    }

                    if (parameters.address) state.address = parameters.address

                    if (state.sourceMaps[parameters.narrative]) state.narrative = parameters.narrative

                }

            },

            [TOGGLE_NARRATIVE]: (state, map) => {

                if (state.narrative === map.id) state.narrative = null
                else state.narrative = map.id
            
            },

            [TOGGLE_MAP_ENABLED]: (state, map) => {

                state.mapEnabled = { ...state.mapEnabled, [map.id]: !state.mapEnabled[map.id] }

            }

        },

        actions: { 

            [REQUEST_MAPS]: requestMaps,

        },

    })

    new Vue({
        
        el,
        store,
        render: createElement => createElement(InteractiveMaps),

    })

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    const QUERY_STRING = '#maps'
    const el = document.querySelector(QUERY_STRING)
    if (el) initRootComponent(el)

})
