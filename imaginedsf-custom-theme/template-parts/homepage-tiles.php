<?php

/*
*   The following arrays represent the two columns of tiles on the
*   Homepage screen.
*/

$left_column_tiles = array(

    array(
        'classes' => 'red',
        'image' => '/images/map.png',
        'label' => 'Explore the Maps',
        'href' => get_post_type_archive_link( MAP_POST_TYPE ),
    ),

    array(
        'classes' => 'grey intro-video',
        'image' => '/images/intro-video.png',
        'label' => 'Watch the Intro Video',
        'href' => get_permalink( get_page_by_path( INTRO_VIDEO_SLUG ) ),
    ),

);

$right_column_tiles = array(

    array(
        'classes' => 'red',
        'image' => '/images/narrative.png',
        'label' => 'Read the Narratives',
        'href' => get_post_type_archive_link( NARRATIVE_POST_TYPE ),
    ),

);

?>

<div class="tile">
    <div class="tile is-parent is-vertical">
        <?php foreach ( $left_column_tiles as $tile ) : ?>
            <div class="tile is-child">
                <a href="<?php echo $tile['href']; ?>" class="homepage-tile <?php echo $tile['classes']; ?>">
                    <img src="<?php echo get_template_directory_uri() . $tile['image']; ?>" alt="<?php echo $tile['label']; ?>">
                    <div class="text"><?php echo $tile['label']; ?></div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="tile is-parent is-vertical">
        <?php foreach ( $right_column_tiles as $tile ) : ?>
            <div class="tile is-child">
                <a href="<?php echo $tile['href']; ?>" class="homepage-tile <?php echo $tile['classes']; ?>">
                    <img src="<?php echo get_template_directory_uri() . $tile['image']; ?>" alt="<?php echo $tile['label']; ?>">
                    <div class="text"><?php echo $tile['label']; ?></div>
                </a>
            </div>
        <?php endforeach; ?>
        <div class="tile is-child">
            <div class="homepage-tile grey search-an-address">
                <form class="centered search-an-address">
                    <div class="icon is-large"><i class="fa fa-search"></i></div>
                    <input class="input is-large" type="text" placeholder="search an address...">
                </form>
            </div>
        </div>
    </div>
</div>
