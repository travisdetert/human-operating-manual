// Savings Goal Calculator
// Solve for time or monthly amount to reach a goal

(function () {
  'use strict';

  var container = document.getElementById('savings-goal-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-sg-btn');
  var resultSection = document.getElementById('sg-result');
  var shareBtn = document.getElementById('share-sg-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    var goal = parseFloat(document.getElementById('sg-goal').value);
    var current = parseFloat(document.getElementById('sg-current').value) || 0;
    var months = parseInt(document.getElementById('sg-months').value) || 0;
    var monthly = parseFloat(document.getElementById('sg-monthly').value) || 0;
    var returnRate = parseFloat(document.getElementById('sg-return').value) || 0;

    if (!goal || goal <= 0) return;

    var remaining = goal - current;
    if (remaining <= 0) {
      document.getElementById('result-sg-primary').textContent = 'Goal already reached!';
      document.getElementById('result-sg-monthly-needed').textContent = formatMoney(0) + '/mo';
      document.getElementById('result-sg-time').textContent = 'Now';
      document.getElementById('result-sg-interest').textContent = formatMoney(0);
      document.getElementById('result-sg-total-contributed').textContent = formatMoney(current);
      resultSection.style.display = 'block';
      return;
    }

    var monthlyRate = returnRate / 100 / 12;

    if (months > 0 && monthly <= 0) {
      // Solve for monthly payment needed
      // FV = current*(1+r)^n + PMT*[((1+r)^n - 1)/r] = goal
      // PMT = (goal - current*(1+r)^n) / [((1+r)^n - 1)/r]
      var fvCurrent = monthlyRate > 0
        ? current * Math.pow(1 + monthlyRate, months)
        : current;
      var remaining2 = goal - fvCurrent;

      if (remaining2 <= 0) {
        document.getElementById('result-sg-primary').textContent = 'Your current savings will grow to cover this!';
        document.getElementById('result-sg-monthly-needed').textContent = formatMoney(0) + '/mo';
      } else if (monthlyRate > 0) {
        var factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        var neededMonthly = remaining2 / factor;
        document.getElementById('result-sg-primary').textContent = formatMoney(neededMonthly) + '/mo needed';
        document.getElementById('result-sg-monthly-needed').textContent = formatMoney(neededMonthly) + '/mo';
      } else {
        var neededMonthly = remaining2 / months;
        document.getElementById('result-sg-primary').textContent = formatMoney(neededMonthly) + '/mo needed';
        document.getElementById('result-sg-monthly-needed').textContent = formatMoney(neededMonthly) + '/mo';
      }

      var totalContrib = fvCurrent <= goal ? (goal - fvCurrent) : 0;
      var interestEarned = goal - current - totalContrib;
      if (interestEarned < 0) interestEarned = 0;

      document.getElementById('result-sg-time').textContent = months + ' months';
      document.getElementById('result-sg-interest').textContent = formatMoney(interestEarned);
      document.getElementById('result-sg-total-contributed').textContent = formatMoney(current + totalContrib);

    } else if (monthly > 0) {
      // Solve for months to reach goal
      var balance = current;
      var totalMonths = 0;
      var maxM = 1200;

      while (balance < goal && totalMonths < maxM) {
        balance += monthly;
        balance *= (1 + monthlyRate);
        totalMonths++;
      }

      var totalContributed = current + (monthly * totalMonths);
      var interestEarned = balance - totalContributed;
      if (interestEarned < 0) interestEarned = 0;

      var y = Math.floor(totalMonths / 12);
      var m = totalMonths % 12;
      var timeStr = '';
      if (y > 0) timeStr += y + (y === 1 ? ' year' : ' years');
      if (y > 0 && m > 0) timeStr += ', ';
      if (m > 0 || y === 0) timeStr += m + (m === 1 ? ' month' : ' months');

      if (totalMonths >= maxM) {
        document.getElementById('result-sg-primary').textContent = 'Over 100 years — increase contributions';
      } else {
        document.getElementById('result-sg-primary').textContent = 'Goal reached in ' + timeStr;
      }

      document.getElementById('result-sg-monthly-needed').textContent = formatMoney(monthly) + '/mo';
      document.getElementById('result-sg-time').textContent = timeStr;
      document.getElementById('result-sg-interest').textContent = formatMoney(interestEarned);
      document.getElementById('result-sg-total-contributed').textContent = formatMoney(totalContributed);

    } else {
      return; // Need either months or monthly
    }

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var primary = document.getElementById('result-sg-primary').textContent;
    var interest = document.getElementById('result-sg-interest').textContent;
    var goalAmt = document.getElementById('sg-goal').value;

    var text = [
      'Savings goal: $' + parseInt(goalAmt).toLocaleString() + ' (via My Contract)',
      primary,
      'Interest earned: ' + interest,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
