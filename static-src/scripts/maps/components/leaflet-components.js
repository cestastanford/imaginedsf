import { DivIcon, Marker, Popup } from 'leaflet'

/*
*   Extends DivIcon to define a custom marker icon.
*/

const MarkerIcon = DivIcon.extend({

    options: {
        html: '<i class="fa fa-map-marker custom-marker-icon"></i>',
        iconAnchor: [12, 48],
    }

})


/*
*   Creates custom red and blue Marker subclasses from the custom
*   DivIcon.
*/

export const BlueMarker = Marker.extend({

    options: { icon: new MarkerIcon({ className: 'blue-marker' }) }

})

export const RedMarker = Marker.extend({

    options: { icon: new MarkerIcon({ className: 'red-marker' }) }

})


/*
*   Creates a popup for a vector feature marker.
*/

export const getFeaturePopup = (layer, feature) => {

    const popup = new Popup({

        offset: [0, -40],
        maxWidth: 200,

    })

    const popupContents = `
        <header>
            <h3>${layer.label}</h3>
            <h6>${layer.mapTitle}</h6>
        </header>
        <article>${JSON.stringify(feature.properties)}</article>
    `
    return popup.setContent(popupContents)

}


/*
*   Creates a WMS layer.
*/

export const getWMSLayer = (layer, layerOpacity) => {

    return new L.tileLayer.wms(
        layer.wms_base_url,
        {
            transparent: true,
            tiled: true,
            detectRetina: true,
            format: 'image/png',
            layers: layer.wms_layers,
            minNativeZoom: layer.wms_min_zoom ? parseInt(layer.wms_min_zoom) : undefined,
            maxNativeZoom: layer.wms_max_zoom ? parseInt(layer.wms_max_zoom) : undefined,
            opacity: layerOpacity,
        },
    )

}


/*
*   Creates a GeoJSON layer.
*/

export const getGeoJSONLayer = (layer, layerOpacity, layerGeoJSON) => {
    return new L.geoJSON(
        layerGeoJSON,
        {

            coordsToLatLng: getCoordsToLatLngFn(layerGeoJSON),
            style: getStyleFn(layerOpacity),
            pointToLayer: (point, latLng) => {
                const marker = new RedMarker(latLng)
                const popup = getFeaturePopup(layer, point)
                return marker.bindPopup(popup)
            },


        }
    )

}


/*
*   Returns a `coordsToLatLng` function for the GeoJSON layer based
*   on the projection defined in the GeoJSON.
*/

export const getCoordsToLatLngFn = geoJSON => {

    let projection = L.CRS.EPSG3857
    if (geoJSON && geoJSON.crs && geoJSON.crs.properties && geoJSON.crs.properties.name) {
        switch (geoJSON.crs.properties.name) {

            case 'urn:ogc:def:crs:EPSG::4326':
                projection = L.CRS.EPSG4326
                break

            default:
                projection = L.CRS.EPSG3857

        }
    }

    return coords => {
        const projectedCoordinate = new L.Point(coords[0], coords[1])
        return projection.unproject(projectedCoordinate)
    }

}


/*
*   Returns a `style` function for the GeoJSON layer.
*/

export const getStyleFn = layerOpacity => feature => ({
    stroke: true,
    color: '#fff',
    weight: 2,
    opacity: layerOpacity,
    fill: feature.geometry.type === 'MultiPolygon',
    fillColor: '#d83a3a',
    fillOpacity: layerOpacity,
})



/*
*   Creates a Tile layer.
*/

export const getTileLayer = (layer, layerOpacity) => {
    return new L.tileLayer(
        layer.tile_url,
        {
            opacity: layerOpacity,
            detectRetina: true,
            minNativeZoom: layer.min_tile_zoom ? parseInt(layer.min_tile_zoom) : undefined,
            maxNativeZoom: layer.max_tile_zoom ? parseInt(layer.max_tile_zoom) : undefined,

        },
    )
}
