<?php
/**
 * Loads Webpack bundle for front-end app.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Enqueues Webpack bundle.
 */
function isf_enqueue_static_assets() {

	$script_path = '/static/script.js';
	wp_enqueue_script(
		'theme_script',
		get_template_directory_uri() . $script_path,
		array(),
		filemtime( get_stylesheet_directory() . $script_path ),
		true
	);

}

add_action( 'wp_enqueue_scripts', 'isf_enqueue_static_assets' );
