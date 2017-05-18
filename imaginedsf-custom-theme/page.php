<?php

/*
*   This template renders a default page.
*/

get_header();

?>

<article class="container page content">

<?php

    while ( have_posts() ) {
        the_post();
        the_content();
    }

?>

</article>

<?php

get_footer();
