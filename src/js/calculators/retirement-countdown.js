// Retirement Countdown Calculator
// FIRE number, projected savings, income gap analysis

(function () {
  'use strict';

  var container = document.getElementById('retirement-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-retire-btn');
  var resultSection = document.getElementById('retire-result');
  var shareBtn = document.getElementById('share-retire-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function futureValue(monthlyAmount, annualRate, years) {
    var monthlyRate = annualRate / 12;
    var months = years * 12;
    if (monthlyRate === 0) return monthlyAmount * months;
    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  function calculate() {
    var age = parseInt(document.getElementById('current-age').value);
    var currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
    var monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    var returnRate = parseFloat(document.getElementById('return-rate').value) || 7;
    var annualExpenses = parseFloat(document.getElementById('annual-expenses').value);
    var otherIncome = parseFloat(document.getElementById('other-income').value) || 0;
    var targetAge = parseInt(document.getElementById('target-age').value) || 65;
    var swr = parseFloat(document.getElementById('swr').value) || 4;

    if (!age || !annualExpenses || annualExpenses <= 0) return;

    var yearsToRetirement = targetAge - age;
    if (yearsToRetirement < 0) yearsToRetirement = 0;

    var annualRate = returnRate / 100;
    var monthlyRate = annualRate / 12;

    // FIRE number
    var annualNeed = annualExpenses - otherIncome;
    if (annualNeed < 0) annualNeed = 0;
    var fireNumber = annualNeed / (swr / 100);

    // Projected savings at target age
    // FV of current savings + FV of contributions
    var fvCurrent = currentSavings * Math.pow(1 + annualRate, yearsToRetirement);
    var fvContributions = futureValue(monthlyContribution, annualRate, yearsToRetirement);
    var projectedSavings = fvCurrent + fvContributions;

    // Income gap/surplus
    var annualWithdrawal = projectedSavings * (swr / 100);
    var totalRetirementIncome = annualWithdrawal + otherIncome;
    var gap = totalRetirementIncome - annualExpenses;

    // How long money lasts (drawdown simulation)
    var balance = projectedSavings;
    var drawdownYears = 0;
    var maxYears = 60;
    while (balance > 0 && drawdownYears < maxYears) {
      balance = balance * (1 + annualRate) - annualExpenses + otherIncome;
      drawdownYears++;
    }
    var moneyLastsUntilAge = targetAge + drawdownYears;

    // Years until FIRE number is reached (if not already there)
    var yearsToFire = 0;
    if (currentSavings >= fireNumber) {
      yearsToFire = 0;
    } else if (monthlyContribution <= 0 && currentSavings < fireNumber) {
      yearsToFire = -1; // Never
    } else {
      var bal = currentSavings;
      while (bal < fireNumber && yearsToFire < 100) {
        bal = bal * (1 + annualRate) + monthlyContribution * 12;
        yearsToFire++;
      }
      if (yearsToFire >= 100) yearsToFire = -1;
    }

    document.getElementById('result-fire-number').textContent = formatMoney(fireNumber);
    document.getElementById('result-projected').textContent = formatMoney(projectedSavings);

    if (gap >= 0) {
      document.getElementById('result-gap').textContent = formatMoney(gap) + '/yr surplus';
      document.getElementById('result-gap').style.color = 'var(--color-accent)';
    } else {
      document.getElementById('result-gap').textContent = formatMoney(Math.abs(gap)) + '/yr shortfall';
      document.getElementById('result-gap').style.color = 'var(--color-danger, #c00)';
    }

    if (drawdownYears >= maxYears) {
      document.getElementById('result-lasts').textContent = 'Money outlasts you (60+ years)';
    } else {
      document.getElementById('result-lasts').textContent = drawdownYears + ' years (until age ' + moneyLastsUntilAge + ')';
    }

    if (yearsToFire === 0) {
      document.getElementById('result-fire-eta').textContent = 'You\'re already there!';
    } else if (yearsToFire === -1) {
      document.getElementById('result-fire-eta').textContent = 'Not on current trajectory';
    } else {
      document.getElementById('result-fire-eta').textContent = yearsToFire + ' years (age ' + (age + yearsToFire) + ')';
    }

    document.getElementById('result-withdrawal').textContent = formatMoney(annualWithdrawal) + '/yr';

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var fireNumber = document.getElementById('result-fire-number').textContent;
    var projected = document.getElementById('result-projected').textContent;
    var gap = document.getElementById('result-gap').textContent;
    var lasts = document.getElementById('result-lasts').textContent;

    var text = [
      'Retirement countdown (via My Contract):',
      'FIRE number: ' + fireNumber,
      'Projected savings: ' + projected,
      'Income gap: ' + gap,
      'Money lasts: ' + lasts,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
