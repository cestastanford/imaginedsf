<template>

    <collapsible-list-item class="basemap-list-item">
        <span slot="parent-label" class="basemap-list-item-label">{{ map.title }}</span>
        <a slot="parent-right" class="basemap-list-item-narrative-button" :class="{ active: narrativeVisible }" @click="toggleNarrative">𝒊</a>
        <input slot="parent-right" type="range" min="0" max="1" step="0.01" :value="rasterLayer.opacity" @change="handleRangeChange($event, rasterLayer)" :disabled="!mapEnabled">
        <input slot="parent-right" type="checkbox" v-model="mapEnabled">
    </collapsible-list-item>

</template>
<script>

import { TOGGLE_NARRATIVE, TOGGLE_MAP_ENABLED, SET_LAYER_OPACITY } from '../state/mutations'
import CollapsibleListItem from './collapsible-list-item.vue'

const BasemapListItem = {

    name: 'basemap-list-item',
    components: { CollapsibleListItem },
    props: [ 'map' ],
    computed: {

        mapEnabled: {
            
            get() { return this.$store.getters.isMapEnabled(this.map) },
            set() { this.$store.commit(TOGGLE_MAP_ENABLED, this.map) },
        
        },

        narrativeVisible() { return this.$store.getters.isNarrativeVisible(this.map) },
        rasterLayer() { return this.$store.getters.rasterLayer(this.map) },

    },

    methods: {

        toggleNarrative() { this.$store.commit(TOGGLE_NARRATIVE, this.map) },
        setOpacity(layer) { this.$store.commit(SET_LAYER_OPACITY, layer) },
        handleRangeChange(event, layer) {
            
            this.setOpacity({ ...layer, opacity: event.target.valueAsNumber })
        
        },

    },

}

export default BasemapListItem

</script>
<style lang="sass">

@import '../../../styles/variables';

.collapsible-list-item.basemap-list-item {

    font-size: .9em;
    margin-top: .5em;
    margin-bottom: .5em;
    margin-left: -1.25em;

    .basemap-list-item-label {
        margin-right: 2.5em;
    }

    .basemap-list-item-narrative-button {
        
        
        width: 18px;
        height: 18px;
        border: 1px solid $medium-grey;
        border-radius: 15px;
        padding: 8px 6px 0px 0px;
        font-size: 16px;
        font-family: serif;
        font-style: italic;
        line-height: 0;
        color: $medium-grey;
        box-shadow: 0 0 2px 0px $medium-grey, inset 0 0 2px 0px $medium-grey;
        transform: scale(.875) translateZ(0);
        transition: color .25s, border-color .25s, box-shadow .25s, opacity .25s;

        &.active {
            color: $red;
            border-color: $red;
            box-shadow: 0 0 2px 0px $red, inset 0 0 2px 0px $red;

        }

    }

    input[type="range"] {
        width: 5em;
        margin-right: .1em;
    }

}

</style>
