<template>

    <li class="map-list-item">
        <input type="range" v-if="!isProposal">
        <a class="map-title" @click="collapsed = !collapsed">{{ map.title }}</a>
        <a class="narrative-button" @click="toggleNarrative">i</a>
        <input type="checkbox" :checked="mapEnabled" @click="toggleMapEnabled">
    </li>

</template>
<script>

import { TOGGLE_NARRATIVE, TOGGLE_MAP_ENABLED } from '../maps.js'

const MapListItem = {

    name: 'map-list-item',
    props: [ 'map', 'isProposal' ],
    data: () => ({
        
        collapsed: false,
        featuresCollapsed: false,

    }),
    computed: {

        mapEnabled() {
            
            return (this.$store.state.mapState.enabledMaps &&
                this.$store.state.mapState.enabledMaps[this.map.id] === true)

        },

    },

    methods: {

        toggleNarrative() { this.$store.commit(TOGGLE_NARRATIVE, this.map) },
        toggleMapEnabled() { this.$store.commit(TOGGLE_MAP_ENABLED, this.map) },

    },

}

export default MapListItem

</script>
