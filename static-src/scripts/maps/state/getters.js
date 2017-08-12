/*
*   Imports
*/

import { SAN_FRANCISCO_BOUNDS } from './constants'


/*
*   Returns serializable map state as a URL-ready string.
*/

export const hashState = state => {
    
    const hashStateObject = {}
    if (Object.keys(state.mapEnabled).length) hashStateObject.mapEnabled = state.mapEnabled
    if (state.informationVisible) hashStateObject.informationVisible = state.informationVisible
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
*   Returns the opacity of a given layer.
*/

export const layerOpacity = state => layerId => {
    
    if (state.layerOpacity[layerId] !== undefined) {
        return state.layerOpacity[layerId]
    } else return 1

}


/*
*   Returns the primary layers for a map.
*/

export const primaryLayers = (state, getters) => map => map.primary_layers.map(layer => ({
    
    label: layer.label,
    ...state.sourceMapLayers[layer.layer],

}))


/*
*   Returns the Photos & Drawings layers for a map, if they 
*   exist.
*/

export const secondaryLayers = (state, getters) => map => {

    return map.photos_and_drawings_layers ? map.photos_and_drawings_layers.map(layer => ({

        label: layer.label,
        ...state.sourceMapLayers[layer.layer],

    })) : []

}


/*
*   Returns all layers from all enabled maps.
*/

export const allEnabledMapLayers = (state, getters) => {

    let layers = []

    for (let key in state.sourceMaps) {
        
        const map = state.sourceMaps[key]
        if (getters.isMapEnabled(map)) layers = [

            ...layers,
            ...getters.primaryLayers(map).filter(layer => getters.layerOpacity(layer.id) !== 0),
            ...getters.secondaryLayers(map).filter(layer => getters.layerOpacity(layer.id) !== 0),

        ]
    
    }
    
    return layers

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
