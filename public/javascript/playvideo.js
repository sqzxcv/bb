function pasueVideo() {

    $('.cd-popup').addClass('is-visible');
}

jQuery(document).ready(function ($) {
    //open popup
    // $('.cd-popup-trigger').on('click', function (event) {
    //     event.preventDefault();
    //     $('.cd-popup').addClass('is-visible');
    // });

    //close popup
    // $('.cd-popup').on('click', function (event) {
    //     if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
    //         event.preventDefault();
    //         $(this).removeClass('is-visible');
    //     }
    // });
    $('.cd-popup').click(function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.cd-popup-cancel')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });

    if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('pasueVideo', onmessage, false);
    } else if (typeof window.attachEvent != 'undefined') {
        //兼容IE
        window.attachEvent('pasueVideo', onmessage);
    }
});

var onmessage = function (event) {
    var data = event.data;
    var origin = event.origin;
    //需要做的事
    if (data == "pasueVideo") {
        pasueVideo();
    }
};