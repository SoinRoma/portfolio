(function ($) {

    "use strict";

    let cfg = {
            defAnimation: "fadeInUp",
            scrollDuration: 800,
            statsDuration: 4000
        },
        $WIN = $(window);


    let ssPreloader = function () {

        $WIN.on('load', function () {

            $('html, body').animate({scrollTop: 0}, 'normal');

            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });
        });
    };

    let ssMasonryFolio = function () {

        let containerBricks = $('.bricks-wrapper');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.brick',
                resize: true
            });
        });
    };

    let ssLightGallery = function () {

        $('#folio-wrap').lightGallery({
            showThumbByDefault: false,
            hash: false,
            selector: ".item-wrap"
        });


    };

    let ssMenuOnScrolldown = function () {

        let menuTrigger = $('#header-menu-trigger');
        menuTrigger.addClass('opaque');
    };

    let ssOffCanvas = function () {

        let menuTrigger = $('#header-menu-trigger'),
            nav = $('#menu-nav-wrap'),
            closeButton = nav.find('.close-button'),
            siteBody = $('body');

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

    let ssBackToTop = function () {

        let pxShow = 500,         // height on which the button will show
            fadeInTime = 400,         // how slow/fast you want the button to show
            fadeOutTime = 400,         // how slow/fast you want the button to hide
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
