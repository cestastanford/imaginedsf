<?php

/*
*   This template renders a default page.
*/

get_header();

?>

<section class="container page content">

<?php

    while ( have_posts() ) {
        the_post();
        the_content();
    }

?>

</section>

<?php

get_footer();
