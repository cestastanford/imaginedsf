<template>
    
    <map-canvas :embed-link="link"></map-canvas>

</template>
<script>


/*
*   Imports constants and subcomponents.
*/

import { REQUEST_MAPS, APPLY_HASH_STATE } from '../maps.js'
import MapCanvas from './map-canvas.vue'


/*
*   Configures and exports component.
*/

const MapEmbed = {

    name: 'map-embed',
    components: {
        MapCanvas,
    },
    props: [ 'hash' ],
    computed: {
        link() { return '/maps/#' + this.$store.getters.hashState },
    },
    async mounted() {

        const hash = this.hash
        await this.$store.dispatch(REQUEST_MAPS)
        console.log(hash)
        this.$store.commit(APPLY_HASH_STATE, hash)

    },

}

export default MapEmbed


</script>
