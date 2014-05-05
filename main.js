(function() {
  'use strict';

  function $(s) {
    return document.querySelector(s);
  }
  function openSettings() {
    localStorage['state'] = document.body.dataset.state = 'settings';
  }
  function closeSettings() {
    localStorage['state'] = 'page';
    delete document.body.dataset.state;
  }

  var
  isTouch = 'ontouchstart' in window,

  now = new Date(),
  strToday = now.toISOString().split('T')[0],

  oneDayInMs = 24 * 60 * 60 * 1000,

  pregnancyInWeeks = 40,
  pregnancyInDays = pregnancyInWeeks * 7,

  elements = {
    inputDate: $('#inputDate'),
    inputDisplay: $('#inputDisplay'),

    targetDate: $('#targetDate'),
    targetDisplay: $('#targetDisplay'),

    output: $('#output'),
    outputMain: $('#outputMain'),
    outputSub: $('#outputSub'),
    dueDate: $('#dueDate'),
    progressFg: $('#progressFg'),

    openSettings: $('#openSettings'),
    closeSettings: $('#closeSettings')
  };

  function initDate(input, display) {
    if (isTouch) {
      display.addEventListener('click', function() {
        input.focus();
      });
    }

    input.addEventListener('change', function() {
      display.textContent = localStorage[input.id] = input.value;
      if (isTouch && input.value === strToday) {
        display.textContent = 'Today';
      }
      calc();
    });
  }

  function init() {
    document.body.dataset.isTouch = isTouch;

    // state
    if (!localStorage['state'] || localStorage['state'] === 'settings') {
      openSettings();
    }

    elements.inputDate.value = elements.inputDisplay.textContent =
      localStorage['inputDate'] || strToday;

    elements.targetDate.value = strToday;
    elements.targetDisplay.textContent = 'Today';

    // settings panel
    elements.openSettings.addEventListener('click', openSettings);
    elements.closeSettings.addEventListener('click', closeSettings);
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27 /* esc */) {
        closeSettings();
      }
    });

    // date inputs
    initDate(elements.inputDate, elements.inputDisplay);
    initDate(elements.targetDate, elements.targetDisplay);
  }

  function calc() {
    var
    t1 = (new Date(elements.inputDate.value)).getTime(),
    t2 = (new Date(elements.targetDate.value)).getTime(),

    dueDate = new Date(t1 + pregnancyInWeeks * 7 * oneDayInMs),

    delta = (t2 - t1) / (oneDayInMs),
    weeks = parseInt(delta / 7),
    days = delta % 7;

    elements.outputMain.textContent = weeks || 0;
    elements.outputSub.textContent = days ?
      ('AND {#days} ' + (days > 1 ? 'DAYS' : 'DAY')).replace('{#days}', days) : '';

    elements.dueDate.textContent = dueDate.toLocaleDateString();
    elements.progressFg.style.width =
      parseInt(delta / pregnancyInDays * 100) + '%';
  }

  init();
  calc();

})();


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-38103508-4', 'expecting.mobi');
ga('send', 'pageview');
