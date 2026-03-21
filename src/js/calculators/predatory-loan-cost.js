// Predatory Loan Cost Calculator
// Shows the true cost of payday loans, title loans, and rollovers

(function () {
  'use strict';

  var container = document.getElementById('predatory-loan-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-pl-btn');
  var resultSection = document.getElementById('pl-result');
  var shareBtn = document.getElementById('share-pl-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function formatPct(num) {
    return num.toFixed(0) + '%';
  }

  function calculate() {
    var loanAmount = parseFloat(document.getElementById('pl-amount').value);
    var feePer100 = parseFloat(document.getElementById('pl-fee').value);
    var termDays = parseInt(document.getElementById('pl-term').value);
    var rollovers = parseInt(document.getElementById('pl-rollovers').value);

    if (!loanAmount || loanAmount <= 0 || !feePer100 || feePer100 <= 0) return;

    var feePerLoan = loanAmount * (feePer100 / 100);
    var totalLoans = 1 + rollovers;

    // Each rollover: you pay the fee again but principal stays
    var totalFees = feePerLoan * totalLoans;
    var totalRepayment = loanAmount + totalFees;
    var totalDays = termDays * totalLoans;

    // Effective APR: (fee / principal) * (365 / term days) * 100
    var singleAPR = (feePer100 / 100) * (365 / termDays) * 100;

    // Total cost as percentage of original loan
    var costPct = (totalFees / loanAmount) * 100;

    // What you'd pay with alternatives (over the same total period)
    var ccRate = 24.99; // typical credit card APR
    var ccInterest = loanAmount * (ccRate / 100) * (totalDays / 365);
    var ccTotal = loanAmount + ccInterest;

    var personalRate = 12; // credit union personal loan
    var personalInterest = loanAmount * (personalRate / 100) * (totalDays / 365);
    var personalTotal = loanAmount + personalInterest;

    // Display results
    document.getElementById('result-fee-per-loan').textContent = formatMoney(feePerLoan);
    document.getElementById('result-total-fees').textContent = formatMoney(totalFees);
    document.getElementById('result-total-repay').textContent = formatMoney(totalRepayment);
    document.getElementById('result-effective-apr').textContent = formatPct(singleAPR);
    document.getElementById('result-cost-pct').textContent = formatPct(costPct);
    document.getElementById('result-total-days').textContent = totalDays + ' days';

    document.getElementById('result-cc-cost').textContent = formatMoney(ccTotal);
    document.getElementById('result-cc-interest').textContent = formatMoney(ccInterest);
    document.getElementById('result-personal-cost').textContent = formatMoney(personalTotal);
    document.getElementById('result-personal-interest').textContent = formatMoney(personalInterest);

    var savings = totalRepayment - ccTotal;
    var savingsEl = document.getElementById('result-savings');
    savingsEl.textContent = formatMoney(savings) + ' saved with a credit card instead';
    savingsEl.style.color = savings > 0 ? 'var(--color-accent)' : 'var(--color-text)';

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var totalRepay = document.getElementById('result-total-repay').textContent;
    var apr = document.getElementById('result-effective-apr').textContent;
    var fees = document.getElementById('result-total-fees').textContent;
    var amount = document.getElementById('pl-amount').value;
    var rollovers = document.getElementById('pl-rollovers').value;

    var text = [
      'Predatory Loan True Cost (via My Contract):',
      'Borrowed: $' + amount,
      'Rollovers: ' + rollovers,
      'Total repayment: ' + totalRepay,
      'Total fees paid: ' + fees,
      'Effective APR: ' + apr,
      '',
      'Run yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
