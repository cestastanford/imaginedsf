<template>
    
    <collapsible-container title='Proposal Maps'>
        <ul>
            <proposal-list-item
                v-for="map in proposalMaps"
                :map="map"
                key="map.id">
            </proposal-list-item>
        </ul>
    </collapsible-container>

</template>
<script>

/*
*   Imports subcomponents and constants.
*/

import CollapsibleContainer from './collapsible-container.vue'
import ProposalListItem from './proposal-list-item.vue'
import { PROPOSAL_MAP_TYPE } from '../maps.js'


/*
*   Configures and exports component.
*/

const ProposalList = {

    name: 'proposal-list',
    components: {
        CollapsibleContainer,
        ProposalListItem,
    },
    computed: {
        proposalMaps() {
            return this.$store.getters.allMapsOfType(PROPOSAL_MAP_TYPE)
        },
    },

}

export default ProposalList

</script>
