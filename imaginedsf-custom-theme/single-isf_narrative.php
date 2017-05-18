<?php

/*
*   This template renders a single Narrative.
*/

get_header();

?>

<section class="container narrative">
    <div class="columns">
        <div class="column is-4"><?php get_template_part( 'template-parts/narrative-menu' ); ?></div>
        <article class="column is-8 content">
            <?php while ( have_posts() ) : ?>
                <?php the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; ?>
        </article>
    </div>

<?php

get_footer();
