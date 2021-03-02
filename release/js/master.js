var heroSlider;
var heroSliderMobile;
var miscSlider;
var observe;
var modals;
var materialboxes;
var sidenav;
var map;

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
    $('body').on('click', '.rs-favorite', toggleFav);
    $('body').on('click', '.dropdown a', setCurrent);
    $('body').on('click', 'tr.order', toggleDetails);
    $('body').on('click', '.popup-trigger', togglePopup);
    $('body').on('click', hidePopups);
    $('body').on('click', 'tr.details', closeDetails);
    $('body').on('change', '[name="theme-selector"]', disenTheme);
    $('body').on('click', '.products-sidebar-trigger a', toggleSidebarContent);
    $('body').on('mouseenter', '#misc-products', pauseMiscSlider);
    $('body').on('mouseleave', '#misc-products', resumeMiscSlider);
    $('body').on('change', '[name="address"]', toggleUserAddress);
    $('body').on('change', '[name="account-type"]', toggleAccountType);
    $(window).on('scroll', updateFloatingCart);
    $(window).on('resize', updateModalClass);
    $('body').on('change', '[type=file]', updateInputFileText);
    $('body').on('click', '.swiper-container-wrapper a.prev', sliderPrev);
    $('body').on('click', '.swiper-container-wrapper a.next', sliderNext);

    var modals_el = document.querySelectorAll('.modal');
    modals = M.Modal.init(modals_el);

    var elems = document.querySelectorAll('.materialboxed');
    materialboxes = M.Materialbox.init(elems);

    var elems = document.querySelectorAll('.sidenav');
    sidenav = M.Sidenav.init(elems);

    $('p').hyphenate();
    $('.material-table').materialize();
    
    initImageToolTips();
    updateModalClass();
    

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });

    if($('.ba-slider'.length)){
        $('.ba-slider').beforeAfter();
    }

    if($('#map').length){

        var mapCenter = [38.9977062, 45.0326081];
        var zoom = 11.25;

        var coords = [];

        $('.map-marker').each((index, marker) => {
            var lon = $(marker).data('lon');
            var lat = $(marker).data('lat');
            var address = $(marker).data('address');
            coords.push({
                address: address,
                lonlat: [lon, lat]
            });
        });

        loadScript("https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js", () => {
            initMap(coords, "map", mapCenter, zoom);
        })
    }

    if($('#shop-map').length){

        var shopCoord = [$('#shop-map').data('long'), $('#shop-map').data('lat')];
        var shopAddress = $('#shop-map').data('address');
        var coords = [
            {
                lonlat: shopCoord,
                address: shopAddress
            }
        ];
        loadScript("https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js", () => {
            initMap(coords, 'shop-map', shopCoord, 14);
        })
    }

});

function sliderPrev(e){
    e?.preventDefault();
    var slider = $(this).next().get(0).swiper;
    slider.slidePrev();
}

function sliderNext(e){
    e?.preventDefault();
    var slider = $(this).prev().get(0).swiper;
    slider.slideNext();
}

function updateInputFileText(e){
    var file = $(this).val() !== "" ? $(this).val().replace("C:\\fakepath\\", '') : $(this).data('default-text');

    $(this).parent().find('.filename').text(file);
}

function updateModalClass(){
    if($(window).outerWidth() <= 500){
        $('#set').addClass('modal-fixed-footer');
    }else{
        $('#set').removeClass('modal-fixed-footer');
    }
}

function toggleAccountType(){
    var newVal = $(this).val();
    $('#fieldset').attr('data-mode', newVal);
}

function initImageToolTips(){
    $('.image-tooltip').each((index, tooltip) => {
        var url = $(tooltip).data('src');
        // console.log(url)
        $(tooltip).prepend($("<div class=\"image-tooltip\" style=\"background-image:url('"+url+"')\">"));
    })
}

function toggleFav(e){
    e?.preventDefault();
    $(this).toggleClass('rs-in-favorite');
}

function initMap(coords, id, mapCenter, zoom){

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZXN5cyIsImEiOiJja2xyejVqbTAwN3c2MnBwdjZvdHVhOHpiIn0.IrmmbUMTtmXBxZjv8mcH8Q';
    var map = new mapboxgl.Map({
        container: id,
        style: 'mapbox://styles/genesys/ckls2dt0l12fj17qxtbz91bqg',
        center: mapCenter,
        zoom: zoom
    });

    coords.forEach(marker => {
        var el = document.createElement('div');
        $(el).addClass('map-marker-icon');

        el.addEventListener('click', function(e){

            var url = "https://yandex.ru/maps/?ll=39.020224%2C45.093786&mode=routes&rtext=~"+marker.lonlat[1]+"%2C"+marker.lonlat[0]+"&z=" + zoom;
            var el = marker;
            
            var link = $('<a id="map-link" target="_blank" href="'+url+'"></a>');
            $('.map-wrapper').append(link);

            setTimeout(() => {
                $('#map-link')[0].click();
                setTimeout(() => {
                    $('#map-link').remove();
                }, 100)
            }, 100)
        });

        el.addEventListener('mouseenter', function(e){
            $('.address').text(marker.address).addClass('active');
            $('.map-marker').removeClass('active');
            $('.map-marker[data-lon="'+marker.lonlat[0]+'"]').addClass('active');
        })

        el.addEventListener('mouseleave', function(e){
            $('.address').removeClass('active');
            $('.map-marker').removeClass('active');
        })

        new mapboxgl.Marker(el)
            .setLngLat(marker.lonlat)
            .addTo(map);
    })

}

loadScript = (url, callback) => {

	var script = document.createElement("script")
	script.type = "text/javascript";

	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function togglePopup(e){
    e?.preventDefault();
    e?.stopPropagation();
    var already = $(this).parent().find('.popup').hasClass('open');
    var newClass = already ? '' : 'open';
    $('.popup-wrapper .popup').removeClass('open');
    $(this).parent().find('.popup').addClass(newClass);
}

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
        return (el.tagName == 'A' && !$(el).hasClass('expander-trigger'))
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

    if(e.originalEvent){
        
        var path = e.originalEvent.path;
        var dropdownIndex = path.filter(el => {
            return $(el).hasClass('popup');
        });
    
        var popups = path.filter(el => {
            return $(el).hasClass('popup-wrapper');
        });
    
        if(!dropdownIndex.length){
            $('.dropdown-wrapper .popup').removeClass('open');
        }
    
        if(!popups.length){
            $('.popup-wrapper .popup').removeClass('open');
        }
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
            pagination: {
                el: '.pagination-desktop',
                clickable: true
            },
            autoplay: {
                delay: 7000
            }
        });
    }

    if($('#hero-slider-mobile').length){
        heroSliderMobile = new Swiper('#hero-slider-mobile', {
            loop: true,
            pagination: {
                el: '.pagination-mobile',
                clickable: true
            },
            autoplay: {
                delay: 7000
            }
        });
    }

    if($('#misc-products').length){
        var slides = $('#misc-products .swiper-slide').length;
        if(!slides){
            return;
        }
        var bp1600_loop = slides > 4 ? true : false;
        var bp1100_loop = slides > 3 ? true : false;
        var bp800_loop = slides > 2 ? true : false;

        miscSlider = new Swiper('#misc-products', {
            autoplay: {
                delay: 5000
            },
            loop: true,
            breakpoints: {
                1600: {
                    slidesPerView: 4,
                    loop: bp1600_loop
                },
                1100: {
                    slidesPerView: 3,
                    loop: bp1100_loop
                },
                800: {
                    slidesPerView: 2,
                    loop: bp800_loop
                },
                400: {
                    slidesPerView: 1,
                    loop: true
                }
            }
        })
        miscSlider.on('slideChange', function () {
            loadImages();
        });
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

        if($(el).hasClass('complete'))
            return;

        var url = $(el).data('src');
        // debugger

        if(!url)
            return;

        var imgTag = $('<img src="'+url+'" class="lazy-loading" />')[0];
        $(el).append(imgTag);
        $('.lazy-image img').one('load', openImages);
    })
}

(function($) {
    function drags(dragElement, resizeElement, container) {
      
      // Initialize the dragging event on mousedown.
      dragElement.on('mousedown.ba-events touchstart.ba-events', function(e) {
        
        dragElement.addClass('ba-draggable');
        resizeElement.addClass('ba-resizable');
        
        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();
     
        // Set limits
        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidth - 10;
        
        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove.ba-events touchmove.ba-events", function(e) {
          
          // Check if it's a mouse or touch event and pass along the correct value
          var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
          
          leftValue = moveX + posX - dragWidth;
          
          // Prevent going off limits
          if ( leftValue < minLeft) {
            leftValue = minLeft;
          } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
          }
          
          // Translate the handle's left value to masked divs width.
          widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
          
          // Set the new values for the slider and the handle. 
          $('.ba-draggable').css('left', widthValue);
          $('.ba-resizable').css('width', widthValue);
        // Bind mouseup events to stop dragging.
        }).on('mouseup.ba-events touchend.ba-events touchcancel.ba-events', function(){
          dragElement.removeClass('ba-draggable');
          resizeElement.removeClass('ba-resizable');
          // Unbind all events for performance
          $(this).off('.ba-events'); 
        });
        e.preventDefault();
      });
    }
  
    // Define plugin
    $.fn.beforeAfter = function() {
      var cur = this;
      // Adjust the slider
      var width = cur.width()+'px';
      cur.find('.resize img').css('width', width);
      // Bind dragging events
      drags(cur.find('.handle'), cur.find('.resize'), cur);
  
      // Update sliders on resize. 
      // Because we all do this: i.imgur.com/YkbaV.gif
      $(window).resize(function(){
        var width = cur.width()+'px';
        cur.find('.resize img').css('width', width);
      });
    }
  }(jQuery));
  
  

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
