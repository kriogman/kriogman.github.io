/* Template Name: Queue - Personal Portfolio Template
   Author: Zoyothemes
   E-mail: zoyothemes@gmail.com
   Created: Jun 2019
   Version: 1.0
   File Description: Main JS file of the template
*/


/*--------------------------*/
/*         INDEX            */
/*###########################
 *     01.  Loader          *
 *     02.  Menu            *
 *     03.  Sticky Menu     *
 *     03.  Back to top     *
############################*/

! function($) {
    "use strict"; 
    // Loader 
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });

    // Navbar-toggle Menu
    $('.navbar-toggle').on('click', function (event) {
        $(this).toggleClass('open');
        $('#navbar-nav').slideToggle(400);
    });


    // Sticky Menu
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".sticky").addClass("nav-sticky");
        } else {
            $(".sticky").removeClass("nav-sticky");
        }
    });

    // Dropdown menu 
    $('.navbar-nav a, .mouse-down').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Scrollspy
    $(".navbar-nav").scrollspy({ offset: 70 });

    // Back to top
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    }); 
    $('.back-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 3000);
        return false;
    }); 

    //Feather icon
    feather.replace()

    // Magnific Popup
    $('.mfp-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    //Portfolio filter
    $(window).on('load', function() {
        var $container = $('.projects-wrapper');
        var $filter = $('#filter');
        $container.isotope({
            filter: '*',
            layoutMode: 'masonry',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
    });
    
}(jQuery)

// Intersection Observer — reveal animations (fade-in + slide-up)
(function () {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(
        '.feature-widget, .timeline, .explore-feature, .work-container.work-modern'
    ).forEach(function (el) {
        // Stagger delay based on position within the nearest row/container
        var container = el.closest('.row, .main-timeline');
        var query = el.classList.contains('feature-widget')     ? '.feature-widget'          :
                    el.classList.contains('timeline')           ? '.timeline'                :
                    el.classList.contains('explore-feature')    ? '.explore-feature'         :
                    '.work-container.work-modern';
        var siblings = container ? Array.from(container.querySelectorAll(query)) : [el];
        var idx      = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 80) + 'ms';
        el.classList.add('reveal-init');
        observer.observe(el);
    });
}());