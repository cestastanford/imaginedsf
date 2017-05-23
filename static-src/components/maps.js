/*
*   Imports libraries.
*/

import Vue from 'vue'


/*
*   Imports subcomponents.
*/

import Maps from './maps.vue'


/*
*   Creates a global data object, for storing the map info retrieved
*   from WordPress and the app state.
*/

const data = {

    //  Saves the map layers
    proposalMaps: [],
    basemaps: [],

}


/*
*   Downloads all map data from the REST API.
*/

const REQUEST_URL = '/wp-json/imaginedsf/maps'
const requestMaps = async () => {

    const response = await fetch(REQUEST_URL)
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`, response)
    }

    const responseBody = await response.json()
    responseBody.forEach(responseBodyObject => {

        const map = {
            title: responseBodyObject.post_title,
            ...responseBodyObject.fields,
        }

        if (map.map_type === 'proposal') data.proposalMaps.push(map)
        else data.basemaps.push(map)

    })

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    const QUERY_STRING = '#maps'
    const el = document.querySelector(QUERY_STRING)
    if (el) {

        new Vue({
            
            el,
            data,
            created: requestMaps,
            render: createElement => createElement(Maps),

        })

    }

})