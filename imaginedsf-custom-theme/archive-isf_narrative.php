<?php

/*
*   Redirects to first Narrative.
*/

$narratives = get_posts( array(

    'orderby' => 'title',
    'order' => 'ASC',
    'post_type' => NARRATIVE_POST_TYPE,
    'post_parent' => 0,

) );

wp_redirect( get_permalink( $narratives[0] ) );
exit;
