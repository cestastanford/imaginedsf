<?php

/*
*   Loads CSS styles and JS scripts for front-end rendering.
*/

function enqueue_static_assets() {

    $styles_path = '/static/styles.css';
    wp_enqueue_style(
        'theme_styles',
        get_template_directory_uri() . $styles_path,
        array(),
        filemtime( get_stylesheet_directory() . $styles_path )
    );

    $script_path = '/static/script.js';
    wp_enqueue_script(
        'theme_script',
        get_template_directory_uri() . $script_path,
        array(),
        filemtime( get_stylesheet_directory() . $script_path )
    );


}

add_action( 'wp_enqueue_scripts', 'enqueue_static_assets' );
