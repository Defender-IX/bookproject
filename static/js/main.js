jQuery(document).ready(function($) {

  let window_height = $(window).height() - 40;
  let window_width = $(window).width();

  // if ( window_width <= 800 ) {
  //   $(function(){
  //     $('#book-chapter .container').columnize({
  //       width : 400,
  //       height : window_height,
  //       buildOnce: false,
  //     });
  //   });
  // }

  if (window_width < 800) {
    $('.book-chapter-pagin-menu-item.chapters').on('click', function() {
      $('.book-chapter-sidebar-widget-chapters').slideToggle();
      $('body').toggleClass('overflow');
    });

    $('body').on('dblclick', function() {
      $('.book-chapter-pagin-menu').toggleClass('tap-toggle');
      $('.to-top').toggleClass('tap-toggle');
    });
  }

  $('.book-chapter-sidebar-toggle').on('click', function() {
    $('.book-chapter-content').addClass('active');
    $('.book-chapter-header').addClass('active');
    $('.book-chapter-sidebar').addClass('active');
    $('.book-chapter-sidebar-toggle').addClass('active');
    $('.to-top2').toggle();
  });

  $('.book-chapter-sidebar-bottom .close').on('click', function() {
    $('.book-chapter-content').removeClass('active');
    $('.book-chapter-header').removeClass('active');
    $('.book-chapter-sidebar').removeClass('active');
    $('.book-chapter-sidebar-toggle').removeClass('active');
    $('.to-top2').toggle();
  });

  $('.filter-color').on('click', function() {
    $('.filter-color').removeClass('active');
    $(this).addClass('active');
  });

  $('#filter-font-size').on('change', function() {
    let fz = $(this).val();
    $('.book-chapter-content').css('font-size', fz + 'px');
  });

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
