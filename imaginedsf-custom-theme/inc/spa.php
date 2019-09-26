<?php
/**
 * Returns the SPA template for all page requests except those starting
 * with "wp-".
 *
 * @package Imagined San Francisco Custom Theme
 */

// Disables returning 404s and rewriting URL to match existing WP
// objects for paths not matching WordPress paths.
remove_filter( 'remplate_redirect', 'redirect_canonical' );
add_filter(
	'template_redirect',
	function() {
		global $wp_query;
		status_header( 200 );
		$wp_query->is_404 = false;
	},
	0
);


// Returns the `index.php` template.
add_action(
	'template_include',
	function() {
		$url_path = wp_parse_url( add_query_arg( array() ), PHP_URL_PATH );
		if ( ! preg_match( '/wp-/', $url_path ) ) {
			locate_template( 'index.php', true );
		}
	}
);
