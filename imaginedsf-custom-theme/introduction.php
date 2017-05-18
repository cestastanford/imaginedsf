<?php

/*
*   Template Name: Introduction
*   This template renders an Introduction sub-page, which has an
*   Introduction sidebar nav.
*/

get_header();

?>

<section class="container introduction">
    <div class="columns">
        <div class="column is-4"><?php get_vertical_nav_menu( INTRODUCTION_MENU ); ?></div>
        <article class="column is-8 content">
            <?php while ( have_posts() ) : ?>
                <?php the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; ?>
        </article>
    </div>

<?php

get_footer();
