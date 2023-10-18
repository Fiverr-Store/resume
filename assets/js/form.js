$(document).ready(function () {
	// form validation and ajax call

	$("#contact-form").submit(function (evt) {
		var form = $(this);
		evt.preventDefault();
		$("#result").hide();

    const email = $("#EMAIL").val();
    const name = $("#NAME").val();
    const subject = $("#SUBJECT").val();
    const phone = $("#PHONE").val();

    if (name.length == "") {
			$(".nameError").text("Name is required");
			$(".name").addClass("is-invalid");
		} else {
			$(".name").removeClass("is-invalid");
		}

		$(".name").focusin(function () {
			$(".name").removeClass("is-invalid");
		});
		$(".name").focusout(function () {
			if ($(this).val() === "") {
				$(".nameError").text("Name is required");
				$(".name").addClass("is-invalid");
			} else {
				$(".name").removeClass("is-invalid");
			}
		});




		if (email.length == "") {
			$(".emailError").text("Email is required");
			$(".email").addClass("is-invalid");
		} else {
			$(".email").removeClass("is-invalid");
		}

		$(".email").focusin(function () {
			$(".email").removeClass("is-invalid");
		});
		$(".email").focusout(function () {
			if ($(this).val() === "") {
				$(".emailError").text("Email is required");
				$(".email").addClass("is-invalid");
			} else {
				$(".email").removeClass("is-invalid");
			}
		});


    if (subject.length == "") {
      $(".subError").text("Target industry or Job Title");
      $(".subject").addClass("is-invalid");
    } else {
      $(".subject").removeClass("is-invalid");
    }


    $(".subject").focusin(function () {
      $(".subject").removeClass("is-invalid");
    });
    $(".subject").focusout(function () {
      if ($(this).val() === "") {
        $(".subError").text("Target industry or Job Title");
        $(".subject").addClass("is-invalid");
      } else {
        $(".subject").removeClass("is-invalid");
      }
    });


		// check and isert email
		if (
		  name.length != "" &&
      email.length != "" &&
      subject.length != ""
		) {
			$.ajax({
				type: "POST",
				url: "send_mail.php",
				data: {
          name: name,
          email: email,
          subject: subject,
          phone: phone,

				},
				dataType: "JSON",

				beforeSend: function () {
					// Before we send the request, remove the .hidden class from the spinner and default to inline-block.
					$("#loader-ajax").removeClass("hidden");
				},

				success: function (feedback) {
					if (feedback.status === "success") {
						$("#resultS").html(feedback.message);
						$("#S_Modal").modal("show");
						form.trigger("reset");
					} else if (feedback.status === "error") {
						$("#result").html(feedback.message);
						$("#result").show();
						form.trigger("reset");
					}
				},

				complete: function () {
					// Set our complete callback, adding the .hidden class and hiding the spinner.
					$("#loader-ajax").addClass("hidden");
				},
			}); /// ajax call add-user
		}
	}); // submit form
});
