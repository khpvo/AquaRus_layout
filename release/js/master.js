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

    $('.sidenav').sidenav();
    $('.modal').modal();
    $('p').hyphenate();
    $('.material-table').materialize();
    $('.materialboxed').materialbox();
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
        loadScript("https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js", () => {
            initMap();
        })
    }

});

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

function initMap(){


    var addr1 = new ol.geom.Circle(
		ol.proj.fromLonLat([38.9893695, 45.0652408]), 
		30
    );

    var addr2 = new ol.geom.Circle(
		ol.proj.fromLonLat([38.9175483, 45.0631758]), 
		30
    );

    var addr3 = new ol.geom.Circle(
		ol.proj.fromLonLat([39.0797486, 45.036217]), 
		30
    );

    var addr4 = new ol.geom.Circle(
		ol.proj.fromLonLat([38.9591635, 45.0377622]), 
		30
    );

    var addr5 = new ol.geom.Circle(
		ol.proj.fromLonLat([38.9246163, 45.0092283]), 
		30
    );

        var addr6 = new ol.geom.Circle(
		ol.proj.fromLonLat([39.119738, 45.0113455]), 
		30
    );

    var addr1F = new ol.Feature(addr1);
    var addr2F = new ol.Feature(addr2);
    var addr3F = new ol.Feature(addr3);
    var addr4F = new ol.Feature(addr4);
    var addr5F = new ol.Feature(addr5);
    var addr6F = new ol.Feature(addr6);

    var vectorSource = new ol.source.Vector({
		features: [addr1F, addr2F, addr3F, addr4F, addr5F, addr6F]
    });
    
    var style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 139, 55, .6)'
		}),
		stroke: new ol.style.Stroke({
			width: 10,
			color: 'rgba(255, 139, 55, .6)'
		})
	});

    var vectorLayer = new ol.layer.Vector({
		source: vectorSource,
		style: style
	});

    var map = new ol.Map({
		target: 'map',  // The DOM element that will contains the map
		renderer: 'canvas', // Force the renderer to be used
		layers: [
			// Add a new Tile layer getting tiles from OpenStreetMap source
			new ol.layer.Tile({
				source: new ol.source.OSM({
					url: "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
				})
			}),
			vectorLayer
		],
		// Create a view centered on the specified location and zoom level
		view: new ol.View({
			center: ol.proj.fromLonLat([38.9977062, 45.0326081]),
			zoom: 11.25
		})
	});  
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