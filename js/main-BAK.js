var numFormat = wNumb({
	thousand: ' '
});

$(window).on("scroll touchmove", function() {

	fixedHeader();

	var scrollPos = $(window).scrollTop();

	if ($("#md-indicator").css("display") == "block") {
		var yDiff = 60;
	} else {
		var yDiff = 70;
	}

	$("a[name]").each(function() {
		if (scrollPos > $(this).offset().top - yDiff - 10) {
			$(".navbar-nav a").removeClass("active");
			$(".navbar-nav a[href='#" + $(this).attr("name") + "']").addClass("active");
		}
	});

	// if (scrollPos > 300) {
	// 	$(".up-link").fadeIn(150);
	// } else {
	// 	$(".up-link").fadeOut(150);
	// }

});
$(window).resize(function() {

	fixedHeader();

	$(".slick-slider").slick("setPosition");

	makeUp();

});
$(window).on("load", function() {

	makeUp();

});
var baseUrl = "";

$(document).ready(function() {

	// Floor selection

	$(".plan-floor").click(function () {

		var curFloor = $(this);

		$(".plan-menu li").filter(function () {

			return curFloor.prevAll().length == $(this).prevAll().length

		}).find("a").click();

	});

	$(".plan-floor").mouseover(function () {

		$(this).addClass("active");

	}).mouseout(function () {

		$(this).removeClass("active");

	});

	$(".plan-menu a").mouseover(function () {

		var curLink = $(this);

		$(".plan-floor").filter(function () {

			return curLink.closest("li").prevAll().length == $(this).prevAll().length

		}).addClass("active");

	}).mouseout(function () {

		$(".plan-floor").removeClass("active");

	});

	// Floor selection END

	// Multiple modal close

	$(".modal").on("hidden.bs.modal", function () {

		if ($(".modal.show").length) {

			$("body").addClass("modal-open");

		}

	});

	// Multiple modal close END

	// Plan

	$("body").on("click", "[data-room-url]", function () {

		if (!$(".room-form").hasClass("processing")) {

			var curBtn = $(this);

			if (!curBtn.hasClass("selected")) {

				$.ajax({
					url: $(this).attr("data-room-url"),
					dataType: "html"
				}).done(function (data) {

					$(".room-form-descr").fadeOut(150);

					$(".rooms-list").append('<div class="selected-room" data-id="' + curBtn.closest("g").attr("id") + '" data-detail-url="' + curBtn.attr("data-room-url") + '">' + $(data).find(".room-descr").html() + '</div>');

					curBtn.addClass("selected");

				});

			} else {

				$(".selected-room[data-id='" + curBtn.closest("g").attr("id") + "'] .remove").click();

			}

		}

	});

	$("body").on("click", ".selected-room .remove", function () {

		var curBlock = $(this).closest(".selected-room");

		$(".room-form").addClass("processing");

		curBlock.fadeOut(150, function () {

			$(".floor-plan-rooms g[id='" + curBlock.attr("data-id") + "'] *").removeClass("selected");

			curBlock.remove();

			$(".room-form").removeClass("processing");

			if ($(".selected-room").length == 0) {

				$(".room-form-descr").fadeIn(150);


			}

		});

	});

	// Plan END

	makeUp();

	initSliders();

	$(".plan-menu a").click(function () {

		var curLi = $(this).closest("li");

		$(".floor-plan-slider").slick("slickGoTo", curLi.prevAll().length);

		$(".floor-menu li").removeClass("active");

		$(".floor-menu li").filter(function () {

			return $(this).prevAll().length == curLi.prevAll().length;

		}).addClass("active");

	});

	$("#floorModal").on("shown.bs.modal", function () {

		$(".floor-plan-slider").slick("setPosition");

	});

	$(".svg-inline").svgInline();

	$(".infra-slider").on("beforeChange", function(event, slick, currentSlide, nextSlide) {

		var curItem = $(".infra-item[data-index='" +  nextSlide + "']");

		curItem.find(".infra-item-ttl").click();

	});

	$("body").on("click", ".infra-item-ttl", function () {

		var curItem = $(this).closest(".infra-item"),
			activeItem = $(this).closest(".infra-list").find(".infra-item.active");

		$(".infra-slider").slick("slickGoTo", curItem.data("index"));

		if (!curItem.hasClass("active")) {

			activeItem.find(".infra-item-content").slideUp(250, function () {

				activeItem.removeClass("active");

			});

			curItem.find(".infra-item-content").slideDown(250, function () {

				curItem.addClass("active");

			});

		}


	});

	// Modal swipe

	$("body").on("swipeleft", ".profile-modal .side-modal-r", function () {

		var modalContent = $(this).closest(".modal").find(".ajax-modal-content"),
			curModal = $(this).closest(".modal");

		if (!modalContent.hasClass("animating") && curModal.find(".ajax-modal-menu a.active").closest("li").next("li").length) {

			modalContent.addClass("animating");

			TweenMax.to(modalContent, .2, {
				x: -100,
				opacity: 0,
				ease: Linear.easeNone,
				onComplete: function () {

					curModal.find(".ajax-modal-menu a.active").closest("li").next("li").find("a").click();

					TweenMax.fromTo(modalContent, .2, {
						x: 100,
						opacity: 0
					},{
						x: 0,
						opacity: 1,
						ease: Linear.easeNone,
						onComplete: function () {
							modalContent.removeClass("animating")
						}
					});

				}
			});

		}

	});

	$("body").on("swiperight", ".profile-modal .side-modal-r", function () {

		var modalContent = $(this).closest(".modal").find(".ajax-modal-content"),
			curModal = $(this).closest(".modal");

		if (!modalContent.hasClass("animating") && curModal.find(".ajax-modal-menu a.active").closest("li").prev("li").length) {

			modalContent.addClass("animating");

			TweenMax.to(modalContent, .2, {
				x: 100,
				opacity: 0,
				ease: Linear.easeNone,
				onComplete: function () {

					curModal.find(".ajax-modal-menu a.active").closest("li").prev("li").find("a").click();

					TweenMax.fromTo(modalContent, .2, {
						x: -100,
						opacity: 0
					},{
						x: 0,
						opacity: 1,
						ease: Linear.easeNone,
						onComplete: function () {
							modalContent.removeClass("animating")
						}
					});

				}
			});

		}

	});

	// Modal swipe END

	$(".btn-scroll").click(function () {

		$("[href='#directions']").click();

	});

	// Close modal

	$(".modal").click(function (e) {

		if ($(this).find(".who-item").length) {

			if (!$(e.target).hasClass("who-item") && !$(e.target).parents().hasClass("who-item")) {

				$(this).modal("hide");

			}

		} else {

			if (!$(e.target).hasClass("modal-content") && !$(e.target).parents().hasClass("modal-content")) {

				$(this).modal("hide");

			}

		}


	});

	// Close modal END

	// Ajax modals

	$("body").on("click", "[data-toggle='modal'][data-url]", function () {

		if (!$(this).closest(".room-descr").length) {

			var curModal = $($(this).attr("data-target"));

			curModal.find(".ajax-modal-content").html("").addClass("loading");

			var hashVal = $(this).attr("data-hash");

			setHashVar("modal", hashVal);

			$.ajax({
				url: $(this).attr("data-url"),
				dataType: "html"
			}).done(function (data) {

				console.log($(data))

				curModal.find(".ajax-modal-content").html($(data));

				curModal.find(".ajax-modal-content").removeClass("loading");

				curModal.find(".ajax-modal-menu a").removeClass("active");

				curModal.find(".ajax-modal-menu a[data-hash='" + hashVal + "']").addClass("active");

				curModal.find(".svg-inline").svgInline();

				curModal.on("shown.bs.modal", function () {

					initSliders();

					scrollToActive();

				});

			});

		} else {

			return false;

		}

	});

	$(".ajax-modal-menu a").on("click", function () {

		if (!$(this).hasClass("active")) {

			var curModal = $(this).closest(".modal");

			curModal.find(".ajax-modal-content").html("").addClass("loading");

			var hashVal = $(this).attr("data-hash");

			setHashVar("modal", hashVal);

			$.ajax({
				url: $(this).attr("data-url"),
				dataType: "html"
			}).done(function(data) {

				curModal.find(".ajax-modal-content").html($(data));

				curModal.find(".ajax-modal-content").removeClass("loading");

				curModal.find(".ajax-modal-menu a").removeClass("active");

				curModal.find(".ajax-modal-menu a[data-hash='" + hashVal + "']").addClass("active");

				scrollToActive();

				initSliders();

			});

		}

		return false;

	});

	var hashVars = getHashVars();

	if (hashVars["modal"]) {

		var modalLink = $("[data-toggle='modal'][data-hash='" + hashVars["modal"] + "']");

		modalLink.click();

	}

	$(".modal").on("hidden.bs.modal", function () {

		setHashVar("modal", "");

	});

	// Ajax modals END


	anchorsMenu();

	stickyBlocks();

	// Forward button

	$(".btn-fwd").click(function () {

		$("html, body").animate({

			scrollTop: $(".page-body .section:first-child").offset().top

		}, 1000);

	});

	// Forward button END

	// Poll

	quiz();

	// Poll END

	// FAQ

	$("body").on("click", ".faq-item-ttl", function () {

		if (!$(this).closest(".faq-item").hasClass("active")) {

			var faqItemActive = $(".faq-item.active"),
				faqItemCur = $(this).closest(".faq-item");

			faqItemActive.removeClass("active");
			faqItemActive.find(".faq-item-content").show().slideUp("250");

			faqItemCur.addClass("active");
			faqItemCur.find(".faq-item-content").hide().slideDown("250");

			$(".faq-answer").html(faqItemCur.find(".faq-item-content").html());

		} else {

			var faqItemCur = $(this).closest(".faq-item");

			faqItemCur.removeClass("active");
			faqItemCur.find(".faq-item-content").show().slideUp("250");

		}

	});

	// FAQ END

	// Profile menu

	$("body").on("click", ".profile-menu-ttl", function () {

		if (!$(this).closest(".profile-menu-item").hasClass("active")) {

			$(".profile-slider").slick("slickGoTo", $(this).closest(".profile-menu-item").prevAll().length);

			var profileItemActive = $(".profile-menu-item.active"),
				profileItemCur = $(this).closest(".profile-menu-item");

			profileItemActive.removeClass("active");
			profileItemActive.find(".profile-submenu").show().slideUp("250");

			profileItemCur.addClass("active");
			profileItemCur.find(".profile-submenu").hide().slideDown("250");

			$(".profile-answer").html(profileItemCur.find(".profile-submenu").html());

		} else {

			var profileItemCur = $(this).closest(".profile-menu-item");

			profileItemCur.removeClass("active");
			profileItemCur.find(".profile-submenu").show().slideUp("250");

		}

	});

	// Profile-menu END

	// Show more link

	$("body").on("click", ".show-more", function () {

		var curLink = $(this),
			curUrl = $(this).attr("href"),
			curTarget = $($(this).closest(".show-more-wrapper").parent());

		curLink.addClass("loading");

		$.ajax({
			url: curUrl,
			dataType: "html"
		}).done(function(data) {

			curTarget.append($(data)).removeClass("loading");

			curLink.closest(".show-more-wrapper").remove();;

			if ($(data).find("[data-dates]").length) {

				castFilter(curTarget.closest(".cast-over-wrapper"));

			}

		});

		return false;

	});

	// Show more link END

	childSelects();

	$("select[data-child]").on("change", function () {

		childSelects();

	});

	$(".select-modal-link").on("click", function () {

		var realSelect = $($(this).closest(".select-modal-categories").data("select"));

		realSelect.val($(this).data("value")).selectpicker("refresh");

		$(this).closest(".modal").modal("hide");

		$("[data-target='#" + $(this).closest(".modal").attr("id") + "']").addClass("active");
		$("[data-target='#" + $(this).closest(".modal").attr("id") + "'] span").html(realSelect.find("option:selected").html());

	});

	fixedHeader();

	// Ajax links

	$("body").on("click", ".ajax-link", function () {

		var curLink = $(this),
			curUrl = $(this).data("url"),
			curTarget = $($(this).data("target")),
			curSiblings = $(this).closest(".ajax-links").find(".ajax-link");

		curTarget.addClass("loading");

		$.ajax({
			url: curUrl,
			dataType: "html"
		}).done(function(data) {

			curTarget.html($(data)).removeClass("loading");

			curSiblings.removeClass("active");

			curLink.addClass("active");

			if (curLink.hasClass("location-link")) {

				$(".location-tabs-select").val(curLink.data("index"));

				if ($("#mobile-indicator").css("display") != "block") {

					$(".location-tabs-select").change();

				}

			}

		});

		return false;

	});



	$(".location-tabs-select").on("change", function () {

		if ($("#mobile-indicator").css("display") == "block") {

			$(".location-link[data-index='" + $(this).val() + "']").click();

		}

	});


	// Ajax links END

	// Anchors

	$(".navbar-nav a").click(function() {

		$(".navbar-nav a").removeClass("active");

		var curLink = $(this);

		var anchor = $(this).attr("href").replace("#","");

		var link = $(this);

		if ($("#md-indicator").css("display") == "block") {
			var yDiff = 60;
		} else {
			var yDiff = 70;
		}


		$("html,body").animate({
			scrollTop: $("a[name='"+anchor+"']").offset().top - yDiff
		},1000,function () {
			curLink.addClass("active")
		});

		history.pushState(null,null,$(this).attr("href"));

		return false;

	});

	$("body").on("click", ".page-nav li", function() {

		var curLink = $(this);

		var link = $(this);

		if ($("#mobile-indicator").css("display") == "block") {
			var yDiff = -20;
		} else {
			var yDiff = 10;
		}

		$("html,body").animate({
			scrollTop: $(".section[data-index='" + $(this).data("index") + "']").offset().top - yDiff
		},1000,function () {
			//curLink.addClass("active")
		});

	});

	// Contacts map


	if ($("#contactsMap").length && $("#modalMap").length) {

		var image = 'images/map-pin.svg',
			pinLat = 47.50194705385145,
			pinLng = 19.134747306153063;

		center = {
			lat: pinLat,
			lng: pinLng
		}

		var mapOptions = {
			center: center,
			zoom: 16,
			scrollwheel: false
		};


		var map = new google.maps.Map(document.getElementById('contactsMap'),
			mapOptions);

		//var bounds = new google.maps.LatLngBounds();

		var marker = new google.maps.Marker({
			position: {
				lat: pinLat,
				lng: pinLng
			},
			map: map,
			icon: image
		});


		var map2 = new google.maps.Map(document.getElementById('modalMap'),
			mapOptions);

		//var bounds = new google.maps.LatLngBounds();

		var marker2 = new google.maps.Marker({
			position: {
				lat: pinLat,
				lng: pinLng
			},
			map: map2,
			icon: image
		});

		//map.fitBounds(bounds, {top: 60, right: 10, left: 20, bottom: 10});

	}

	// Contacts map END




	$("[data-fancybox]").fancybox({
		closeClickOutside: true,
		backFocus: false
	});

	// Show more

	$("body").on("click", ".more-link", function () {
		var moreLink = $(this),
			moreUrl = $(this).attr("href");
		if (!moreLink.hasClass("loading")) {
			moreLink.addClass("loading");
			$.ajax({
				url: moreUrl,
				dataType: "html"
			}).done(function(data) {
				moreLink.closest(".more-link-wrapper").before($(data));
				moreLink.closest(".more-link-wrapper").remove();

				if ($(".more-link").closest(".projects-list").length) {

					$(".more-link").closest(".projects-list").find(".project-tmb").css("opacity", "1");

				}

			});
		}
		return false;
	});

	// Show more END

	$(".up-link, .header-logo").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
	});

	// Main menu

	$("body").on("click", function(e) {
		if ($("#md-indicator").css("display") == "block" && !$(e.target).hasClass("navbar-wrapper") && !$(e.target).parents().hasClass("navbar-wrapper") && !$(e.target).hasClass("navbar-trigger") && !$(e.target).parents().hasClass("navbar-trigger")) {
			$(".navbar-wrapper").fadeOut(150);
			$("body").removeClass("menu-open");
			$(".navbar-trigger").removeClass("active");
		}
	});

	$(".navbar-trigger").click(function() {
		$(this).toggleClass("active");
		$(".navbar-wrapper").fadeToggle(150);
		$("body").toggleClass("menu-open");
	});
	$(".navbar-wrapper .close, .navbar-nav a").click(function() {
		$(".navbar-wrapper").fadeOut(150);
		$("body").removeClass("menu-open");
		$(".navbar-trigger").removeClass("active");
	});

	$(".navbar-wrapper").click(function(e) {
		if (!$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner")) {
			$(".navbar-wrapper").fadeOut(150);
			$("body").removeClass("menu-open");
			$(".navbar-trigger").removeClass("active");
		}
	});

	$("body").on("click", function (e) {

		if ($("#md-indicator").css("display") != "block") {

			if (!$(e.target).hasClass("navbar-trigger") && !$(e.target).parents().hasClass("navbar-trigger") && !$(e.target).hasClass("navbar-wrapper") && !$(e.target).parents().hasClass("navbar-wrapper") && $(".navbar-trigger").hasClass("active")) {

				$(".navbar-wrapper").fadeOut(150);

				$(".navbar-trigger").removeClass("active");

			}

		}

	});

	// Expandable
	$("body").on("click", ".expandable-trigger", function() {
		var exTrigger = $(this);
		if (!exTrigger.hasClass("active")) {
			exTrigger.closest(".expandable").find(".expandable-content").slideDown(500, function() {
				exTrigger.addClass("active");
				exTrigger.find(".expandable-trigger-text").html(exTrigger.data("collapsetext"));
				exTrigger.closest(".expandable").addClass("open");
			});
		} else {
			exTrigger.closest(".expandable").find(".expandable-content").slideUp(500, function() {
				exTrigger.removeClass("active");
				exTrigger.find(".expandable-trigger-text").html(exTrigger.data("expandtext"));
				exTrigger.closest(".expandable").removeClass("open");
			});
		}

		return false;

	});

	$("input[type=file]").each(function () {

		if ($(this).data("label")) {
			var inputLabel = $(this).data("label");
		} else {
			var inputLabel = "Прикрепить файл";
		}

		$(this).fileinput({
			showUpload: false,
			showPreview: false,
			showCancel: false,
			browseLabel: inputLabel,
			msgPlaceholder: "",
			dropZoneEnabled: false,
			maxFileCount: 1,
			mainClass: "input-group-lg"
		});

	});
	// Numeric input
	$(document).on("input", ".numeric", function() {
		this.value = this.value.replace(/\D/g, '');
	});
	// Fancybox

	// Forms

	$("body").on("mouseup", "li.dropdown-header", function () {
		$(this).toggleClass("active");
		$(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
		return false;
	});

	$("select").not(".picker__select--month, .picker__select--year, .rates-nav-select").each(function () {
		if ($(this).attr("multiple")) {
			$(this).selectpicker({
				selectAllText: "Выбрать всё",
				deselectAllText: "Снять выбор",
				noneSelectedText: "",
				selectedTextFormat: "count",
				countSelectedText: function(count) {
					return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
				}
			});
		} else {
			$(this).selectpicker();
		}
	});

	$("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
		if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
			dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
			$(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
		}
	});

	$("select").on("show.bs.select", function () {

		$(this).closest(".form-group").find("label.placeholder").addClass("active");

	});

	$("select").on("hide.bs.select", function () {

		if (!$(this).val() || $(this).val() == null) {

			$(this).closest(".form-group").find("label.placeholder").removeClass("active");

		} else {

			$(this).closest(".form-group").find("label.placeholder").addClass("active");

		}

	});

	$("body").on("click",".bootstrap-select .btn-save", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
		return false;
	});

	$("body").on("click",".bootstrap-select .btn-cancel", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
		return false;
	});


	$('.input-numeric').bind('keyup paste', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	if ($("input:text").length) {
		$("input:text").each(function() {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	if ($("textarea").length) {
		$("textarea").each(function() {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	$("body").on("focus","input, textarea",function() {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			placeholder.addClass("active");

		}

	});

	$("body").on("blur","input, textarea",function() {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
				placeholder.removeClass("active");
			}

		}

	});

	$("body").on("click",".placeholder",function(e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	});

	$("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").addClass("focus");
	});

	$("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").removeClass("focus")
	});

	makeUp();

	validateForms();

	// Forms END


});

function validateForms() {
	$('.textarea-autogrow').autogrow();
	$("input.input-phone").mask("+7 (999) 999-99-99");
	jQuery.validator.addClassRules('phone-email-group', {
		require_from_group: [1, ".phone-email-group"]
	});
	$("select").not(".location-tabs-select").not(".filter-form select").on("change", function() {
		if (!$(this).closest(".picker").length && !$(this).hasClass("faq-select")) {
			$(this).valid();
		}
	});
	$("body").on("click", ".form-item", function(e) {
		if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
			$(e.target).closest(".form-item").find("select").selectpicker('toggle');
		}
	});
	$("form").each(function() {
		form = $(this);
		$(this).validate({
			focusInvalid: true,
			sendForm: false,
			errorPlacement: function(error, element) {
				if (element[0].tagName == "SELECT") {
					element.closest(".form-item").addClass("error");
					element.closest(".btn-group").addClass("btn-group-error");
					if (element.closest(".form-item").length) {
						error.insertAfter(element.closest(".form-item"));
					} else {
						error.insertAfter(element.closest(".btn-group"));
					}
				} else {
					if (element.attr("type") == "checkbox") {
						element.siblings("label").addClass("checkbox-label-error")
					} else {
						error.insertAfter(element);
						element.closest(".form-group").addClass("form-group-error");
					}
				}
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass);
				$(element).closest(".form-item").removeClass("error").addClass("valid");
				$(element).closest(".form-group").removeClass("form-group-error");
				if ($(element)[0].tagName == "SELECT") {
					$(element).closest(".form-item").removeClass("error");
					$(element).closest(".btn-group").removeClass("btn-group-error");
					if ($(element).closest(".form-item").length) {
						error.insertAfter(element.closest(".form-item"));
						$(element).closest(".form-item").next("label.error").remove();
					} else {
						$(element).closest(".btn-group").next("label.error").remove();
					}
				} else {
					$(element).next(".error").remove();
					if ($(element).attr("type") == "checkbox") {
						$(element).siblings("label").removeClass("checkbox-label-error")
					}
				}
			},
			invalidHandler: function(form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
					validatorcalc.errorList[0].element.focus();
				}
			},
			submitHandler: function(form) {
				$.ajax({
					type: "POST",
					data: $(form).serialize(),
					success: function () {
						formSuccess(form);
					}
				});
				return false;
			}
		});
		if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
			$(this).find("input.password-repeat").rules('add', {
				equalTo: "#" + form.find("input.password").attr("id")
			});
		}
	});
}
jQuery.extend(jQuery.validator.messages, {
	required: "Не заполнено поле",
	remote: "Please fix this field.",
	email: "Введите правильный e-mail.",
	url: "Please enter a valid URL.",
	date: "Please enter a valid date.",
	dateISO: "Please enter a valid date (ISO).",
	number: "Please enter a valid number.",
	digits: "Please enter only digits.",
	creditcard: "Please enter a valid credit card number.",
	equalTo: "Пароли не совпадают.",
	accept: "Please enter a value with a valid extension.",
	maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
	minlength: jQuery.validator.format("Please enter at least {0} characters."),
	rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
	range: jQuery.validator.format("Please enter a value between {0} and {1}."),
	max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
	min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function formSuccess(form) {
	$('form').find(".form-group input, .form-group textarea").val("");
	$('form').find(".placeholder").show();
	$("#successModal").modal("show");
	$('form').closest(".modal").modal("hide");
}

(function($) {
	$.fn.autogrow = function() {
		return this.each(function() {
			var textarea = this;
			$(textarea).on("focus keyup input blur", function() {
				$(textarea).css('height', 'auto').css('height', $(textarea)[0].scrollHeight + 1 + 'px');
			});
		});
	};

})(jQuery);

(function($) {
	$.fn.svgInline = function() {
		return this.each(function() {
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');
				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');
				// Replace image with new SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
	};

})(jQuery);

function fixedHeader() {

	var scrollPos = $(window).scrollTop();

	// $("main").css({
	// 	marginTop: $("header").outerHeight()
	// });

	if (scrollPos > 0) {

		if (!$("header").hasClass("header-fixed")) {

			$("header").addClass("header-fixed");

		}


	} else {

		if ($("header").hasClass("header-fixed")) {

			$("header").removeClass("header-fixed");

		}

	}

}

function childSelects() {

	$("select[data-parent]").each(function () {

		var childSelect = $(this),
			parentSelect = $($(this).data("parent"));


		var childContainer = childSelect.closest(".child-select-container");

		if (!parentSelect.val() || parentSelect.val() == "") {

			childSelect.prop("disabled", true).selectpicker("refresh");

			childContainer.hide();

		} else {

			childSelect.prop("disabled", false).selectpicker("refresh");

			childContainer.show();

		}




	});

}

function stickyBlocks() {

	if (($("#md-indicator").css("display") != "block")) {

		var stickyElements = $(".sticky-block").filter(function () {
				return !$(this).find(".news-filter").length
			}),
			topOffset = 70,
			topOffsetProgram = 0;

		$(window).on("resize scroll touchmove", function () {

			stickyElements.each(function () {

				$(this).data("orig-width", $(this).outerWidth());

				$(this).closest(".sticky-wrapper").css({
					minHeight: $(this).outerHeight()
				});

				var el = $(this),
					fixedHeaderHeight = $("header").outerHeight(),
					elHeight = $(this).outerHeight(),
					elWrapper = $(this).closest(".sticky-wrapper"),
					wrapperHeight = elWrapper.outerHeight(),
					scrollPos = $(window).scrollTop();

				let scrollCondition = scrollPos > elWrapper.offset().top - fixedHeaderHeight ;

				let stickCondition = true;

				topOffset = 0;

				topPos = 70;

				if (scrollCondition && stickCondition) {

					el.addClass("fixed").css({

						top: topPos,
						width: el.data("orig-width")

					});

					if (scrollPos > (elWrapper.offset().top + wrapperHeight - elHeight - topOffset - fixedHeaderHeight)) {

						el.css({

							marginTop: (elWrapper.offset().top + wrapperHeight - elHeight - topOffset - fixedHeaderHeight) - scrollPos

						});

					} else {

						el.css({
							marginTop: 0
						});

					}

				} else {

					el.removeClass("fixed").css({

						width: "auto",
						marginTop: 0,
						top: 0

					})

				}

			});

		});
	}
}

function anchorsMenu() {

	$(".anchors-menu a, a[href='#quiz']").click(function () {

		var curLink = $(this);

		if ($("header").hasClass("header-fixed")) {

			var headerHeight = $("header").outerHeight();

		} else {

			var headerHeight = 60;

		}

		if ($("a[name='" + curLink.attr("href").replace("#","") + "']").length) {

			$("html, body").animate({

				scrollTop: $("a[name='" + curLink.attr("href").replace("#","") + "']").offset().top - headerHeight - 50

			},1000);

		}

	});

}

function quiz() {

	// $(".poll-step-slider").slick({
	// 	fade: true,
	// 	swipe: false,
	// 	arrows: false,
	// 	rows: 0
	// });

	// $(".poll-form-step input[type=radio]").change(function () {
	//
	// 	if ($(this).is(":checked")) {
	//
	// 		$(this).closest(".poll-form-step").find(".poll-step-slider").slick("slickGoTo", $(this).closest(".form-radio").prevAll().length)
	//
	// 	}
	//
	// });

	$(".poll-form [type=submit]").attr("disabled", true);

	$(".form-checkboxes-required input[type=checkbox]").each(function () {

		if (!$(this).closest(".form-checkboxes-required").find(":checked").length) {

			$(this).closest(".form-checkboxes-required").addClass("error");

		} else {

			$(this).closest(".form-checkboxes-required").removeClass("error");

		}

	});

	$(".form-checkboxes-required input[type=checkbox]").change(function () {

		if (!$(this).closest(".form-checkboxes-required").find(":checked").length) {

			$(this).closest(".form-checkboxes-required").addClass("error");

		} else {

			$(this).closest(".form-checkboxes-required").removeClass("error");

		}

	});

	setActiveSteps();

	var pollFormSteps = $(".poll-form-step");

	var btnBack = $(".poll-form-nav .btn-back");
	var btnFwd = $(".poll-form-nav .btn-forward");
	var btnSubmit = $(".poll-form [type=submit]");

	pollFormSteps.hide();

	pollFormSteps.first().addClass("current").show();

	btnFwd.click(function () {

		if ($(".poll-form-step.current").find("input").length) {
			$(".poll-form-step.current").find("input").valid();
		}

		if ($(".poll-form-step.current").find("textarea").length) {
			$(".poll-form-step.current").find("textarea").valid();
		}


		if ($(".poll-form-step.current").nextAll(".active").length == 1) {

			// btnFwd.hide();
			// btnSubmit.show();

		}

		if ($(".poll-form-step.current").nextAll(".active").length && !$(".poll-form-step.current .error").length) {

			var curStep = $(".poll-form-step.current");

			curStep.removeClass("current").hide();

			curStep.nextAll(".active").first().fadeIn(500).addClass("current");

			if ($(".poll-form-step.current [type=submit]").length) {

				$(".poll-form-step.current [type=submit]").attr("disabled", false);

			}

			$(".poll-wrapper .btn-back").attr("disabled",false);

			quizDots();

		}


	});

	btnBack.click(function () {

		if ($(".poll-form-step.current").prevAll(".active").length) {

			if ($(".poll-form-step.current").prevAll(".active").length == 1) {

				$(".poll-wrapper .btn-back").attr("disabled",true);

			}

			var curStep = $(".poll-form-step.current");

			curStep.removeClass("current").hide();

			curStep.prevAll(".active").first().fadeIn(500).addClass("current");

			// btnFwd.show();
			// btnSubmit.hide();

			quizDots();

		}

	});

	$(".form-group-other input").focus(function () {

		if (!$(this).closest(".form-radio-text").find(".form-radio input").is(":checked")) {

			$(this).closest(".form-radio-text").find(".form-radio input").click().change();

		}


	});

	$(".poll-form input[type=checkbox], .poll-form input[type=radio]").change(function () {

		setActiveSteps();

		// if ($(this).closest(".form-radio").next(".form-group-other").length) {
		//
		// 	if ($(this).is(":checked")) {
		// 		$(this).closest(".form-radio").next(".form-group-other").fadeIn(250);
		// 	} else {
		// 		$(this).closest(".form-radio").next(".form-group-other").fadeOut(250);
		// 	}
		//
		// }

	});

	$("#pollForm").submit(function() {
		if ($(this).valid()) {
			var form = $(this);

			var quizResult = '';

			$(".poll-form-step.active").not(".last").find(".poll-question").each(function () {

				var stepTitle = "<h4>" + $(this).find(".h3").html() + "</h4>";

				var stepValue = '';

				$(this).find("input[type=checkbox], input[type=radio]").each(function () {

					if ($(this).is(":checked")) {

						stepValue += '<div>' + $(this).next("label").html() + '</div>';

						if ($(this).closest(".form-radio-text").length) {
							stepValue += '<div>' + $(this).closest(".form-radio-text").find("input[type=text]").val() + '</div>';
						}

					}

				});

				if (!$(this).find("input[type=checkbox], input[type=radio]").length) {

					if ($(this).find("input[type=text]").length) {

						stepValue += '<div>' + $(this).find("input[type=text]").val() + '</div>';

					}

					if ($(this).find("textarea").length) {

						stepValue += '<div>' + $(this).find("textarea").val() + '</div>';

					}

				}

				quizResult += stepTitle + stepValue;

			});

			console.log(quizResult);

			var dataForm = $(this).serializeArray(); // convert form to array
			dataForm.push({name: 'subject', value: "Цифровой акселератор - результат квиза"});
			dataForm.push({name: 'email', value: $("#poll_email").val()});
			dataForm.push({name: 'name', value: $("#poll_company_name").val()});
			dataForm.push({name: 'company', value: $("#poll_company").val()});
			dataForm.push({name: 'phone', value: $("#poll_phone").val()});
			dataForm.push({name: 'quizresult', value: quizResult});

			$.ajax({
				type: "POST",
				url: baseUrl + "quiz.php",
				data: $.param(dataForm)
			}).done(function() {

				formSuccess(form);

			});
			return false;
		}
	});

}

function quizDots() {

	var curIndex = $(".poll-form-step.current").prevAll(".active").length;

	$("ul.poll-dots li").removeClass("active");

	$("ul.poll-dots li").filter(function () {

		return $(this).prevAll().length == curIndex;

	}).addClass("active");

}

function setActiveSteps() {

	$(".poll-form-step").each(function () {


		var quizStep = $(this);

		if (!quizStep.data("parent") || $("#" + quizStep.data("parent")).is(":checked")) {

			quizStep.addClass("active");

		} else {

			quizStep.removeClass("active");

		}

	});

}

function getHashVars() {

	var hashString = window.location.hash;

	hashString = hashString.replace("#", "");

	var hashArray = hashString.split("&");

	var hashVars = new Array();


	for (var i in hashArray) {

		hashVar = hashArray[i].split("=");

		hashVars[hashVar[0]] = hashVar[1];

	}

	return hashVars;

}

function setHashVar(name, val) {

	var hVars = getHashVars();

	if (val) {

		hVars[name] = val;

	} else if (hVars[name]) {

		delete hVars[name];
		delete hVars[name];

	}


	history.pushState('', document.title, window.location.pathname);

	var hashString = "#";

	for (var key in hVars) {

		if (key) {

			hashString += key + "=" + hVars[key] + "&";

		}


	}

	history.pushState({}, null, hashString.substring(0, hashString.length - 1));

}

function initSliders() {

	$(".slider-countable").each(function () {

		$(this).on("init", function () {

			if (!$(this).closest(".slider-wrapper").find(".slider-count").length) {

				var curSlider = $(this),
					visibleSlides = $(this).find(".slick-slide.slick-active").length,
					curSlide = $(this).find(".slick-slide.slick-current").data("slick-index") / visibleSlides + 1,
					totalSlides = Math.round($(this).find(".slick-slide").not(".slick-cloned").length / visibleSlides);

				curSlider.closest(".slider-wrapper").append('<div class="slider-count"><span class="slider-count-cur">' + ("0" + curSlide).slice(-2) + '</span><span class="slider-count-sep">/</span><span class="slider-count-total">' + ("0" + totalSlides).slice(-2) + '</span></div>');

				if (totalSlides == 1) {

					curSlider.closest(".slider-wrapper").find(".slider-count").hide();

				}

			}

		});

		$(this).on("beforeChange", function(event, slick, currentSlide, nextSlide){

			var curSlider = $(this),
				visibleSlides = $(this).find(".slick-slide.slick-active").length,
				curSlide = nextSlide / visibleSlides + 1,
				totalSlides = $(this).find(".slick-slide").not(".slick-cloned").length / visibleSlides;

			curSlider.closest(".slider-wrapper").find(".slider-count-cur").html(("0" + curSlide).slice(-2));

			curSlider.closest(".slider-wrapper").find(".slider-count-progress-bar").css({
				width: curSlide*100/totalSlides + "%"
			});

		});

	});

	$(".custom-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: false,
				rows: 0
			});

		}

	});

	$(".floor-plan-slider").on("init", function () {

		$(".floor-menu li").on("click", function () {

			$(".floor-menu li").removeClass("active");

			$(this).addClass("active");

			$(".floor-plan-slider").slick("slickGoTo", $(this).prevAll().length);

		});

	});

	$(".floor-plan-slider").each(function () {

		if (!$(this).hasClass("slick-initialized")) {

			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: false,
				rows: 0,
				arrows: false,
				swipe: false
			});

		}

	});


}

function scrollToActive() {

	if ($("#mobile-indicator").css("display") == "block") {

		$(".modal.show .ajax-modal-menu-wrapper").stop().animate({
			scrollLeft: $(".modal.show .ajax-modal-menu a.active").closest("li").offset().left + $(".modal.show .ajax-modal-menu-wrapper").scrollLeft() - 15
		}, 200);

	}

}

function  makeUp() {

	$(".section").css({
		minHeight: $(window).height() - 130
	});

	$(".custom-slider-wrapper").css({
		height: $(window).height() - 130
	});

}