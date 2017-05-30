<template>

    <div id="map"></div>

</template>
<script>

/*
*   Imports layer type constants.
*/

import { WMS_LAYER_TYPE, GEOJSON_LAYER_TYPE } from '../maps.js'

/*
*   Imports Leaflet library.
*/

import * as Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'


/*
*   Initializes the map.
*/

function initMap() {

    this.map = new Leaflet.Map('map')

}


/*
*   Downloads GeoJSON and adds to map.
*/

const addGeoJSONLayer = async (map, layer) => {

    const response = await fetch(layer.url)
    const parsedResponse = await response.json()
    console.log('data received!', parsedResponse)

}


/*
*   Updates the map layers on store state change.
*/

function updateLayers(updatedLayers) {

    this.map.eachLayer(layer => map.removeLayer(layer))
    updatedLayers.forEach(layer => {

        const options = { opacity: layer.opacity }

        switch (layer.type) {

            case WMS_LAYER_TYPE:
                console.log('wms layer: ', layer)
                this.map.addLayer(new Leaflet.tileLayer.wms(layer.url, options))
                break

            case GEOJSON_LAYER_TYPE:
                console.log('geojson layer: ', layer)
                addGeoJSONLayer(this.map, layer)
                break

        }

    })

}


/*
*   Applies changes to the map from global state.
*/

const MapCanvas = {

    name: 'map-canvas',
    data: () => ({ map: null }),
    mounted() {
        
        initMap.call(this)
        this.$store.watch((state, getters) => getters.mapLayers, updateLayers.bind(this), { immediate: true })

    },

}

export default MapCanvas

</script>
