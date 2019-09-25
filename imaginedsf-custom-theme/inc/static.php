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

	// Webpack JS bundle JS.
	$theme_script_path = '/static/script.js';
	wp_enqueue_script(
		'theme_script',
		get_template_directory_uri() . $theme_script_path,
		array(),
		filemtime( get_stylesheet_directory() . $theme_script_path ),
		true
	);

	// Webpack-bundled Bulma CSS.
	$bulma_path = '/static/bulma.min.css';
	wp_enqueue_style(
		'bulma',
		get_template_directory_uri() . $bulma_path,
		array(),
		filemtime( get_stylesheet_directory() . $bulma_path )
	);

	// Webpack-bundled Leaflet CSS.
	$leaflet_css_path = '/static/leaflet.css';
	wp_enqueue_style(
		'leaflet_css',
		get_template_directory_uri() . $leaflet_css_path,
		array(),
		filemtime( get_stylesheet_directory() . $leaflet_css_path )
	);

	// Remote Google Fonts.
	wp_enqueue_style(
		'google_fonts',
		'https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,700,700i&display=swap',
		array(),
		1
	);

}

add_action( 'wp_enqueue_scripts', 'isf_enqueue_static_assets' );
