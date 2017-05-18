<?php

/*
*   Registers theme menus.
*/

function register_theme_menus() {
  
    register_nav_menus(

        array(
            PRIMARY_MENU => 'Primary',
            SECONDARY_MENU => 'Secondary',
            INTRODUCTION_MENU => 'Introduction',
        )
    
    );

}

add_action( 'init', 'register_theme_menus' );


/*
*   Retrieves menu items.
*/

function get_nav_menu_items( $theme_location ) {

    $locations = get_nav_menu_locations();
    if ( isset( $locations[$theme_location] ) ) {
    
        $menu = get_term( $locations[$theme_location], 'nav_menu' );
        $items = wp_get_nav_menu_items( $menu->term_id );
        if ( isset( $items ) && count( $items ) > 0 ) {

            return $items;

        }

    }
    return null;

}


/*
*   Defines function for outputting custom-generated nav menu.
*/

function get_horizontal_nav_menu( $items ) {

    if ( isset( $items ) ) {

        $output = '<nav class="nav">';
        foreach ( $items as $item ) {

            $classes = 'nav-item' . ( is_active( $item ) ? ' is-active' : '' );
            $url = $item->url;
            $title = $item->title;

            $output .= '<a class="' . $classes . '" href="' . $url . '">' . $title . '</a>';

        }
        $output .= '</nav>';
        echo $output;

    } else echo '<div>No menu defined.</div>';

}


/*
*   Defines function for outputting a vertical menu-style nav.
*/

function get_vertical_nav_menu( $items ) {

    if ( isset( $items ) ) {

        $output = '<aside class="menu">';
        $output .= create_hierarchical_menu( $items, 0 );
        $output .= '</aside>';
        echo $output;

    } else echo '<div>No menu defined.</div>';

}


/*
*   Recursively traverses children to create heirarchical menu items.
*/

function create_hierarchical_menu( $items, $level ) {

    $output = '<ul class="menu-list">';
    foreach ( $items as $item ) {

        //  Opens the list item tag
        $output .= '<li class="closed">';

        //  Adds the label
        $classes = 'nav-item';
        $is_parent = ( $item->children && count( $item->children ) > 0 ? true : false );
        $classes .= ( is_active( $item ) && ! $is_parent ? ' is-active' : '' );
        $classes .= ( $is_parent ? ' parent' : '' );
        $classes .= ' level-' . $level;
        $url = ( $is_parent ? '#' : $item->url );
        $title = $item->title;
        $carets = ( $is_parent ? '<i class="fa fa-caret-left"></i><i class="fa fa-caret-down"></i>' : '' );
        $output .= '<a class="' . $classes . '" href="' . $url . '"><span>' . $title . '</span>' . $carets . '</a>';

        //  Adds child list
        if ( isset( $item->children ) && count( $item->children ) > 0 ) {

            $output .= create_hierarchical_menu( $item->children, $level + 1 );

        }

        //  Closes the list item tag
        $output .= '</li>';

    }

    $output .= '</ul>';
    return $output;

}


/*
*   Determining whether a menu link should be active.
*/

function is_active( $item ) {

    global $wp;
    $current_url = home_url( add_query_arg( null, null ) );
    return strrpos( $current_url, $item->url ) !== false;

}
