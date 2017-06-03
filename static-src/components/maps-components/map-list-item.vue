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
<style lang="sass">

@import '../../styles/variables';

.map-list-item {

    position: relative;
    font-size: .9em;
    font-weight: bold;
    margin: .5em 0;

    .map-title {
        padding-right: 5em;
    }

    .controls {
        
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);

        > * {
            display: inline-block;
            text-align: right;
            margin-left: .25em;
            vertical-align: middle;
        }
    
        .narrative-button {
            
            font-style: italic;
            font-family: serif;
            font-size: 16px;
            border: 1px solid $red;
            border-radius: 15px;
            padding: 4px 5px;
            width: 18px;
            height: 18px;
            line-height: .5;
            box-shadow: 0 0 2px 0px $red, inset 0 0 2px 0px $red;
            transform: scale(.875) translateZ(0);
            transition: color .25s, opacity .25s;

            &:hover,
            &.active {
                color: $red;
                opacity: .5;
            }

        }

    }

}

</style>
