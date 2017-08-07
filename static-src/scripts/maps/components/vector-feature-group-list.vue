<template>
    
    <collapsible-container title='Vector Feature Groups'>
        <ul>
            <vector-feature-group-list-item v-for="group in groups" :group="group" :key="group.label">
            </vector-feature-group-list-item>
        </ul>
    </collapsible-container>

</template>
<script>

/*
*   Imports subcomponents and constants.
*/

import { BASEMAP_TYPE } from '../state/constants'
import CollapsibleContainer from './collapsible-container.vue'
import VectorFeatureGroupListItem from './vector-feature-group-list-item.vue'


/*
*   Configures and exports component.
*/

const VectorFeatureGroupList = {

    name: 'vector-feature-group-list',
    components: {
        CollapsibleContainer,
        VectorFeatureGroupListItem,
    },
    computed: {
        groups() { return this.$store.getters.vectorFeatureGroups },
    },

}

export default VectorFeatureGroupList

</script>
