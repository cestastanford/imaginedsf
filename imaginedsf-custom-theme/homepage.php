<?php

/*
*   Template Name: Homepage
*   This template renders the site homepage.
*/

get_header();

?>

<section class="container homepage">
    <div class="tile is-ancestor">
        <?php get_template_part( 'template-parts/homepage-tiles' ); ?>
        <?php get_template_part( 'template-parts/homepage-demo' ); ?>
    </div>
</section>

<?php

get_footer();
