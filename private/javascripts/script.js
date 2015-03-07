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

  $("#fwd").click(function(e) {
    e.preventDefault();
    $(document.body).html("<iframe id=\"video\" src=\"//www.youtube.com/embed/eh7lp9umG2I?rel=0&autoplay=1&controls=0&showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>")
    $("#video").css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });;
  });
});
