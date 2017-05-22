/*
*   Imports libraries.
*/

import Vue from 'vue'


/*
*   Initiates AJAX request for slideshow images.
*/

const REQUEST_URL = '/wp-json/imaginedsf/demo-images'
const requestImages = async () => {

    const response = await fetch(REQUEST_URL)
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`, response)
    }
    
    const parsedResponse = await response.json()
    if (parsedResponse) {
        data.images = parsedResponse.map(image => image.url)
    }

}


/*
*   Defines component data, methods and options.
*/

const data = {

    activeIndex: 0,
    images: [],

}

const methods = {

    previous() {
        data.activeIndex = (data.activeIndex - 1 < 0 ? data.images.length - 1 : data.activeIndex - 1)
    },

    next() {
        data.activeIndex = (data.activeIndex + 1 < data.images.length ? data.activeIndex + 1 : 0)
    },

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    const QUERY_STRING = '#homepage-demo'
    const el = document.querySelector(QUERY_STRING)
    if (el) {

        new Vue({
            
            el,
            data,
            methods,
            created: requestImages,

        })

    }

})
