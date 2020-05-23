<?php
/**
 * Adds support for additional upload MIME types.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Adds support for GeoJSON uploads.
 *
 * @param array $mimes The array of existing MIME types.
 */
function isf_add_geojson_upload_support( $mimes ) {
	$mimes['geojson'] = 'text/plain';
	$mimes['json']    = 'text/plain';
	return $mimes;
}

add_action( 'upload_mimes', 'isf_add_geojson_upload_support' );
