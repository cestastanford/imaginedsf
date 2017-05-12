<?php

/*
*   Retrieves the ID of the page with slug 'homepage', setting the
*   front page to that ID if found.
*/

function set_homepage( $page_slug ) {

    $page = get_page_by_path( $page_slug );
    if ( isset($page) ) {
        if ( (string) get_option( 'page_on_front' ) !== (string) $page->ID || get_option( 'show_on_front' ) !== 'page' ) {

            update_option( 'page_on_front', $page->ID );
            update_option( 'show_on_front', 'page' );

        }
    }

}

set_homepage( HOMEPAGE_SLUG );
