<?php

/*
*   Adds three ACF options pages.  Proposal Ranges and Basemaps
*   are added under the Maps menu item and Content Areas are added
*   under Pages.
*/

if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' => 'Proposal Maps',
        'icon_url' => 'dashicons-menu-alt',
        'position' => '27.1',
    ));

    acf_add_options_page(array(
        'page_title' => 'Basemaps',
        'icon_url' => 'dashicons-images-alt',
        'position' => '27.2',
   ));

    acf_add_options_page(array(
        'page_title' => 'Content Areas',
        'parent_slug' => 'edit.php?post_type=page',
    ));

}
