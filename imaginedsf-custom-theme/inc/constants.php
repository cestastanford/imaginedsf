<?php
/**
 * Defines constants for the rest of the theme.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Defines custom post type constants.
 */

define( 'MAP_POST_TYPE', 'isf_map' );
define( 'MAP_GROUP_POST_TYPE', 'isf_map_group' );
define( 'NARRATIVE_POST_TYPE', 'isf_narrative' );
define( 'FEEDBACK_POST_TYPE', 'isf_feedback' );


/**
 * Defines ACF Options page post ID constants for retrieving content.
 */
define( 'CONTENT_AREAS_OPTIONS', 'content-areas' );
define( 'PROPOSAL_ERAS_OPTIONS', 'proposal-eras' );
define( 'BASEMAPS_OPTIONS', 'basemaps' );


/**
 * Defines content area constants.  These should align with the
 * content areas the front-end application will be requesting (see
 * `static-src/constants.js`) and the content areas defined in
 * the WP Admin's Pages > Content Areas ACF Options page.
 */

define( 'NARRATIVES_CONTENT_AREA', 'narratives' );
define( 'INTRODUCTION_CONTENT_AREA', 'introduction' );
define( 'PROPOSAL_MAPS_INTRO_CONTENT_AREA', 'proposal_maps_intro' );
define( 'BIBLIOGRAPHY_CONTENT_AREA', 'bibliography' );
define( 'CREDITS_CONTENT_AREA', 'credits' );
define( 'FEEDBACK_CONTENT_AREA', 'feedback' );


/**
 * Defines the namespace for the REST API custom endpoints.
 */
define( 'REST_API_NAMESPACE', 'imaginedsf' );
