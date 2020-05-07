<?php
/**
 * Downloads remote map bounds and prepares map bounds for REST response.
 *
 * @package Imagined San Francisco Custom Theme
 */

define( 'BOUNDS_FIELD_KEY', 'field_5eb4651f92d1c' );
define( 'HAS_BOUNDS_FIELD_KEY', 'field_5eb48c0efd8ad' );
define( 'RETRIEVE_FIELD_KEY', 'field_5d885c2da3735' );
define( 'URL_FIELD_KEY', 'field_5eb4440668265' );
define( 'COORDINATES_FIELD_KEY', 'field_5d8842925cf9e' );
define( 'LNG_FIELD_KEY', 'field_5d8845a4d4186' );
define( 'LAT_FIELD_KEY', 'field_5d884573d4185' );
define( 'BOUNDS_REGEX', '/ENVELOPE\(([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/' );

/**
 * Attempts to download and parse GeoBlacklight JSON from URL, setting
 * coordinates field if successful and raising validation error if
 * not.
 *
 * @param bool|string $valid Bool of whether the field value is valid.
 * @param array|int   $value The value of the field.
 */
function isf_validate_retrieve_bounds_geoblacklight_json( $valid, $value ) {
	// Pass through if already invalid.
	if ( ! $valid ) {
		return $valid;
	}

	// Pass through if "Retrieve Automatically from GeoBlacklight
	// JSON" is not enabled.
	if (
		empty( $_POST ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
		|| empty( $_POST['acf'] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
		|| empty( $_POST['acf'][ BOUNDS_FIELD_KEY ] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
		|| empty( $_POST['acf'][ BOUNDS_FIELD_KEY ][ HAS_BOUNDS_FIELD_KEY ] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
		|| empty( $_POST['acf'][ BOUNDS_FIELD_KEY ][ RETRIEVE_FIELD_KEY ] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
	) {
		return $valid;
	}

	// Download GeoBlacklight JSON.
	$response = wp_remote_get( $value );
	if ( empty( $response ) ) {
		return 'Request to URL "' . $value . '" failed';
	}

	// Decode JSON.
	$json = json_decode( $response['body'], true );
	if ( empty( $json ) ) {
		return 'Failed to decode JSON';
	}

	// Get value of "solr_geom" field.
	$solr_geom = $json['solr_geom'];
	if ( empty( $solr_geom ) ) {
		return 'No property found with key "solr_geom" in decoded JSON.';
	}

	// Extract bounds from "solr_geom" field.
	$matches = array();
	preg_match( BOUNDS_REGEX, $solr_geom, $matches );
	$min_lng = $matches[1];
	$max_lng = $matches[2];
	$max_lat = $matches[3];
	$min_lat = $matches[4];
	if (
		empty( $min_lng ) ||
		empty( $max_lng ) ||
		empty( $max_lat ) ||
		empty( $min_lat )
	) {
		return 'Unable to extract bounds from JSON property "solr_geom" with expected format "ENVELOPE(minLng, maxLng, maxLat, minLat)"';
	}

	// Set coordinates from extracted bounds.
	$_POST['acf'][ BOUNDS_FIELD_KEY ][ COORDINATES_FIELD_KEY ] = array(
		array(
			LNG_FIELD_KEY => $min_lng,
			LAT_FIELD_KEY => $min_lat,
		),

		array(
			LNG_FIELD_KEY => $min_lng,
			LAT_FIELD_KEY => $max_lat,
		),

		array(
			LNG_FIELD_KEY => $max_lng,
			LAT_FIELD_KEY => $max_lat,
		),

		array(
			LNG_FIELD_KEY => $max_lng,
			LAT_FIELD_KEY => $min_lat,
		),
	);

	return $valid;
}


/**
 * Prepares bounds for REST return.  If they're valid, there will
 * be a 'bbox' key
 *
 * @param array|null $bounds The value of the 'bounds' group.
 */
function isf_filter_bounds( $bounds ) {
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		if (
			empty( $bounds ) ||
			empty( $bounds[ HAS_BOUNDS_FIELD_KEY ] ) ||
			empty( $bounds[ COORDINATES_FIELD_KEY ] ) ||
			count( $bounds[ COORDINATES_FIELD_KEY ] ) !== 4
		) {
			return null;
		}

		$coordinates = array();
		foreach ( $bounds[ COORDINATES_FIELD_KEY ] as $point ) {
			if (
				empty( $point ) ||
				empty( $point[ LNG_FIELD_KEY ] ) ||
				empty( $point[ LAT_FIELD_KEY ] )
			) {
				return null;
			}

			$coordinates[] = array(
				'lng' => floatval( $point[ LNG_FIELD_KEY ] ),
				'lat' => floatval( $point[ LAT_FIELD_KEY ] ),
			);
		}

		return array( 'validated_coordinates' => $coordinates );
	}

	return $bounds;
}


/*
* Registers ACF field filters.
*/

add_filter(
	'acf/validate_value/key=' . URL_FIELD_KEY,
	'isf_validate_retrieve_bounds_geoblacklight_json',
	10,
	2
);

add_filter(
	'acf/load_value/key=' . BOUNDS_FIELD_KEY,
	'isf_filter_bounds',
	10,
	1
);
