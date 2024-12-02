(function ($) {
  "use strict";

  /*==================================================================
    [ Focus input ]*/

  /*Start Sign In Page */
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  /*=============End Sign In Page========================= */

  /*Start Reset Page */

  $("#emailphone").val();

  /*==============End Reset Page ============================*/

  function toggleScrolled() {
    const $body = $("body");
    const $header = $("#header");
    if (
      !$header.hasClass("scroll-up-sticky") &&
      !$header.hasClass("sticky-top") &&
      !$header.hasClass("fixed-top")
    )
      return;
    $(window).scrollTop() > 100
      ? $body.addClass("scrolled")
      : $body.removeClass("scrolled");
  }

  $(window).on("scroll", toggleScrolled);
  $(window).on("load", toggleScrolled);

  const $mobileNavToggleBtn = $(".mobile-nav-toggle");

  function mobileNavToogle() {
    $("body").toggleClass("mobile-nav-active");
    $mobileNavToggleBtn.toggleClass("bi-list bi-x");
  }

  $mobileNavToggleBtn.on("click", mobileNavToogle);

  // Hide mobile nav on same-page/hash links
  $("#navmenu a").on("click", function () {
    if ($("body").hasClass("mobile-nav-active")) {
      mobileNavToogle();
    }
  });

  // Toggling the dropdown in navmenu
  $(".navmenu .toggle-dropdown").on("click", function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("active");
    $(this).parent().next().toggleClass("dropdown-active");
    e.stopImmediatePropagation();
  });

  // Preloader
  const $preloader = $("#preloader");
  if ($preloader.length) {
    $(window).on("load", function () {
      $preloader.remove();
    });
  }

  // Scroll top button
  const $scrollTop = $(".scroll-top");

  function toggleScrollTop() {
    if ($scrollTop.length) {
      $(window).scrollTop() > 100
        ? $scrollTop.addClass("active")
        : $scrollTop.removeClass("active");
    }
  }

  $scrollTop.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });

  $(window).on("load", toggleScrollTop);
  $(document).on("scroll", toggleScrollTop);

  // Animation on scroll function and init
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  $(window).on("load", aosInit);

  // Initiate glightbox
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  // Frequently Asked Questions Toggle
  $(".faq-item h3, .faq-item .faq-toggle").on("click", function () {
    $(this).parent().toggleClass("faq-active");
  });

  // Function to initialize Swiper
  function initSwiper() {
    $(".init-swiper").each(function () {
      let config = JSON.parse($(this).find(".swiper-config").html().trim());

      if ($(this).hasClass("swiper-tab")) {
        initSwiperWithCustomPagination(this, config);
      } else {
        new Swiper(this, config);
      }
    });
  }

  $(window).on("load", initSwiper);

  // Correct scrolling position upon page load for URLs containing hash links
  $(window).on("load", function (e) {
    if (window.location.hash) {
      let $section = $(window.location.hash);
      if ($section.length) {
        setTimeout(function () {
          let scrollMarginTop = parseInt($section.css("scrollMarginTop"));
          $("html, body").animate(
            {
              scrollTop: $section.offset().top - scrollMarginTop,
            },
            "smooth"
          );
        }, 100);
      }
    }
  });

  // Navmenu Scrollspy
  let $navmenulinks = $(".navmenu a");

  function navmenuScrollspy() {
    $navmenulinks.each(function () {
      if (!this.hash) return;
      let $section = $(this.hash);
      if (!$section.length) return;
      let position = $(window).scrollTop() + 200;
      if (
        position >= $section.offset().top &&
        position <= $section.offset().top + $section.outerHeight()
      ) {
        $(".navmenu a.active").removeClass("active");
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  }

  $(window).on("load", navmenuScrollspy);
  $(document).on("scroll", navmenuScrollspy);
})(jQuery);
