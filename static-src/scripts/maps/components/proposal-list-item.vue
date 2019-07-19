<template>

    <collapsible-list-item :collapsible="true" class="proposal-list-item">
        <span slot="parent-label" class="proposal-list-item-label">{{ map.title }}</span>
        <a slot="parent-right" class="proposal-list-item-narrative-button" :class="{ active: informationVisible }" @click="toggleInformationVisibility">𝒊</a>
        <input slot="parent-right" type="checkbox" :checked="mapEnabled" @click="toggleMapEnabled">
        <ul slot="contents" class="proposal-list-item-contents">
            <collapsible-list-item v-for="layer in primaryLayers" key="layer.id">
                <span slot="parent-label">{{ layer.label }}</span>
                <input slot="parent-right" type="range" min="0" max="1" step="0.01" :disabled="!mapEnabled" :value="layer.opacity" @input="handleRangeChange($event, layer)">
                <input slot="parent-right" type="checkbox" :disabled="!mapEnabled" :checked="layer.opacity > 0" @change="handleCheckboxChange($event, layer)">
            </collapsible-list-item>
            <collapsible-list-item :collapsible="true" v-if="secondaryLayers.length">
                <span slot="parent-label">Photos &amp; Drawings</span>
                <input slot="parent-right" type="checkbox" :disabled="!mapEnabled" v-model="secondaryLayersEnabled" ref="secondaryLayersEnabled">
                <ul slot="contents">
                    <collapsible-list-item v-for="layer in secondaryLayers" key="layer.url">
                        <span slot="parent-label">{{ layer.label }}</span>
                        <input slot="parent-right" type="checkbox" :disabled="!mapEnabled" :checked="layer.opacity > 0" @change="handleCheckboxChange($event, layer)">
                    </collapsible-list-item>
                </ul>
            </collapsible-list-item>
        </ul>
    </collapsible-list-item>

</template>
<script>

import {

    TOGGLE_INFORMATION_VISIBILITY,
    TOGGLE_MAP_ENABLED,
    SET_LAYER_OPACITY,
    SET_FEATURE_SETS_ENABLED,

} from '../state/mutations'

import CollapsibleListItem from './collapsible-list-item.vue'

const ProposalListItem = {

    name: 'proposal-list-item',
    components: { CollapsibleListItem },
    props: [ 'map' ],
    computed: {

        mapEnabled() { return this.$store.getters.isMapEnabled(this.map) },
        informationVisible() { return this.$store.getters.isInformationVisibleForMap(this.map) },
        primaryLayers() { return this.$store.getters.primaryLayers(this.map) },
        secondaryLayers() { return this.$store.getters.secondaryLayers(this.map) },
        secondaryLayersEnabled: {

            get() {
                
                let enabled = false
                let indeterminate = false

                for (var i = 0; i < this.secondaryLayers.length; i++) {
                    if (this.$store.getters.layerOpacity(this.secondaryLayers[i].id)) enabled = true
                    else indeterminate = true
                }

                const ref = this.$refs.secondaryLayersEnabled
                if (ref) ref.indeterminate = enabled && indeterminate
                return enabled

            },

            set(checked) {
                
                this.$store.getters.secondaryLayers(this.map).forEach(layer => this.setOpacity({
                    ...layer,
                    opacity: (checked ? 1 : 0),
                }))

            }

        }

    },

    methods: {

        toggleInformationVisibility() { this.$store.commit(TOGGLE_INFORMATION_VISIBILITY, this.map) },
        toggleMapEnabled() { this.$store.commit(TOGGLE_MAP_ENABLED, this.map) },
        setOpacity(layer) { this.$store.commit(SET_LAYER_OPACITY, layer) },
        handleRangeChange(event, layer) {
            
            this.setOpacity({ ...layer, opacity: event.target.valueAsNumber })
        
        },

        handleCheckboxChange(event, layer) {

            const checked = event.target.checked
            if (checked && layer.opacity === 0) this.setOpacity({ ...layer, opacity: 1 }) 
            if (!checked && layer.opacity !== 0) this.setOpacity({ ...layer, opacity: 0 })

        },

    },

}

export default ProposalListItem

</script>
<style lang="sass">

@import '../../../styles/variables';

.collapsible-list-item.proposal-list-item {

    font-size: .9em;
    margin-top: .5em;
    margin-bottom: .5em;

    .proposal-list-item-label {
        font-weight: bold;
    }

    .proposal-list-item-narrative-button {
        
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
