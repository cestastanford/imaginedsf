<?php
/**
 * SPA template containing React app.
 *
 * @package Imagined San Francisco Custom Theme
 */

$admin_bar_class = is_admin_bar_showing() ? 'admin-bar-showing' : '';

?><!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php wp_head(); ?>
	</head>
	<body>
		<main id="App" class="<?php echo esc_attr( $admin_bar_class ); ?>"></main>
		<?php wp_footer(); ?>
	</body>
</html>
