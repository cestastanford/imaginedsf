/*
*   Imports Vue library.
*/

import Vue from 'vue';


/*
*   Defines component options.
*/

const componentOptions = {

    el: '#homepage-demo',
    data: {
        msg: "It's working!",
        images: null,
    }

}


/*
*   Binds component upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    new Vue(componentOptions)

});
