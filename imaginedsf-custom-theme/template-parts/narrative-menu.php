<?php

/*
*   Recursively traverses the tree of Narrative posts, creating a
*   hierarchical list of menu data for use with get_vertical_nav_menu.
*/

function get_child_narrative_menu_items( $parent_id ) {

    $children = get_pages( array( 

        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'post_type' => NARRATIVE_POST_TYPE,
        'parent' => $parent_id,

    ) );

    return array_map( function( $child ) {

        return (object) array(

            'title' => $child->post_title,
            'url' => get_permalink( $child ),
            'level' => $level,
            'children' => get_child_narrative_menu_items( $child->ID ),

        );

    }, $children );

}

$menu_items = get_child_narrative_menu_items( 0 );
if ( count($menu_items) > 0 ) get_vertical_nav_menu( $menu_items );
