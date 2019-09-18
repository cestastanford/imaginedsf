<?php
/**
 * Returns the SPA template for all page requests except those starting
 * with "wp-".
 *
 * @package Imagined San Francisco Custom Theme
 */

add_action(
	'init',
	function() {
		$url_path = wp_parse_url( add_query_arg( array() ), PHP_URL_PATH );
		if ( ! preg_match( '/wp-/', $url_path ) ) {
			locate_template( 'index.php', true );
			exit();
		}
	}
);
