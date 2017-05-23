<!-- This is the Vue component for the top-level <maps> element. -->

<template>
    
    <div class="columns">
        <div class="column is-narrow">
            <proposal-list></proposal-list>
            <basemap-list></basemap-list>
            <vector-group-list></vector-group-list>
        </div>
        <div class="column grey-children">
            <map></map>
            <timeline></timeline>
            <information></information>
        </div>
    </div>

</template>

<script>

    const Component = { name: 'maps' }
    Component.data = () => ({ msg: 'hello!' })
    export default Component

</script>
