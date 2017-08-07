<template>

    <collapsible-list-item class="vector-feature-group-list-item" :collapsible="group.isParent">
        <span slot="parent-label" class="vector-feature-group-list-item-label">{{ group.label }}</span>
        <input slot="parent-right" type="checkbox" v-model="checkboxStatus" ref="checkbox">
        <ul slot="contents" class="vector-feature-group-list-item-contents" v-if="group.isParent">
            <vector-feature-group-list-item v-for="childGroup in group.children" :group="childGroup" :key="childGroup.label"></vector-feature-group-list-item>
        </ul>
    </collapsible-list-item>

</template>
<script>

import { SET_VECTOR_FEATURE_GROUP_STATUS } from '../state/mutations'
import CollapsibleListItem from './collapsible-list-item.vue'

const VectorFeatureGroupListItem = {

    name: 'vector-feature-group-list-item',
    components: { CollapsibleListItem },
    props: [ 'group' ],
    computed: {

        checkboxStatus: {

            get() {

                if (this.$refs.checkbox) this.$refs.checkbox.indeterminate = this.group.indeterminate
                return this.group.checked
            },

            set(checked) {

                this.$store.commit(SET_VECTOR_FEATURE_GROUP_STATUS, { group: this.group, checked })

            },

        },

    },

    mounted() {
        this.$refs.checkbox.indeterminate = this.group.indeterminate
    }

}

export default VectorFeatureGroupListItem

</script>
<style lang="sass">

@import '../../../styles/variables';

.collapsible-list-item.vector-feature-group-list-item {

    font-size: .9em;
    margin-top: .5em;
    margin-bottom: .5em;

    .vector-feature-group-list-item-label {
        margin-right: 2.5em;
    }

}

</style>
