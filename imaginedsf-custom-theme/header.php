<!doctype html>
<html lang="en" data-root-url="<?php echo get_home_url(); ?>">
    <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="<?php echo get_template_directory_uri() . '/images/favicon.png'; ?>" type="image/png">
        <?php wp_head(); ?>
    </head>
    <body>
        <header class="section">
            <div class="container">
                <a class="logo" href="<?php echo get_home_url(); ?>">
                    <img src="<?php echo get_template_directory_uri() . '/images/logo.svg'; ?>" alt="Imagined San Francisco">
                </a>
                <div class="subflex">
                    <div class="secondary-menu">
                        <?php get_horizontal_nav_menu( get_nav_menu_items( SECONDARY_MENU ) ); ?>
                    </div>
                </div>
                <div class="primary-menu">
                    <?php get_horizontal_nav_menu( get_nav_menu_items( PRIMARY_MENU ) ); ?>
                </div>
                
                
            </div>
        </header>
        <main class="section">
