<template>

    <collapsible-list-item :collapsible="true" class="proposal-list-item">
        <span slot="parent-label" class="proposal-list-item-label">{{ map.title }}</span>
        <a slot="parent-right" class="proposal-list-item-narrative-button" :class="{ active: narrativeVisible }" @click="toggleNarrative">𝒊</a>
        <input slot="parent-right" type="checkbox" :checked="mapEnabled" @click="toggleMapEnabled">
        <ul slot="contents" class="proposal-list-item-contents">
            <collapsible-list-item v-for="layer in [ rasterLayer, vectorLayer ]" v-if="layer" key="layer.url">
                <span slot="parent-label">{{ layer.name }}</span>
                <input slot="parent-right" type="range" min="0" max="1" step="0.01" :disabled="!mapEnabled" :value="layer.opacity" @change="handleRangeChange($event, layer)">
                <input slot="parent-right" type="checkbox" :disabled="!mapEnabled" :checked="layer.opacity > 0" @change="handleCheckboxChange($event, layer)">
            </collapsible-list-item>
            <collapsible-list-item :collapsible="true" v-if="featureSets.length">
                <span slot="parent-label">Photos &amp; Drawings</span>
                <input slot="parent-right" type="checkbox" :disabled="!mapEnabled" v-model="featureSetsEnabled">
                <ul slot="contents">
                    <collapsible-list-item v-for="layer in featureSets" key="layer.url">
                        <span slot="parent-label">{{ layer.name }}</span>
                        <input slot="parent-right" type="checkbox" :disabled="!mapEnabled || !featureSetsEnabled" :checked="layer.opacity > 0" @change="handleCheckboxChange($event, layer)">
                    </collapsible-list-item>
                </ul>
            </collapsible-list-item>
        </ul>
    </collapsible-list-item>

</template>
<script>

import {

    TOGGLE_NARRATIVE,
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
        narrativeVisible() { return this.$store.getters.isNarrativeVisible(this.map) },
        rasterLayer() { return this.$store.getters.rasterLayer(this.map) },
        vectorLayer() { return this.$store.getters.vectorLayer(this.map) },
        featureSets() { return this.$store.getters.featureSets(this.map) },
        featureSetsEnabled: {

            get() { return this.$store.getters.featureSetsEnabled(this.map) },
            set(checked) {
                
                this.$store.commit(SET_FEATURE_SETS_ENABLED, {

                    map: this.map,
                    enabled: checked,

                })

            }

        }

    },

    methods: {

        toggleNarrative() { this.$store.commit(TOGGLE_NARRATIVE, this.map) },
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
        width: 5em;
        margin-right: .1em;
    }

}

</style>
