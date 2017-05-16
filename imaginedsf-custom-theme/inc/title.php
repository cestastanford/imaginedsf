<?php

/*
*   Adds support for the Title Tag theme feature.
*/

function add_title_tag_support() {
    
    add_theme_support( 'title-tag' );

}

add_action( 'after_setup_theme', 'add_title_tag_support' );
