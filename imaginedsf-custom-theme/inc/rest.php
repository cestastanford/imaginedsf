<?php
/**
 * Describes and extends the REST API for the site.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Retrieves content for a content area.
 */
function isf_get_content_area_content() {

	$content_area_content = array();
	foreach ( CONTENT_AREAS as $content_area ) {
		$content_area_content[ $content_area ] = get_field( $content_area, CONTENT_AREAS_OPTIONS );
	}

	return $content_area_content;

}


/**
 * Retrieves all published posts of a post type, with ACF fields.
 *
 * @param string $post_type The post type constant.
 */
function isf_get_all_published_posts( $post_type ) {

	$args = array(
		'post_type'      => $post_type,
		'posts_per_page' => -1,
	);

	$query             = new WP_Query( $args );
	$posts             = $query->get_posts();
	$posts_with_fields = array_map(
		function( $post ) {
			$post_array           = $post->to_array();
			$post_array['fields'] = get_fields( $post->ID );
			return $post_array;
		},
		$posts
	);

	return $posts_with_fields;

}


/**
 * Retrieves all CMS content for the front-end application.
 */
function isf_get_all_content() {
	return array(
		'content_area_content' => isf_get_content_area_content(),
		'maps'                 => isf_get_all_published_posts( MAP_POST_TYPE ),
		'map_groups'           => isf_get_all_published_posts( MAP_GROUP_POST_TYPE ),
		'narratives'           => isf_get_all_published_posts( NARRATIVE_POST_TYPE ),
		'proposal_ranges'      => get_field( 'proposal_ranges', PROPOSAL_RANGES_OPTIONS ),
		'basemaps'             => get_field( 'basemaps', BASEMAPS_OPTIONS ),
	);
}


/**
 * Adds endpoint to retrieve all CMS content.
 */
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'imaginedsf',
			'/content',
			array(
				'methods'  => 'GET',
				'callback' => 'isf_get_all_content',
			)
		);
	}
);


/**
 * Parses body and saves it as a new Feedback post.
 *
 * @param WP_REST_Request $request The POST request.
 */
function isf_handle_feedback_submission( $request ) {
	$message = $request->get_json_params()['message'];
	isf_save_feedback( $message );
}


/**
 * Adds endpoint to accept feedback.
 */
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'imaginedsf',
			'/feedback',
			array(
				'methods'  => 'POST',
				'callback' => 'isf_handle_feedback_submission',
			)
		);
	}
);
