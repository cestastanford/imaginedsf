<template>

    <collapsible-list-item class="basemap-list-item">
        <span slot="parent-label" class="basemap-list-item-label">{{ map.title }}</span>
        <a
            slot="parent-right"
            class="basemap-list-item-narrative-button"
            :class="{ active: informationVisible }"
            @click="toggleInformationVisibility"
        >𝒊</a>
        <input
            slot="parent-right"
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="opacity"
            @input="handleRangeChange($event)"
        >
        <input
            slot="parent-right"
            type="checkbox"
            :checked="mapEnabled"
            @change="handleCheckboxChange($event)"
        >
    </collapsible-list-item>

</template>
<script>

import {
    TOGGLE_INFORMATION_VISIBILITY,
    SET_MAP_ENABLED,
    SET_LAYER_OPACITY,
} from '../state/mutations'
import CollapsibleListItem from './collapsible-list-item.vue'

const BasemapListItem = {

    name: 'basemap-list-item',
    components: { CollapsibleListItem },
    props: [ 'map' ],
    computed: {

        mapEnabled: {
            get() { return this.$store.getters.isMapEnabled(this.map) },
            set(mapEnabled) {
                this.$store.commit(SET_MAP_ENABLED, { map: this.map, mapEnabled })
            },
        },

        opacity: {
            get() { return this.$store.getters.layerOpacity(this.basemapLayer.id) },
            set(opacity) {
                this.$store.commit(SET_LAYER_OPACITY, {
                    layerId: this.basemapLayer.id,
                    opacity,
                })
            }
        },

        informationVisible() { return this.$store.getters.isInformationVisibleForMap(this.map) },
        basemapLayer() { return this.$store.getters.basemapLayer(this.map) },

    },

    methods: {

        toggleInformationVisibility() {
            this.$store.commit(TOGGLE_INFORMATION_VISIBILITY, this.map)
        },

        handleRangeChange(event) {
            this.opacity = event.target.valueAsNumber
            if (this.opacity === 0) this.mapEnabled = false
            else this.mapEnabled = true
        },

        handleCheckboxChange(event) {
            this.mapEnabled = event.target.checked
            if (this.mapEnabled && this.opacity === 0) this.opacity = 1
            if (!this.mapEnabled && this.opacity !== 0) this.opacity = 0
        },

    },

    mounted() {
        if (!this.mapEnabled) this.opacity = 0
    }

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
        width: 10em;
        margin-right: .1em;
    }

}

</style>
