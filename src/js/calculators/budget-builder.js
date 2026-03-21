// Budget Builder Calculator
// Zero-based budget with income, expenses, surplus/deficit, and savings rate

(function () {
  'use strict';

  var container = document.getElementById('budget-builder-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-bb-btn');
  var resultSection = document.getElementById('bb-result');
  var shareBtn = document.getElementById('share-bb-btn');

  function formatMoney(amount) {
    return (amount < 0 ? '-$' : '$') + Math.abs(Math.round(amount)).toLocaleString();
  }

  function val(id) {
    return parseFloat(document.getElementById(id).value) || 0;
  }

  function calculate() {
    // Income
    var primaryIncome = val('bb-primary');
    var secondaryIncome = val('bb-secondary');
    var otherIncome = val('bb-other-income');
    var totalIncome = primaryIncome + secondaryIncome + otherIncome;

    if (totalIncome <= 0) return;

    // Expenses
    var housing = val('bb-housing');
    var utilities = val('bb-utilities');
    var transportation = val('bb-transportation');
    var groceries = val('bb-groceries');
    var insurance = val('bb-insurance');
    var debtPayments = val('bb-debt');
    var healthcare = val('bb-healthcare');
    var phone = val('bb-phone');
    var subscriptions = val('bb-subscriptions');
    var personal = val('bb-personal');
    var savings = val('bb-savings');
    var otherExpenses = val('bb-other-expenses');

    var totalExpenses = housing + utilities + transportation + groceries +
      insurance + debtPayments + healthcare + phone + subscriptions +
      personal + savings + otherExpenses;

    var surplus = totalIncome - totalExpenses;
    var savingsRate = totalIncome > 0 ? ((savings + Math.max(0, surplus)) / totalIncome) * 100 : 0;
    var housingPct = totalIncome > 0 ? (housing / totalIncome) * 100 : 0;
    var debtPct = totalIncome > 0 ? (debtPayments / totalIncome) * 100 : 0;
    var needsTotal = housing + utilities + transportation + groceries + insurance + healthcare + phone;
    var needsPct = totalIncome > 0 ? (needsTotal / totalIncome) * 100 : 0;

    // Display
    document.getElementById('result-total-income').textContent = formatMoney(totalIncome);
    document.getElementById('result-total-expenses').textContent = formatMoney(totalExpenses);

    var surplusEl = document.getElementById('result-surplus');
    surplusEl.textContent = formatMoney(surplus);
    surplusEl.style.color = surplus >= 0 ? 'var(--color-accent)' : 'var(--color-danger, #c0392b)';

    var labelEl = document.getElementById('result-surplus-label');
    labelEl.textContent = surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit';

    document.getElementById('result-savings-rate').textContent = savingsRate.toFixed(1) + '%';
    document.getElementById('result-housing-pct').textContent = housingPct.toFixed(1) + '%';
    document.getElementById('result-debt-pct').textContent = debtPct.toFixed(1) + '%';
    document.getElementById('result-needs-pct').textContent = needsPct.toFixed(1) + '%';
    document.getElementById('result-annual-surplus').textContent = formatMoney(surplus * 12);

    // Warnings
    var warnings = [];
    if (housingPct > 30) warnings.push('Housing is ' + housingPct.toFixed(0) + '% of income (guideline: under 30%)');
    if (debtPct > 20) warnings.push('Debt payments are ' + debtPct.toFixed(0) + '% of income (guideline: under 20%)');
    if (needsPct > 50) warnings.push('Needs are ' + needsPct.toFixed(0) + '% of income (50/30/20 guideline: under 50%)');
    if (surplus < 0) warnings.push('You\'re spending ' + formatMoney(Math.abs(surplus)) + ' more than you earn each month');
    if (savings === 0 && surplus <= 0) warnings.push('No savings allocated — even $25/month matters');

    var warningEl = document.getElementById('result-warnings');
    if (warnings.length > 0) {
      warningEl.innerHTML = '<ul>' + warnings.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul>';
      warningEl.style.display = 'block';
    } else {
      warningEl.style.display = 'none';
    }

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var income = document.getElementById('result-total-income').textContent;
    var expenses = document.getElementById('result-total-expenses').textContent;
    var surplus = document.getElementById('result-surplus').textContent;
    var savingsRate = document.getElementById('result-savings-rate').textContent;

    var text = [
      'My Budget (via My Contract):',
      'Monthly income: ' + income,
      'Monthly expenses: ' + expenses,
      'Surplus/deficit: ' + surplus,
      'Savings rate: ' + savingsRate,
      '',
      'Build yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
