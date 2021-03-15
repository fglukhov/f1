if ($("#mobile-indicator").css("display") == "none") {

	var is_mobile = true;

} else {

	var is_mobile = true;

}



function animateAll() {

	if ($("#mobile-indicator").css("display") == "none" && !$("body").hasClass("animated")) {

		$("body").addClass("animated");

		var controller = new ScrollMagic.Controller();

		// Headers

		$(".section-header").each(function (index, element) {

			var headerTween = TweenMax.to($(element), .7, {
				x: 0,
				opacity: 1,
				ease: Sine.easeOut,
				overwrite: "none",
			});

			var headerScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0
			})
				.setTween(headerTween)
				.addTo(controller);

		});

		// Headers END

		// Texts

		$(".text-wrapper").each(function (index, element) {

			var textTween = TweenMax.to($(element), .7, {
				x: 0,
				opacity: 1,
				ease: Sine.easeOut,
				overwrite: "none",
				delay: .3
			});

			var textScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0
			})
				.setTween(textTween)
				.addTo(controller);

		});

		// Texts END

		// Sliders

		$(".custom-slider-wrapper").each(function (index, element) {

			var sliderTween = TweenMax.to($(element), .7, {
				x: 0,
				opacity: 1,
				ease: Sine.easeOut,
				overwrite: "none",
				delay: .6
			});

			var sliderScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0
			})
				.setTween(sliderTween)
				.addTo(controller);

		});

		// Sliders END

		// Pros

		$(".pros-tmb").each(function (index, element) {

			var prosTween = TweenMax.to($(element), .7, {
				x: 0,
				opacity: 1,
				ease: Sine.easeOut,
				delay: $(element).prevAll().length * .3,
				overwrite: "none",
			});

			var prosScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0
			})
				.setTween(prosTween)
				.addTo(controller);

		});

		// Pros END

		// Contacts map

		var contactsMapTween = TweenMax.to($(".contacts-map"), 1, {
			scale: 1,
			opacity: 1,
			ease: Back.easeOut.config(1.7),
			overwrite: "none",
			delay: .5
		});

		var contactsMapScene = new ScrollMagic.Scene({
			triggerElement: ".section-location",
			offset: 100
		})
			.setTween(contactsMapTween)
			.addTo(controller);

		// Contacts map END

		// Services

		$(".services-block").each(function (index, element) {

			var servicesTween = TweenMax.to($(element), 1, {
				x: 0,
				opacity: 1,
				ease: Sine.easeOut,
				delay: $(element).prevAll().length * .5,
				overwrite: "none",
			});

			var servicesScene = new ScrollMagic.Scene({
				triggerElement: element.closest(".section"),
				offset: 0
			})
				.setTween(servicesTween)
				.addTo(controller);

		});

		// Services END

	} else if ($("#mobile-indicator").css("display") == "block") {

		$("body").removeClass("animated");

		//controller = controller.enabled(false);
		//controller = controller.destroy(true);

	}

}

$(window).on("resize", function () {

	animateAll();

});

$(document).ready(function () {

	animateAll();

});


$(window).on("resize scroll load", function () {







});

(function( $ ) {
	$.fn.prlx = function(pTrigger, yStart, yFinish, fromTop) {

		if (!is_mobile && $(this).length) {

			var obj = $(this);

			var yPos;

			if (fromTop == false && $(window).scrollTop() < pTrigger.offset().top - $(window).height()) {

				yPos = yStart;

			} else if (fromTop == false && $(window).scrollTop() > pTrigger.offset().top + $(window).height()) {

				yPos = yFinish;


			} else {

				if (fromTop) {

					if (pTrigger.offset().top <= $(window).scrollTop()) {

						var percentOffset = (pTrigger.offset().top - $(window).scrollTop()) / ($(window).height() * 2);

					} else {

						percentOffset = 0;

					}

				} else {

					var percentOffset = (pTrigger.offset().top + $(window).height() - $(window).scrollTop()) / ($(window).height() * 2);

				}

				var yRange = yStart - yFinish,
					posInRange = yRange * percentOffset,
					yPos = posInRange + yFinish;

				obj.attr("percentOffset", percentOffset);

			}

			TweenMax.to(obj, .5, {y: yPos, ease:Linear.ease});

		}

	};
})( jQuery );
