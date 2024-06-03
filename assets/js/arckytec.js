(function ($) {
  "use strict";

  // FullHeight
  function fullHeight() {
    $('.full-height').css("height", $(window).height());
  }
  
  // Social Button Hover
  function hoverTab() {
    $('.project-four__title-box ul li').hover(function () {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
    });
  }
  function hoverTab2() {
    $('.project-three__project-list .cs-hover_tab-2').hover(function() {
      $(this).addClass('active');
    }, function() {
      $(this).removeClass('active');
    });
  }

  // Dynamic Background
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  // Video 
  if ($(".video-holder-wrap").length > 0) {
    function videoint() {
        const w = $(".background-vimeo").data("vim"),
            bvc = $(".background-vimeo"),
            bvmc = $(".media-container"),
            bvfc = $(".background-vimeo iframe "),
            vch = $(".video-container");
        bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
        $(".video-holder").height(bvmc.height());
        if ($(window).width() > 1024) {
            if ($(".video-holder").length > 0)
                if (bvmc.height() / 9 * 16 > bvmc.width()) {
                    bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                    bvfc.css({
                        "margin-left": -1 * $("iframe").width() / 2 + "px",
                        top: "-75px",
                        "margin-top": "0px"
                    });
                } else {
                    bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                    bvfc.css({
                        "margin-left": -1 * $("iframe").width() / 2 + "px",
                        "margin-top": -1 * $("iframe").height() / 2 + "px",
                        top: "50%"
                    });
                }
        } else if ($(window).width() < 760) {
            $(".video-holder").height(bvmc.height());
            bvfc.height(bvmc.height());
        } else {
            $(".video-holder").height(bvmc.height());
            bvfc.height(bvmc.height());
        }
        vch.css("width", $(window).width() + "px");
        vch.css("height", Number(720 / 1280 * $(window).width()) + "px");
        if (vch.height() < $(window).height()) {
            vch.css("height", $(window).height() + "px");
            vch.css("width", Number(1280 / 720 * $(window).height()) + "px");
        }
    }
    videoint();
  }	

  //Progress Bar / Levels
  if ($(".progress-levels .progress-box .bar-fill").length) {
    $(".progress-box .bar-fill").each(
      function () {
        $(".progress-box .bar-fill").appear(function () {
          var progressWidth = $(this).attr("data-percent");
          $(this).css("width", progressWidth + "%");
        });
      }, {
        accY: 0
      }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
        accY: 0
      }
    );
  }

  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate({
          scrollTop: $(target).offset().top
        },
        1000
      );

      return false;
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").each(function () {
      let self = $(this);
      self.validate({
        // initialize the plugin
        rules: {
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true
          },
          subject: {
            required: true
          }
        },
        submitHandler: function (form) {
          // sending value with ajax request
          $.post(
            $(form).attr("action"),
            $(form).serialize(),
            function (response) {
              $(form).parent().find(".result").append(response);
              $(form).find('input[type="text"]').val("");
              $(form).find('input[type="email"]').val("");
              $(form).find("textarea").val("");
            }
          );
          return false;
        }
      });
    });
  }

  // mailchimp form
  if ($(".mc-form").length) {
    $(".mc-form").each(function () {
      var Self = $(this);
      var mcURL = Self.data("url");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          // appending response
          mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          // making things based on response
          if (resp.result === "success") {
            // Do stuff
            Self.removeClass("errored").addClass("successed");
            mcResp.removeClass("errored").addClass("successed");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
        }
      });
    });
  }

  //Popup
  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }

  //Menu Class
  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }
  if ($(".service-details__sidebar-service-list").length) {
    // dynamic current class
    let mainNavUL = $(".service-details__sidebar-service-list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu__list").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu__list").outerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }
  if ($(".sticky-header__content").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".sticky-header__content");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      close_sidebar();
    });
  }
  
	if($('body').hasClass('one-page-home')) {
		$(".mobile-nav__container .main-menu__list").on("click", 'li a', function (e) {
			close_sidebar();
		});
	}
  
  function close_sidebar() {
	  $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
  }

  //Search
  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  //Odometer
  if ($(".odometer").length) {
    var odo = $(".odometer");
    odo.each(function () {
      $(this).appear(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  //WOW
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  // window load event
  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    fullHeight();
    hoverTab2();
    hoverTab()

    if ($('.curved-circle').length) {
      $('.curved-circle').circleType({
        position: 'absolute',
        dir: 1,
        radius: 100,
        forceHeight: true,
        forceWidth: true
      });
    }

    if ($('.curved-circle-2').length) {
      $('.curved-circle-2').circleType({
        position: 'relative',
        dir: 1,
        radius: 100,
        forceHeight: true,
        forceWidth: true
      });
    }

    if ($('.curved-circle-3').length) {
      $('.curved-circle-3').circleType({
        position: 'relative',
        dir: 1,
        radius: 80,
        forceHeight: true,
        forceWidth: true
      });
    }

    if ($(".marquee_mode").length) {
      $('.marquee_mode').marquee({
          speed: 35,
          gap: 0,
          delayBeforeStart: 0,
          direction: 'left',
          duplicated: true,
          pauseOnHover: true,
          startVisible:true,
      });
    }

    if ($(".marquee_mode-two").length) {
      $('.marquee_mode-two').marquee({
          speed: 35,
          gap: 0,
          delayBeforeStart: 0,
          direction: 'right',
          duplicated: true,
          pauseOnHover: true,
          startVisible:true,
      });
    }
  });

  // window scroll event
  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 130;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });

  // Transformations
  if ($(".before-after-twentytwenty").length) {
    $(".before-after-twentytwenty").each(function () {
      var Self = $(this);
      var objName = Self.attr("id");
      $("#" + objName).twentytwenty();

      // hack for bs tab
      $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
        var paneTarget = $(e.target).attr("data-target");
        var $thePane = $(".tab-pane" + paneTarget);
        var twentyTwentyContainer = "#" + objName;
        var twentyTwentyHeight = $thePane.find(twentyTwentyContainer).height();
        if (0 === twentyTwentyHeight) {
          $thePane.find(twentyTwentyContainer).trigger("resize");
        }
      });
    });
  }

  $(function () {
    $(window).trigger('resize');
    dynamicBackground();
  });

})(jQuery);