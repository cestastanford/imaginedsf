<template>
    
    <div class="collapsible-container">
        <h2 @click="toggleCollapsed" :class="{ collapsed }">{{ title }}</h2>
        <main v-if="!collapsed">
            <slot></slot>
        </main>
    </div>

</template>
<script>

/*
*   Configures and exports component.
*/

const CollapsibleContainer = {

    name: 'collapsible-container',
    data: () => ({ collapsed: false }),
    methods: {
        toggleCollapsed() { this.collapsed = !this.collapsed },
    },
    props: [ 'title' ],

}

export default CollapsibleContainer

</script>
