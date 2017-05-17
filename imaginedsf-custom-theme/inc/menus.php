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
        $output = '<nav class="nav">';
        foreach ($items as $item) {

            $classes = 'nav-item' . ( empty($item->classes) ? '' : ' ' . implode( ' ', $item->classes ) );
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
