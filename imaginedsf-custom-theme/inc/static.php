<?php

/*
*   Loads CSS styles and JS scripts for front-end rendering.
*/

function enqueue_static_assets() {

    $script_path = '/static/script.js';
    wp_enqueue_script(
        'theme_script',
        get_template_directory_uri() . $script_path,
        array(),
        filemtime( get_stylesheet_directory() . $script_path )
    );

}

add_action( 'wp_enqueue_scripts', 'enqueue_static_assets' );
