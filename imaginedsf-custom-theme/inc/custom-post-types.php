<?php

/*
*   Removes unused post type menu options.
*/

function remove_unused_menu_options() {

    remove_menu_page( 'edit.php' ); // removes Posts
    remove_menu_page( 'edit-comments.php' ); // removes Comments

}

add_action( 'admin_menu', 'remove_unused_menu_options' );


/*
*   Adds custom post types.
*/

function create_custom_post_types() {

    //  Map Layers
    register_post_type( MAP_LAYER_POST_TYPE,
        array(
            'labels' => array(
                'name' => 'Map Layers',
                'singular_name' => 'Map Layer',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Map Layer',
                'edit_item' => 'Edit Map Layer',
                'new_item' => 'New Map Layer',
                'view_item' => 'View Map Layer',
                'view_items' => 'View Map Layers',
                'search_items' => 'Search Map Layers',
                'not_found' => 'No Map Layers Found',
                'not_found_in_trash' => 'No Map Layers found in Trash',
                'all_items' => 'All Map Layers',
                'archives' => 'Map Layer Archives',
                'attributes' => 'Map Layer Attributes',
                'insert_into_item' => 'Insert into Map Layer',
                'uploaded_to_this_item' => 'Uploaded to this Map Layer',
            ),
            'menu_icon' => 'dashicons-media-default',
            'public' => true,
            'rewrite' => array( 'slug' => 'map-layers' ),
            'show_in_rest' => true,
            'taxonomies' => array( VECTOR_FEATURE_GROUPS_TAXONOMY ),
        )
    );

    //  Maps
    register_post_type( MAP_POST_TYPE,
        array(
            'labels' => array(
                'name' => 'Maps',
                'singular_name' => 'Map',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Map',
                'edit_item' => 'Edit Map',
                'new_item' => 'New Map',
                'view_item' => 'View Map',
                'view_items' => 'View Maps',
                'search_items' => 'Search Maps',
                'not_found' => 'No Maps Found',
                'not_found_in_trash' => 'No Maps found in Trash',
                'all_items' => 'All Maps',
                'archives' => 'Map Archives',
                'attributes' => 'Map Attributes',
                'insert_into_item' => 'Insert into Map',
                'uploaded_to_this_item' => 'Uploaded to this Map',
            ),
            'menu_icon' => 'dashicons-location-alt',
            'public' => true,
            'has_archive' => true,
            'rewrite' => array( 'slug' => 'maps' ),
            'show_in_rest' => true,
        )
    );

    //  Narratives
    register_post_type( NARRATIVE_POST_TYPE,
        array(
            'labels' => array(
                'name' => 'Narratives',
                'singular_name' => 'Narrative',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Narrative',
                'edit_item' => 'Edit Narrative',
                'new_item' => 'New Narrative',
                'view_item' => 'View Narrative',
                'view_items' => 'View Narratives',
                'search_items' - 'Search Narratives',
                'not_found' - 'No Narratives Found',
                'not_found_in_trash' => 'No Narratives found in Trash',
                'all_items' => 'All Narratives',
                'archives' => 'Narrative Archives',
                'attributes' => 'Narrative Attributes',
                'insert_into_item' => 'Insert into Narrative',
                'uploaded_to_this_item' => 'Uploaded to this Narrative',
            ),
            'menu_icon' => 'dashicons-book-alt',
            'public' => true,
            'has_archive' => true,
            'hierarchical' => true,
            'supports' => array( 'title', 'editor', 'page-attributes' ),
            'rewrite' => array( 'slug' => 'narratives' ),
        )
    );

}

add_action( 'init', 'create_custom_post_types' );
