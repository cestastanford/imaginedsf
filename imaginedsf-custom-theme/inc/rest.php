<?php
/**
 * Describes and extends the REST API for the site.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Disables automatic rewrite matching to posts.
 */
remove_action( 'template_redirect', 'redirect_canonical' );


/**
 * Adds ACF fields to maps, map groups and narratives.
 */
function isf_register_rest_fields() {

	register_rest_field(
		array( MAP_POST_TYPE, MAP_GROUP_POST_TYPE, NARRATIVE_POST_TYPE ),
		'fields',
		array(
			'get_callback' => function( $post ) {
				return get_fields( $post['id'] );
			},
		)
	);

}

add_action( 'rest_api_init', 'isf_register_rest_fields' );


/**
 * Retrieves content for a content area.
 *
 * @param WP_REST_Request $request The request object.
 */
function isf_get_content_area_content( $request ) {

	$content_area = $request['content-area'];
	if ( in_array( $content_area, CONTENT_AREAS, true ) ) {
		return get_field( $content_area, CONTENT_AREAS_OPTIONS );
	} else {
		return array( 'error' => 'No matching content area found' );
	}

}


/**
 * Adds additional endpoints to retrieve content from Options pages.
 */
function isf_register_rest_endpoints() {

	register_rest_route(
		'imaginedsf',
		'/content-area-content',
		array(
			'methods'  => 'GET',
			'callback' => 'isf_get_content_area_content',
		)
	);

	register_rest_route(
		'imaginedsf',
		'/proposal-ranges',
		array(
			'methods'  => 'GET',
			'callback' => function( $request ) {
				return get_field(
					'proposal_ranges',
					PROPOSAL_RANGES_OPTIONS
				);
			},
		)
	);

	register_rest_route(
		'imaginedsf',
		'/basemaps',
		array(
			'methods'  => 'GET',
			'callback' => function( $request ) {
				return get_field(
					'basemaps',
					BASEMAPS_OPTIONS
				);
			},
		)
	);

}

add_action( 'rest_api_init', 'isf_register_rest_endpoints' );
