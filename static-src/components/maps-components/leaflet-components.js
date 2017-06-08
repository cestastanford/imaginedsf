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
            <h3>${feature.id}</h3>
            <h6>${layer.map.title}: ${layer.name}</h6>
        </header>
        <article>${JSON.stringify(feature.properties)}</article>
    `
    return popup.setContent(popupContents)

}