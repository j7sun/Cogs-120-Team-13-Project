
/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("sidebar").style.width = "50%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("sidebar").style.width = "0%";
}

// functions for countdown
$(document).ready(function () {
  let h = parseInt($('#h').text());
  let m = parseInt($('#m').text());
  let s = 3600*h + 60*m;
  $(".circle").css("animation", "countdown linear " + s + "s");
});


$("#btn-no").click(function () {
  $(".modal").css("display", "none");
});

$("#quit").click(function () {
  $(".modal#warning").css("display", "block");
});

$("#break").click(function () {
  if ($("#ticket-num").text() == 0 || $("#ticket-num").text() == null) {
    alert("You don't have enough tickets for break.")
  } else {
    $(".modal#rest").css("display", "block");
    $(".circle").css("animation-play-state", "paused");
  }
});

$("#continue").click(function () {
  $(".circle").css("animation-play-state", "running");
  $(".modal#rest").css("display", "none");
});

$("#question_mark").click(function (){
   $(".modal#popup").css("display", "block");
});

$("#close").click(function () {
  $(".modal#popup").css("display", "none");
});

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(minutes + ":" + seconds);

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

jQuery(function ($) {
  var fiveMinutes = 60 * 5,
    display = $('#time');
  startTimer(fiveMinutes, display);
});



// functions for tasks

$("ul").on("click", "span", function (event) {
  var task = $(this).parent().text();
  $(this).parent().fadeOut(function () {
    $(this).remove();
  });
  event.stopPropagation();
  $.ajax({
    url: '/deleteTodo', 
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ todo: task })
  });
});

$("input[type = 'text']").on("keypress", function (event) {
  if (event.which === 13) {
    var todoText = $(this).val();
    $(this).val("");
    $("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " + todoText + "</li>");
    $.ajax({
      url: '/addTodo', 
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ todo: todoText })
    });
  }
});

$(".fa-plus").click(function () {
  $("input[type='text']").fadeToggle(300);
});


$("input[name='ticket_num']").focus(function () {
  setInterval(function () {
    var total = parseInt($('input[name="ticket_val"]').val()) * parseInt($('input[name="ticket_num"]').val());
    $('.box h2').text(total);
  }, 500);
})

// method for set clock

$("#btn-next").click(function () {
  // data["jic006"]["tasks"].push({});
  const task = {};

  $("#hour li").each(function () {
    const dis = $(this).position().top;
    if (dis == 60) {
      task["hour"] = $(this).text();
    }
  });

  $("#min li").each(function () {
    const dis = $(this).position().top;
    if (dis == 60) {
      task["min"] = $(this).text();
    }
  });

  const list = [];
  $("#list li").each(function() {
    list.push($(this).text());
  });

  task['list'] = list;

  $.ajax({
    url: '/addTask', 
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(task)
  });

});

//function for history


