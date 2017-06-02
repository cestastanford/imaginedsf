<template>

    <li class="map-list-item">
        <input type="range" v-if="!isProposal">
        <a class="map-title" @click="collapsed = !collapsed">{{ map.title }}</a>
        <div class="controls">
            <a class="narrative-button" :class="{ active: narrativeVisible }" @click="toggleNarrative">𝒊</a>
            <input type="checkbox" :checked="mapEnabled" @click="toggleMapEnabled">
        </div>
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

        mapEnabled() { return this.$store.getters.isMapEnabled(this.map) },
        narrativeVisible() { return this.$store.getters.isNarrativeVisible(this.map) },

    },

    methods: {

        toggleNarrative() { this.$store.commit(TOGGLE_NARRATIVE, this.map) },
        toggleMapEnabled() { this.$store.commit(TOGGLE_MAP_ENABLED, this.map) },

    },

}

export default MapListItem

</script>
