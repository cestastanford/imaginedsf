<template>
    
    <collapsible-container title='Proposal Maps'>
        <ul>
            <map-list-item
                v-for="map in proposalMaps"
                :map="map"
                :isProposal="true"
                key="map.id">
            </map-list-item>
        </ul>
    </collapsible-container>

</template>
<script>

/*
*   Imports subcomponents.
*/

import CollapsibleContainer from './collapsible-container.vue'
import MapListItem from './map-list-item.vue'


/*
*   Configures and exports component.
*/

const ProposalList = {

    name: 'proposal-list',
    components: {
        CollapsibleContainer,
        MapListItem,
    },
    computed: {
        proposalMaps() { return this.$store.state.proposalMaps },
    } 

}

export default ProposalList

</script>
