<template>
    
    <div class="collapsible-container">
        <h2 @click="toggleCollapsed" :class="{ collapsed }">{{ title }}</h2>
        <main v-show="!collapsed">
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
<style lang="sass">

@import '../../styles/variables';

.collapsible-container {

    margin-bottom: 1em;
    padding: 0 .5em;
    background-color: $light-grey;

    h2 {

        position: relative;
        width: 100%;
        margin-bottom: .2rem;
        padding: .5rem 3rem .5rem .5rem;
        font-size: 1.1em;
        text-transform: lowercase;
        cursor: pointer;

        &::after {
            content: '(–)';
            display: block;
            position: absolute;
            top: 50%;
            right: .5rem;
            transform: translateY(-50%);
        }

        &.collapsed {

            font-size: .9em;

            &::after {
                content: '(+)';
            }

        }

    }

    main {
        padding: .5rem .5rem;
        border-top: 1px solid $medium-light-grey;
    }

}

</style>