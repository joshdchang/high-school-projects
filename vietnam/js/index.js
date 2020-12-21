var countDownDate = new Date("June 29, 2019 10:00:00 EDT").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML = "<span class='days num'>" + days + "</span><span class='in'>:</span><span class='hours num'>" + hours + "</span><span class='in'>:</span><span class='minutes num'>" + minutes + "</span><span class='in'>:</span><span class='seconds num'>" + seconds + "</span>";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "ICEP Vietnam 1 has started!";
  }
}, 1000);