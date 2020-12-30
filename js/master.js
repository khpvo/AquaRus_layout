var heroSlider;
var miscSlider;

$(() => {

    initSliders();
    loadImages()
});

function initSliders(){

    if($('#hero-slider').length){
        heroSlider = new Swiper('#hero-slider', {
            
        });
    }

    if($('#misc-products').length){
        miscSlider = new Swiper('#misc-products', {
            autoplay: {
               delay: 7000
            },
            breakpoints: {
                1600: {
                    slidesPerView: 4
                },
                1100: {
                    slidesPerView: 3
                },
                800: {
                    slidesPerView: 2
                }
            }
        })
    }

}

function openImages(){
    var src = $(this).attr('src');
    $(this).parents('.lazy-image').css({
        backgroundImage: 'url('+src+')'
    }).addClass('complete');
    $(this).remove();
}

function loadImages(){
    $('.lazy-image').each((index, el) => {
        var url = $(el).data('src');
        // debugger

        if(!url)
            return;

        var imgTag = $('<img src="'+url+'" class="lazy-loading" />')[0];
        $(el).append(imgTag);
        $('img').one('load', openImages);
    })
}