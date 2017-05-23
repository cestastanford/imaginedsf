<template>
    
    <div class="container">
        <div class="columns">
            <div class="column is-narrow">
                <proposal-list></proposal-list>
            </div>
            <div class="column"></div>
        </div>
    </div>

</template>
<script>


/*
*   Imports constants and subcomponents.
*/

import { REQUEST_MAPS, APPLY_HASH_STATE, GET_HASH_STATE } from '../maps.js'
import ProposalList from './proposal-list.vue'


/*
*   Enables saving state to the URL and listening for URL changes.
*/

const enableHashRouting = store => {

    //  Applies URL changes to state
    const applyHashState = () => {

        store.commit(APPLY_HASH_STATE, window.location.hash.slice(1))

    }

    //  Saves state changes to URL
    const saveHashState = (mutation, state) => {

        window.location.hash = '#' + store.getters[GET_HASH_STATE]

    }

    applyHashState()
    saveHashState()

    window.addEventListener('popstate', applyHashState)
    store.subscribe(saveHashState)

}


/*
*   Configures and exports component.
*/

const Maps = {

    name: 'maps',
    components: {
        ProposalList,
    },
    async mounted() {

        await this.$store.dispatch(REQUEST_MAPS)
        enableHashRouting(this.$store)

    },

}

export default Maps


</script>
