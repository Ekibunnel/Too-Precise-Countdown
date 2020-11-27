function getTimeRemaining(starttime, endtime) {
  const diff = Math.floor(window.performance.now()*1000000);
  const total = Date.parse(endtime)*1000000 - (starttime*1000000 + diff);
  const nanoseconds = Math.floor(total % 1000);
  const microseconds = Math.floor((total / 1000) % 1000);
  const milliseconds = Math.floor((total / 1000000) % 1000);
  const seconds = Math.floor((total / 1000000000) % 60);
  const minutes = Math.floor((total / 1000000000 / 60) % 60);
  const hours = Math.floor((total / (1000000000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000000000 * 60 * 60 * 24));

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

function initializeClock(id, starttime, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  const millisecondsSpan = clock.querySelector('.milliseconds');
  const microsecondsSpan = clock.querySelector('.microseconds');
  const nanosecondsSpan = clock.querySelector('.nanoseconds');

  function updateClock() {
    const t = getTimeRemaining(starttime, endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    millisecondsSpan.innerHTML = ('00' + t.milliseconds).slice(-3);
    microsecondsSpan.innerHTML = ('00' + t.microseconds).slice(-3);
    nanosecondsSpan.innerHTML = ('00' + t.nanoseconds).slice(-3);

    if (t.total <= 0 && timeinterval) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1);
}

const starttime = new Date();
const deadline = new Date(Date.parse("2020-12-10T01:59:59+0200"));
initializeClock('clockdiv', starttime, deadline);
