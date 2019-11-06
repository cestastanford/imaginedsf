<?php
/**
 * Returns the SPA template for all page requests except those starting
 * with "wp-".
 *
 * @package Imagined San Francisco Custom Theme
 */

// Redirects to HTTPS.
add_filter(
	'init',
	function() {
		$site_url_scheme = wp_parse_url( get_option( 'siteurl' ) )['scheme'];
		if ( 'https' === $site_url_scheme && ! is_ssl() ) {
			if ( isset( $_SERVER['HTTP_HOST'] ) && isset( $_SERVER['REQUEST_URI'] ) ) {
				// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
				$location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
				// phpcs:ignore WordPress.Security.SafeRedirect
				wp_redirect( $location, 301 );
				exit;
			}
		}
	}
);


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
