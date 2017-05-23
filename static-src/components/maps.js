/*
*   Imports libraries.
*/

import Vue from 'vue'


/*
*   Imports subcomponent.
*/

import Maps from './maps.vue'


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    const QUERY_STRING = '#maps'
    const el = document.querySelector(QUERY_STRING)
    if (el) {

        new Vue({
            
            el,
            render: createElement => createElement(Maps),

        })

    }

})
