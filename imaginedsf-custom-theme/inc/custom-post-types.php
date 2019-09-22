<?php
/**
 * Defines custom post types and performs other misc CMS configuration.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Removes unused post type menu options.
 */
function isf_remove_unused_menu_options() {

	remove_menu_page( 'edit.php' ); // Removes Posts.
	remove_menu_page( 'edit.php?post_type=page' ); // Removes Pages.
	remove_menu_page( 'edit-comments.php' ); // Removes Comments.

}

add_action( 'admin_menu', 'isf_remove_unused_menu_options' );


/**
 * Adds custom post types.
 */
function isf_create_custom_post_types() {

	// Maps.
	register_post_type(
		MAP_POST_TYPE,
		array(
			'labels'       => array(
				'name'                  => 'Maps',
				'singular_name'         => 'Map',
				'add_new'               => 'Add New',
				'add_new_item'          => 'Add New Map',
				'edit_item'             => 'Edit Map',
				'new_item'              => 'New Map',
				'view_item'             => 'View Map',
				'view_items'            => 'View Maps',
				'search_items'          => 'Search Maps',
				'not_found'             => 'No Maps Found',
				'not_found_in_trash'    => 'No Maps found in Trash',
				'all_items'             => 'All Maps',
				'archives'              => 'Map Archives',
				'attributes'            => 'Map Attributes',
				'insert_into_item'      => 'Insert into Map',
				'uploaded_to_this_item' => 'Uploaded to this Map',
			),
			'public'       => true,
			'menu_icon'    => 'dashicons-location-alt',
			'supports'     => array( 'title' ),
			'show_in_rest' => true,
			'rest_base'    => 'maps',
		)
	);

	// Map Groups.
	register_post_type(
		MAP_GROUP_POST_TYPE,
		array(
			'labels'    => array(
				'name'                  => 'Map Groups',
				'singular_name'         => 'Map Group',
				'add_new'               => 'Add New',
				'add_new_item'          => 'Add New Map Group',
				'edit_item'             => 'Edit Map Group',
				'new_item'              => 'New Map Group',
				'view_item'             => 'View Map Group',
				'view_items'            => 'View Map Groups',
				'search_items'          => 'Search Map Groups',
				'not_found'             => 'No Map Groups Found',
				'not_found_in_trash'    => 'No Map Groups found in Trash',
				'all_items'             => 'All Map Groups',
				'archives'              => 'Map Group Archives',
				'attributes'            => 'Map Group Attributes',
				'insert_into_item'      => 'Insert into Map Group',
				'uploaded_to_this_item' => 'Uploaded to this Map Group',
			),
			'public'    => true,
			'menu_icon' => 'dashicons-arrow-right',
			'supports'  => array( 'title' ),
		)
	);

	// Narratives.
	register_post_type(
		NARRATIVE_POST_TYPE,
		array(
			'labels'    => array(
				'name'                  => 'Narratives',
				'singular_name'         => 'Narrative',
				'add_new'               => 'Add New',
				'add_new_item'          => 'Add New Narrative',
				'edit_item'             => 'Edit Narrative',
				'new_item'              => 'New Narrative',
				'view_item'             => 'View Narrative',
				'view_items'            => 'View Narratives',
				'search_items'          => 'Search Narratives',
				'not_found'             => 'No Narratives Found',
				'not_found_in_trash'    => 'No Narratives found in Trash',
				'all_items'             => 'All Narratives',
				'archives'              => 'Narrative Archives',
				'attributes'            => 'Narrative Attributes',
				'insert_into_item'      => 'Insert into Narrative',
				'uploaded_to_this_item' => 'Uploaded to this Narrative',
			),
			'public'    => true,
			'menu_icon' => 'dashicons-book-alt',
			'rewrite'   => array( 'slug' => 'narratives' ),
		)
	);

	// Feedback.
	register_post_type(
		FEEDBACK_POST_TYPE,
		array(
			'labels'       => array(
				'name'                  => 'Feedback',
				'singular_name'         => 'Feedback',
				'add_new'               => 'Add New',
				'add_new_item'          => 'Add New Feedback',
				'edit_item'             => 'Feedback',
				'new_item'              => 'New Feedback',
				'view_item'             => 'View Feedback',
				'view_items'            => 'View Feedback',
				'search_items'          => 'Search Feedback',
				'not_found'             => 'No Feedback Found',
				'not_found_in_trash'    => 'No Feedback found in Trash',
				'all_items'             => 'All Feedback',
				'archives'              => 'Feedback Archives',
				'attributes'            => 'Feedback Attributes',
				'insert_into_item'      => 'Insert into Feedback',
				'uploaded_to_this_item' => 'Uploaded to this Feedback',
			),
			'public'       => true,
			'menu_icon'    => 'dashicons-testimonial',
			'supports'     => false,
			'map_meta_cap' => true,
			'capabilities' => array(
				'create_posts' => false,
			),
		)
	);

}

add_action( 'init', 'isf_create_custom_post_types' );
