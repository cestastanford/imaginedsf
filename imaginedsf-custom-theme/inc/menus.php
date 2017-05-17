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
*   Defines function for outputting custom-generated menu.
*/

function get_nav_menu( $theme_location ) {

    $locations = get_nav_menu_locations();
    if ( isset( $locations[$theme_location] ) ) {
    
        $menu = get_term( $locations[$theme_location], 'nav_menu' );
        $items = wp_get_nav_menu_items( $menu->term_id );
        $output = '<nav class="nav ' . $theme_location . '">';
        foreach ($items as $item) {

            

            $classes = 'nav-item' . ( is_active( $item ) ? ' is-active' : '' );
            $permalink = $item->url;
            $title = $item->title;

            $output .= '<a class="' . $classes . '" href="' . $permalink . '">' . $title . '</a>';

        }
        $output .= '</nav>';
        echo $output;

    } else {

        echo '<div>No menu defined.</div>';

    }

}


/*
*   Determining whether a menu link should be active.
*/

function is_active( $item ) {

    global $wp;
    $current_url = home_url( add_query_arg( null, null ) );
    return strrpos( $current_url, $item->url ) !== false;

}
