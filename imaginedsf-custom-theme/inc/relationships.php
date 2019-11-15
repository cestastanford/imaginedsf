<?php
/**
 * Applies additional filtering to ACF Relationship fields to ensure
 * that every map and map group is the child of a maximum of one
 * parent.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Returns array of IDs of maps and map groups that already in use
 * elsewhere.
 *
 * @param bool $current_permanent_basemap Whether currently filtering
 *             for the permanent basemap, in which case the existing
 *             permanent basemap will not be returned.
 * @param bool $current_basemaps Whether currently filtering for
 *             basemaps, in which case the current basemaps will
 *             not be returned.
 * @param int  $current_map_group The current map group for which
 *             we're currently filtering the possible children of.
 *             If set, children of this map group will not be returned.
 * @param int  $current_proposal_era The current proposal era for
 *             which we're currently filtering the possible children
 *             of. If set, children of this proposal era will not
 *             be returned.
 */
function isf_get_children_of_others(
	$current_permanent_basemap = false,
	$current_basemaps = false,
	$current_map_group = null,
	$current_proposal_era = null
) {

	$ids = array();

	// Get permanent basemap.
	if ( ! $current_permanent_basemap ) {
		$permanent_basemap_id = get_field( 'permanent_basemap', BASEMAPS_OPTIONS );
		if ( $permanent_basemap_id && $permanent_basemap_id !== $current_parent_id ) {
			$ids[] = $permanent_basemap_id;
		}
	}

	// Get other basemaps.
	if ( ! $current_basemaps ) {
		$ids = array_merge( $ids, get_field( 'basemaps', BASEMAPS_OPTIONS ) );
	}

	// Get children of map groups.
	$map_groups_query = new WP_Query(
		array(
			'post_type'      => MAP_GROUP_POST_TYPE,
			'post_status'    => 'publish',
			'post__not_in'   => array( $current_map_group ),
			'posts_per_page' => -1,
		)
	);

	foreach ( $map_groups_query->get_posts() as $map_group ) {
		$ids = array_merge( $ids, get_field( 'children', $map_group ) );
	}

	// Get children of proposal eras.
	$proposal_eras_query = new WP_Query(
		array(
			'post_type'      => PROPOSAL_ERA_POST_TYPE,
			'post_status'    => 'publish',
			'post__not_in'   => array( $current_proposal_era ),
			'posts_per_page' => -1,
		)
	);

	foreach ( $proposal_eras_query->get_posts() as $proposal_era ) {
		$ids = array_merge( $ids, get_field( 'children', $proposal_era ) );
	}

	return $ids;

}


// Filters results for the permanent basemap.
define( 'PERMANENT_BASEMAP_FIELD_KEY', 'field_5dc5e989339ad' );
add_action(
	'acf/fields/post_object/query/key=' . PERMANENT_BASEMAP_FIELD_KEY,
	function( $args ) {
		$args['post__not_in'] = isf_get_children_of_others( true, false, null, null );
		$args['post_status']  = 'publish';
		return $args;
	},
	10,
	3
);


// Filters results for basemaps.
define( 'BASEMAPS_FIELD_KEY', 'field_5d5c3f5f89bdf' );
add_action(
	'acf/fields/relationship/query/key=' . BASEMAPS_FIELD_KEY,
	function( $args ) {
		$args['post__not_in'] = isf_get_children_of_others( false, true, null, null );
		$args['post_status']  = 'publish';
		return $args;
	},
	10,
	3
);


// Filters results for children of proposal eras.
define( 'MAP_GROUP_CHILDREN_FIELD_KEY', 'field_5d71879a72a8b' );
add_action(
	'acf/fields/relationship/query/key=' . MAP_GROUP_CHILDREN_FIELD_KEY,
	function( $args, $field, $post_id ) {
		$args['post__not_in'] = isf_get_children_of_others( false, false, $post_id, null );
		$args['post_status']  = 'publish';
		return $args;
	},
	10,
	3
);


// Filters results for children of proposal eras.
define( 'PROPOSAL_ERA_CHILDREN_FIELD_KEY', 'field_5dcdebc6896e7' );
add_action(
	'acf/fields/relationship/query/key=' . PROPOSAL_ERA_CHILDREN_FIELD_KEY,
	function( $args, $field, $post_id ) {
		$args['post__not_in'] = isf_get_children_of_others( false, false, null, $post_id );
		$args['post_status']  = 'publish';
		return $args;
	},
	10,
	3
);
