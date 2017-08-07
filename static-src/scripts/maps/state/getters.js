/*
*   Imports
*/

import {

    SAN_FRANCISCO_BOUNDS,
    RASTER_LAYER_LABEL,
    WMS_LAYER_TYPE,
    VECTOR_LAYER_LABEL,
    GEOJSON_LAYER_TYPE,

} from './constants'


/*
*   Returns serializable map state as a URL-ready string.
*/

export const hashState = state => {
    
    const hashStateObject = {}
    if (Object.keys(state.mapEnabled).length) hashStateObject.mapEnabled = state.mapEnabled
    if (state.narrative) hashStateObject.narrative = state.narrative
    if (state.address) hashStateObject.address = state.address
    if (Object.keys(state.layerOpacity).length) hashStateObject.layerOpacity = state.layerOpacity
    if (state.bounds) hashStateObject.bounds = state.bounds
    if (Object.keys(state.featureSetsEnabled).length) hashStateObject.featureSetsEnabled = state.featureSetsEnabled
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

export const isNarrativeVisible = state => map => state.narrative === map.id


/*
*   Returns the map for which the narrative is visible.
*/

export const visibleNarrative = state => state.sourceMaps[state.narrative]


/*
*   Returns the current bounds of the map.
*/

export const mapBounds = state => state.bounds || SAN_FRANCISCO_BOUNDS


/*
*   Returns the opacity of a given layer (keyed by source URL).
*/

export const layerOpacity = state => url => {
    
    if (state.layerOpacity[url] !== undefined) {
        return state.layerOpacity[url]
    } else return 1

}


/*
*   Returns the raster layer for a map, if it exists.
*/

export const rasterLayer = (state, getters) => map => map.raster_url ? {

    map,
    name: RASTER_LAYER_LABEL,
    type: WMS_LAYER_TYPE,
    url: map.raster_url,
    opacity: getters.layerOpacity(map.raster_url)

} : null


/*
*   Returns the vector layer for a map, if it exists.
*/

export const vectorLayer = (state, getters) => map => map.vector_url ? {

    map,
    name: VECTOR_LAYER_LABEL,
    type: GEOJSON_LAYER_TYPE,
    url: map.vector_url,
    geoJSON: state.geoJSON[map.vector_url],
    opacity: getters.layerOpacity(map.vector_url),

} : null


/*
*   Returns the feature sets (Photographs & Drawings) for a map,
*   if they exist.
*/

export const featureSets = (state, getters) => map => {

    return map.feature_urls ? map.feature_urls.map(feature => ({

        map,
        name: feature.title,
        type: GEOJSON_LAYER_TYPE,
        url: feature.url,
        geoJSON: state.geoJSON[feature.url],
        opacity: getters.layerOpacity(feature.url),
        isFeatureSet: true,

    })) : []

}


/*
*   Returns whether the feature sets are enabled (checked) for a map.
*/

export const featureSetsEnabled = state => map => {

    const enabled = state.featureSetsEnabled[map.id]
    if (enabled || enabled === false) return enabled
    else return true

}


/*
*   Returns all enabled layers for all maps.
*/

export const allMapLayers = (state, getters) => {

    let layers = []

    for (let key in state.sourceMaps) {
        const map = state.sourceMaps[key]
        if (getters.isMapEnabled(map)) layers = [

            ...layers,
            getters.rasterLayer(map),
            getters.vectorLayer(map),
            ...getters.featureSets(map),

        ]
    }
    
    return layers.filter(layer => layer !== null)

}


/*
*   Returns the current vector feature groups.
*/

export const vectorFeatureGroups = state => state.vectorFeatureGroups


/*
*   This is a placeholder for when we know more about the vector
*   feature groups.
*/

export const isFeatureVisible = (state, getters) => properties => true


export const sourceMapFromID = state => id => state.sourceMaps[id]
export const mapDates = state => {

    const dates = []
    for (let key in state.sourceMaps) {

        const map = state.sourceMaps[key]
        if (map.year) dates.push(+map.year)

    }
    
    return dates

}


export const address = state => state.address
