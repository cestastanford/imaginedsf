<template>

    <collapsible-container title='Basemaps'>
        <ul>
            <basemap-list-item
                v-for="map in basemaps"
                :map="map"
                :key="map.id">
            </basemap-list-item>
        </ul>
    </collapsible-container>

</template>
<script>

/*
*   Imports subcomponents and constants.
*/

import CollapsibleContainer from './collapsible-container.vue'
import BasemapListItem from './basemap-list-item.vue'
import { BASEMAP_TYPE } from '../state/constants'


/*
*   Configures and exports component.
*/

const BasemapList = {

    name: 'basemap-list',
    components: {
        CollapsibleContainer,
        BasemapListItem,
    },
    computed: {
        basemaps() {
            return this.$store.getters.allMapsOfType(BASEMAP_TYPE)
        },
    },

}

export default BasemapList

</script>
