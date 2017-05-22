<?

/*
*   Adds endpoint for retrieving Homepage demo slideshow images.
*/

function get_demo_images() {

    $page = get_page_by_path( HOMEPAGE_SLUG );
    $images = get_field( 'demo_slideshow_images', $page->ID );
    return $images;

}

function register_demo_images_endpoint() {
  
    register_rest_route( 'imaginedsf', '/demo-images', array(
        
        'methods' => 'GET',
        'callback' => 'get_demo_images',

    ) );

}

add_action( 'rest_api_init', 'register_demo_images_endpoint' );


/*
*   Adds endpoint for retrieving Map posts.
*/

function get_maps() {

    $maps = get_posts( array(

        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'post_type' => MAP_POST_TYPE,

    ) );

    foreach ( $maps as $map ) {

        $map->fields = get_fields( $map );

    }

    return $maps;

}

function register_map_endpoint() {
  
    register_rest_route( 'imaginedsf', '/maps', array(
        
        'methods' => 'GET',
        'callback' => 'get_maps',

    ) );

}

add_action( 'rest_api_init', 'register_map_endpoint' );
