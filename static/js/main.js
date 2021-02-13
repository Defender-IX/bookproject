jQuery(document).ready(function($) {

  let window_height = $(window).height();
  let window_width = $(window).width();

  // MODAL

  $('.modal').append('<div class="modal-bg"></div>')
  $('.modal .modal-bg').on('click', function() {
    $(this).parent().removeClass('active');
  })

  $('.header-user-register').on('click', function() {
    $('.modal-register').addClass('active');
  })

  $('.header-user-login').on('click', function() {
    $('.modal-login').addClass('active');
  })

  // FORMS

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrf = getCookie('csrftoken');
  // let csrf = $('input[name=csrfmiddlewaretoken]').val();

  function checkField(field_error, name_field) {
    el = $('.form-group input[name='+name_field+']');
    if ( el.val().length > 0 ) {
      if ( field_error ) {
        el.parents('.form-group').removeClass('success');
        el.parents('.form-group').addClass('error');
        el.parent().find($('p.error')).addClass('active');
        el.parent().find($('p.error')).text(field_error);
      } else {
        el.parents('.form-group').addClass('success');
        el.parents('.form-group').removeClass('error');
        el.parent().find($('p.error')).removeClass('active');
      }
    }
  }

  $('form').submit(function(e) {
    e.preventDefault();
    // let form_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/validate-register-form/',
        // data: form_data,
        data: {
          csrfmiddlewaretoken: csrf,
          username: $('.register-form-container .form-group input[name=username]').val(),
          email: $('.register-form-container .form-group input[name=email]').val(),
          password1: $('.register-form-container .form-group input[name=password1]').val(),
          password2: $('.register-form-container .form-group input[name=password2]').val(),
        },
        headers: { "X-CSRFToken": getCookie("csrftoken") },
        success: function(response) {
          if ( response.success ) {
            $('.register-form-container form').trigger("reset");
            $('.register-error').removeClass('active');
            $('.register-success').addClass('active');
            $('.register-form-container .form-group').removeClass('success').removeClass('focus').removeClass('error');
            setTimeout(function() {
              location.reload();
            }, 1000);
          } else {
            $('.register-success').removeClass('active');
            $('.register-error').addClass('active');
          }
        },
        error: function() {
          $('.register-success').removeClass('active');
          $('.register-error').addClass('active');
          console.log('total error');
        }
    });
    return false;
  });

  $('.register-form-container .form-group input').on('keyup', function(e) {

    if (e.target.value.length > 0) {
      $.ajax({
          type: 'POST',
          url: '/validate-register-fields/',
          // data: form_data,
          data: {
            csrfmiddlewaretoken: csrf,
            username: $('.register-form-container .form-group input[name=username]').val(),
            email: $('.register-form-container .form-group input[name=email]').val(),
            password1: $('.register-form-container .form-group input[name=password1]').val(),
            password2: $('.register-form-container .form-group input[name=password2]').val(),
          },
          headers: { "X-CSRFToken": getCookie("csrftoken") },
          success: function(response) {
            checkField(response.username_error, 'username');
            checkField(response.email_error, 'email');
            checkField(response.password1_error, 'password1');
            checkField(response.password2_error, 'password2');
          },
          error: function(response) {
            // console.log(response);
          }
      });
      return false;
    } else {
      $(this).parents('.form-group').removeClass('success').removeClass('error');
    }

  });


  $('.form-group input').filter(function() {
    return $(this).is(':focus') || $(this).val()
  }).parents('.form-group').addClass('focus');

  $('.form-group input').filter(function() {
    return !$(this).is(':focus') || !$(this).val()
  }).parents('.form-group').removeClass('focus');

  $('.form-group input').focusin(function(){
    $(this).parents('.form-group').addClass('focus');
  });
  $('.form-group input').focusout(function(){
    if ( !$(this).val() ) {
      $(this).parents('.form-group').removeClass('focus');
    }
  });


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
      $('.book-chapter-body #header').removeClass('tap-toggle');
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
          if ( $('.book-chapter-pagin-menu').hasClass('tap-toggle') || $('.book-chapter-body #header').hasClass('tap-toggle') ) {

            if ( $(e.target).closest('.book-chapter-pagin-menu').length && $('.book-chapter-sidebar-widget-chapters').hasClass('active') && $(e.target).closest('.book-chapter-body #header').length ) {
                return;
            }

            $('.book-chapter-pagin-menu').removeClass('tap-toggle');
            $('.to-top').removeClass('tap-toggle');
            $('.book-chapter-body #header').removeClass('tap-toggle')

          } else {
            $('.book-chapter-body #header').addClass('tap-toggle');
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
