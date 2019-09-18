<?php
/**
 * Redirects to the root path on 404.
 *
 * @package Imagined San Francisco Custom Theme
 */

wp_safe_redirect( get_home_url() );
exit;
