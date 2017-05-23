/*
*   Imports libraries.
*/

import Vue from 'vue'
import Vuex from 'vuex'


/*
*   Imports subcomponent.
*/

import Maps from './maps-components/maps.vue'


/*
*   Defines state management actions.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
const SET_PROPOSAL_MAPS = 'SET_PROPOSAL_MAPS'
const SET_BASEMAPS = 'SET_BASEMAPS'


/*
*   Sets up state management and binds the root element.
*/

function initMaps(el) {

    Vue.use(Vuex)
    const store = new Vuex.Store({

        state: {

            proposalMaps: [],
            basemaps: [],

        },

        mutations: {

            [SET_PROPOSAL_MAPS]: (state, proposalMaps) => state.proposalMaps = proposalMaps,
            [SET_BASEMAPS]: (state, basemaps) => state.basemaps = basemaps,

        },

        actions: { 

            async [REQUEST_MAPS]({ commit }) {

                const REQUEST_URL = '/wp-json/imaginedsf/maps'
                const response = await fetch(REQUEST_URL)
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`, response)
                }

                const responseBody = await response.json()
                const proposalMaps = {}
                const basemaps = {}
                responseBody.forEach(responseBodyObject => {

                    const map = {
                        id: responseBodyObject.ID,
                        title: responseBodyObject.post_title,
                        ...responseBodyObject.fields,
                    }

                    if (map.map_type === 'proposal') proposalMaps[map.id] = map
                    else basemaps[map.id] = map

                })

                commit(SET_PROPOSAL_MAPS, proposalMaps)
                commit(SET_BASEMAPS, basemaps)

            }

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
    if (el) initMaps(el)

})
