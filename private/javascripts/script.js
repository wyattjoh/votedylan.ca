$(document).ready(function() {
  var form = $("#form");
  var formMessage = $("#form-message");
  var formSubmitted = false;

  var pendingAction = function(text) {
    form.hide();

    formMessage
      .text(text)
      .addClass("pending");
  };

  var changeAction = function(className, text) {
    formMessage
      .removeClass("pending")
      .text(text)
      .addClass(className);
  };

  form.submit(function(e) {
    e.preventDefault();

    if (formSubmitted) {
      return;
    }

    formSubmitted = true;

    pendingAction("Sending your message...");

    $.ajax({
      url: '/send',
      type: 'post',
      dataType: 'json',
      data: form.serialize(),
      success: function(data) {
        if (data.status == "sent") {
          changeAction("success", "Your message was sent!");
        } else {
          changeAction("error", "Your message failed to send!");
        }
      },
      error: function() {
        changeAction("success", "Your message was sent!");
      }
    });
  });
});
