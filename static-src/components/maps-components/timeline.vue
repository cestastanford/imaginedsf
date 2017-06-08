<template>

    <collapsible-container class="timeline" title="Timeline">
        <div class="intro-text">Drag the timeline handles to show only maps from the selected date range.</div>
        <div class="slider" ref="slider"></div>
    </collapsible-container>

</template>
<script>

import CollapsibleContainer from './collapsible-container.vue'
import { SET_MAP_DATES } from '../maps.js'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import throttle from 'lodash.throttle'

function createSlider(slider, dates) {
    
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)
    noUiSlider.create(slider, {

        range: { 'min': minDate, 'max': maxDate },
        start: [ minDate, maxDate ],
        step: 1,
        connect: true,
        behaviour: 'tap-drag',
        format: { to: value => '' + value, from: value => +value },
        tooltips: true,
        pips: {
            mode: 'values',
            values: dates,
            density: 4,
            stepped: true,
        },

    })

    return { minDate, maxDate }

}

const Timeline = {

    name: 'map-canvas',
    components: {
        CollapsibleContainer,
    },
    props: [ 'mapDates' ],
    mounted() {

        let untouched = true
        const { minDate, maxDate } = createSlider(this.$refs.slider, this.mapDates)
        this.$refs.slider.noUiSlider.on('update', throttle(values => {

            if (untouched) {
                if (+values[0] !== minDate || +values[1] !== maxDate) untouched = false
            }

            if (!untouched) this.$store.commit(SET_MAP_DATES, values)

        }, 250))

    },
}

export default Timeline

</script>
<style lang="sass">

@import '../../styles/variables';

.timeline {

    margin: 1em 0 0 0;
    padding: 0;

    .intro-text {
        font-size: .85em;
        font-weight: bold;
        font-style: italic;
    }

    .slider {
        
        margin: 4em 1.5em 2.5em 1.5em;
        font-size: .85em;

        .noUi-value-horizontal {
            top: 1.25em;
        }

        .noUi-handle {
            outline: none;
        }

    }

}

</style>
