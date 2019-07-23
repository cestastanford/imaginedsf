/*
*   Imports
*/

import { SAN_FRANCISCO_BOUNDS, PROPOSAL_MAP_TYPE, BASEMAP_TYPE } from './constants'


/*
*   Returns serializable map state as a URL-ready string.
*/

export const hashState = state => {

    const hashStateObject = {}
    if (Object.keys(state.mapEnabled).length) hashStateObject.mapEnabled = state.mapEnabled
    if (state.information) hashStateObject.information = state.information
    if (state.address) hashStateObject.address = state.address
    if (Object.keys(state.layerOpacity).length) hashStateObject.layerOpacity = state.layerOpacity
    if (state.mapBounds) hashStateObject.mapBounds = state.mapBounds
    if (Object.keys(hashStateObject).length) return encodeURI(JSON.stringify(hashStateObject))
    else return ''

}


/*
*   Retrieves all downloaded maps of a given type.
*/

export const allMapsOfType = state => mapType => {

    const maps = []
    for (let key in state.sourceMaps) {
        const map = state.sourceMaps[key]
        if (map.map_type === mapType) maps.push(map)
    }

    return maps

}


/*
*   Returns whether a map is enaabled (checked) in the Proposal Maps
*   or Basemaps list.
*/

export const isMapEnabled = state => map => state.mapEnabled[map.id]


/*
*   Returns whether the narrative for a given map is visible.
*/

export const isInformationVisibleForMap = state => map => state.information === map.id


/*
*   Returns the map for which the narrative is visible.
*/

export const mapWithVisibleInformation = state => state.sourceMaps[state.information]


/*
*   Returns a map layer object, bound to the layer label and map
*   it's a part of.
*/

export const mapLayer = (state, getters) => (id, label, map) => ({

    ...state.sourceMapLayers[id],
    label,
    map,


})


/*
*   Returns the primary layers for a map.  If map is disabled, returns
*   opacity as 0.
*/

export const primaryLayers = (state, getters) => map => {

    return map.primary_layers.map(({ layer, label }) => {
        return getters.mapLayer(layer, label, map)
    })

}


/*
*   Returns the Photos & Drawings layers for a map, if they
*   exist.  If map is disabled, returns opacity as 0.
*/

export const secondaryLayers = (state, getters) => map => {

    return map.photos_and_drawings_layers
    ? map.photos_and_drawings_layers.map(({ layer, label }) => {
        return getters.mapLayer(layer, label, map)
    })
    : []

}


/*
*   Retrieves the single layer for a basemap.  If map is disabled,
*   returns opacity as 0.
*/

export const basemapLayer = (state, getters) => map => getters.mapLayer(map.basemap_layer, '', map)


/*
*   Returns all layers from all maps.
*/

export const allMapLayers = (state, getters) => {

    const proposalMaps = getters.allMapsOfType(PROPOSAL_MAP_TYPE)
    const basemaps = getters.allMapsOfType(BASEMAP_TYPE)
    return [

        ...proposalMaps.reduce((accum, next) => ([

            ...accum,
            ...getters.primaryLayers(next),
            ...getters.secondaryLayers(next),

        ]), []),

        ...basemaps.map(basemap => getters.basemapLayer(basemap)),

    ]

}


/*
*   Returns the set opacity of a layer.
*/

export const layerOpacity = state => layerId => state.layerOpacity[layerId]


/*
*   Returns the set opacity of a map layer, or 0 if the map
*   is disabled.
*/

export const layerDisplayOpacity = (state, getters) => mapLayer => {
    return getters.isMapEnabled(mapLayer.map) ? getters.layerOpacity(mapLayer.id) : 0
}


/*
*   Returns the GeoJSON for a map layer.
*/

export const layerGeoJSON = state => mapLayer => state.downloadedGeoJSON[mapLayer.id]


/*
*   Returns the map given a map ID.
*/

export const sourceMapFromID = state => id => state.sourceMaps[id]


/*
*   Returns an array of all of the dates from dated maps.
*/

export const mapDates = state => {

    const dates = []
    for (let key in state.sourceMaps) {

        const map = state.sourceMaps[key]
        if (map.year) dates.push(+map.year)

    }

    return dates

}


/*
*   Returns the current searched address.
*/

export const address = state => state.address


/*
*   Returns the current bounds of the map.
*/

export const mapBounds = state => state.bounds || SAN_FRANCISCO_BOUNDS
