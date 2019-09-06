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
			'page_title'      => 'Proposal Ranges',
			'icon_url'        => 'dashicons-menu-alt',
			'position'        => '27.1',
			'update_button'   => 'Update Proposal Ranges',
			'updated_message' => 'Proposal ranges updated.',
			'post_id'         => PROPOSAL_RANGES_OPTIONS,
		)
	);

	acf_add_options_page(
		array(
			'page_title'      => 'Basemaps',
			'icon_url'        => 'dashicons-images-alt',
			'position'        => '27.2',
			'update_button'   => 'Update Basemaps',
			'updated_message' => 'Basemaps updated.',
			'post_id'         => BASEMAPS_OPTIONS,
		)
	);

}
