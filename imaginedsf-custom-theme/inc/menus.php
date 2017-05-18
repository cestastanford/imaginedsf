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

    $items = isset( $menu ) ? $menu['items'] : null;
    if ( isset( $items ) ) {

        $output = '<nav class="nav ' . $menu['theme_location'] . '">';
        foreach ($items as $item) {

            $classes = 'nav-item' . ( is_active( $item ) ? ' is-active' : '' );
            $permalink = $item->url;
            $title = $item->title;

            $output .= '<a class="' . $classes . '" href="' . $permalink . '">' . $title . '</a>';

        }
        $output .= '</nav>';
        echo $output;

    } else echo '<div>No menu defined.</div>';

}


/*
*   Defines function for outputting a vertical menu-style nav.
*/

function get_vertical_nav_menu( $menu ) {

    $items = isset( $menu ) ? $menu['items'] : null;
    if ( isset( $items ) ) {

        $output = '<aside class="menu ' . $menu['theme_location'] . '"><ul class="menu-list">';
        foreach ($items as $item) {

            $classes = 'nav-item' . ( is_active( $item ) ? ' is-active' : '' );
            $permalink = $item->url;
            $title = $item->title;

            $output .= '<li><a class="' . $classes . '" href="' . $permalink . '">' . $title . '</a></li>';

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
