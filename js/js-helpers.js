// global vars

const baseUrl = jQuery("#helper").attr("data-url");
const current = jQuery("#container").attr("data-page");

const windowWidth = jQuery(window).width();

let device = "desktop";
if (windowWidth < 1025) {
    device = "mobile";
}

const windowHeight = jQuery(window).height();

// if in viewport

jQuery.fn.isInViewport = function() {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + jQuery(this).outerHeight();
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

jQuery.fn.isInViewportTwo = function() {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + jQuery(this).outerHeight();
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + 55;
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

jQuery.fn.isInViewportThree = function() {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + jQuery(this).outerHeight();
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + (jQuery(window).height() / 3);
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// define easeInOutQuint

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  easeInOutQuint: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
  }
});

// validate email address

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(
	/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i
	);
	return pattern.test(emailAddress);
}

// validate mobile phone

function isValidMobilePhone(phoneNumber) {
  var pattern = new RegExp(
    ///^[0][5][0|2|4|5]{1}[-]{0,1}[2|3|4|5|6|7|8|9][0-9]{6}$/
    /^[0][5][0|1|2|3|4|5|8]{1}[2|3|4|5|6|7|8|9][0-9]{6}$/
  );
  return pattern.test(phoneNumber);
}
	
// loader

function showLoader() {
	jQuery("#loader-wrapper").show();
	setTimeout(function() {
		jQuery("#loader-wrapper").addClass("show");
	}, 50);
}

function hideLoader() {
	jQuery("#loader-wrapper").removeClass("show");
	setTimeout(function() {
		jQuery("#loader-wrapper").hide();
	}, 300);
}

// popups

function openPopup(target) {
    jQuery("#popup-" + target).show();
    setTimeout(function () {
        jQuery("#popup-" + target).addClass("show");
    }, 50);
}

function closePopup(target) {
    jQuery("#popup-" + target).removeClass("show");
    setTimeout(function () {
        jQuery("#popup-" + target).hide();
    }, 300);
}

function switchPopup(target,current) {
    closePopup(current);
    setTimeout(function () {
        openPopup(target);
    }, 300);
}

jQuery("body").on("click", ".open-popup", function () {
    let target = jQuery(this).attr("data-target");
    openPopup(target);
});

jQuery("body").on("click", ".close-popup", function (e) {
    let target = jQuery(this).attr("data-target");
    closePopup(target);
});

jQuery("body").on("click", ".switch-popup", function (e) {
	let target = jQuery(this).attr("data-target");
	let current = jQuery(this).attr("data-current");
    switchPopup(target,current);
});

// forms 

function validateForm(formEl) {
	jQuery(".required").removeClass("error");
	jQuery(".required.multiple-cb-wrapper label").removeClass("error");
    let validated = true;
    formEl.find(".required").each(function(e) {
      	let input = jQuery(this);
      	if (input.is("input") || input.is("select") || input.is("textarea")) {
			let inputVal = input.val();
			if (input.is("input") && input.attr("name") == "email") {
				if (
					inputVal == "" ||
					inputVal == null ||
					!isValidEmailAddress(inputVal)
				) {
					input.addClass("error");
					validated = false;
				}
			} else if (input.is("input") && input.attr("name") == "phone") {
				if (
					inputVal == "" ||
					inputVal == null ||
					!isValidMobilePhone(inputVal)
				) {
					input.addClass("error");
					validated = false;
				}
			} else if (input.is("input") && input.attr("name") == "fullname") {
				if (
					inputVal == "" ||
					inputVal == null ||
					inputVal.trim().indexOf(" ") == -1
				) {
					input.addClass("error");
					validated = false;
				}
			} else {
				if (inputVal == "" || inputVal == null) {
					input.addClass("error");
					validated = false;
				}
			}
      	} else if (input.is("div.multiple-cb-wrapper")) {
			let oneCbisChecked = false;
			input.find("input").each(function(){
				if (jQuery(this).prop('checked') == true) {
					oneCbisChecked = true;
				}
			})
			if (oneCbisChecked == false) {
				input.find("label").addClass("error");
				validated = false;
			}
		}
    })
    return validated;
}

function getFormNonce(formEl) {
	let formId = formEl[0].id;
	let formName = formId.replace("form-","");
	//alert(formName+"security");
	let nonce = jQuery("#"+formName+"security").val();
	return nonce;
}

function clearForm(formEl) {
	formEl.find("input").each(function(e) {
		jQuery(this).val("");
	});
	formEl.find("select").each(function(e) {
		jQuery(this).val("");
	});
	formEl.find("textarea").each(function(e) {
		jQuery(this).val("");
	});
}

// file upload

jQuery("body").on("click", ".like-upload-button", function(){
	jQuery(this).siblings(".file-upload-hide").trigger("click");
})

jQuery("body").on("change", ".file-upload-hide", function() {
	var files = jQuery(this)[0].files;
	var filesNames = "";
	for (var i = 0; i < files.length; i++) {
		filesNames += files[i].name;
	}
	if (jQuery(this).siblings(".like-upload-button").hasClass("w-image")) {
		jQuery(this).siblings(".like-upload-button").removeClass("w-image").find(".image-wrapper").remove();
	}
	jQuery(this).siblings(".like-upload-button").find(".text").html(filesNames);

});