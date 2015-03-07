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

  var playVideo = function(movieID, name, stopText) {
    $(document.body).html("<div id=\"overlay\"></div><iframe id=\"video\" src=\"//www.youtube.com/embed/" + movieID + "?rel=0&autoplay=1&controls=0&showinfo=0&loop=1&playlist=" + movieID + "\" frameborder=\"0\" allowfullscreen></iframe>")
    $("#video").css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
    ga('send', 'event', name, 'click', 'FWD', 1);
    window.onbeforeunload = function () {
            return stopText;
    }
    function prevent() {
        window.onbeforeunload = function () { };
    };
  };

  var playYoutube = function() {
    return playVideo("vSUW-Z_Cnc0", "bearforce", "But... Bear...Force...One....");
  };

  var charQueue = [];

  $(document).keypress(function(e) {
    if (charQueue.length == 0 && e.which == 102) {
      charQueue.push(e.which);
    } else if (charQueue.length == 1 && e.which == 119) {
      charQueue.push(e.which);
    } else if (charQueue.length == 2 && e.which == 100) {
      playYoutube();
    } else {
      charQueue = [];
    }
  });

  $("#fwd").click(function(e) {
    e.preventDefault();
    playYoutube();
  });
});
