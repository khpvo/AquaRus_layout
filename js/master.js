var heroSlider;
var heroSliderMobile;
var miscSlider;
var observe;

$(() => {

    initSliders();
    loadImages();
    replaceLakeImage();

    $('body').on('click', '.sidenav .folder', nextLevel);
    $('body').on('click', '.sidenav .back', prevLevel);
    $('body').on('change', '#change-password-trigger', showChangePass);
    $('body').on('change', '.set-password-trigger', showSetPass);
    $('body').on('keyup', 'textarea', updateTextarea);
    $('body').on('click', '.dropdown', openDropdown);
    $('body').on('click', '.dropdown a', setCurrent);
    $('body').on('click', 'tr.order', toggleDetails);
    $('body').on('click', hidePopups);
    $('body').on('click', 'tr.details', closeDetails);
    $('body').on('change', '[name="theme-selector"]', disenTheme);
    $('body').on('click', '.products-sidebar-trigger a', toggleSidebarContent);
    $('body').on('mouseenter', '#misc-products', pauseMiscSlider);
    $('body').on('mouseleave', '#misc-products', resumeMiscSlider);
    $('body').on('change', '[name="address"]', toggleUserAddress);
    $(window).on('scroll', updateFloatingCart);

    $('.sidenav').sidenav();
    $('.modal').modal();
    $('p').hyphenate();
    $('.material-table').materialize();

});

function toggleUserAddress(){
    if($(this).val() == "user-address"){
        $('#user-address').removeClass('hidden');
    }else{
        $('#user-address').addClass('hidden');
    }
}

function updateFloatingCart(){

    var st = $('html, body').scrollTop();
    if(st >= 132){
        $('.floating-cart').addClass('shown');
    }else{
        $('.floating-cart').removeClass('shown');
    }
}

function replaceLakeImage(){

    if($('#lake-info').length){

        var imageEl = $('#lake-info .modal-text p:first-of-type img');
        var image = imageEl.attr('src');

        $('#lake-info .modal-header').data('src', image);
        imageEl.remove();
        loadImages();
    }
}

function pauseMiscSlider(e){
    miscSlider.autoplay.stop();
}

function resumeMiscSlider(e){
    miscSlider.autoplay.start();
}

function toggleSidebarContent(e){
    e?.preventDefault();
    $(this).parents('.products-sidebar').find('.products-sidebar-content').toggleClass('open');
}

function updateTextarea(){
    this.style.height = 0;
    this.style.height = (this.scrollHeight - 7) + 'px';
}


function disenTheme(){
    switch(this.id){
        case "theme-selector1": $('#theme-selector').addClass('disabled'); break;
        case "theme-selector2": $('#theme-selector').removeClass('disabled'); break;
    }
}

function showSetPass(){

    $('#set-password').toggleClass('visible');
}

function showChangePass(){
    
    $('#change-password').toggleClass('visible');
}

function toggleDetails(e){

    var already = $(this).hasClass('expanded');
    var newClass = already ? '' : 'expanded'
    var path = e.originalEvent.path;

    var link_in_path = path.filter(el => {
        return el.tagName == 'A'
    });

    console.log(link_in_path);
    if(!link_in_path.length){
        $('tr.order').removeClass('expanded');    
        $(this).addClass(newClass);
    }
}

function closeDetails(e){

    if($('html').outerWidth() <= 600){

        $(this).prev().removeClass('expanded');
    }
}

function setCurrent(e){
    e?.preventDefault();
    var newVal = $(this).text();
    $(this).parents('.dropdown-wrapper').find('.current').text(newVal);
}

function hidePopups(e){

    var path = e.originalEvent.path;
    var dropdownIndex = path.filter(el => {
        return $(el).hasClass('popup');
    })

    if(!dropdownIndex.length){
        $('.dropdown-wrapper .popup').removeClass('open');
    }
}

function openDropdown(e){
    e?.preventDefault();
    e?.stopPropagation();
    $(this).find('.popup').toggleClass('open');
}

function prevLevel(e){
    e?.preventDefault();
    var oldSL = $('.main-catalog-scroller').scrollLeft();
    var sbW = $('.sidenav').outerWidth();
    var newSL = oldSL-sbW;
    var subMenu = $(this).closest('ul');

    $('.main-catalog-scroller').animate({
        scrollLeft: newSL
    }, () => {
        subMenu.removeClass('visible');
    });
}

function nextLevel(e){
    e?.preventDefault();

    var oldSL = $('.main-catalog-scroller').scrollLeft();
    var sbW = $('.sidenav').outerWidth();
    var newSL = oldSL+sbW;
    var subMenu = $(this).next();

    subMenu.addClass('visible');
    
    $('.main-catalog-scroller').animate({
        scrollLeft: newSL,
        scrollTop: 0
    });
}

function initSliders(){

    if($('#hero-slider').length){
        heroSlider = new Swiper('#hero-slider', {
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 7000
            }
        });
    }

    if($('#hero-slider-mobile').length){
        heroSliderMobile = new Swiper('#hero-slider-mobile', {
            loop: true,
            autoplay: {
                delay: 7000
            }
        });
    }

    if($('#misc-products').length){
        miscSlider = new Swiper('#misc-products', {
            autoplay: {
               delay: 5000
            },
            loop: true,
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

$.fn.materialize = function(){

    return this.each(function() {
        
        var table_columns = $(this).find('th');
        var table_rows = $(this).find('tr');
        var column_names = [];

        $(table_columns).each((index, col) => {
            column_names.push(col.innerText)
        });

        $(table_rows).each((index, row) => {

            $(row).find('td').each((index, cell) => {
                $(cell).attr('data-prefix', column_names[index]);
            })
        });
    })
}