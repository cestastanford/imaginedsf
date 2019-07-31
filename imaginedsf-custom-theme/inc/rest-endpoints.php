<?php

/*
*   Adds endpoint for retrieving Homepage demo slideshow images.
*/

function get_demo_images() {

    $page = get_page_by_path( HOMEPAGE_SLUG );
    $images = get_field( 'demo_slideshow_images', $page->ID );
    return $images;

}

function register_demo_images_endpoint() {

    register_rest_route( 'imaginedsf', '/demo-images', array(

        'methods' => 'GET',
        'callback' => 'get_demo_images',

    ) );

}

add_action( 'rest_api_init', 'register_demo_images_endpoint' );


/*
*   Adds endpoint for retrieving Map Layer posts.
*/

function get_map_layers() {

    $map_layers = get_posts( array(

        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'post_type' => MAP_LAYER_POST_TYPE,

    ) );

    foreach ( $map_layers as $map_layer ) {

        $map_layer->fields = get_fields( $map_layer );

    }

    return $map_layers;

}

function register_map_layer_endpoint() {

    register_rest_route( 'imaginedsf', '/map-layers', array(

        'methods' => 'GET',
        'callback' => 'get_map_layers',

    ) );

}

add_action( 'rest_api_init', 'register_map_layer_endpoint' );


/*
*   Adds endpoint for retrieving JSON vector layer data for a Map
*   Layer post.
*/

function get_map_layer_json( $request ) {

    $layer_id = $request['layer_id'];

    //  Check for correct layer type
    $layer_type = get_field( 'source_type', $layer_id );
    if ( $layer_type !== 'wfs_geojson' ) {

        return array(
            'error' => 'Layer of type WFS/GeoJSON not found for id',
            'layer_id' => $layer_id,
        );

    }

    //  Compose WFS request URL
    $wfs_base_url = get_field( 'wfs_base_url', $layer_id );
    $wfs_typenames = get_field( 'wfs_typenames', $layer_id );
    $wfs_query_string = '?service=wfs&version=2.0.0&request=GetFeature&outputFormat=application/json&typeNames=' . $wfs_typenames;
    $url = $wfs_base_url . $wfs_query_string;

    //  Request WFS payload
    $response = @file_get_contents( $url );
    if ( $response ) {

        return json_decode( $response );

    } else {

        return array(
            'error' => 'Request failed!',
            'layer_id' => $layer_id,
            'url' => $url,
        );

    }

}

function register_map_layer_json_endpoint() {

    register_rest_route( 'imaginedsf', '/map-layer-json', array(

        'methods' => 'GET',
        'callback' => 'get_map_layer_json',

    ) );

}

add_action( 'rest_api_init', 'register_map_layer_json_endpoint' );


/*
*   Adds endpoint for retrieving Map posts.
*/

function get_maps() {

    $maps = get_posts( array(

        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'post_type' => MAP_POST_TYPE,

    ) );

    foreach ( $maps as $map ) {

        $map->fields = get_fields( $map );

    }

    return $maps;

}

function register_map_endpoint() {

    register_rest_route( 'imaginedsf', '/maps', array(

        'methods' => 'GET',
        'callback' => 'get_maps',

    ) );

}

add_action( 'rest_api_init', 'register_map_endpoint' );


/*
*   Adds endpoint for retrieving geocoded address, using MapQuest API.
*/

function geocode_address() {

    $api_key = @file_get_contents( dirname( __FILE__ ) . '/mapquest-api-key' );
    $url = 'http://www.mapquestapi.com/geocoding/v1/address';
    $url .= '?key=' . $api_key;
    $url .= '&location=' . urlencode( $_GET['address'] );
    $url .= '&maxResults=' . '1';

    $response = @file_get_contents( $url );

    if ( $response ) {

        return json_decode( $response );

    } else return array(

        'error' => 'Request failed!',
        'request_url' => $url,
        'client_parameters' => $_GET,

    );

}

function register_geocode_address_endpoint() {

    register_rest_route( 'imaginedsf', '/geocode', array(

        'methods' => 'GET',
        'callback' => 'geocode_address',

    ) );

}

add_action( 'rest_api_init', 'register_geocode_address_endpoint' );
