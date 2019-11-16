<?php
/**
 * Applies additional filtering to ACF Relationship fields to ensure
 * that every map and map group is the child of a maximum of one
 * parent.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Returns array of maps and map groups that already in use elsewhere.
 * Returned key is the ID and value is a string used for validation
 * errors.
 *
 * @param int $current_post_id The ID of the current post for which
 *            we're filtering the possible children of.  Children
 *            of this post. will not be returned.
 */
function isf_get_children_of_others( $current_post_id ) {

	$used = array( $current_post_id => 'as current post.' );

	// Get permanent basemap.
	if ( PERMANENT_BASEMAP_OPTIONS !== $current_post_id ) {
		$permanent_basemap_id = get_field( 'permanent_basemap', PERMANENT_BASEMAP_OPTIONS );
		if ( $permanent_basemap_id ) {
			$used[ $permanent_basemap_id ] = 'as permanent basemap.';
		}
	}

	// Get other basemaps.
	if ( BASEMAPS_OPTIONS !== $current_post_id ) {
		foreach ( get_field( 'basemaps', BASEMAPS_OPTIONS ) as $basemap_id ) {
			$used[ $basemap_id ] = 'as basemap.';
		}
	}

	// Get children of map groups.
	$map_groups_query = new WP_Query(
		array(
			'post_type'      => MAP_GROUP_POST_TYPE,
			'post_status'    => 'publish',
			'post__not_in'   => array( $current_post_id ),
			'posts_per_page' => -1,
		)
	);

	foreach ( $map_groups_query->get_posts() as $map_group ) {
		foreach ( get_field( 'children', $map_group ) as $map_group_child_id ) {
			$used[ $map_group_child_id ] = 'in map group "' . $map_group->post_title . '."';
		}
	}

	// Get children of proposal eras.
	$proposal_eras_query = new WP_Query(
		array(
			'post_type'      => PROPOSAL_ERA_POST_TYPE,
			'post_status'    => 'publish',
			'post__not_in'   => array( $current_post_id ),
			'posts_per_page' => -1,
		)
	);

	foreach ( $proposal_eras_query->get_posts() as $proposal_era ) {
		foreach ( get_field( 'children', $proposal_era ) as $proposal_era_child_id ) {
			$used[ $proposal_era_child_id ] = 'in proposal era "' . $proposal_era->post_title . '."';
		}
	}

	return $used;

}


/**
 * Filters options listed for a field.
 *
 * @param array $args The existing query arguments.
 * @param array $field The field parameters.
 * @param int   $post_id The post of the currently-edited post.
 */
function isf_filter_relationship_query( $args, $field, $post_id ) {
	$args['post__not_in'] = array_keys( isf_get_children_of_others( $post_id ) );
	return $args;
}


/**
 * Validates posted value for a field.
 *
 * @param bool|string $valid Bool of whether the field value is valid.
 * @param array|int   $value The value of the field.
 */
function isf_validate_relationship_value( $valid, $value ) {
	if ( ! $valid ) {
		return $valid;
	}

	if ( ! is_array( $value ) ) {
		$value = array( $value );
	}

	$post_id = null;
	if ( isset( $_POST['_acf_post_id'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$post_id = sanitize_text_field( wp_unslash( $_POST['_acf_post_id'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
	}

	$children_of_others = isf_get_children_of_others( $post_id );
	foreach ( $value as $child_id ) {
		if ( isset( $children_of_others[ $child_id ] ) ) {
			$valid = (
				'"'
				. get_post( $child_id )->post_title
				. '" is already used '
				. $children_of_others[ $child_id ]
			);
		}
	}

	return $valid;
}


/*
* Filters and validates results for the permanent basemap.
*/

define( 'PERMANENT_BASEMAP_FIELD_KEY', 'field_5dd066988f832' );
add_action(
	'acf/fields/post_object/query/key=' . PERMANENT_BASEMAP_FIELD_KEY,
	'isf_filter_relationship_query',
	10,
	3
);

add_filter(
	'acf/validate_value/key=' . PERMANENT_BASEMAP_FIELD_KEY,
	'isf_validate_relationship_value',
	10,
	2
);


/*
* Filters and validates results for basemaps.
*/

define( 'BASEMAPS_FIELD_KEY', 'field_5d5c3f5f89bdf' );
add_action(
	'acf/fields/relationship/query/key=' . BASEMAPS_FIELD_KEY,
	'isf_filter_relationship_query',
	10,
	3
);

add_filter(
	'acf/validate_value/key=' . BASEMAPS_FIELD_KEY,
	'isf_validate_relationship_value',
	10,
	2
);


/*
* Filters and validates results for children of proposal eras.
*/

define( 'MAP_GROUP_CHILDREN_FIELD_KEY', 'field_5d71879a72a8b' );
add_action(
	'acf/fields/relationship/query/key=' . MAP_GROUP_CHILDREN_FIELD_KEY,
	'isf_filter_relationship_query',
	10,
	3
);

add_filter(
	'acf/validate_value/key=' . MAP_GROUP_CHILDREN_FIELD_KEY,
	'isf_validate_relationship_value',
	10,
	2
);


/*
* Filters and validates results for children of proposal eras.
*/

define( 'PROPOSAL_ERA_CHILDREN_FIELD_KEY', 'field_5dcdebc6896e7' );
add_action(
	'acf/fields/relationship/query/key=' . PROPOSAL_ERA_CHILDREN_FIELD_KEY,
	'isf_filter_relationship_query',
	10,
	3
);

add_filter(
	'acf/validate_value/key=' . PROPOSAL_ERA_CHILDREN_FIELD_KEY,
	'isf_validate_relationship_value',
	10,
	2
);
