<template>

    <li class="collapsible-list-item">
        <div class="collapsible-list-item-parent">
            <a class="collapsible-list-item-parent-left" @click="collapsed = !collapsed" v-if="collapsible">
                <div class="collapsible-list-item-disclosure-triangle" v-if="collapsible">
                    <i class="fa fa-caret-right" v-if="collapsed"></i>
                    <i class="fa fa-caret-down" v-if="!collapsed"></i>
                </div>
                <slot name="parent-label"></slot>
            </a>
            <span class="collapsible-list-item-parent-left" v-if="!collapsible">
                <slot name="parent-label"></slot>
            </span>
            <div class="collapsible-list-item-parent-right">
                <slot name="parent-right"></slot>
            </div>
        </div>
        <div class="collapsible-list-item-contents" v-if="collapsible && !collapsed">
            <slot name="contents"></slot>
        </div>
    </li>

</template>
<script>

const CollapsibleListItem = {

    name: 'collapsible-list-item',
    props: [ 'collapsible' ],
    data: () => ({ collapsed: true }),

}

export default CollapsibleListItem

</script>
<style lang="sass">

.collapsible-list-item {

    margin-top: .25em;

    .collapsible-list-item-parent {

        position: relative;

        .collapsible-list-item-parent-left {
            
            display: block;
            position: relative;
            padding-left: 1.25em;
            padding-right: 10em;
            transition: color .25s;

            .collapsible-list-item-disclosure-triangle {
                position: absolute;
                top: .25em;
                left: 0;
            }

        }

        .collapsible-list-item-parent-right {
            
            position: absolute;
            top: 42.5%;
            right: 0;
            transform: translateY(-50%);

            > * {
                display: inline-block;
                text-align: right;
                margin-left: .5em;
                vertical-align: middle;
            }

        }

    }

    .collapsible-list-item-contents {
        margin-top: .25em;
        margin-bottom: 1em;
        margin-left: 1em;
    }

}

</style>
