// Emergency Fund Calculator
// Target fund calibrated to risk profile

(function () {
  'use strict';

  var container = document.getElementById('emergency-fund-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-ef-btn');
  var resultSection = document.getElementById('ef-result');
  var shareBtn = document.getElementById('share-ef-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    var housing = parseFloat(document.getElementById('ef-housing').value) || 0;
    var utilities = parseFloat(document.getElementById('ef-utilities').value) || 0;
    var food = parseFloat(document.getElementById('ef-food').value) || 0;
    var transport = parseFloat(document.getElementById('ef-transport').value) || 0;
    var insurance = parseFloat(document.getElementById('ef-insurance').value) || 0;
    var minimumDebt = parseFloat(document.getElementById('ef-debt-payments').value) || 0;
    var other = parseFloat(document.getElementById('ef-other').value) || 0;
    var stability = document.getElementById('ef-stability').value;
    var dependents = parseInt(document.getElementById('ef-dependents').value) || 0;
    var currentSavings = parseFloat(document.getElementById('ef-current').value) || 0;
    var monthlySave = parseFloat(document.getElementById('ef-monthly-save').value) || 0;

    var monthlyExpenses = housing + utilities + food + transport + insurance + minimumDebt + other;
    if (monthlyExpenses <= 0) return;

    // Determine target months based on risk factors
    var targetMonths = 3; // Base

    if (stability === 'unstable') targetMonths = 9;
    else if (stability === 'variable') targetMonths = 6;
    else if (stability === 'stable') targetMonths = 3;

    // Adjust for dependents
    if (dependents >= 3) targetMonths += 3;
    else if (dependents >= 1) targetMonths += 1.5;

    // Cap at 12
    if (targetMonths > 12) targetMonths = 12;

    var targetAmount = monthlyExpenses * targetMonths;
    var currentCoverage = monthlyExpenses > 0 ? currentSavings / monthlyExpenses : 0;
    var remaining = targetAmount - currentSavings;
    if (remaining < 0) remaining = 0;

    var monthsToFunded = (monthlySave > 0 && remaining > 0) ? Math.ceil(remaining / monthlySave) : 0;

    document.getElementById('result-target').textContent = formatMoney(targetAmount);
    document.getElementById('result-months-rec').textContent = targetMonths + ' months';
    document.getElementById('result-coverage').textContent = currentCoverage.toFixed(1) + ' months covered';
    document.getElementById('result-remaining').textContent = remaining > 0 ? formatMoney(remaining) + ' to go' : 'Fully funded!';

    if (monthlySave > 0 && remaining > 0) {
      var yrs = Math.floor(monthsToFunded / 12);
      var mos = monthsToFunded % 12;
      var timeStr = '';
      if (yrs > 0) timeStr += yrs + (yrs === 1 ? ' year' : ' years');
      if (yrs > 0 && mos > 0) timeStr += ', ';
      if (mos > 0) timeStr += mos + (mos === 1 ? ' month' : ' months');
      document.getElementById('result-time-to-fund').textContent = timeStr;
    } else if (remaining <= 0) {
      document.getElementById('result-time-to-fund').textContent = 'Already funded!';
    } else {
      document.getElementById('result-time-to-fund').textContent = 'Set a monthly amount to see timeline';
    }

    document.getElementById('result-monthly-expenses').textContent = formatMoney(monthlyExpenses) + '/mo';

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var target = document.getElementById('result-target').textContent;
    var months = document.getElementById('result-months-rec').textContent;
    var coverage = document.getElementById('result-coverage').textContent;

    var text = [
      'Emergency fund target (via My Contract):',
      'Target: ' + target + ' (' + months + ')',
      'Current: ' + coverage,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
