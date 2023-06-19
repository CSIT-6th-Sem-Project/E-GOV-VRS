'use strict';

(function ($) {
$(window).on('load', function () {
  
    $('.featured__controls li').on('click', function () {
        console.log('hello');
        $('.featured__controls li').removeClass('active');
        $(this).addClass('active');
    });
    if ($('.featured__filter').length > 0) {
        var containerEl = document.querySelector('.featured__filter');
        var mixer = mixitup(containerEl);
    }
});})(jQuery);