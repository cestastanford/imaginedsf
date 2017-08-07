<template>
    
    <map-canvas :embed-link="link"></map-canvas>

</template>
<script>


/*
*   Imports constants and subcomponents.
*/

import { APPLY_HASH_STATE } from '../state/mutations'
import { REQUEST_MAPS } from '../state/actions'
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
        link() { return document.documentElement.dataset.rootUrl + '/maps/#' + this.$store.getters.hashState },
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
