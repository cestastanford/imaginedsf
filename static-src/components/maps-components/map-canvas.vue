<template>

    <div id="map"></div>

</template>
<script>

import { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'

/*
*   Saves map as instance variable.
*/

let map


/*
*   Initializes the map.
*/

const initMap = () => {

    const map = new Map('map')

}


/*
*   Updates the map layers on store state change.
*/

const updateLayers = layers => {

    console.log('map layer update function parameter: ', layers)

}


/*
*   Applies changes to the map from global state.
*/

const MapCanvas = {

    name: 'map-canvas',
    mounted() {
        
        initMap()
        this.$store.watch((state, getters) => getters.mapLayers, updateLayers)

    },

}

export default MapCanvas

</script>
