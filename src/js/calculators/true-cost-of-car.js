// True Cost of a Car Calculator
// Total ownership cost including opportunity cost

(function () {
  'use strict';

  var container = document.getElementById('car-cost-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-car-btn');
  var resultSection = document.getElementById('car-result');
  var shareBtn = document.getElementById('share-car-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    var price = parseFloat(document.getElementById('car-price').value);
    var downPayment = parseFloat(document.getElementById('car-down').value) || 0;
    var loanRate = parseFloat(document.getElementById('car-loan-rate').value) || 6;
    var loanTermYears = parseInt(document.getElementById('car-loan-term').value) || 5;
    var annualInsurance = parseFloat(document.getElementById('car-insurance').value) || 1800;
    var annualFuel = parseFloat(document.getElementById('car-fuel').value) || 2400;
    var annualMaint = parseFloat(document.getElementById('car-maintenance').value) || 1200;
    var annualReg = parseFloat(document.getElementById('car-registration').value) || 300;
    var yearsToKeep = parseInt(document.getElementById('car-years').value) || 5;
    var resaleValue = parseFloat(document.getElementById('car-resale').value) || 0;

    if (!price || price <= 0) return;

    var loanAmount = price - downPayment;
    var monthlyRate = loanRate / 100 / 12;
    var loanTermMonths = loanTermYears * 12;

    // Monthly loan payment
    var monthlyPayment = 0;
    var totalLoanPaid = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      var factor = (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
      monthlyPayment = loanAmount * factor;
      totalLoanPaid = monthlyPayment * loanTermMonths;
    } else {
      totalLoanPaid = loanAmount;
    }

    var totalInterest = totalLoanPaid - loanAmount;

    // Running costs over ownership period
    var totalInsurance = annualInsurance * yearsToKeep;
    var totalFuel = annualFuel * yearsToKeep;
    var totalMaint = annualMaint * yearsToKeep;
    var totalReg = annualReg * yearsToKeep;
    var totalRunning = totalInsurance + totalFuel + totalMaint + totalReg;

    // Depreciation
    var depreciation = price - resaleValue;

    // Total cost
    var totalCost = downPayment + totalLoanPaid + totalRunning - resaleValue;
    var trueMonthlyCost = totalCost / (yearsToKeep * 12);

    // Opportunity cost: what if you invested the total spend instead?
    var investRate = 0.07; // 7% annual
    var monthlyInvestRate = investRate / 12;

    // Simple approximation: monthly car cost invested instead
    var months = yearsToKeep * 12;
    var opportunityCost = 0;
    if (monthlyInvestRate > 0) {
      opportunityCost = trueMonthlyCost * ((Math.pow(1 + monthlyInvestRate, months) - 1) / monthlyInvestRate);
    }
    var extraOpportunity = opportunityCost - totalCost;

    document.getElementById('result-true-total').textContent = formatMoney(totalCost);
    document.getElementById('result-true-monthly').textContent = formatMoney(trueMonthlyCost) + '/mo';
    document.getElementById('result-total-interest').textContent = formatMoney(totalInterest);
    document.getElementById('result-depreciation').textContent = formatMoney(depreciation);
    document.getElementById('result-running-costs').textContent = formatMoney(totalRunning);
    document.getElementById('result-opportunity').textContent = formatMoney(opportunityCost);

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var total = document.getElementById('result-true-total').textContent;
    var monthly = document.getElementById('result-true-monthly').textContent;
    var opportunity = document.getElementById('result-opportunity').textContent;

    var text = [
      'True cost of my car (via My Contract):',
      'Total cost: ' + total,
      'True monthly cost: ' + monthly,
      'Opportunity cost (if invested): ' + opportunity,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
