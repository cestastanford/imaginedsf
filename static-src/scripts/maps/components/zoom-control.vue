<template>

    <div class="zoom-control">
        <a class="zoom-control-button plus" @click="zoomIn">+</a>
        <a class="zoom-control-button minus" @click="zoomOut">–</a>
    </div>

</template>
<script>

/*
*   Configures and exports component.
*/

const ZoomControl = {

    name: 'zoom-control',
    props: [ 'map' ],
    methods: {
        zoomIn() { this.map.zoomIn() },
        zoomOut() { this.map.zoomOut() },
    }

}

export default ZoomControl

</script>
<style lang="sass">

@import '../../../styles/variables';

.zoom-control {
    
    width: 2em;

    .zoom-control-button {
        
        display: block;
        text-align: center;
        font-size: 1.25em;
        line-height: 1.5em;
        color: $medium-grey;
        transition: background-color .2s, color .2s;

        &:not(:last-child) {
            border-bottom: 1px solid $medium-light-grey;
        }

        &:hover {
            background-color: $medium-light-grey;
            color: $white;
        }

    }

}

</style>