<template>

    <section class="map-container">
        <div id="map"></div>
        <timeline v-if="mapDates.length > 1" :map-dates="mapDates"></timeline>
    </section>

</template>
<script>

import Timeline from './timeline.vue'

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

    let leafletLayers = {}
    store.watch(() => store.getters.allMapLayers, layers => {

        const updatedLeafletLayers = {}
        layers.forEach(layer => {

            let leafletLayer
            if (leafletLayers[layer.url]) {

                //  If layer is already on map
                leafletLayer = leafletLayers[layer.url]
                if (layer.type === WMS_LAYER_TYPE) leafletLayer.setOpacity(layer.opacity)
                //  Update styles for opacity if GeoJSON layer here
                updatedLeafletLayers[layer.url] = leafletLayer
                delete leafletLayers[layer.url]

            } else {

                //  If layer isn't yet on map
                const options = { opacity: layer.opacity }

                switch (layer.type) {

                    case WMS_LAYER_TYPE:
                        const { baseURL, wmsOptions } = parseWMSURL(layer.url)
                        leafletLayer = new L.tileLayer.wms(baseURL, { ...options, ...wmsOptions })
                        break

                    case GEOJSON_LAYER_TYPE:
                        if (layer.geoJSON) {
                            
                            leafletLayer = new L.geoJSON(layer.geoJSON, {
                                filter: feature => store.getters.isFeatureVisible(feature.properties),
                                //  Set styles for opacity if GeoJSON layer here
                            })

                        } else store.dispatch(DOWNLOAD_GEOJSON, layer.url)
                        break

                }

                if (leafletLayer) {

                    map.addLayer(leafletLayer)
                    updatedLeafletLayers[layer.url] = leafletLayer
                
                }

            }

        })

        //  Removes leftover layers
        for (let key in leafletLayers) map.removeLayer(leafletLayers[key])
        leafletLayers = updatedLeafletLayers

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
    components: {
        Timeline,
    },
    computed: {
        mapDates() { return this.$store.getters.mapDates },
    },
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

@import '../../styles/variables.scss';

.map-container {

    padding: 1em;
    background-color: $light-grey;

    #map {
        height: 600px;
        box-shadow: inset 0 0 10px $medium-light-grey;
        border-radius: 3px;
    }

}

</style>
