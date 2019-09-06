<?php
/**
 * SPA template containing React app.
 *
 * @package Imagined San Francisco Custom Theme
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php wp_head(); ?>
	</head>
	<body>
		<div>This is static content from WordPress!</div>
		<div id="react"></div>
		<?php wp_footer(); ?>
	</body>
</html>
