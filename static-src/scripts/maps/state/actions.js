/*
*   Imports
*/

import { SAVE_SOURCE_MAPS, SAVE_GEOJSON, UPDATE_VECTOR_FEATURE_GROUPS } from './mutations'


/*
*   Action name constants.
*/

export const REQUEST_MAPS = 'REQUEST_MAPS'
export const DOWNLOAD_GEOJSON = 'DOWNLOAD_GEOJSON'


/*
*   Default export of object of actions.
*/

export default { 

    [REQUEST_MAPS]: async ({ commit }) => {

        const REQUEST_URL = document.documentElement.dataset.rootUrl + '/wp-json/imaginedsf/maps'
        const response = await fetch(REQUEST_URL)
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`, response)
        }

        const responseBody = await response.json()
        const sourceMaps = {}
        responseBody.forEach(responseObject => {

            const map = {
                id: responseObject.ID,
                title: responseObject.post_title,
                ...responseObject.fields,
            }

            sourceMaps[map.id] = map

        })

        commit(SAVE_SOURCE_MAPS, sourceMaps)

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
