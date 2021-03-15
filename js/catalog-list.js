$(document).ready(function() {

	console.log("test")

	$(".catalog-list-pic-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		speed: 0,
		arrows: false,
		swipe: false
	});

});

$(".catalog-list-wrapper").mouseover(function () {

	$(this).find(".catalog-list-pic").fadeIn(250);

}).on("mouseleave", function () {

	$(this).find(".catalog-list-pic").fadeOut(250);

});

$(".catalog-list-wrapper").mousemove(function(event) {

	var PosX = event.pageX,
		PosY = event.pageY,
		PosRelX = PosX - $(this).offset().left,
		PosRelY = PosY - $(this).offset().top,
		catalogListPic = $(this).find(".catalog-list-pic");

		catalogListPic.css({
			top: PosRelY - catalogListPic.outerHeight()/2
		});

});

$(".faculty-catalog-list a").on("mouseenter", function () {

	$(this).closest(".catalog-list-wrapper").find(".catalog-list-pic-slider").slick("slickGoTo", $(this).closest("li").prevAll().length);

})