<?php

/*
*   Adds three ACF options pages.
*/

if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title'    => 'Proposals Settings',
        'menu_title'    => 'Proposals',
        'menu_slug'     => 'proposals-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

    acf_add_options_page(array(
        'page_title'    => 'Basemaps Settings',
        'menu_title'    => 'Basemaps',
        'menu_slug'   => 'basemaps-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

    acf_add_options_page(array(
        'page_title'    => 'Application Settings',
        'menu_title'    => 'Other Content',
        'menu_slug'   => 'application-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

}
