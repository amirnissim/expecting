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
    dueDate: $('#dueDate'),
    calc: $('#calc')
  };

  function init() {
    elements.inputDate.value = '2014-01-05';
    elements.targetDate.value = now.toISOString().split('T')[0];

    elements.inputDate.addEventListener('change', calc);
    elements.targetDate.addEventListener('change', calc);

    elements.calc.addEventListener('click', calc);
  }

  function calc() {
    var
    t1 = (new Date(elements.inputDate.value)).getTime(),
    t2 = (new Date(elements.targetDate.value)).getTime(),

    dueDate = new Date(t1 + pregnancyInWeeks * 7 * oneDayInMs),

    delta = (t2 - t1) / (oneDayInMs),
    weeks = parseInt(delta / 7),
    days = delta % 7,
    output = '';

    if (weeks) {
      output += weeks + ' weeks'
    }
    if (days) {
      output += ' ' + days + ' days'
    }

    elements.output.textContent = 'You are ' + output + ' pregnant';
    elements.dueDate.textContent = 'Due date is ' + dueDate.toISOString().split('T')[0];
  }

  init();

})();