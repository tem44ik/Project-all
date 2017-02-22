
//all init
;(function(){
    $(window).on('load',function(){
        $('.slick-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: false,
        });
        $('.header-nav').slicknav({
            prependTo:'header .header-wrap',
            label: '',
        });


        // select styler
        $('input, select').styler();
    })
})(jQuery)

