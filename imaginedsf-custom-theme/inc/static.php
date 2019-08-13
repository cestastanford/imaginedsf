<?php

/*
*   Loads CSS styles and JS scripts for front-end rendering.
*/

function enqueue_static_assets() {
    
    wp_enqueue_style( 'theme_styles', get_template_directory_uri() . '/static/styles.css' );
    wp_enqueue_script( 'theme_script', get_template_directory_uri() . '/static/script.js' );

}

add_action( 'wp_enqueue_scripts', 'enqueue_static_assets' );
