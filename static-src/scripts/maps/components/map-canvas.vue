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

import {
    WMS_LAYER_TYPE,
    GEOJSON_LAYER_TYPE,
    SAN_FRANCISCO_BOUNDS,
    SAN_FRANCISCO_PANNING_BOUNDS,
    TILE_LAYER_TYPE,
} from '../state/constants'
import { SAVE_MAP_BOUNDS } from '../state/mutations'
import { DOWNLOAD_GEOJSON } from '../state/actions'
import {
    RedMarker,
    getFeaturePopup,
    getWMSLayer,
    getGeoJSONLayer,
    getCoordsToLatLngFn,
    getStyleFn,
    getTileLayer,
} from './leaflet-components.js'


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
*   Sets up watchers to update the map when the store changes.
*/

const enableLayerUpdates = (map, store) => {

    let leafletLayers = []

    //  Called when layers are added or removed
    store.watch(
        (store, getters) => getters.allMapLayers,
        layers => {

            //  Remove all existing layers
            leafletLayers.forEach(leafletLayer => map.removeLayer(leafletLayer))
            leafletLayers = []

            //  Add all layers
            layers.forEach((layer, index) => {

                let leafletLayerToAdd
                const layerOpacity = store.getters.layerDisplayOpacity(layer)
                const layerGeoJSON = store.getters.layerGeoJSON(layer)

                switch (layer.source_type) {

                    case WMS_LAYER_TYPE:
                        leafletLayerToAdd = getWMSLayer(layer, layerOpacity)
                        break

                    case GEOJSON_LAYER_TYPE:
                        if (!layerGeoJSON) store.dispatch(DOWNLOAD_GEOJSON, layer)
                        leafletLayerToAdd = getGeoJSONLayer(layer, layerOpacity, layerGeoJSON)
                        break

                    case TILE_LAYER_TYPE:
                        leafletLayerToAdd = getTileLayer(layer, layerOpacity)
                        break

                    default:
                        console.log(layer)

                }

                map.addLayer(leafletLayerToAdd)
                leafletLayers.push(leafletLayerToAdd)

            })

        },
        { immediate: true },
    )

    //  Called when layers' display opacities are changed
    store.watch(
        (store, getters) => getters.allMapLayers.map(getters.layerDisplayOpacity),
        displayOpacities => {
            displayOpacities.forEach((displayOpacity, i) => {

                const leafletLayer = leafletLayers[i]

                //  For raster layers
                try {
                    leafletLayer.setOpacity(displayOpacity)
                }

                //  For GeoJSON layers
                catch (error) {
                    leafletLayer.setStyle(getStyleFn(displayOpacity))
                }

            })
        }
    )

    //  Called when layers' GeoJSON is changed
    store.watch(
        (store, getters) => getters.allMapLayers.map(layer => ({
            layer,
            geoJSON: getters.layerGeoJSON(layer),
        })),
        layerGeoJSONs => {
            layerGeoJSONs.forEach(({ layer, geoJSON }, i) => {
                const leafletLayer = leafletLayers[i]
                if (geoJSON) {
                    leafletLayer.options.coordsToLatLng = getCoordsToLatLngFn(geoJSON)
                    leafletLayer.clearLayers()
                    leafletLayer.addData(geoJSON)
                    leafletLayer.setStyle(getStyleFn(store.getters.layerDisplayOpacity(layer)))
                }
            })
        }
    )

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

        store.commit(SAVE_MAP_BOUNDS, boundsArray)

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
            maxBounds: SAN_FRANCISCO_PANNING_BOUNDS,

        })

        this.map.setMinZoom(this.map.getBoundsZoom(SAN_FRANCISCO_BOUNDS))
        this.map.fitBounds(this.$store.getters.mapBounds)

        enableLayerUpdates(this.map, this.$store, this.leafletLayers)
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
