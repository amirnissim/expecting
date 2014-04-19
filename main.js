(function() {
  'use strict';

  function $(s) {
    return document.querySelector(s);
  }

  var
  now = new Date(),
  oneDayInMs = 24 * 60 * 60 * 1000,
  pregnancyInWeeks = 40, // weeks
  elements = {
    inputDate: $('#inputDate'),
    inputDisplay: $('#inputDisplay'),

    targetDate: $('#targetDate'),
    targetDisplay: $('#targetDisplay'),

    output: $('#output'),
    outputMain: $('#outputMain'),
    outputType: $('#outputType'),
    outputSub: $('#outputSub'),
    dueDate: $('#dueDate')
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
    initDate(elements.inputDate, elements.inputDisplay);
    initDate(elements.targetDate, elements.targetDisplay);

    elements.inputDate.value = elements.inputDisplay.textContent =
      localStorage['inputDate'] || '2014-01-05';

    elements.targetDate.value = elements.targetDisplay.textContent =
      now.toISOString().split('T')[0];
  }

  function calc() {
    var
    t1 = (new Date(elements.inputDate.value)).getTime(),
    t2 = (new Date(elements.targetDate.value)).getTime(),

    dueDate = new Date(t1 + pregnancyInWeeks * 7 * oneDayInMs),

    delta = (t2 - t1) / (oneDayInMs),
    weeks = parseInt(delta / 7),
    days = delta % 7;

    elements.outputMain.textContent = weeks ? weeks : days;
    elements.outputType.textContent = weeks ?
                                      (weeks > 1 ? 'weeks' : 'week') :
                                      (days > 1 ? 'days' : 'day');

    elements.outputSub.textContent = '';
    if (weeks && days) {
      elements.outputSub.textContent =
        'and {#days} days'.replace('{#days}', days);
    }

    elements.dueDate.textContent =
      '(due date is ' + dueDate.toLocaleDateString() + ')';
  }

  init();
  calc();

})();