<?php

/*
*   Sets the permalink structure to /%postname%/.
*/

function set_permalink_structure() {

    global $wp_rewrite;
    if ( $wp_rewrite->permalink_structure !== '/%postname%/' ) {

        $wp_rewrite->set_permalink_structure( '/%postname%/' ); 
        update_option( 'rewrite_rules', false ); 
        $wp_rewrite->flush_rules( true );

    }

}

add_action( 'init', 'set_permalink_structure' );
