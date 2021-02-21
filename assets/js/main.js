"use strict";

jQuery(document).on('ready', function () {

    jQuery(window).on('scroll', function () {
        animateElement();
    });

    //Add before and after "blockquote" custom class
    jQuery('blockquote.inline-blockquote').prev('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').next('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').css('display', 'table');

    //Placeholder show/hide
    jQuery('input, textarea').focus(function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').blur(function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });


    jQuery(".site-content").fitVids();

    jQuery(".default-menu ul:first").addClass('sm sm-clean main-menu');
});



jQuery(window).on('load', function () {

    //Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });


    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });



//Show-Hide header sidebar
    jQuery('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
    jQuery('.main-menu, .search-field').on('click', function (e) {
        e.stopPropagation();
    });

    contactFormWidthFix();

    jQuery('.grid-item').not('.hidden').addClass('loaded');

    //Fix for portfolio/gallery item text
    jQuery('.portfolio-text-holder').each(function () {
        jQuery(this).find('.portfolio-info').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('.portfolio-info').innerHeight()) * 0.5);
    });
    jQuery('.carousel-slider .slick-slide .item-text').each(function () {
        jQuery(this).find('a').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('a').innerHeight()) * 0.5);
    });

    //Image / Testimonial Slider Config
    jQuery(".image-slider, .testimonial-slider").each(function () {
        var id = jQuery(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var dots = window[id + '_dots'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;
        dots = (dots === 'true') ? true : false;

        jQuery('#' + id).slick({
            arrows: false,
            dots: dots,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: false,
            adaptiveHeight: true
        });
    });


    var g_speed_value = window['gallery_speed'];
    var g_auto_value = window['gallery_auto'];
    g_auto_value = (g_auto_value === 'true') ? true : false;

    jQuery(".carousel-slider").slick({
        arrows: true,
        dots: false,
        infinite: true,
        centerMode: true,
        variableWidth: true,
        speed: g_speed_value,
        autoplaySpeed: g_speed_value,
        autoplay: g_auto_value,
        pauseOnHover: true
    });

    jQuery('.carousel-slider .slick-slide .item-text').each(function () {
        jQuery(this).find('a').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('a').innerHeight()) * 0.5);
    });


    portfolioLoadMore();

    // Animate the elemnt if is allready visible on load
    animateElement();

    jQuery('.doc-loader').fadeOut('slow');

});


jQuery(window).on('resize', function () {

    contactFormWidthFix();

    //Fix for portfolio/gallery item text
    jQuery('.portfolio-text-holder').each(function () {
        jQuery(this).find('.portfolio-info').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('.portfolio-info').innerHeight()) * 0.5);
    });
    jQuery('.carousel-slider .slick-slide .item-text').each(function () {
        jQuery(this).find('a').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('a').innerHeight()) * 0.5);
    });
});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var animateElement = function (e) {

    jQuery(".animate").each(function (i) {

        var top_of_object = jQuery(this).offset().top;
        var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
        if ((bottom_of_window) > top_of_object) {
            jQuery(this).addClass('show-it');
        }

    });

};


var contactFormWidthFix = function () {
    jQuery('.wpcf7 input[type=text], .wpcf7 input[type=email], .wpcf7 textarea').innerWidth(jQuery('.wpcf7-form').width());
};

var multiClickFunctionStop = function (e) {
    if (jQuery(e.target).is('.menu-wraper') || jQuery(e.target).is('.menu-right-part') || jQuery(e.target).is('.menu-holder') || jQuery(e.target).is('#toggle') || jQuery(e.target).is('#toggle div'))
    {

        jQuery('#toggle, .menu-wraper').off("click");
        jQuery('#toggle').toggleClass("on");
        if (jQuery('#toggle').hasClass("on"))
        {
            jQuery('.header-holder').addClass('down');
            jQuery('.menu-wraper, .menu-holder').addClass('show');
            jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        } else
        {
            jQuery('.header-holder').removeClass('down');
            jQuery('.menu-wraper, .menu-holder').removeClass('show');
            jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        }
    }
};

var portfolioLoadMore = function (e) {
    jQuery('.more-posts-portfolio').on("click", function () {        
        jQuery('#portfolio').find(".hidden").slice(0,4).removeClass("hidden").addClass("animate loaded");
        jQuery('.portfolio-text-holder').each(function () {
            jQuery(this).find('.portfolio-info').css('margin-top', (jQuery(this).innerHeight() - jQuery(this).find('.portfolio-info').innerHeight()) * 0.5);
        });                
        animateElement();
        if (!jQuery('#portfolio').find(".hidden").length)
        {
            jQuery('.more-posts-portfolio').hide();
        }
    });
};

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

var SendMail = function () {

    var emailVal = jQuery('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
        jQuery.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = jQuery.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}