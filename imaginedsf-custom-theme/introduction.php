<?php

/*
*   Template Name: Introduction
*   This template renders an Introduction sub-page, which has an
*   Introduction sidebar nav.
*/

get_header();

?>

<aside><?php get_nav_menu( INTRODUCTION_MENU ); ?></aside>
<article>This is the Introduction template!</article>

<?php

get_footer();
