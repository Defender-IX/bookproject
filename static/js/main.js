jQuery(document).ready(function($) {

  let window_height = $(window).height();
  let window_width = $(window).width();

  // BOOK CHAPTER ----------------------------------------

  if (window_width < 800) {

    let window_width = $(window).width();
    let chapter_header_height = $('.book-chapter-header').outerHeight();
    let tr = 0;
    let count = 0;
    let pages = Math.floor( $('.book-chapter-content p').height() / window_height );

    $('.book-chapter-pagin-menu-item.chapters').on('click', function() {
      $('.book-chapter-sidebar-widget-chapters').toggleClass('active');
      $('body').toggleClass('overflow');
    });

    $('.book-chapter-page-counts').html( 'Осталось: ' + pages );

    $(document).on('click', function(e) {

      if ( !$('.book-chapter-sidebar-widget-chapters').hasClass('active') && !$(e.target).closest('.book-chapter-pagin-menu').length ) {

        console.log( $('.book-chapter-content p').width() );

        if (e.clientX < window_width / 5) {
          // left
          if ( tr + window_width - 30 > 0 ) {
            hr = $('.book-chapter-pagin-menu-item.prev').attr('href');
            if ( hr != null ) {
              window.location.href = hr;
              return
            } else {
              return
            }
          }
          count -= 1;
          tr += window_width;
          $('.book-chapter-content').css('transform', 'translateX(' + tr + 'px)');

        } else if (e.clientX > window_width / 5 * 4) {
          // right
          if ( count + 1 > pages ) {
            hr = $('.book-chapter-pagin-menu-item.next').attr('href');
            if ( hr != null ) {
              window.location.href = hr;
              return
            } else {
              return
            }
          }
          count += 1;
          tr -= window_width;
          $('.book-chapter-content').css('transform', 'translateX(' + tr + 'px)');

        } else {
          // center
          if ( $('.book-chapter-pagin-menu').hasClass('tap-toggle') ) {

            if ( $(e.target).closest('.book-chapter-pagin-menu').length || $('.book-chapter-sidebar-widget-chapters').hasClass('active') ) {
                return;
            }

            $('.book-chapter-pagin-menu').removeClass('tap-toggle');
            $('.to-top').removeClass('tap-toggle');

          } else {
            $('.book-chapter-pagin-menu').addClass('tap-toggle');
            $('.to-top').addClass('tap-toggle');
          }
        }
      }

      $('.book-chapter-page-counts').html( 'Осталось: ' + (pages - count) );

    });

  }


  // SIDEBAR ----------------------------------------

  // $('.book-chapter-sidebar-toggle').on('click', function() {
  //   $('.book-chapter-content').addClass('active');
  //   $('.book-chapter-header').addClass('active');
  //   $('.book-chapter-sidebar').addClass('active');
  //   $('.book-chapter-sidebar-toggle').addClass('active');
  //   $('.to-top2').toggle();
  // });

  // $('.book-chapter-sidebar-bottom .close').on('click', function() {
  //   $('.book-chapter-content').removeClass('active');
  //   $('.book-chapter-header').removeClass('active');
  //   $('.book-chapter-sidebar').removeClass('active');
  //   $('.book-chapter-sidebar-toggle').removeClass('active');
  //   $('.to-top2').toggle();
  // });


  // FILTERS ----------------------------------------

  $('.filter-color').on('click', function() {
    $('.filter-color').removeClass('active');
    $(this).addClass('active');
  });

  $('#filter-font-size').on('change', function() {
    let fz = $(this).val();
    $('.book-chapter-content').css('font-size', fz + 'px');
  });


  // TO TOP ----------------------------------------

  $(window).scroll(function() {
    if ($(this).scrollTop() > 300){
      $('.to-top').addClass("active");
    }
    else{
      $('.to-top').removeClass("active");
    }
  });
  $('.to-top').on('click', function() {
    $('body, html').animate({
      scrollTop: 0
    }, 0);
  });

});
