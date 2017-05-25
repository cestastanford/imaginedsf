<template>

    <div id="map"></div>

</template>
<script>

import { Map } from 'leaflet'

const MapCanvas = {

    name: 'map-canvas',
    mounted: () => {
        const map = new Map('map')
    }

}

export default MapCanvas

</script>
