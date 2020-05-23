<?php
/**
 * Entrypoint for theme initialization code.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Defines constants.
 */

require_once 'inc/constants.php';


/**
 * Imports environmental variables.
 */

require_once 'inc/.env.php';


/**
 * Adds support for GeoJSON uploads.
 */

require_once 'inc/mimes.php';


/**
 * Updates post types.
 */

require_once 'inc/custom-post-types.php';


/**
 * Adds ACF Options pages.
 */

require_once 'inc/options.php';


/**
 * Loads site styles and scripts.
 */

require_once 'inc/static.php';


/**
 * Adds and describes REST API endpoints.
 */

require_once 'inc/rest.php';


/**
 * Returns SPA template for all non-admin and non-REST requests.
 */

require_once 'inc/spa.php';


/**
 * Handles submission and viewing of feedback.
 */

require_once 'inc/feedback.php';


/**
 * Applies extra configuration to Relationship fields so they don't
 * allow an administrator to select invalid configurations.
 */

require_once 'inc/relationships.php';


/**
 * Downloads remote map bounds and prepares map bounds for REST response.
 */

require_once 'inc/bounds.php';
