<?php

/*
*   Gathers the Narrative items and creates an ordered list with
*   the hierarchy level of each item.
*/

function get_narrative_menu_items() {

    $narratives = get_pages( array(

        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'post_type' => NARRATIVE_POST_TYPE,

    ) );

    $sorted_narratives = get_page_hierarchy( $narratives );
    
    return array_map( function( $id, $title ) {

        $child_pages = get_pages( array( 'child_of' => $id, 'post_type' => NARRATIVE_POST_TYPE ) );

        return (object) array(

            'title' => $title,
            'url' => get_permalink( $id ),
            'level' => count( get_post_ancestors( $id ) ),
            'is_parent' => ( count( $child_pages ) > 0 ? true : false),

        );

    }, array_keys( $sorted_narratives ), $sorted_narratives );

}

$menu_items = get_narrative_menu_items();

if ( count($menu_items) > 0 ) {
    
    get_vertical_nav_menu( array(

        'theme_location' => 'narratives',
        'items' => $menu_items,

    ) );

}
