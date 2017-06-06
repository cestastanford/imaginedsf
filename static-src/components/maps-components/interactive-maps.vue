<template>
    
    <div class="container">
        <div class="columns">
            <div class="column is-narrow">
                <proposal-list></proposal-list>
                <basemap-list></basemap-list>
                <vector-feature-group-list></vector-feature-group-list>
            </div>
            <div class="column">
                <map-canvas></map-canvas>
            </div>
        </div>
    </div>

</template>
<script>


/*
*   Imports constants and subcomponents.
*/

import { REQUEST_MAPS, APPLY_HASH_STATE } from '../maps.js'
import ProposalList from './proposal-list.vue'
import BasemapList from './basemap-list.vue'
import VectorFeatureGroupList from './vector-feature-group-list.vue'
import MapCanvas from './map-canvas.vue'


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
        VectorFeatureGroupList,
        MapCanvas,
    },
    async mounted() {

        await this.$store.dispatch(REQUEST_MAPS)
        enableHashRouting(this.$store)

    },

}

export default InteractiveMaps


</script>
