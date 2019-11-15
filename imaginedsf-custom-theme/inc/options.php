<?php
/**
 * Adds three ACF options pages.  Proposal Ranges and Basemaps
 * are added under the Maps menu item and Content Areas are added
 * under Pages.
 *
 * @package Imagined San Francisco Custom Theme
 */

if ( function_exists( 'acf_add_options_page' ) ) {

	acf_add_options_page(
		array(
			'page_title'      => 'Content Areas',
			'icon_url'        => 'dashicons-analytics',
			'position'        => '20.1',
			'update_button'   => 'Update Content Areas',
			'updated_message' => 'Content areas updated.',
			'post_id'         => CONTENT_AREAS_OPTIONS,
		)
	);

	acf_add_options_page(
		array(
			'page_title'      => 'Basemaps',
			'parent_slug'     => 'edit.php?post_type=isf_map',
			'update_button'   => 'Update Basemaps',
			'updated_message' => 'Basemaps updated.',
			'post_id'         => BASEMAPS_OPTIONS,
		)
	);

	acf_add_options_page(
		array(
			'page_title'      => 'Proposal Maps Introduction',
			'menu_title'      => 'Introduction',
			'parent_slug'     => 'edit.php?post_type=isf_proposal_era',
			'update_button'   => 'Update Introduction',
			'updated_message' => 'Introduction updated.',
			'post_id'         => PROPOSAL_MAPS_INTRO_OPTIONS,
		)
	);

	acf_add_options_page(
		array(
			'page_title'      => 'Narratives Table of Contents',
			'menu_title'      => 'Table of Contents',
			'parent_slug'     => 'edit.php?post_type=isf_narrative',
			'update_button'   => 'Update Table of Contents',
			'updated_message' => 'Table of Contents updated.',
			'post_id'         => NARRATIVES_TOC_OPTIONS,
		)
	);

}
