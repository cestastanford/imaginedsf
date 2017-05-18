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

            return array( 'theme_location' => $theme_location, 'items' => $items );

        }

    }
    return null;

}


/*
*   Defines function for outputting custom-generated nav menu.
*/

function get_horizontal_nav_menu( $menu ) {

    if ( isset( $menu ) ) {

        $output = '<nav class="nav ' . $menu['theme_location'] . '">';
        foreach ( $menu['items'] as $item ) {

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
*   Recursively traverses children to create a heirarchical menu.
*/

function get_vertical_nav_menu( $menu ) {

    if ( isset( $menu ) ) {

        $output = '<aside class="menu ' . $menu['theme_location'] . '"><ul class="menu-list">';
        foreach ( $menu['items'] as $item ) {

            $classes = 'nav-item';
            $classes .= ( is_active( $item ) && !$item->is_parent ? ' is-active' : '' );
            $classes .= ( $item->level ? ' level-' . $item->level : '');
            $classes .= ( $item->is_parent ? ' parent' : '');
            $url = ( $item->is_parent ? '#' : $item->url );
            $title = $item->title;

            $output .= '<li><a class="' . $classes . '" href="' . $url . '"><span>' . $title . '</span></a></li>';

        }
        $output .= '</ul></aside>';
        echo $output;

    } else echo '<div>No menu defined.</div>';

}


/*
*   Determining whether a menu link should be active.
*/

function is_active( $item ) {

    global $wp;
    $current_url = home_url( add_query_arg( null, null ) );
    return strrpos( $current_url, $item->url ) !== false;

}
