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
