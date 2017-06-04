<template>

    <div id="map"></div>

</template>
<script>

/*
*   Imports layer type and action name constants.
*/

import { WMS_LAYER_TYPE, GEOJSON_LAYER_TYPE, DOWNLOAD_GEOJSON, SAVE_BOUNDS } from '../maps.js'


/*
*   Imports Leaflet library.
*/

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


/*
*   Fixes Leaflet import bug.
*/

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})


/*
*   Parses WMS URL into a base URL and options, so Leaflet can create
*   correctly-formed HTTP requests.
*/

const parseWMSURL = url => {

    const baseURL = url.match(/^.*wms\?/)[0]
    
    let regexp = /(?:wms\?|&)([^&=]+)=([^&=]*)/g
    let result = null
    let wmsOptions = { transparent: true, format: 'image/png' }
    while (result = regexp.exec(url)) {

        if (result && result[1] === 'layers') {
            wmsOptions.layers = result[2]
            break
        }

    }

    return { baseURL, wmsOptions }

}


/*
*   Updates the map layers on store state change.
*/

const bindLayerControls = (map, store) => {

    store.watch(() => store.getters.allMapLayers, layers => {

        map.eachLayer(layer => map.removeLayer(layer))
        layers.forEach(layer => {

            const options = { opacity: layer.opacity }

            switch (layer.type) {

                case WMS_LAYER_TYPE:
                    const { baseURL, wmsOptions } = parseWMSURL(layer.url)
                    map.addLayer(new L.tileLayer.wms(baseURL, { ...options, ...wmsOptions }))
                    break

                case GEOJSON_LAYER_TYPE:
                    if (layer.geoJSON) map.addLayer(new L.geoJSON(layer.geoJSON))
                    else store.dispatch(DOWNLOAD_GEOJSON, layer.url)
                    break

            }

        })

    }, { immediate: true })

}


/*
*   Sets the initial map bounds from the URL if present, and saves
*   updated bounds to state.
*/

const bindMapBounds = (map, store) => {

    store.watch(() => store.getters.mapBounds, bounds => {

        if (!map.getBounds().equals(bounds)) map.fitBounds(bounds)

    }, { immediate: true })

    map.on('moveend zoomend', () => {

        const bounds = map.getBounds()
        const boundsArray = [
            [ bounds.getNorth(), bounds.getWest() ],
            [ bounds.getSouth(), bounds.getEast() ],
        ]

        store.commit(SAVE_BOUNDS, boundsArray)

    })

}


/*
*   Applies changes to the map from global state.
*/

const MapCanvas = {

    name: 'map-canvas',
    mounted() {
        
        const map = new L.Map('map')
        map.fitBounds(this.$store.getters.mapBounds)
        bindLayerControls(map, this.$store)
        bindMapBounds(map, this.$store)

    },

}

export default MapCanvas

</script>
<style lang="sass">

#map {

    height: 600px;

}

</style>
