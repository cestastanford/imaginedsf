<?php
/**
 * Adds support for feedback submission and tracking.
 *
 * @package Imagined San Francisco Custom Theme
 */

/**
 * Creates a new Feedback post.
 *
 * @param string $message The submitted message of the post.
 */
function isf_save_feedback( $message ) {

	$id = wp_insert_post(
		array(
			'post_type'   => FEEDBACK_POST_TYPE,
			'post_title'  => 'Feedback submitted ' . current_time( 'n/j/Y h:i A' ),
			'post_status' => 'publish',
		)
	);

	update_field( 'feedback_message', $message, $id );

}


/*
*	Removes the Publish box for feedback and replaces it with one
*	that only includes the post date and one that displays the message.
*/

add_action(
	'add_meta_boxes_' . FEEDBACK_POST_TYPE,
	function( $post ) {

		remove_meta_box( 'submitdiv', FEEDBACK_POST_TYPE, 'side' );

		add_meta_box(
			'isf_feedback_info',
			'Feedback Information',
			'isf_feedback_info_meta_content',
			null,
			'normal',
			'high',
			$post
		);

		add_meta_box(
			'isf_feedback_message',
			'Feedback Message',
			'isf_feedback_message_meta_content',
			null,
			'normal',
			'high',
			$post
		);

	}
);


/**
 * Outputs content of Feedback Information metabox.
 *
 * @param WP_Post $post The Feedback post in question.
 */
function isf_feedback_info_meta_content( $post ) {

	?>

<div>
	<strong>Submitted: </strong>
	<span><?php echo esc_html( get_the_time( 'n/j/Y h:i A', $post ) ); ?></span>
</div>

	<?php

}


/**
 * Outputs content of Feedback Message metabox.
 *
 * @param WP_Post $post The Feedback post in question.
 */
function isf_feedback_message_meta_content( $post ) {

	?>

<div style="margin-top: 1em;">
	<?php the_field( 'feedback_message', $post->ID ); ?>
</div>

	<?php

}


/*
*	Sets screen layout to 1-column.
*/

add_filter(
	'get_user_option_screen_layout_' . FEEDBACK_POST_TYPE,
	function() {
		return 1;
	}
);


/*
*	Adds a notification bubble.
*/

add_action(
	'admin_menu',
	function () {
		global $menu;
		foreach ( $menu as $index => $menu_item ) {
			if ( 'edit.php?post_type=' . FEEDBACK_POST_TYPE === $menu_item[2] ) {
				$cpt_count = wp_count_posts( FEEDBACK_POST_TYPE )->publish;
				if ( $cpt_count > 0 ) {
					$menu[ $index ][0] .= // phpcs:ignore
						' <span class="awaiting-mod">' . $cpt_count . '</span>';
				}
			}
		}
	}
);

