/*
*   Imports libraries.
*/

import Vue from 'vue'
import 'whatwg-fetch'


/*
*   Initiates AJAX request for slideshow images.
*/

const REQUEST_URL = '/wp-json/imaginedsf/homepage-demo-slideshow-images'
const requestImages = () => {

    fetch(REQUEST_URL)
    .then(response => {

        if (response.ok) return response.json()
        else {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }
    
    })
    .then(parsedResponse => data.images = parsedResponse.map(image => image.url))
    .catch(console.error.bind(console))

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

const componentOptions = {
    
    el: '#homepage-demo',
    created: requestImages,
    data,
    methods,

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => new Vue(componentOptions))
