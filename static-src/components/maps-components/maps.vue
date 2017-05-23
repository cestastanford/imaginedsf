<!-- Vue component template for the top-level <maps> component. -->
<template>
    
    <div class="container">
        <div class="columns">
            <div class="column is-narrow"></div>
            <div class="column"></div>
        </div>
    </div>

</template>

<!-- Vue component script for the top-level <maps> component. -->
<script>

/*
*   Assembles and exports the component.
*/

import { REQUEST_MAPS } from '../maps.js'

const Component = {

    name: 'maps',
    components: {},
    mounted() {
        this.$store.dispatch(REQUEST_MAPS)
    }

}

export default Component

</script>
