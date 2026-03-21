// Home Affordability Calculator
// Uses 28/36 DTI rules to determine max affordable home price

(function () {
  'use strict';

  var container = document.getElementById('home-affordability-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-home-btn');
  var resultSection = document.getElementById('home-result');
  var shareBtn = document.getElementById('share-home-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    var income = parseFloat(document.getElementById('annual-income').value);
    var debts = parseFloat(document.getElementById('monthly-debts').value) || 0;
    var downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    var creditScore = document.getElementById('credit-score').value;
    var taxRate = parseFloat(document.getElementById('property-tax-rate').value) || 1.2;
    var insurance = parseFloat(document.getElementById('annual-insurance').value) || 1200;
    var hoa = parseFloat(document.getElementById('monthly-hoa').value) || 0;

    if (!income || income <= 0) return;

    // Interest rate based on credit score
    var rateMap = { excellent: 6.5, good: 7.0, fair: 7.5, poor: 8.5 };
    var annualRate = rateMap[creditScore] || 7.0;
    var monthlyRate = annualRate / 100 / 12;
    var termMonths = 360; // 30-year fixed

    var monthlyIncome = income / 12;

    // 28% rule: max housing payment (PITI) is 28% of gross monthly income
    var maxHousing = monthlyIncome * 0.28;

    // 36% rule: max total debt is 36% of gross monthly income
    var maxTotalDebt = monthlyIncome * 0.36;
    var maxHousingFromDebt = maxTotalDebt - debts;

    // Use the lower of the two
    var maxMonthlyPITI = Math.min(maxHousing, maxHousingFromDebt);
    if (maxMonthlyPITI <= 0) {
      document.getElementById('result-max-price').textContent = '$0';
      document.getElementById('result-monthly-piti').textContent = 'Your existing debts exceed the 36% DTI limit';
      document.getElementById('result-dti').textContent = ((debts / monthlyIncome) * 100).toFixed(1) + '%';
      document.getElementById('result-conservative-price').textContent = 'Reduce debts first';
      document.getElementById('result-pi').textContent = formatMoney(0);
      document.getElementById('result-tax').textContent = formatMoney(0);
      document.getElementById('result-ins').textContent = formatMoney(0);
      document.getElementById('result-hoa-out').textContent = formatMoney(0);
      resultSection.style.display = 'block';
      return;
    }

    // Subtract tax, insurance, HOA from PITI to find max P&I
    var monthlyTaxEstimate = 0; // will solve iteratively
    var monthlyInsurance = insurance / 12;

    // Iterative solve: we need to know home price to know taxes, but need taxes to know home price
    // Start with estimate, converge
    var maxPrice = 0;
    for (var i = 0; i < 10; i++) {
      monthlyTaxEstimate = (maxPrice * (taxRate / 100)) / 12;
      var maxPI = maxMonthlyPITI - monthlyTaxEstimate - monthlyInsurance - hoa;
      if (maxPI <= 0) { maxPrice = 0; break; }

      // Solve for loan amount: PI = L * [r(1+r)^n] / [(1+r)^n - 1]
      var factor = (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
      var loanAmount = maxPI / factor;
      maxPrice = loanAmount + downPayment;
    }

    if (maxPrice <= 0) maxPrice = 0;

    var loanAmount = maxPrice - downPayment;
    var factor = (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    var monthlyPI = loanAmount * factor;
    monthlyTaxEstimate = (maxPrice * (taxRate / 100)) / 12;
    var totalPITI = monthlyPI + monthlyTaxEstimate + monthlyInsurance + hoa;

    var frontDTI = (totalPITI / monthlyIncome) * 100;
    var backDTI = ((totalPITI + debts) / monthlyIncome) * 100;

    // Conservative recommendation: 25% of take-home (estimate 75% of gross)
    var takeHome = monthlyIncome * 0.75;
    var conservativePayment = takeHome * 0.25;
    var conservativePI = conservativePayment - monthlyTaxEstimate - monthlyInsurance - hoa;
    var conservativePrice = 0;
    if (conservativePI > 0) {
      conservativePrice = (conservativePI / factor) + downPayment;
    }

    document.getElementById('result-max-price').textContent = formatMoney(maxPrice);
    document.getElementById('result-monthly-piti').textContent = formatMoney(totalPITI) + '/mo';
    document.getElementById('result-dti').textContent = 'Front: ' + frontDTI.toFixed(1) + '% / Back: ' + backDTI.toFixed(1) + '%';
    document.getElementById('result-conservative-price').textContent = formatMoney(conservativePrice);
    document.getElementById('result-pi').textContent = formatMoney(monthlyPI);
    document.getElementById('result-tax').textContent = formatMoney(monthlyTaxEstimate);
    document.getElementById('result-ins').textContent = formatMoney(monthlyInsurance);
    document.getElementById('result-hoa-out').textContent = formatMoney(hoa);

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var maxPrice = document.getElementById('result-max-price').textContent;
    var piti = document.getElementById('result-monthly-piti').textContent;
    var conservative = document.getElementById('result-conservative-price').textContent;

    var text = [
      'Home affordability (via My Contract):',
      'Bank-approved max: ' + maxPrice,
      'Monthly PITI: ' + piti,
      'What I should actually spend: ' + conservative,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
