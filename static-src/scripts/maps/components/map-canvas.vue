<template>

    <section class="map-container">
        <div class="map-canvas" :class="{ embed: embedLink }">
            <div id="map"></div>
            <div class="controls" v-if="map">
                <address-control v-if="!embedLink" :map="map"></address-control>
                <a class="embed-link" v-if="embedLink" :href="embedLink">explore interactive map</a>
                <zoom-control :map="map"></zoom-control>
            </div>
        </div>
        <timeline v-if="mapDates.length > 1 && !embedLink" :map-dates="mapDates"></timeline>
    </section>

</template>
<script>

import Timeline from './timeline.vue'
import AddressControl from './address-control.vue'
import ZoomControl from './zoom-control.vue'

/*
*   Imports layer type and action name constants.
*/

import { WMS_LAYER_TYPE, GEOJSON_LAYER_TYPE, SAN_FRANCISCO_BOUNDS } from '../state/constants'
import { SAVE_BOUNDS } from '../state/mutations'
import { DOWNLOAD_GEOJSON } from '../state/actions'
import { RedMarker, getFeaturePopup } from './leaflet-components.js'


/*
*   Imports Leaflet library.
*/

import 'leaflet'
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
    const updateLayers = layers => {

        const updatedLeafletLayers = {}
        layers.forEach(layer => {

            let leafletLayer
            if (layer.type === WMS_LAYER_TYPE && leafletLayers[layer.url]) {
                    
                //  If WMS layer is already on map
                leafletLayers[layer.url].setOpacity(layer.opacity)
                updatedLeafletLayers[layer.url] = leafletLayers[layer.url]
                delete leafletLayers[layer.url]

            } else {

                const options = { opacity: layer.opacity }
                switch (layer.type) {

                    case WMS_LAYER_TYPE:
                        const { baseURL, wmsOptions } = parseWMSURL(layer.url)
                        leafletLayer = new L.tileLayer.wms(baseURL, { ...options, ...wmsOptions })
                        break

                    case GEOJSON_LAYER_TYPE:
                        
                        if (leafletLayers[layer.url]) {

                            map.removeLayer(leafletLayers[layer.url])
                            delete leafletLayers[layer.url]

                        }

                        if (layer.geoJSON) {
                            
                            leafletLayer = new L.geoJSON(layer.geoJSON, {
                                filter: feature => store.getters.isFeatureVisible(layer, feature.properties),
                                coordsToLatLng: (coords) => {
                                    const projectedCoordinate = new L.Point(coords[0], coords[1])
                                    return L.CRS.EPSG3857.unproject(projectedCoordinate)
                                },
                                pointToLayer: (point, latLng) => {
                                    const marker = new RedMarker(latLng)
                                    const popup = getFeaturePopup(layer, point)
                                    return marker.bindPopup(popup)
                                },
                                style: feature => {
                                    return {
                                        color: '#888',
                                        weight: 2,
                                        opacity: 1.0,
                                        fill: feature.geometry.type === 'MultiPolygon',
                                        fillOpacity: 0.2,
                                    }
                                },
                                onEachFeature: feature => {

                                },
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

    }
    
    const getter = (store, getters) => getters.allMapLayers.filter(layer => {

        if (getters.layerOpacity(layer.url)) {
            if (layer.isFeatureSet && !getters.featureSetsEnabled(layer.map)) return false
            else return true
        } else return false

    })

    store.watch(getter, updateLayers, { immediate: true })

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

const MapCanvas = {

    name: 'map-canvas',
    components: {
        Timeline,
        AddressControl,
        ZoomControl,
    },
    props: [ 'embed-link' ],
    data: () => ({ map: null }),
    computed: {
        mapDates() { return this.$store.getters.mapDates },
    },
    mounted() {
        
        this.map = new L.Map('map', {
            
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            maxBounds: SAN_FRANCISCO_BOUNDS,
        
        })
        
        this.map.setMinZoom(this.map.getBoundsZoom(SAN_FRANCISCO_BOUNDS))
        this.map.fitBounds(this.$store.getters.mapBounds)
        bindLayerControls(this.map, this.$store)
        bindMapBounds(this.map, this.$store)

    },

}

export default MapCanvas

</script>
<style lang="sass">

@import '../../../styles/variables';

.map-container {

    padding: 1em;
    background-color: $light-grey;
    position: relative;

    .map-canvas {

        width: 100%;
        height: 600px;
        position: relative;

        &.embed {
            height: 400px;
        }

        > * {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        #map {
            
            box-shadow: inset 0 0 10px $medium-light-grey;
            border-radius: 3px;
            z-index: 1;

            .custom-marker-icon {
                
                font-size: 45px;
                text-shadow: 0 0 2px $white, 0 5px 5px $medium-grey;

            }

            .blue-marker {
                color: $light-blue;
            }

            .red-marker {
                color: $light-red;
            }

            .leaflet-popup-content-wrapper {

                border-radius: 5px;
                background-color: rgba(255, 255, 255, .95);
                text-align: center;
                word-wrap: break-word;
                color: $medium-grey;

                .leaflet-popup-content {

                    margin: 0;

                    header {

                        margin: 1em;
                        border-bottom: 1px solid $medium-light-grey;
                        padding: 1em;

                        h3 {
                            font-weight: bold;
                            font-size: 1.25em;
                        }

                        h6 {
                            font-style: italic;
                            font-size: 1.1em;
                        }

                    }

                    article {
                        margin: 1em;
                    }

                }

            }

        }

        .controls {

            pointer-events: none;
            text-align: right;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            > * {
                pointer-events: all;
                margin: 1em 1em 0 0;
                box-shadow: 0 0 10px #ccc;
                background-color: $light-grey;
                border-radius: 4px;
                overflow: hidden;
            }

            .embed-link {
                padding: .25em .75em;
            }

        }

    }

}

</style>
