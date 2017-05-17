<?php

/*
*   Template Name: Introduction Parent
*   This template redirects to the first child Introduction page.
*/

$children = get_children( get_the_ID() );
foreach ( $children as $child ) {
    wp_redirect( get_permalink( $child ) );
    break;
}
