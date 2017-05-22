/*
*   Imports libraries.
*/

import Vue from 'vue'


/*
*   Downloads all map data from the REST API.
*/

const REQUEST_URL = '/wp-json/imaginedsf/maps'
const requestMaps = async () => {

    const response = await fetch(REQUEST_URL)
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`, response)
    }

    data.maps = await response.json()

}


/*
*   Defines component data, methods and options.
*/

const data = {

    activeIndex: 0,
    images: [],

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

        })

    }

})