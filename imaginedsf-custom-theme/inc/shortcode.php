<?php

/*
*   Registers the Interactive Map Embed shortcode.
*/

function insert_interactive_map( $attributes ) {
    
    if ( isset($attributes['link']) ) {

        $link_components = explode( '#', $attributes['link'] );
        if ( isset( $link_components[1] ) ) {

            $hash = $link_components[1];
            ob_start();
            
            ?>

                <map-embed hash="<?php echo $hash; ?>"></map-embed>
                <div class="map-embed-caption">
                    <?php if ( isset( $attributes['caption'] ) ) echo $attributes['caption']; ?>
                </div>

            <?php

            return ob_get_clean();

        }

    }

    return '<div class="map-embed-caption">Map link not specified.</div>';

}

add_shortcode( 'map', 'insert_interactive_map' );
