<template>

    <div class="container">
        <div class="columns">
            <div class="column is-narrow">
                <proposal-list></proposal-list>
                <basemap-list></basemap-list>
            </div>
            <div class="column">
                <map-canvas></map-canvas>
                <information v-if="mapWithVisibleInformation" :map-with-visible-information="mapWithVisibleInformation"></information>
            </div>
        </div>
    </div>

</template>
<script>


/*
*   Imports constants and subcomponents.
*/

import { APPLY_HASH_STATE } from '../state/mutations'
import { REQUEST_MAPS } from '../state/actions'
import ProposalList from './proposal-list.vue'
import BasemapList from './basemap-list.vue'
import MapCanvas from './map-canvas.vue'
import Information from './information.vue'


/*
*   Enables saving state to the URL and listening for URL changes.
*/

const enableHashRouting = store => {

    //  Applies URL changes to state
    const applyHashState = () => {

        const hash = window.location.hash.slice(1)
        if (hash) store.commit(APPLY_HASH_STATE, hash)

    }

    //  Saves state changes to URL
    const saveHashState = () => {

        window.history.pushState(null, null, '#' + store.getters.hashState)

    }

    applyHashState()
    window.addEventListener('popstate', applyHashState)
    store.subscribe(saveHashState)

}


/*
*   Configures and exports component.
*/

const InteractiveMaps = {

    name: 'interactive-maps',
    components: {
        ProposalList,
        BasemapList,
        MapCanvas,
        Information,
    },
    computed: {
        mapWithVisibleInformation() { return this.$store.getters.mapWithVisibleInformation },
    },
    async mounted() {

        await this.$store.dispatch(REQUEST_MAPS)
        enableHashRouting(this.$store)

    },

}

export default InteractiveMaps


</script>
