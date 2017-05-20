<?php

/*
*   Redirects to the archive page.
*/

wp_redirect( get_post_type_archive_link( MAP_POST_TYPE ) );
exit;
