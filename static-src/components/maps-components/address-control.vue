<template>

    <div class="address-control">
        <a class="address-control-close" v-if="!collapsed" @click="collapsed = true">
            <i class="fa fa-times"></i>
        </a>
        <form class="address-control-input" v-if="!collapsed" @submit.prevent="updateAddress">
            <i class="fa fa-map-marker" v-if="!loading" :class="{ 'address-marker':addressMarker }"></i>
            <i v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i></i>
            <input type="text" v-model="addressInput" :placeholder="addressInputPlaceholder">
        </form>
        <a v-if="!collapsed" :class="{ located }" @click="locate">
            <i class="fa fa-location-arrow"></i>
        </a>
        <a v-if="collapsed" @click="collapsed = false">
            <i class="fa fa-map-marker"></i>
        </a>
    </div>

</template>
<script>

import { SET_ADDRESS } from '../maps.js'
import { BlueMarker } from './leaflet-components.js'

/*
*   Finds the user's current location.
*/

const locate = map => new Promise(resolve => {

    map.on('locationfound locationerror', e => resolve(e.latlng))
    map.locate()

})


/*
*   Validates an entered user address.
*/

const validateAddress = async input => {

    const address = input + ' San Francisco, CA, United States'
    const url = `/wp-json/imaginedsf/geocode?address=${encodeURIComponent(address)}`
    const response = await fetch(url)
    const parsedResponse = await response.json()
    const validatedAddress = parsedResponse.results[0].locations[0].street
    if (validatedAddress) return {

        validatedAddress,
        coordinates: parsedResponse.results[0].locations[0].latLng,

    }

}


/*
*   Creates the location marker.
*/

const getMarker = coordinates => new BlueMarker(coordinates)


/*
*   Configures and exports component.
*/

const AddressControl = {

    name: 'address-control',
    props: [ 'map' ],
    data: () => ({

        collapsed: false,
        addressInput: '',
        addressInputPlaceholder: 'search an address...',
        loading: false,
        located: false,
        addressMarker: null,

    }),
    
    methods: {

        async updateAddress() {

            if (this.addressMarker) {

                this.addressMarker.removeFrom(this.map)
                this.addressMarker = null

            }
            
            this.addressInputPlaceholder = 'search an address...'
            this.loading = true
            this.located = false

            if (this.addressInput) {

                const address = await validateAddress(this.addressInput)
                if (address) {

                    this.addressInput = address.validatedAddress
                    this.addressMarker = getMarker(address.coordinates)
                    this.addressMarker.addTo(this.map)
                    this.$store.commit(SET_ADDRESS, address.validatedAddress)

                } else {

                    this.addressInput = ''
                    this.addressInputPlaceholder = 'address not found'
                    this.$store.commit(SET_ADDRESS, null)

                }

            } else this.$store.commit(SET_ADDRESS, null)

            this.loading = false

        },

        async locate() {

            if (this.addressMarker) {

                this.addressMarker.removeFrom(this.map)
                this.addressMarker = null
                
            }

            this.addressInput = ''
            this.addressInputPlaceholder = 'locating...'
            this.loading = true
            this.located = false
            this.$store.commit(SET_ADDRESS, null)
            
            const coordinates = await locate(this.map)
            if (coordinates) {

                this.addressInput = ''
                this.addressInputPlaceholder = 'current location'
                this.addressMarker = getMarker(coordinates)
                this.addressMarker.addTo(this.map)
                this.located = true
            
            } else {

                console.warn('Geolocation failed!')
                this.addressInputPlaceholder = 'location unavailable'

            }

            this.loading = false

        }

    },

    mounted() {

        const unwatch = this.$store.watch(

            () => this.$store.getters.address,
            address => {

                if (address) {

                    this.addressInput = address
                    this.updateAddress()
                    unwatch()

                }

            },
            { immediate: true }

        )

    }

}

export default AddressControl

</script>
<style lang="sass">

@import '../../styles/variables';

.address-control {
    
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-width: 2em;

    > * {

        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5em;

        &:not(:last-child) {
            border-right: 1px solid $medium-light-grey;
        }

        &.address-control-close {
            
            font-size: .85em;

        }

        &.address-control-input {

            color: $medium-light-grey;

            i.fa {
                
                color: $medium-light-grey;
                width: 1.5em;
                font-size: 1.5em;
                line-height: 1;
                padding-right: .5em;
                padding-left: .2em;

            }

            i.fa.fa-map-marker.address-marker {
                color: $light-blue;
            }

            input {
                
                border: none;
                outline: none;
                background-color: transparent;
                color: $light-black;
                font-size: 1em;

                &::placeholder {
                    font-style: italic;
                    color: $medium-grey;
                }

            }
            
        }

    }

    .located .fa-location-arrow {
        color: $light-blue;
    }

    a {
        
        color: $medium-grey;
        transition: color .2s;
        
        &:hover {
            color: $red;
        }
    
    }

}

</style>