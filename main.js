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
    targetDate: $('#targetDate'),
    output: $('#output'),
    outputMain: $('#outputMain'),
    outputType: $('#outputType'),
    outputSub: $('#outputSub'),
    dueDate: $('#dueDate')
  };

  function init() {
    elements.inputDate.value = '2014-01-05';
    elements.targetDate.value = now.toISOString().split('T')[0];

    elements.inputDate.addEventListener('change', calc);
    elements.targetDate.addEventListener('change', calc);
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
      elements.outputSub.textContent = 'and {#days} days'.replace('{#days}', days);
    }

    elements.dueDate.textContent = '(due date is ' + dueDate.toLocaleDateString() + ')';
  }

  init();
  calc();

})();