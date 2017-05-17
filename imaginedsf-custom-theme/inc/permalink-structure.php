<?php

/*
*   Sets the permalink structure to /%postname%/.  For some reason,
*   this isn't correctly flushing the rules, so it's still necessary
*   to visit the Permalinks settings page to flush the rules.
*/

function set_permalink_structure() {

    global $wp_rewrite;

    if ( $wp_rewrite->permalink_structure !== '/%postname%/' ) {

        $wp_rewrite->set_permalink_structure( '/%postname%/' );
        flush_rewrite_rules();

    }

}

add_action( 'init', 'set_permalink_structure' );
