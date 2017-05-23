<!-- Vue component template for the top-level <maps> component. -->
<template>
    
    <div class="container">
        <div class="columns">
            <div class="column is-narrow">
                <proposal-list></proposal-list>
            </div>
            <div class="column"></div>
        </div>
    </div>

</template>

<!-- Vue component script for the top-level <maps> component. -->
<script>

/*
*   Imports subcomponents.
*/

import ProposalList from './maps-proposal-list.vue'


/*
*   Downloads all map data from the REST API.
*/

const REQUEST_URL = '/wp-json/imaginedsf/maps'
let proposalMaps = []
let basemaps = []

const requestMaps = async () => {

    const response = await fetch(REQUEST_URL)
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`, response)
    }

    const responseBody = await response.json()
    responseBody.forEach(responseBodyObject => {

        const map = {
            id: responseBodyObject.ID,
            title: responseBodyObject.post_title,
            ...responseBodyObject.fields,
        }

        if (map.map_type === 'proposal') proposalMaps.push(map)
        else basemaps.push(map)

    })

    proposalMaps.forEach(proposalMap => {

        if (proposalMap.linked_basemap) {

            const linkedBasemap = basemaps.filter(basemap => {
                
                return basemap.id === proposalMap.linked_basemap
            
            })[0]
            proposalMap.linked_basemap = linkedBasemap

        }

    })

}


/*
*   Assembles and exports the component.
*/

const Component = {

    name: 'maps',
    data: () => ({ proposalMaps, basemaps }),
    mounted: requestMaps,
    components: {
        ProposalList,
    },


}

export default Component

</script>
