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
*   Requests and processes maps from WordPress.
*/

const requestMaps = async ({ commit }) => {

    const REQUEST_URL = '/wp-json/imaginedsf/maps'
    const response = await fetch(REQUEST_URL)
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`, response)
    }

    const responseBody = await response.json()
    const proposalMaps = []
    const basemaps = []
    responseBody.forEach(responseObject => {

        const map = {
            id: responseObject.ID,
            title: responseObject.post_title,
            ...responseObject.fields,
        }

        if (map.map_type === 'proposal') proposalMaps.push(map)
        else basemaps.push(map)

    })

    commit(SET_SOURCE_MAPS, { proposalMaps, basemaps })

}


/*
*   Encodes/decodes objects for saving in URLs.
*/

const encodeForURL = obj => {

    const cleaned = { ...obj }
    for (let key in cleaned) {
        
        if (!cleaned[key]) delete cleaned[key]
        if (cleaned[key] instanceof Object && !Object.keys(cleaned[key]).length) delete cleaned[key]
    
    }

    return encodeURI(JSON.stringify(cleaned))

}

const decodeFromURL = str => {

    let parameters = {}

    try {
        parameters = JSON.parse(decodeURI(str))
    } catch (e) {
        console.warn('Hash parameter parse failed: ' + str)
    }

    return parameters

}


/*
*   Sets up state management and binds the root element.
*/

const initRootComponent = (el) => {

    Vue.use(Vuex)
    const store = new Vuex.Store({

        state: {

            proposalMaps: [],
            basemaps: [],
            mapState: {

                enabledMaps: {},
                opacities: {},
                featureGroups: {},
                narrative: null,
                popup: null,
                address: null,
                mapBounds: null,

            }

        },

        getters: {

            hashState: state => encodeForURL(state.mapState),

        },

        mutations: {

            [SET_SOURCE_MAPS]: (state, { proposalMaps, basemaps }) => {
                
                state.proposalMaps = proposalMaps
                state.basemaps = basemaps
            
            },

            [APPLY_HASH_STATE]: (state, parameterString) => {

                const parameters = decodeFromURL(parameterString)
                for (let key in state.mapState) {
                    
                    if (parameters[key]) state.mapState[key] = parameters[key]
                
                }

            },

            [TOGGLE_NARRATIVE]: (state, map) => {

                if (state.mapState.narrative === map.id) state.mapState.narrative = null
                else state.mapState.narrative = map.id
            
            },

            [TOGGLE_MAP_ENABLED]: (state, map) => {

                state.mapState.enabledMaps[map.id] = !state.mapState.enabledMaps[map.id]

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
