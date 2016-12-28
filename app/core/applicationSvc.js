/****  Variables Initiation  ****/
var doc = document,
    docEl = document.documentElement,
    $body = $('body'),
    $sidebar = $('.sidebar'),
    windowHeight = $(window).height();

angular.module('ECore').factory('applicationSvc', [function() {
    /* ==========================================================*/
    /* LAYOUTS API                                               */
    /* ========================================================= */

    /* Toggle Sidebar Collapsed */
    $.cookie.defaults.path = '/';

    function collapsedSidebar() {
        if ($body.css('position') !== 'relative') {
            if ($body.hasClass('sidebar-collapsed')) {
                removeCollapsedSidebar();
            } else {
                createCollapsedSidebar();
            }
        } else {
            $body.toggleClass('sidebar-show');
        }
    }

    function createCollapsedSidebar() {
        $body.addClass('sidebar-collapsed');
        $sidebar.css('width', '').resizable().resizable('destroy');
        $('.nav-sidebar ul').attr('style', '');
        $(this).addClass('menu-collapsed');
        destroySideScroll();
        $('#switch-sidebar').prop('checked');
        $.cookie('sidebar-collapsed', 1, { path: '/' });
    }

    function removeCollapsedSidebar() {
        $body.removeClass('sidebar-collapsed');

        if (! $body.hasClass('submenu-hover')) {
            $('.nav-sidebar li.active ul').css({
                display: 'block'
            });
        }

        $(this).removeClass('menu-collapsed');

        if ($body.hasClass('sidebar-light') && !$body.hasClass('sidebar-fixed')) {
            $sidebar.height('');
        }

        createSideScroll();
        $.removeCookie('sidebar-collapsed', { path: '/' });
    }
    /* ========================================================= */
    /* END LAYOUT API                                            */
    /* ========================================================= */

    /****  Full Screen Toggle  ****/
    function toggleFullScreen() {
        if (
            !doc.fullscreenElement &&
            !doc.msFullscreenElement &&
            !doc.webkitIsFullScreen &&
            !doc.mozFullScreenElement
        ) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.webkitRequestFullScreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.webkitRequestFullScreen) {
                docEl.webkitRequestFullScreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            }
        } else {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
        }
    }

    /**** PANEL ACTIONS ****/
    /* Create Portlets Controls automatically: reload, fullscreen, toggle, remove, popout */
    function maximizePanel() {
        if ($('.maximized').length) {
            var panel = $('.maximized'),
                windowHeight = $(window).height() - 2,
                panelHeight = panel.find('.panel-header').height() + panel.find('.panel-content').height() + 100;

            if (panel.hasClass('maximized')) {
                if (windowHeight > panelHeight) {
                    panel.parent().height(windowHeight);
                } else {
                    if ($('.main-content').height() > panelHeight) {
                        panel.parent().height($('.main-content').height());
                    } else {
                        panel.parent().height(panelHeight);
                    }
                }
            } else {
                panel.parent().height('');
            }
        }
    }

    /****  Custom Scrollbar  ****/
    /* Create Custom Scroll for elements like Portlets or Dropdown menu */
    function customScroll() {
        if ($.fn.mCustomScrollbar) {
            $('.withScroll').each(function() {
                var $this = $(this);
                $this.mCustomScrollbar('destroy');
                var scrollHeight = $this.data('height') ? $this.data('height') : 'auto',
                    dataPadding = $this.data('padding') ? $this.data('padding') : 0;

                if ($this.data('height') === 'window') {
                    var thisHeight = $this.height();
                    windowHeight = $(window).height() - dataPadding - 50;

                    if (thisHeight < windowHeight) {
                        scrollHeight = thisHeight;
                    } else {
                        scrollHeight = windowHeight;
                    }
                }

                /* jshint camelcase: false */
                $this.mCustomScrollbar({
                    scrollButtons: {
                        enable: false
                    },
                    autoHideScrollbar: $this.hasClass('show-scroll') ? false : true,
                    scrollInertia: 150,
                    theme: 'light',
                    set_height: scrollHeight,
                    advanced: {
                        updateOnContentResize: true
                    }
                });
                /* jshint camelcase: true */
            });
        }
    }

    /* ==========================================================*/
    /* BEGIN SIDEBAR                                             */
    /* Create custom scroll for sidebar used for fixed sidebar */
    function createSideScroll() {
        if ($.fn.mCustomScrollbar) {
            destroySideScroll();

            if (
                ! $body.hasClass('sidebar-collapsed') &&
                ! $body.hasClass('submenu-hover') &&
                $body.hasClass('fixed-sidebar')
            ) {
                $('.sidebar-inner').mCustomScrollbar({
                    scrollButtons: {
                        enable: false
                    },
                    autoHideScrollbar: true,
                    scrollInertia: 150,
                    theme: 'light-thin',
                    advanced: {
                        updateOnContentResize: true
                    }
                });
            }

            if ($body.hasClass('sidebar-top')) {
                destroySideScroll();
            }
        }
    }

    /* Destroy sidebar custom scroll */
    function destroySideScroll() {
        $('.sidebar-inner').mCustomScrollbar('destroy');
    }

    /* END SIDEBAR                                               */
    /* ========================================================= */

    /***** Scroll to top button *****/
    function scrollTop() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });

        $('.scrollup').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);

            return false;
        });
    }

    function detectIE() {
        var ua = window.navigator.userAgent,
            msie = ua.indexOf('MSIE '),
            trident = ua.indexOf('Trident/'),
            edge = ua.indexOf('Edge/');

        if (msie > 0 || trident > 0 || edge > 0) {
            $('html').addClass('ie-browser');
        }
    }

    function mobileSidebar() {
        $('html').on('click', '.sidebar-show .nav-sidebar li:not(.nav-parent) > a', function() {
            $body.removeClass('sidebar-show');
        });
    }

    /****  Initiation of Main Functions  ****/
    function init() {
        /* ==========================================================*/
        /* APPLICATION SCRIPTS                                       */
        /* ========================================================= */
        $('[data-toggle]').on('click', function(event) {
            event.preventDefault();

            var toggleLayout = $(this).data('toggle');

            if (toggleLayout === 'sidebar-collapsed') {
                collapsedSidebar();
            }
        });

        $('.toggle_fullscreen').click(function() {
            toggleFullScreen();
        });

        // Add class everytime a mouse pointer hover over it
        var hoverTimeout;
        $('.nav-sidebar > li').hover(function() {
            clearTimeout(hoverTimeout);
            $(this).siblings().removeClass('nav-hover');
            $(this).addClass('nav-hover');
        }, function() {
            var $self = $(this);
            hoverTimeout = setTimeout(function() {
                $self.removeClass('nav-hover');
            }, 200);
        });

        $('.nav-sidebar > li .children').hover(function() {
            clearTimeout(hoverTimeout);
            $(this).closest('.nav-parent').siblings().removeClass('nav-hover');
            $(this).closest('.nav-parent').addClass('nav-hover');
        }, function() {
            var $self = $(this);
            hoverTimeout = setTimeout(function() {
                $(this).closest('.nav-parent').removeClass('nav-hover');
            }, 200);
        });

        // Check if sidebar is collapsed
        if ($body.hasClass('sidebar-collapsed')) {
            $('.nav-sidebar .children').css({
                display: ''
            });
        }

        createSideScroll();
        customScroll();
        scrollTop();
        detectIE();
        mobileSidebar();
    }

    /****  Resize Event Functions  ****/

    $(window).resize(function() {
        setTimeout(function() {
            customScroll();
            maximizePanel();
        }, 100);
    });

    var applicationService = {};

    applicationService.init = init;
    applicationService.customScroll = customScroll;
    applicationService.collapsedSidebar = collapsedSidebar;

    return applicationService;
}]);
