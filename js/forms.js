$(document).ready(function () {

	initForms();

	$("body").on("click", ".btn-filter", function () {

		var curBtn = $(this);


		$(".filter-wrapper-expandable").slideToggle(250, function () {

			curBtn.toggleClass("active");

			$(".filter-wrapper-expandable").toggleClass("active");

		});

	});

	$(".filter").on("changed.bs.select", "select", function () {

		$(this).closest(".filter").find("input[type=submit]").prop("disabled", false);
		$(this).closest(".filter").find(".btn-form-reset").removeAttr("disabled");

	});



	// Forms END

});



function validateForms() {

	jQuery.validator.addClassRules('phone-email-group', {
		require_from_group: [1, ".phone-email-group"]
	});
	$("select").not(".location-tabs-select").not(".filter-form select").on("change", function () {
		if (!$(this).closest(".picker").length && !$(this).hasClass("faq-select")) {
			$(this).valid();
		}
	});
	$("body").on("click", ".form-item", function (e) {
		if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
			$(e.target).closest(".form-item").find("select").selectpicker('toggle');
		}
	});
	$("form").each(function () {
		form = $(this);
		$(this).validate({
			focusInvalid: true,
			sendForm: false,
			errorPlacement: function (error, element) {
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
			unhighlight: function (element, errorClass, validClass) {
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
			invalidHandler: function (form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
					validatorcalc.errorList[0].element.focus();
				}
			},
			submitHandler: function (form) {

				if ($(form).attr("name") == "FORM_FOOTER") {
					var token_input = $("form[name='FORM_FOOTER'] input[id='recaptcha_token']");
					// Тут вставить прелоадер
					grecaptcha.ready(function () {
						grecaptcha.execute('6Lfle7UZAAAAABgO9YJ7aqspp5IaRDrNNOb76dhn', {action: 'agree'}).then(function (token) {
							$(token_input).val(token);

							$.ajax({
								type: "POST",
								data: $(form).serialize(),
								success: function () {
									// Убираем прелоадер
									formSuccess(form);
								}
							});
						});
					});

				} else if ($(form).attr("name") != "FORM_NEW_REVIEW" && $(form).attr("name") != "FORM_INFORM_ADMISSION") {
					// Тут вставить прелоадер
					$.ajax({
						type: "POST",
						data: $(form).serialize(),
						success: function () {

							// Убираем прелоадер
							formSuccess(form);
						}
					});

				}

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

(function ($) {
	$.fn.autogrow = function () {
		return this.each(function () {
			var textarea = this;
			$(textarea).on("focus keyup input blur", function () {
				$(textarea).css('height', 'auto').css('height', $(textarea)[0].scrollHeight + 2 + 'px');
			});
		});
	};

})(jQuery);

function initForms() {

	$('.textarea-autogrow').autogrow();

	$("input.input-phone").mask("+7 (999) 999-99-99");

	// File input
	/*
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

	*/

	// File input END

	// Numeric input

	/*

	$(document).on("input", ".numeric", function () {
		this.value = this.value.replace(/\D/g, '');
	});

	*/

	// Numeric input END

	// Forms

	$("select").selectpicker({
		styleBase: "",
		style: "btn-select"
	});

	$("body").on("changed.bs.select", "select", function () {

		if ($(this).val()) {

			$(this).closest(".bootstrap-select").addClass("filled");

		} else {

			$(this).closest(".bootstrap-select").removeClass("filled");

		}

	});

	$("body").on("loaded.bs.select", "select", function () {

		if ($(this).val()) {

			$(this).closest(".bootstrap-select").addClass("filled");

		} else {

			$(this).closest(".bootstrap-select").removeClass("filled");

		}


		var curSelect = $(this);

		if (curSelect.find("option[value='']").length) {

			curSelect.closest(".bootstrap-select").append('<div class="btn-select-reset"></div>');

		}

	});

	$("body").on("click", ".btn-select-reset", function () {

		$(this).closest(".bootstrap-select").find("select").val("").change().selectpicker("refresh");

	});

	$("body").on("click", ".btn-form-reset", function () {

		$(this).closest("form").find("select").val("").change().selectpicker("refresh");

	});

	$("select[multiple]").not(".simple-multi").on("shown.bs.select", function () {
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

	$("body").on("click", ".bootstrap-select .btn-save", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
		return false;
	});

	$("body").on("click", ".bootstrap-select .btn-cancel", function () {
		$(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
		return false;
	});


	$('.input-numeric').bind('keyup paste', function () {
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	if ($("input:text").length) {
		$("input:text").each(function () {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	if ($("textarea").length) {
		$("textarea").each(function () {
			if ($(this).val()) {
				$(this).prev(".placeholder").addClass("active");
			}
		});
	}

	$("body").on("focus", "input, textarea", function () {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			placeholder.addClass("active");

		}

	});

	$("body").on("blur", "input, textarea", function () {
		var el = $(this);

		if (el.parent().find(".placeholder").length) {
			var placeholder = el.parent().find(".placeholder");

			if (!el.val() || (el.hasClass("input-phone") && !/^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
				placeholder.removeClass("active");
			}

		}

	});

	$("body").on("click", ".placeholder", function (e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	});

	$("body").on("focus", "input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").addClass("focus");
	});

	$("body").on("blur", "input[type=text], input[type=email], input[type=password], textarea", function () {
		$(this).closest(".form-item").removeClass("focus")
	});

	validateForms();

}