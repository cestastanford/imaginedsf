/*
*   Imports
*/

import { WMS_LAYER_TYPE } from './constants'
import {

    SAVE_DOWNLOADED_MAPS,
    SAVE_DOWNLOADED_MAP_LAYERS,
    SAVE_DOWNLOADED_GEOJSON,
    ENABLE_ONLY_THESE_MAPS,
    SET_LAYER_OPACITY,

} from './mutations'


/*
*   Action name constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
const REQUEST_MAP_LAYERS = 'REQUEST_MAP_LAYERS'
export const DOWNLOAD_GEOJSON = 'DOWNLOAD_GEOJSON'
export const SET_MAP_VIEW = 'SET_MAP_VIEW'


/*
*   Default export of object of actions.
*/

export default {

    /*
    *   Initiates download of map objects from CMS.
    */

    [REQUEST_MAPS]: async store => {

        await store.dispatch(REQUEST_MAP_LAYERS)
        const REQUEST_URL = document.documentElement.dataset.rootUrl + '/wp-json/imaginedsf/maps'
        const response = await fetch(REQUEST_URL)
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }

        const responseBody = await response.json()
        const maps = {}
        responseBody.forEach(responseObject => {

            const map = {
                id: responseObject.ID,
                title: responseObject.post_title,
                ...responseObject.fields,
            }

            maps[map.id] = map

        })

        store.commit(SAVE_DOWNLOADED_MAPS, maps)

    },


    /*
    *   Initiates download of map layer objects from CMS.
    */

    [REQUEST_MAP_LAYERS]: async ({ commit }) => {

        const REQUEST_URL = document.documentElement.dataset.rootUrl + '/wp-json/imaginedsf/map-layers'
        const response = await fetch(REQUEST_URL)
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }

        const responseBody = await response.json()
        const mapLayers = {}
        responseBody.forEach(responseObject => {

            const mapLayer = {
                id: responseObject.ID,
                ...responseObject.fields,
            }

            mapLayers[mapLayer.id] = mapLayer

        })

        commit(SAVE_DOWNLOADED_MAP_LAYERS, mapLayers)

    },


    /*
    *   Downloads and caches GeoJSON for layers.
    */

    [DOWNLOAD_GEOJSON]: async ({ commit }, layer) => {

        const REQUEST_URL = document.documentElement.dataset.rootUrl + `/wp-json/imaginedsf/map-layer-json?layer_id=${layer.id}`
        const response = await fetch(REQUEST_URL)
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }

        const geoJSON = await response.json()
        commit(SAVE_DOWNLOADED_GEOJSON, { layerId: layer.id, geoJSON })

    },


    /*
    *   Activates the passed map and its basemap.
    */

    [SET_MAP_VIEW]: ({ getters, commit }, map) => {

        const mapsToEnable = [ map ]

        //  Checks for a linked basemap, setting its layer as visible if it exists
        if (map.linked_basemap) {
            const basemap = getters.sourceMapFromID(map.linked_basemap)
            mapsToEnable.push(basemap)
            commit(SET_LAYER_OPACITY, { ...getters.basemapLayer(basemap), opacity: 1 })
        }

        //  Sets all proposal map layers to visible
        getters.primaryLayers(map).forEach(layer => commit(SET_LAYER_OPACITY, { ...layer, opacity: 1 }))
        getters.secondaryLayers(map) &&
            getters.secondaryLayers(map).forEach(layer => commit(SET_LAYER_OPACITY, { ...layer, opacity: 1 }))

        //  Enables the proposal map and basemap, if it exists
        commit(ENABLE_ONLY_THESE_MAPS, mapsToEnable)

    },

}
