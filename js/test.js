let seconds = 8;
if (String(seconds).length == 1) {
  seconds = seconds.toString().split("");
  seconds.unshift(0);
  seconds = seconds.join("");
}

seconds = parseInt(seconds);
