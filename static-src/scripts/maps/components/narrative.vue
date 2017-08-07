<template>

    <article class="map-narrative">
        <header>
            <div class="section-title">
                <span class="narrative-button">𝒊</span>
                <span>Map Information</span>
            </div>
            <h1>{{ visibleNarrative.title }}</h1>
            <a class="narrative-set-view-button" v-if="visibleNarrative.linked_basemap" @click="setView">view with the "{{ linkedBasemapTitle }}" basemap</a>
        </header>
        <main v-html="visibleNarrative.information"></main>
    </article>

</template>
<script>

import { SET_MAP_VIEW } from '../state/mutations'

const Narrative = {

    name: 'narrative',
    props: [ 'visibleNarrative' ],
    computed: {
        
        linkedBasemapTitle() { return this.$store.getters.sourceMapFromID(this.visibleNarrative.linked_basemap).title },
    
    },

    methods: {

        setView() { this.$store.commit(SET_MAP_VIEW, this.visibleNarrative) },

    }

}

export default Narrative

</script>
<style lang="sass">

@import '../../../styles/variables';

.map-narrative {
    
    margin: 1em 0;
    padding: 1.5em;
    background-color: $light-grey;
    text-align: center;

    header {

        margin-bottom: 1.5em;

        .section-title {

            padding-bottom: .75em;
            font-size: 1.25em;
            font-weight: lighter;
            border-bottom: 1px solid $medium-light-grey;
            width: 15em;
            margin: 0 auto .75em auto;

            .narrative-button {
                display: inline-block;
                width: 25px;
                height: 25px;
                margin-right: .25em;
                border: 1px solid $medium-grey;
                border-radius: 25px;
                padding: 11px 2px 0px 0px;
                background-color: $white;
                font-size: 24px;
                font-family: serif;
                font-style: italic;
                font-weight: normal;
                line-height: 0;
                color: $medium-grey;
                box-shadow: 0 0 2px 0px $medium-grey, inset 0 0 2px 0px $medium-grey;
            }

        }

        h1 {
            font-size: 1.5em;
            font-weight: bold;
        }

        .narrative-set-view-button {
            font-size: .85em;
            font-style: italic;
            text-decoration: underline;
        }

    } 

}

</style>
