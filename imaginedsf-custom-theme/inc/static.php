<?php
/**
 * Loads Webpack bundle for front-end app and other static assets.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Enqueues Webpack bundle and other static assets.
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

	$normalize_css_path = '/static/normalize.css';
	wp_enqueue_style(
		'normalize.css',
		get_template_directory_uri() . $normalize_css_path,
		array(),
		filemtime( get_stylesheet_directory() . $normalize_css_path )
	);

	wp_enqueue_style(
		'google_fonts',
		'https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,700,700i&display=swap',
		array(),
		1
	);

}

add_action( 'wp_enqueue_scripts', 'isf_enqueue_static_assets' );
