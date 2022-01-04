(function ($) {

    "use strict";

    let cfg = {
            defAnimation: "fadeInUp",    // default css animation
            scrollDuration: 800,           // smoothscroll duration
            statsDuration: 4000           // stats animation duration
        },
        $WIN = $(window);


    /* Preloader
     * -------------------------------------------------- */
    let ssPreloader = function () {

        $WIN.on('load', function () {

            // force page scroll position to top at page refresh
            $('html, body').animate({scrollTop: 0}, 'normal');

            // will first fade out the loading animation
            $("#loader").fadeOut("slow", function () {

                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");

            });
        });
    };


    /*	Masonry
    ------------------------------------------------------ */
    let ssMasonryFolio = function () {

        let containerBricks = $('.bricks-wrapper');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.brick',
                resize: true
            });
        });
    };


    /*	Light Gallery
    ------------------------------------------------------- */
    let ssLightGallery = function () {

        $('#folio-wrap').lightGallery({
            showThumbByDefault: false,
            hash: false,
            selector: ".item-wrap"
        });


    };


    /* Menu on Scrolldown
   * ------------------------------------------------------ */
    let ssMenuOnScrolldown = function () {

        let menuTrigger = $('#header-menu-trigger');
        menuTrigger.addClass('opaque');
    };


    /* OffCanvas Menu
   * ------------------------------------------------------ */
    let ssOffCanvas = function () {

        let menuTrigger = $('#header-menu-trigger'),
            nav = $('#menu-nav-wrap'),
            closeButton = nav.find('.close-button'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
                menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


    /* Smooth Scrolling
      * ------------------------------------------------------ */
    let ssSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            let target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('#header-menu-trigger').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };



    /* Animations
      * ------------------------------------------------------- */
    let ssAnimations = function () {

        if (!$("html").hasClass('no-cssanimations')) {
            $('.animate-this').waypoint({
                handler: function (direction) {

                    let defAnimationEfx = cfg.defAnimation;

                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        $(this.element).addClass('item-animate');

                        setTimeout(function () {
                            $('body .animate-this.item-animate').each(function (ctr) {
                                let el = $(this),
                                    animationEfx = el.data('animate') || null;

                                if (!animationEfx) {
                                    animationEfx = defAnimationEfx;
                                }

                                setTimeout(function () {
                                    el.addClass(animationEfx + ' animated');
                                    el.removeClass('item-animate');
                                }, ctr * 50);

                            });
                        }, 100);
                    }

                    // trigger once only
                    this.destroy();
                },
                offset: '95%'
            });
        }

    };


    /* Intro Animation
      * ------------------------------------------------------- */
    let ssIntroAnimation = function () {

        $WIN.on('load', function () {

            if (!$("html").hasClass('no-cssanimations')) {
                setTimeout(function () {
                    $('.animate-intro').each(function (ctr) {
                        let el = $(this),
                            animationEfx = el.data('animate') || null;

                        if (!animationEfx) {
                            animationEfx = cfg.defAnimation;
                        }

                        setTimeout(function () {
                            el.addClass(animationEfx + ' animated');
                        }, ctr * 300);
                    });
                }, 100);
            }
        });

    };


    /* Back to Top
      * ------------------------------------------------------ */
    let ssBackToTop = function () {

        let pxShow = 500,         // height on which the button will show
            fadeInTime = 400,         // how slow/fast you want the button to show
            fadeOutTime = 400,         // how slow/fast you want the button to hide
            scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $("#go-top");

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };


    /* Initialize
      * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssMasonryFolio();
        ssLightGallery();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssSmoothScroll();
        ssAnimations();
        ssIntroAnimation();
        ssBackToTop();
    })();


})(jQuery);
