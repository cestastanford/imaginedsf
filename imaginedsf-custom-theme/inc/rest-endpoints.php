<?

/*
*   Adds endpoint for retrieving Homepage demo slideshow images.
*/

function get_homepage_demo_slideshow_images() {

    $page = get_page_by_path( HOMEPAGE_SLUG );
    $images = get_field( 'demo_slideshow_images', $page->ID );
    return $images;

}

function register_custom_endpoints() {
  
    register_rest_route( 'imaginedsf', '/homepage-demo-slideshow-images', array(
        
        'methods' => 'GET',
        'callback' => 'get_homepage_demo_slideshow_images',

    ) );

}

add_action( 'rest_api_init', 'register_custom_endpoints' );
