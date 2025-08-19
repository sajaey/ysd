jQuery(document).ready(function($) {

    console.log("hi");

	/*************** 
     * wow
     * ***************/

    //if (device == "desktop") {
	    new WOW().init();
    //}

	/*************** 
     * on scroll 
     * ***************/

     if ($("#home-slides-wrapper").length>0) {
        var stickyVidFlag = false;
     }

    $(window).on('scroll', function () {
        let y = $(this).scrollTop();
        if (y > 0) {
            $("#menu-button").addClass("go-black");
            $("#header").addClass("go-up");
        } else {
            $("#menu-button").removeClass("go-black");
            $("#header").removeClass("go-up");
        }
        if ($(".bg-img").length>0) {
            var $bgImg = $(".bg-img");
            if ($bgImg.isInViewport()) {
                $bgImg.addClass("in-view");
            } else {
                $bgImg.removeClass("in-view");
            }
        }
        if ($("#home-slides-wrapper").length>0) {
            if ($("#home-slides-wrapper").isInViewportThree() && stickyVidFlag == false) {
                $("#sticky-vid")[0].play();
                stickyVidFlag = true;
            }
        }
        if ($(".blocker").length>0) {
            $(".blocker").each(function(){
                if ($(this).isInViewport()) {
                    $(this).addClass("reveal");
                }
            })
        }
    });

    /*************** 
     * zoom images
     * ***************/

    if ($(".zoom-in").length>0) {
        $(".zoom-in").each(function(){
            $(this).addClass("zoom");
        })
    }

    /*************** 
     * home
     * ***************/

     if ($("#hero-1").length>0) {
		$("#hero-1").addClass("org");
		setTimeout(function(){
			$("#hero-logo").addClass("show");
		}, 400);
	}

    // vimeo

	function initHero(player) {
		$("#hero-image-1").addClass("active");
		$("#hero-image-2").addClass("active");
		setTimeout(function(){
			$("#hero-image-3").addClass("active");
			$("#hero-image-4").addClass("active");
		}, 750);
		setTimeout(function(){
			$("#hero-logo").addClass("active");
		}, 1250);
		setTimeout(function(){
			$("#hero-logo-img").addClass("show");
		}, 2250);
		setTimeout(function(){
			$("#menu-button").removeClass("go-down");
		}, 2300);
		setTimeout(function(){
			$("#hero .image-wrapper .white-bg").addClass("opp");
			$("#hero .hero-logo").addClass("opp");
		}, 2400);
		setTimeout(function(){
			$("#header").removeClass("go-down");
		}, 2700);
		setTimeout(function(){
			$("#hero-image-1").removeClass("active");
			$("#hero-image-2").removeClass("active");
			$("#hero-image-3").removeClass("active");
			$("#hero-image-4").removeClass("active");
			$("#hero-logo-img").removeClass("show");
			$("#hero-logo").removeClass("active");
		}, 3800);
		setTimeout(function(){
			$("#hero-image-5").show();
		}, 4600);
		setTimeout(function(){
			$("#hero-image-5").addClass("active");
		}, 4650);
        setTimeout(function(){
            player.play();
		}, 5000);
		setTimeout(function(){
			$("#hero-arrow-down").addClass("up");
		}, 5500);
	}

    function initHeroAlt(player) {
        player.play();
		$("#hero-image-1").hide();
		$("#hero-image-2").hide();
        $("#hero-image-3").hide();
        $("#hero-image-4").hide();
		$("#hero-logo").hide();
		$("#hero-logo-img").hide();
        $("#menu-button").removeClass("go-down");
        $("#hero .image-wrapper .white-bg").addClass("opp");
        $("#hero .hero-logo").addClass("opp");
        $("#header").removeClass("go-down");
        $("#hero-arrow-down").addClass("up");
        $("#hero-image-5").show();
        //
        $("#header-logo").attr("data-wow-delay", ".2s");
        $("#menu-button").attr("data-wow-delay", ".4s");
        $("#hero-headline").attr("data-wow-delay", ".6s");
        $("#hero-text").attr("data-wow-delay", ".8s");
        //
		setTimeout(function(){
			$("#hero-image-5").addClass("active");
		}, 240);
	}

    if ($("#page-hero-arrow").length > 0) {
        var arrowCircle = new ProgressBar.Circle("#arrow-circle", {
          strokeWidth: 3,
          trailWidth: 0,
          easing: "easeInOut",
          duration: 1000,
          color: "rgba(255,255,255,0.44)",
        });
        setTimeout(function () {
          $("#arrow-line").addClass("step-a");
        }, 6600);
        setTimeout(function () {
          arrowCircle.animate(1);
        }, 7000);
        setTimeout(function () {
          $("#arrow-diagonal-2").addClass("show");
        }, 7400);
        setTimeout(function () {
          $("#arrow-diagonal-1").addClass("show");
        }, 7800);
    }

	if ($("#hero-image-1").length>0) {
		//
        var options = {
            id: 562699692,
            background: true,
            loop: true,
            quality: '1080p'
        };
        //
        if (device == "desktop") {
            var player = new Vimeo.Player('hero-video', options);
            player.pause();
		    //
            if (sessionStorage.getItem("sawOnce") == "yes") {
                initHeroAlt(player);
            } else {
                initHero(player);
                sessionStorage.setItem("sawOnce", "yes")
            }
        } else {
            //initHeroAlt(player);
        }
	}

    /*************
     * 
     * mobile hero
     */

     if (device == "mobile") {
        if ($("#hero").length>0) {
            var trueVh = window.innerHeight;
		    $("#hero").css("height", trueVh + "px");
        }
        if ($("#our-menu-wrapper").length>0) {
            var trueVh = window.innerHeight;
		    $("#our-menu-wrapper").css("height", trueVh + "px");
        }
    }

    /*************** 
     * covers
     * ***************/

	if ($("#page-cover-image").length>0) {
		$("#page-cover-image").addClass("reg");
	}

    /*****************
     * go to
     */

    $(".goto").click(function(){
        let target = $(this).attr("data-target");
        $('html,body').animate({scrollTop:$("#"+target).offset().top}, 320, 'easeInOutQuint');
    });

    /*************
     * 
     * menu
     */

    $("body").on("click", "#menu-button", function(){
        let state = $(this).attr("data-state");
        if (state == "opened") {
            closeMenu();
            $("#menu-button").attr("data-state", "closed");
        } else {
            openMenu();
            $("#menu-button").attr("data-state", "opened");
        }
    })

    function openMenu() {
        $("#menu").addClass("show");
        $("#menu-button").addClass("rotate");
        setTimeout(function(){
            $("#menu-items").addClass("show");
            $("#header").addClass("to-place");
        }, 400);
        setTimeout(function(){
            $("#menu-langs").addClass("show");
        }, 500);
        setTimeout(function(){
            $("#menu-contact").addClass("show");
        }, 600);
    }
    
    function closeMenu() {
        $("#menu").removeClass("show");
        $("#menu-button").removeClass("rotate");
        $("#header").removeClass("to-place");
        setTimeout(function(){
            $("#menu-items").removeClass("show");
            $("#menu-langs").removeClass("show");
            $("#menu-contact").removeClass("show");

        }, 400);
    }

    $("body").on("mouseenter", "#menu-items li", function(){
        $("#menu-items li").addClass("low-opacity");
        $(this).removeClass("low-opacity");
    })

    $("body").on("mouseleave", "#menu-items li", function(){
        $("#menu-items li").removeClass("low-opacity");
    })

    /*************
     * 
     * mobile hero
     */

    if (device == "mobile") {
        if ($("#hero").length>0) {
            var trueVh = window.innerHeight;
		    $("#hero").css("height", trueVh + "px");
        }
    }

    /*********************
	 * hero
	 */

	if ($("#hero-media").length>0) {
		$("#hero-media").addClass("active");
	}

    /*********************
	 * our story
	 */

    if ($("#story-slides").length>0) {
        var storySlides = $("#story-slides li").length;
        if (storySlides > 0) {
            var storySlidesInterval = $("#story-slides").attr("data-interval");
            $("#story-slide-1").addClass("active");
            setTimeout(function(){
                setInterval(function(){
                    var position = parseInt($("#story-slides").attr("data-position"));
                    if (position < storySlides) {
                        var newPosition = position + 1;
                    } else {
                        var newPosition = 1;
                    }
                    //
                    var currSlide = $("#story-slide-"+position);
                    var nextSlide = $("#story-slide-"+newPosition);
                    //
                    currSlide.removeClass("active");
                    nextSlide.addClass("active");
                    $("#story-slides").attr("data-position",newPosition);
                }, storySlidesInterval);
            }, 2000);
        }
    }

    if ($("#special-gallery")) {
        setInterval(function(){
            var specialGalleryTimeOut = 0; 
            $("#special-gallery .image-wrapper").each(function(){
                var that = $(this);
                specialGalleryTimeOut = specialGalleryTimeOut + 400;
                setTimeout(function(){
                    if (that.hasClass("one")) {
                        that.removeClass("one");
                        that.addClass("two");
                    } else if (that.hasClass("two")) {
                        that.removeClass("two");
                        that.addClass("three");
                    } else if (that.hasClass("three")) {
                        that.removeClass("three");
                        that.addClass("one");
                    }
                }, specialGalleryTimeOut);
            })  
        }, 5000);
    }

    /*********************
	 * ys experience
	 */

    if ($("#experience-slides").length>0) {
        var experienceSlides = $("#experience-slides li").length;
        if (experienceSlides > 0) {
            var experienceSlidesInterval = $("#experience-slides").attr("data-interval");
            $("#experience-slide-1").addClass("active");
            setTimeout(function(){
                setInterval(function(){
                    var position = parseInt($("#experience-slides").attr("data-position"));
                    if (position < experienceSlides) {
                        var newPosition = position + 1;
                    } else {
                        var newPosition = 1;
                    }
                    //
                    var currSlide = $("#experience-slide-"+position);
                    var nextSlide = $("#experience-slide-"+newPosition);
                    //
                    currSlide.removeClass("active");
                    nextSlide.addClass("active");
                    $("#experience-slides").attr("data-position",newPosition);
                }, experienceSlidesInterval);
            }, 2000);
        }
    }   

    /*******************
     * values
     */

    if ($(".top-blocker").length>0) {
        $(".top-blocker").addClass("reveal");
    }

    if ($(".top-blocker-0").length>0) {
        $(".top-blocker-0").addClass("reveal");
    }

    if ($(".top-blocker-200").length>0) {
        setTimeout(function(){
            $(".top-blocker-200").addClass("reveal");
        }, 200)
    }

    if ($(".top-blocker-400").length>0) {
        setTimeout(function(){
            $(".top-blocker-400").addClass("reveal");
        }, 400)
    }

    if ($(".top-blocker-600").length>0) {
        setTimeout(function(){
            $(".top-blocker-600").addClass("reveal");
        }, 600)
    }

    /*************
     * sticky stuff
     */

    if ($(".media-sticky").length > 0 && device == "desktop") {
        $(".media-sticky").stick_in_parent({
            "offset_top": 0
        });
    }

    if ($("#join-left-right").length > 0 && device == "desktop") {
        $("#join-on-right").stick_in_parent({
            "offset_top": 80
        });
    }

    /*************
     * jobs
     */

    $(".jobs .job h4").click(function(){
        $(this).parents(".job").toggleClass("active");
    })

    $("body").on("click", ".upload-media", function() {
        $(this)
          .parents(".form-row")
          .find("input.wpcf7-file")
          .trigger("click");
    });
    
    $("body").on("change", "input.wpcf7-file", function() {
        var theValue = $(this).val();
        if (theValue.length == 0) {
            $(this)
                .parents(".form-row")
                .find(".upload-media")
                .find(".fa")
                .removeClass("fa-check")
                .addClass("fa-cloud-upload");
            $(this)
                .parents(".form-row")
                .find(".upload-media")
                .find("span")
                .text("Attach your CV");
        } else {
            $(this)
                .parents(".form-row")
                .find(".upload-media")
                .find(".fa")
                .removeClass("fa-cloud-upload")
                .addClass("fa-check");
            $(this)
                .parents(".form-row")
                .find(".upload-media")
                .find("span")
                .text(theValue);
        }
    });

    $("body").on("click", ".open-job", function() {
        let title = $(this).attr("data-title");
        $("#join-job").val(title);
        openPopup("job-form");
    });

    /*************
     * get in touch
     */

    document.addEventListener( 'wpcf7mailsent', function(event) {
        if ($("#popup-job-form").length>0) {
            closePopup("job-form");
        }
		openPopup("thanks");
	}, false );

    /***************
     * innovation
     */

    $(".area").click(function(){
        $(this).toggleClass("active");
    })

});