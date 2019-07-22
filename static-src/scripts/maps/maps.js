/*
*   Imports libraries.
*/

import Vue from 'vue'
import Vuex from 'vuex'


/*
*   Imports utilities and subcomponents.
*/

import InteractiveMaps from './components/interactive-maps.vue'
import MapEmbed from './components/map-embed.vue'


/*
*   Imports state management components.
*/

import * as getters from './state/getters'
import mutations from './state/mutations'
import actions from './state/actions'


/*
*   Sets up state management and binds the root element.
*/

const initComponent = (el, Component) => {

    Vue.use(Vuex)
    const store = new Vuex.Store({

        strict: process.env.NODE_ENV !== 'production',
        state: {

            sourceMaps: {},
            sourceMapLayers: {},
            mapEnabled: {},
            layerOpacity: {},
            information: null,
            address: null,
            mapBounds: null,
            downloadedGeoJSON: {},

        },

        getters,
        mutations,
        actions,

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
