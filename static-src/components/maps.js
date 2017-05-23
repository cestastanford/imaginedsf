/*
*   Imports libraries.
*/

import Vue from 'vue'
import Vuex from 'vuex'


/*
*   Imports utilities and subcomponents.
*/

import Maps from './maps-components/maps.vue'


/*
*   Defines state management action constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const GET_HASH_STATE = 'GET_HASH_STATE'
const SET_SOURCE_MAPS = 'SET_SOURCE_MAPS'



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
    responseBody.forEach(responseBodyObject => {

        const sourceMap = {
            id: responseBodyObject.ID,
            title: responseBodyObject.post_title,
            ...responseBodyObject.fields,
        }

        sourceMaps[sourceMap.id] = sourceMap

    })

    commit(SET_SOURCE_MAPS, sourceMaps)

}


/*
*   Encodes/decodes objects for saving in URLs.
*/

const encodeForURL = obj => {

    const cleaned = { ...obj }
    for (let key in cleaned) {
        if (!cleaned[key]) delete cleaned[key]
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

            sourceMaps: {},
            mapState: {

                opacities: null,
                featureGroups: null,
                narrative: null,
                popup: null,
                address: null,
                mapBounds: null,

            }

        },

        getters: {

            [GET_HASH_STATE]: state => encodeForURL(state.mapState),

        },

        mutations: {

            [SET_SOURCE_MAPS]: (state, sourceMaps) => state.sourceMaps = sourceMaps,
            [APPLY_HASH_STATE]: (state, parameterString) => {

                const parameters = decodeFromURL(parameterString)
                for (let key in state.mapState) {
                    
                    if (parameters[key]) state.mapState[key] = parameters[key]
                
                }

            },

        },

        actions: { 

            [REQUEST_MAPS]: requestMaps,

        },

    })

    new Vue({
        
        el,
        store,
        render: createElement => createElement(Maps),

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
