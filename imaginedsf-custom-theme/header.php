<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <?php wp_head(); ?>
    </head>
    <body>
        <header class="section">
            <div class="container">
                <a class="logo" href="/">
                    <img src="<?php echo get_template_directory_uri() . '/images/logo.svg'; ?>" alt="Imagined San Francisco">
                </a>
                <div class="subflex">
                    <form class="control has-icons-left search-an-address">
                        <input class="input is-small" type="text" placeholder="search an address...">
                        <span class="icon is-small is-left"><i class="fa fa-search"></i></span>
                    </form>
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
