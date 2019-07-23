/*
*   Imports
*/

import Vue from 'vue'


/*
*   Mutation name constants.
*/

export const SAVE_DOWNLOADED_MAPS = 'SAVE_DOWNLOADED_MAPS'
export const SAVE_DOWNLOADED_MAP_LAYERS = 'SAVE_DOWNLOADED_MAP_LAYERS'
export const APPLY_HASH_STATE = 'APPLY_HASH_STATE'
export const TOGGLE_INFORMATION_VISIBILITY = 'TOGGLE_INFORMATION_VISIBILITY'
export const SET_MAP_ENABLED = 'SET_MAP_ENABLED'
export const ENABLE_ONLY_THESE_MAPS = 'ENABLE_ONLY_THESE_MAPS'
export const SAVE_DOWNLOADED_GEOJSON = 'SAVE_DOWNLOADED_GEOJSON'
export const SAVE_MAP_BOUNDS = 'SAVE_MAP_BOUNDS'
export const SET_LAYER_OPACITY = 'SET_LAYER_OPACITY'
export const SET_VECTOR_FEATURE_GROUP_STATUS = 'SET_VECTOR_FEATURE_GROUP_STATUS'
export const SET_MAP_DATES = 'SET_MAP_DATES'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_FEATURE_SETS_ENABLED = 'SET_FEATURE_SETS_ENABLED'


/*
*   Default export object of mutations.
*/

export default {


    /*
    *   Saves source maps to state; sets all maps as initially disabled.
    */

    [SAVE_DOWNLOADED_MAPS]: (state, maps) => {

        state.sourceMaps = maps
        const mapEnabled = {}
        Object.keys(maps).forEach(mapId => mapEnabled[mapId] = false)
        state.mapEnabled = mapEnabled

    },


    /*
    *   Saves source map layers to state; sets all layers as initially
    *   full opacity.
    */

    [SAVE_DOWNLOADED_MAP_LAYERS]: (state, mapLayers) => {

        state.sourceMapLayers = mapLayers
        const layerOpacity = {}
        Object.keys(mapLayers).forEach(layerId => layerOpacity[layerId] = 1)
        state.layerOpacity = layerOpacity

    },


    /*
    *   Sets serializable state from a URL hash string.
    */

    [APPLY_HASH_STATE]: (state, parameterString) => {

        let parameters
        try {
            parameters = JSON.parse(decodeURI(parameterString))
        } catch (e) {
            console.warn('Hash parameter parse failed: ' + parameterString)
        }

        if (parameters) for (let key in parameters) {

            if (parameters[key]) state[key] = parameters[key]

        }

    },


    /*
    *   Shows or hides a map's Information section.
    */

    [TOGGLE_INFORMATION_VISIBILITY]: (state, map) => {

        if (state.information === map.id) state.information = null
        else state.information = map.id

    },


    /*
    *   Sets a proposal or baemap as enabled (visible, checked).
    */

    [SET_MAP_ENABLED]: (state, { map, mapEnabled }) => {

        state.mapEnabled = {
            ...state.mapEnabled,
            [map.id]: mapEnabled,
        }

    },


    /*
    *   Sets only these proposal maps / basemaps to be enabled.
    */

    [ENABLE_ONLY_THESE_MAPS]: (state, maps) => {

        const enabledMaps = {}
        maps.forEach(map => enabledMaps[map.id] = true)
        state.mapEnabled = enabledMaps

    },


    /*
    *   Saves downloaded GeoJSON (keyed by layer ID) to state.
    */

    [SAVE_DOWNLOADED_GEOJSON]: (state, { layerId, geoJSON }) => {

        state.downloadedGeoJSON = {
            ...state.downloadedGeoJSON,
            [layerId]: geoJSON,
        }

    },


    /*
    *   Saves map bounds to state.
    */

    [SAVE_MAP_BOUNDS]: (state, mapBounds) => state.mapBounds = mapBounds,


    /*
    *   Saves layer opacity to state.
    */

    [SET_LAYER_OPACITY]: (state, { layerId, opacity }) => {

        state.layerOpacity = {
            ...state.layerOpacity,
            [layerId]: opacity,
        }

    },


    /*
    *   Enables maps that fall between the passed dates.
    */

    [SET_MAP_DATES]: (state, dates) => {

        for (let key in state.sourceMaps) {

            const map = state.sourceMaps[key]
            if (map.year && +map.year >= dates[0] && +map.year <= dates[1]) {

                state.mapEnabled = { ...state.mapEnabled, [map.id]: true }

            } else state.mapEnabled = { ...state.mapEnabled, [map.id]: false }

        }

    },


    /*
    *   Saves the searched-for address to state.
    */

    [SET_ADDRESS]: (state, address) => state.address = address,

}
