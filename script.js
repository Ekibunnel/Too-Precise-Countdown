const starttime = new Date();
const deadline = new Date(Date.parse("2020-12-10T01:59:59+0200"));

function getTimeRemaining() {
  const diff = Math.floor(window.performance.now()*1000000);
  var days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds;
  var total = Date.parse(deadline)*1000000 - (starttime*1000000 + diff);
  if (total <= 0) {
    total = days = hours = minutes = seconds = milliseconds = microseconds = nanoseconds = 0;
  } else {
    nanoseconds = Math.floor(total % 1000);
    microseconds = Math.floor((total / 1000) % 1000);
    milliseconds = Math.floor((total / 1000000) % 1000);
    seconds = Math.floor((total / 1000000000) % 60);
    minutes = Math.floor((total / 1000000000 / 60) % 60);
    hours = Math.floor((total / (1000000000 * 60 * 60)) % 24);
    days = Math.floor(total / (1000000000 * 60 * 60 * 24));
  }
  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    microseconds,
    nanoseconds
  };
}

function updateClock() {
  const t = getTimeRemaining();
  daysSpan.innerHTML = t.days;
  hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
  minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
  secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  millisecondsSpan.innerHTML = ('00' + t.milliseconds).slice(-3);
  microsecondsSpan.innerHTML = ('00' + t.microseconds).slice(-3);
  nanosecondsSpan.innerHTML = ('00' + t.nanoseconds).slice(-3);
  if (t.total > 0) {
    window.requestAnimationFrame(updateClock)
  }
}

function initializeClock(id) {
  window.clock = document.getElementById(id);
  window.daysSpan = clock.querySelector('.days');
  window.hoursSpan = clock.querySelector('.hours');
  window.minutesSpan = clock.querySelector('.minutes');
  window.secondsSpan = clock.querySelector('.seconds');
  window.millisecondsSpan = clock.querySelector('.milliseconds');
  window.microsecondsSpan = clock.querySelector('.microseconds');
  window.nanosecondsSpan = clock.querySelector('.nanoseconds');

  updateClock();
  window.requestAnimationFrame(updateClock);
}

initializeClock('clockdiv');
