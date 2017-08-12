<?php

/*
*   Registers the Vector Feature Groups taxonomy for vector map
*   layers.
*/

function register_vector_feature_groups_taxonomy() {

    $labels = array(
        'name' => 'Vector Feature Groups',
        'singular_name' => 'Vector Feature Group',
        'search_items' => 'Search Groups',
        'all_items' => 'All Groups',
        'parent_item' => 'Parent Group',
        'parent_item_colon' => 'Parent Group:',
        'edit_item' => 'Edit Group',
        'update_item' => 'Update Group',
        'add_new_item' => 'Add New Group',
        'new_item_name' => 'New Group Name',
        'menu_name' => 'Vector Feature Groups',
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
    );

    register_taxonomy( VECTOR_FEATURE_GROUPS_TAXONOMY, array( MAP_LAYER_POST_TYPE ), $args );

}

add_action( 'init', 'register_vector_feature_groups_taxonomy' );
