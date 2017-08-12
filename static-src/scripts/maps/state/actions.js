/*
*   Imports
*/

import {

    SAVE_DOWNLOADED_MAPS,
    SAVE_DOWNLOADED_MAP_LAYERS,
    SAVE_GEOJSON,
    UPDATE_VECTOR_FEATURE_GROUPS

} from './mutations'


/*
*   Action name constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
const REQUEST_MAP_LAYERS = 'REQUEST_MAP_LAYERS'
export const DOWNLOAD_GEOJSON = 'DOWNLOAD_GEOJSON'


/*
*   Default export of object of actions.
*/

export default { 

    [REQUEST_MAPS]: async store => {

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
        return store.dispatch(REQUEST_MAP_LAYERS)

    },

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

    [DOWNLOAD_GEOJSON]: async ({ commit }, url) => {

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }

        const geoJSON = await response.json()
        commit(SAVE_GEOJSON, { url, geoJSON })
        commit(UPDATE_VECTOR_FEATURE_GROUPS)

    }

}
