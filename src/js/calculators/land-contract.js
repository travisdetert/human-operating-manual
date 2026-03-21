// Land Contract vs. Traditional Mortgage Comparison Calculator
// Side-by-side cost comparison with balloon payment calculation

(function () {
  'use strict';

  var container = document.getElementById('land-contract-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-lc-btn');
  var resultSection = document.getElementById('lc-result');
  var shareBtn = document.getElementById('share-lc-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function monthlyPayment(principal, annualRate, totalMonths) {
    var r = annualRate / 100 / 12;
    if (r === 0) return principal / totalMonths;
    var factor = (r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
    return principal * factor;
  }

  function remainingBalance(principal, annualRate, amortMonths, paymentsMade) {
    var r = annualRate / 100 / 12;
    if (r === 0) return principal - (principal / amortMonths) * paymentsMade;
    var payment = monthlyPayment(principal, annualRate, amortMonths);
    var balance = principal;
    for (var i = 0; i < paymentsMade; i++) {
      var interest = balance * r;
      var princ = payment - interest;
      balance -= princ;
    }
    return Math.max(0, balance);
  }

  function calculate() {
    var price = parseFloat(document.getElementById('lc-price').value);
    var down = parseFloat(document.getElementById('lc-down').value);
    var lcRate = parseFloat(document.getElementById('lc-rate').value);
    var lcTerm = parseInt(document.getElementById('lc-term').value);
    var lcAmort = parseInt(document.getElementById('lc-amort').value);
    var mortRate = parseFloat(document.getElementById('mort-rate').value);
    var mortTerm = parseInt(document.getElementById('mort-term').value);

    if (!price || price <= 0 || down < 0 || down >= price) return;

    var loanAmount = price - down;

    // Land contract calculations
    var lcAmortMonths = lcAmort * 12;
    var lcTermMonths = lcTerm * 12;
    var lcMonthly = monthlyPayment(loanAmount, lcRate, lcAmortMonths);
    var lcTotalPayments = lcMonthly * lcTermMonths;
    var lcBalloon = remainingBalance(loanAmount, lcRate, lcAmortMonths, lcTermMonths);

    // Interest paid during LC term
    var lcInterestPaid = lcTotalPayments - (loanAmount - lcBalloon);

    // Equity built = principal paid down
    var lcEquity = down + (loanAmount - lcBalloon);

    // Traditional mortgage calculations
    var mortTermMonths = mortTerm * 12;
    var mortMonthly = monthlyPayment(loanAmount, mortRate, mortTermMonths);
    var mortTotalOverLcTerm = mortMonthly * lcTermMonths;
    var mortBalanceAtLcTerm = remainingBalance(loanAmount, mortRate, mortTermMonths, lcTermMonths);
    var mortInterestOverLcTerm = mortTotalOverLcTerm - (loanAmount - mortBalanceAtLcTerm);
    var mortEquityAtLcTerm = down + (loanAmount - mortBalanceAtLcTerm);

    // Cost difference over the LC term
    var costDiff = lcTotalPayments - mortTotalOverLcTerm;

    // Display results
    document.getElementById('result-lc-monthly').textContent = formatMoney(lcMonthly);
    document.getElementById('result-mort-monthly').textContent = formatMoney(mortMonthly);
    document.getElementById('result-lc-total').textContent = formatMoney(lcTotalPayments);
    document.getElementById('result-mort-total').textContent = formatMoney(mortTotalOverLcTerm);
    document.getElementById('result-lc-interest').textContent = formatMoney(lcInterestPaid);
    document.getElementById('result-mort-interest').textContent = formatMoney(mortInterestOverLcTerm);
    document.getElementById('result-balloon').textContent = formatMoney(lcBalloon);
    document.getElementById('result-mort-balance').textContent = formatMoney(mortBalanceAtLcTerm);
    document.getElementById('result-lc-equity').textContent = formatMoney(lcEquity);
    document.getElementById('result-mort-equity').textContent = formatMoney(mortEquityAtLcTerm);

    var diffEl = document.getElementById('result-cost-diff');
    if (costDiff > 0) {
      diffEl.textContent = formatMoney(costDiff) + ' more with land contract';
      diffEl.style.color = 'var(--color-danger, #c0392b)';
    } else if (costDiff < 0) {
      diffEl.textContent = formatMoney(Math.abs(costDiff)) + ' less with land contract';
      diffEl.style.color = 'var(--color-accent)';
    } else {
      diffEl.textContent = 'Same cost';
      diffEl.style.color = 'var(--color-text)';
    }

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var lcMonthly = document.getElementById('result-lc-monthly').textContent;
    var mortMonthly = document.getElementById('result-mort-monthly').textContent;
    var balloon = document.getElementById('result-balloon').textContent;
    var diff = document.getElementById('result-cost-diff').textContent;
    var term = document.getElementById('lc-term').value;

    var text = [
      'Land Contract vs. Mortgage over ' + term + ' years (via My Contract):',
      'Land contract payment: ' + lcMonthly + '/mo',
      'Mortgage payment: ' + mortMonthly + '/mo',
      'Balloon due at end: ' + balloon,
      diff,
      '',
      'Run yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
