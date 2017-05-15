<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>This is the title!</title>
        <?php wp_head(); ?>
    </head>
    <body>
        <header>
            <a href="/">
                <img class="logo" src="<?php echo get_template_directory_uri() . '/images/logo.svg'; ?>" alt="Imagined San Francisco">
            </a>
            <?php get_template_part( 'template-parts/nav-secondary' ); ?>
            <?php get_template_part( 'template-parts/nav-main' ); ?>
        </header>
        <main>
