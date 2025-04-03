/**
 * Template Name: MyResume - v2.2.1
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  'use strict'

  // Hero typed
  if ($('.typed').length) {
    let typed_strings = $('.typed').data('typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    })
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function (e) {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      const target = $(this.hash)
      if (target.length) {
        e.preventDefault()

        const scrollto = target.offset().top

        $('html, body').animate(
          {
            scrollTop: scrollto
          },
          1500,
          'easeInOutExpo'
        )

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active')
          $(this).closest('li').addClass('active')
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('.mobile-nav-toggle i').toggleClass(
            'icofont-navigation-menu icofont-close'
          )
        }
        return false
      }
    }
  })

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      const initial_nav = window.location.hash
      if ($(initial_nav).length) {
        const scrollto = $(initial_nav).offset().top
        $('html, body').animate(
          {
            scrollTop: scrollto
          },
          1500,
          'easeInOutExpo'
        )
      }
    }
  })

  $(document).on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active')
    $('.mobile-nav-toggle i').toggleClass(
      'icofont-navigation-menu icofont-close'
    )
  })

  $(document).click(function (e) {
    const container = $('.mobile-nav-toggle')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('.mobile-nav-toggle i').toggleClass(
          'icofont-navigation-menu icofont-close'
        )
      }
    }
  })

  // Navigation active state on scroll
  const nav_sections = $('section')
  const main_nav = $('.nav-menu, #mobile-nav')

  $(window).on('scroll', function () {
    const cur_pos = $(this).scrollTop() + 300

    nav_sections.each(function () {
      const top = $(this).offset().top
      const bottom = top + $(this).outerHeight()

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active')
        }
        main_nav
          .find('a[href="#' + $(this).attr('id') + '"]')
          .parent('li')
          .addClass('active')
      }
      if (cur_pos < 200) {
        $('.nav-menu ul:first li:first').addClass('active')
      }
    })
  })

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })

  $('.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      1500,
      'easeInOutExpo'
    )
    return false
  })

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  })

  // Skills section
  $('.skills-content').waypoint(
    function () {
      $('.progress .progress-bar').each(function () {
        $(this).css('width', $(this).attr('aria-valuenow') + '%')
      })
    },
    {
      offset: '80%'
    }
  )

  // Init AOS
  function aos_init () {
    AOS.init({
      duration: 1000,
      once: true
    })
  }

  // Porfolio isotope and filter
  $(window).on('load', function () {
    const portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    })

    $('#portfolio-flters li').on('click', function () {
      $('#portfolio-flters li').removeClass('filter-active')
      $(this).addClass('filter-active')

      portfolioIsotope.isotope('reLayout', {
        filter: $(this).data('filter')
      })

      aos_init()
    })

    // Initiate venobox (lightbox feature used in portofilo)
    $('.venobox').venobox({
      share: false
    })

    // Initiate aos_init() function
    aos_init()
  })

  // Testimonials carousel (uses the Owl Carousel library)
  $('.testimonials-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  })

  // Portfolio details carousel
  $('.portfolio-details-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  })

  const lastfmData = {
    baseURL:
      'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=',
    // Your Last.fm Username
    user: 'tfkhdyt',
    // Your API key
    api_key: '7c19688950319f6a2f78417d1fc439d9',
    additional: '&format=json&limit=1'
  }

  const getSetLastFM = function () {
    $.ajax({
      type: 'GET',
      url:
        lastfmData.baseURL +
        lastfmData.user +
        '&api_key=' +
        lastfmData.api_key +
        lastfmData.additional,
      dataType: 'json',
      success: function (resp) {
        const recentTrack = resp.recenttracks.track[0]
        const formatted =
          "<img src='https://i.imgur.com/EgWjJry.png'>" + recentTrack.name
        $('a#tracktitle')
          .html(formatted)
          .attr('href', recentTrack.url)
          .attr(
            'title',
            recentTrack.name + ' by ' + recentTrack.artist['#text']
          )
          .attr('target', '_blank')

        const artistFormatted =
          "<img src='https://i.imgur.com/fae5XZA.png'>" +
          recentTrack.artist['#text']
        $('a#trackartist')
          .html(artistFormatted)
          .attr('title', 'Artist : ' + recentTrack.artist['#text'])
        $('img#trackart').attr('src', recentTrack.image[2]['#text'])
      },
      error: function (resp) {
        $('a#tracktitle').html(
          "<img src='https://i.imgur.com/EgWjJry.png'>" + 'Silence!'
        )
        $('img#trackart').attr('src', 'https://i.imgur.com/Q6cCswP.jpg')
        const artistFormatted =
          "<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha"
        $('a#trackartist')
          .html(artistFormatted)
          .attr('href', 'www.prashant.me/')
      }
    })
  }

  // Get the new one.
  getSetLastFM()
  // Start the countdown.
  setInterval(getSetLastFM, 10 * 1000)

  $(document).ready(function () {
    'use strict'

    // Scroll back to top

    const progressPath = document.querySelector('.progress-wrap path')
    const pathLength = progressPath.getTotalLength()
    progressPath.style.transition = progressPath.style.WebkitTransition =
      'none'
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength
    progressPath.style.strokeDashoffset = pathLength
    progressPath.getBoundingClientRect()
    progressPath.style.transition = progressPath.style.WebkitTransition =
      'stroke-dashoffset 10ms linear'
    const updateProgress = function () {
      const scroll = $(window).scrollTop()
      const height = $(document).height() - $(window).height()
      const progress = pathLength - (scroll * pathLength) / height
      progressPath.style.strokeDashoffset = progress
    }
    updateProgress()
    $(window).scroll(updateProgress)
    const offset = 50
    const duration = 550
    jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress')
      } else {
        jQuery('.progress-wrap').removeClass('active-progress')
      }
    })
    jQuery('.progress-wrap').on('click', function (event) {
      event.preventDefault()
      jQuery('html, body').animate(
        {
          scrollTop: 0
        },
        duration
      )
      return false
    })
  })
})(jQuery)

const scriptURL =
  'https://script.google.com/macros/s/AKfycbz4zeawNe9YCQSl4nbDV_RmtmxI5mC38UlXGbGBIq3FcLTm2AgRpcpJnZGOqiLbwiDB/exec'
const form = document.forms['submit-to-google-sheet']
const success = document.querySelector('.sent-message')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  Swal.fire({
    title: 'Mohon tunggu!',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading()
    }
  })
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
    .then((response) => {
      if (response.status == 200) {
        console.log('Success: ', response)
        Swal.hideLoading()
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan sudah saya terima',
          icon: 'success'
        })
      }
    })
    .catch((error) => {
      console.error('Error!', error.message)
      Swal.hideLoading().then(() => {
        Swal.fire({
          title: 'Gagal!',
          text: 'Pesan gagal dikirim',
          icon: 'error'
        })
      })
    })
})

new ClipboardJS('.copy')

$('.copy').click(function () {
  const that = $(this)
  that.tooltip('show')
  setTimeout(function () {
    that.tooltip('hide')
  }, 2000)
})

function swipedetect (el, callback) {
  const touchsurface = el
  let swipedir
  let startX
  let startY
  let distX
  let distY
  const threshold = 150 // required min distance traveled to be considered swipe
  const restraint = 100 // maximum distance allowed at the same time in perpendicular direction
  const allowedTime = 2000 // maximum time allowed to travel that distance
  let elapsedTime
  let startTime
  const handleswipe = callback || function (swipedir) {}

  touchsurface.addEventListener(
    'touchstart',
    function (e) {
      const touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
    },
    false
  )

  touchsurface.addEventListener(
    'touchmove',
    function (e) {
      // prevent scrolling when inside DIV
    },
    false
  )

  touchsurface.addEventListener(
    'touchend',
    function (e) {
      const touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir)
    },
    false
  )
}

// USAGE:
// var el = document.getElementById('someel')
swipedetect(document, function (swipedir) {
  // swipedir contains either "none", "left", "right", "top", or "down"
  if (swipedir == 'right' && !$('.mobile-nav-active')[0]) {
    $('body').toggleClass('mobile-nav-active')
    $('.mobile-nav-toggle i').toggleClass(
      'icofont-navigation-menu icofont-close'
    )
  } else if (swipedir == 'left' && $('.mobile-nav-active')[0]) {
    $('body').toggleClass('mobile-nav-active')
    $('.mobile-nav-toggle i').toggleClass(
      'icofont-navigation-menu icofont-close'
    )
  }
})
