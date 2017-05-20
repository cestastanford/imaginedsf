<?php

/*
*   This template renders the AJAX-powered Interactive Maps page.
*/

get_header();

?>

<!-- begin Vue.js-controlled markup -->
<section class="container maps" id="maps">
    <div class="columns">
        <div class="column is-narrow">
            <?php get_template_part( 'template-parts/maps-proposal-list' ); ?>
            <?php get_template_part( 'template-parts/maps-basemap-list' ); ?>
            <?php get_template_part( 'template-parts/maps-vector-group-list' ); ?>
        </div>
        <div class="column grey-children">
            <?php get_template_part( 'template-parts/maps-map' ); ?>
            <?php get_template_part( 'template-parts/maps-timeline' ); ?>
            <?php get_template_part( 'template-parts/maps-information' ); ?>
        </div>
    </div>
</section>
<!-- end Vue.js-controlled markup -->

<?php

get_footer();
