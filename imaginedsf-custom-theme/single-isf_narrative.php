<?php

/*
*   This template renders a single Narrative.  The first Loop collects
*   the names of all Narratives to create the side list.
*/

$args = array( 'post_type' => NARRATIVE_POST_TYPE );
$query = new WP_Query( $args );
$menu_items = array( 'theme_location' => 'narratives', 'items' => array() );
while ( $query->have_posts() ) {
    
    $query->the_post();
    array_push( $menu_items['items'], (object) array(

        'url' => get_permalink(),
        'title' => get_the_title(),

    ) );

}

get_header();

?>

<section class="container narrative">
    <div class="columns">
        <div class="column is-4"><?php get_vertical_nav_menu( $menu_items ); ?></div>
        <article class="column is-8 content">
            <?php while ( have_posts() ) : ?>
                <?php the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; ?>
        </article>
    </div>

<?php

get_footer();