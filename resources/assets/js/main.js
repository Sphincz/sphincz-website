(function($) {
    "use strict" // Start of use strict

    // Closes responsive menu when a scroll trigger link is clicked
    var $navbarResponsive = $("#navbarResponsive")
    // "a:not([data-toggle])" - to avoid issues caused
    // when you have dropdown inside navbar
    $navbarResponsive.on("click", "a:not([data-toggle])", null, function () {
        $navbarResponsive.collapse('hide')
    })

    // Collapse the navbar when page is scrolled
    var $navbar = $('.navbar')
    $(window).scroll(function() {
        if ($navbar.offset().top > 10) {
            $navbar.addClass("navbar-shrink")
        } else {
            $navbar.removeClass("navbar-shrink")
        }
    })

})(jQuery) // End of use strict
