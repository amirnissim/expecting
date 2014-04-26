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
  now = new Date(),
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
    display.addEventListener('click', function() {
      input.focus();
    });

    input.addEventListener('change', function() {
      display.textContent = localStorage[input.id] = input.value;
      calc();
    });
  }

  function init() {
    // state
    if (!localStorage['state'] || localStorage['state'] === 'settings') {
      openSettings();
    }

    elements.inputDate.value = elements.inputDisplay.textContent =
      localStorage['inputDate'] || '2014-01-05';

    elements.targetDate.value = elements.targetDisplay.textContent =
      now.toISOString().split('T')[0];

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

    elements.outputMain.textContent = weeks;
    elements.outputSub.textContent =
      days ? 'AND {#days} DAYS'.replace('{#days}', days) : '';

    elements.dueDate.textContent = dueDate.toLocaleDateString();
    elements.progressFg.style.width =
      parseInt(delta / pregnancyInDays * 100) + '%';
  }

  init();
  calc();

})();