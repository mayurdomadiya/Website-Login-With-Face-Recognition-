jQuery(document).on('ready', function ($) {
    "use strict";

    /*--------------------------
        STICKY MAINMENU
    ---------------------------*/
    $("#mainmenu-area").sticky({
        topSpacing: 0
    });

    /*---------------------------
        SMOOTH SCROLL
    -----------------------------*/
    $('ul#nav li a[href^="#"], a.navbar-brand, a.scrolltotop').on('click', function (event) {
        var id = $(this).attr("href");
        var offset = 60;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 1500, "easeInOutExpo");
        event.preventDefault();
    });

    /*----------------------------
        MOBILE & DROPDOWN MENU
    ------------------------------*/


    /*-----------------------------
        MENU HAMBERGER ICON
    ------------------------------*/


    /*----------------------------
        SCROLL TO TOP
    ------------------------------*/
    $(window).on('scroll', function () {
        var $totalHeight = $(window).scrollTop();
        var $scrollToTop = $(".scrolltotop");
        if ($totalHeight > 300) {
            $(".scrolltotop").fadeIn();
        } else {
            $(".scrolltotop").fadeOut();
        }

        if ($totalHeight + $(window).height() === $(document).height()) {
            $scrollToTop.css("bottom", "90px");
        } else {
            $scrollToTop.css("bottom", "20px");
        }
    });

    /*--------------------------
       FOOTER REVAL
    ----------------------------*/
    var window_width = $(window).width();
    if (window_width > 900) {
        $('.footer-area').footerReveal({
            shadow: false,
            zIndex: -999
        });
    }

    /*--------------------------
       PARALLAX BACKGROUND
    ----------------------------*/
    $(window).stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalScrolling: false
    });

    /*-----------------------------
        LETER EFFECT
    -------------------------------*/
    var elements = $('[data-chaffle]');
    elements.each(function () {
        $(this).appear(function () {
            Array.prototype.forEach.call(elements, function (el) {
                const chaffle = new Chaffle(el, {
                    speed: 20,
                    delay: 50,
                });
                chaffle.init();
            });
        });
    });

    /*-----------------------------
        LETER EFFECT TWO
    -------------------------------*/
    var animate_hidding = {
        timelines: {}
    }
    var sub_title = $('.subtitle');
    sub_title.each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        $(this).appear(function () {
            animate_hidding.timelines["subtitle"] = anime.timeline({
                loop: false
            }).add({
                targets: '.subtitle .letter',
                translateY: ["1.1em", 0],
                translateX: ["0.55em", 0],
                translateZ: 0,
                rotateZ: [180, 0],
                duration: 1000,
                easing: "easeOutQuart",
                opacity: 1,
                delay: function (el, i) {
                    return 10 * i;
                }
            });
        });
    });

    /*------------------------------
        COUNTER UP
    -------------------------------*/
    $('.odometer').appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    /*------------------------------
        PROGRESSBAR
    -------------------------------*/
    jQuery('.skillbar').each(function () {
        jQuery(this).appear(function () {
            jQuery(this).find('.count-bar').animate({
                width: jQuery(this).attr('data-percent')
            }, 3000);
            var percent = jQuery(this).attr('data-percent');
            jQuery(this).find('.count').html('<span>' + percent + '</span>');
        });
    });

    /*------------------------------
        VIDEO POPUP
    --------------------------------*/
    var videoModal = $(".video-area-popup,.video-popup-button,.post-video-popup");
    videoModal.modalVideo({
        channel: 'youtube'
    });

    /* -------------------------------------------------------
     PORTFOLIO FILTER SET ACTIVE CLASS FOR STYLE
    ----------------------------------------------------------*/
    $('.portfolio-menu li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /* ------------------------------
     PORTFOLIO FILTERING
     -------------------------------- */
    $('.portfolio-menu li').on('click', function () {
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');

        $(".portfolio-gallery").isotope({
            filter: filterValue,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });

    /*------------------------------
        IMAGE POPUP
    -------------------------------*/
    $('.portfolio-big-thumb').venobox();

    /*---------------------------
        SERVICE SLIDER
    -----------------------------*/
    var serviceCarousel = $('.service-slider');
    if (serviceCarousel.length > 0) {
        serviceCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: false,
            navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
            autoplay: false,
            autoplayTimeout: 3000,
            margin: 0,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    /*---------------------------
        PORTFOLIO SLIDER
    -----------------------------*/
    var portfolioCarousel = $('.portfolio-slider');
    if (portfolioCarousel.length > 0) {
        portfolioCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: true,
            navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
            autoplay: false,
            autoplayTimeout: 3000,
            margin: 0,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    /*---------------------------
        TEAM SLIDER
    -----------------------------*/
    var teamCarousel = $('.team-slider');
    if (teamCarousel.length > 0) {
        teamCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: false,
            navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
            autoplay: true,
            autoplayTimeout: 3000,
            margin: 20,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 1
                },
                1200: {
                    items: 2
                },
                1900: {
                    items: 3
                }
            }
        });
    }

    /*---------------------------
        TESTMONIAL SLIDER
    -----------------------------*/
    var testmonialCarousel = $('.testmonial-slider');
    if (testmonialCarousel.length > 0) {
        testmonialCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: false,
            navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
            autoplay: true,
            autoplayTimeout: 3000,
            margin: 20,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }

    /*---------------------------
        CLIENT SLIDER
    -----------------------------*/
    var clientCarousel = $('.client-slider');
    if (clientCarousel.length > 0) {
        clientCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: false,
            navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
            autoplay: true,
            autoplayTimeout: 3000,
            margin: 20,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    }
    
    /*---------------------------
        BLOG GALLERY SLIDER
    -----------------------------*/
    var postCarousel = $('.posts-gallery');
    if (postCarousel.length > 0) {
        postCarousel.owlCarousel({
            merge: true,
            smartSpeed: 1000,
            loop: true,
            nav: true,
            center: false,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplay: true,
            autoplayTimeout: 3000,
            margin: 0,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }

    /*-------------------------------
        PRICE TABLE ACTIVE
    ---------------------------------*/
    $('.single-price').on('hover', function (e) {
        $('.single-price').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });

    /*--------------------------
        ACCORDION ACTIVE
    ---------------------------*/
    $('#accordion-main .panel.panel-default').on('click', function (e) {
        $('#accordion-main .panel.panel-default').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });

    /*---------------------------
        PLACEHOLDER ANIMATION
    ----------------------------*/
    Placeholdem(document.querySelectorAll('[placeholder]'));

    /*--------------------------
        STICKY SIDEBAR
    ---------------------------*/
    $('.content-area .col-md-8, .content-area .col-md-4').theiaStickySidebar({
        additionalMarginTop: 30
    });

}(jQuery));

jQuery(window).on('load', function () {
    "use strict";
    /*--------------------------
        PRE LOADER
    ----------------------------*/
    $(".preeloader").fadeOut(1000);

    /*--------------------------
        ACTIVE WOW JS
    ----------------------------*/
    new WOW().init({
        boxClass: 'wow',
        offset: 50,
        mobile: false,
        live: true
    });
    
    /*---------------------------
        ISOTOPE ACTIVE ON LOAD
    -----------------------------*/
    $(".portfolio-gallery").isotope({
        itemSelector: '.single-portfolio'
    });
});