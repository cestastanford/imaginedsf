<?php

/*
*   Redirects to first Narrative.
*/

if ( have_posts() ) {
    
    the_post();
    wp_redirect( get_permalink() );

}
