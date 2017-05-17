<div class="tile is-parent">

    <!-- begin Vue.js-controlled markup -->
    <div class="tile is-child" id="homepage-demo" v-cloak>
        <div class="images">
            <div class="image" v-for="(image, index) in images" :class="{ active: activeIndex === index }" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
        </div>
        <div class="slideshow-control" v-if="images">
            <a class="previous" v-on:click="previous"><i class="fa fa-arrow-left"></i></a>
            <a class="next" v-on:click="next"><i class="fa fa-arrow-right"></i></a>
        </div>
    </div>
    <!-- end Vue.js-controlled markup -->

</div>
