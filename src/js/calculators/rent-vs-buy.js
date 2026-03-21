// Rent vs. Buy Comparison Calculator
// Year-by-year dual-track simulation with opportunity cost

(function () {
  'use strict';

  var container = document.getElementById('rent-vs-buy-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-rvb-btn');
  var resultSection = document.getElementById('rvb-result');
  var shareBtn = document.getElementById('share-rvb-btn');

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    var monthlyRent = parseFloat(document.getElementById('monthly-rent').value);
    var rentIncrease = parseFloat(document.getElementById('rent-increase').value) || 3;
    var homePrice = parseFloat(document.getElementById('home-price').value);
    var downPct = parseFloat(document.getElementById('down-pct').value) || 20;
    var mortgageRate = parseFloat(document.getElementById('mortgage-rate').value) || 7;
    var propertyTaxRate = parseFloat(document.getElementById('prop-tax-rate').value) || 1.2;
    var annualInsurance = parseFloat(document.getElementById('annual-ins').value) || 1500;
    var annualMaintenance = parseFloat(document.getElementById('annual-maint').value) || 1;
    var appreciation = parseFloat(document.getElementById('appreciation').value) || 3;
    var investReturn = parseFloat(document.getElementById('invest-return').value) || 7;
    var years = parseInt(document.getElementById('time-horizon').value) || 7;

    if (!monthlyRent || !homePrice || monthlyRent <= 0 || homePrice <= 0) return;

    var downPayment = homePrice * (downPct / 100);
    var loanAmount = homePrice - downPayment;
    var monthlyRate = mortgageRate / 100 / 12;
    var termMonths = 360;

    // Monthly P&I
    var factor = (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    var monthlyPI = loanAmount * factor;

    // Year-by-year simulation
    var totalRentCost = 0;
    var renterPortfolio = 0; // Renter invests down payment + monthly savings
    var totalBuyCost = 0;
    var loanBalance = loanAmount;
    var currentRent = monthlyRent;
    var currentHomeValue = homePrice;
    var monthlyInvestRate = investReturn / 100 / 12;

    // Renter starts by investing the down payment
    renterPortfolio = downPayment;

    for (var y = 0; y < years; y++) {
      var yearlyRent = currentRent * 12;
      var yearlyTax = currentHomeValue * (propertyTaxRate / 100);
      var yearlyIns = annualInsurance;
      var yearlyMaint = currentHomeValue * (annualMaintenance / 100);
      var yearlyPI = monthlyPI * 12;

      // Monthly simulation for this year
      for (var m = 0; m < 12; m++) {
        // Renter
        totalRentCost += currentRent;

        // Owner costs this month
        var monthlyTax = yearlyTax / 12;
        var monthlyIns = yearlyIns / 12;
        var monthlyMaint = yearlyMaint / 12;
        var ownerMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyMaint;
        totalBuyCost += ownerMonthly;

        // Renter invests savings if renting is cheaper
        var monthlySavings = ownerMonthly - currentRent;
        if (monthlySavings > 0) {
          renterPortfolio += monthlySavings;
        }

        // Grow renter portfolio
        renterPortfolio *= (1 + monthlyInvestRate);

        // Pay down mortgage
        var interestPayment = loanBalance * monthlyRate;
        var principalPayment = monthlyPI - interestPayment;
        loanBalance = Math.max(0, loanBalance - principalPayment);
      }

      // Annual adjustments
      currentRent *= (1 + rentIncrease / 100);
      currentHomeValue *= (1 + appreciation / 100);
    }

    var ownerEquity = currentHomeValue - loanBalance;
    // Subtract selling costs (6% typical)
    var sellingCosts = currentHomeValue * 0.06;
    var netOwnerWealth = ownerEquity - sellingCosts;
    var netRenterWealth = renterPortfolio;

    var buyWins = netOwnerWealth > netRenterWealth;
    var difference = Math.abs(netOwnerWealth - netRenterWealth);

    document.getElementById('result-verdict').textContent = buyWins
      ? 'Buying wins by ' + formatMoney(difference)
      : 'Renting wins by ' + formatMoney(difference);
    document.getElementById('result-verdict').style.color = buyWins ? 'var(--color-accent)' : 'var(--color-text)';

    document.getElementById('result-rent-total').textContent = formatMoney(totalRentCost);
    document.getElementById('result-renter-portfolio').textContent = formatMoney(netRenterWealth);
    document.getElementById('result-buy-total').textContent = formatMoney(totalBuyCost);
    document.getElementById('result-owner-equity').textContent = formatMoney(netOwnerWealth);
    document.getElementById('result-home-value').textContent = formatMoney(currentHomeValue);
    document.getElementById('result-loan-remaining').textContent = formatMoney(loanBalance);

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var verdict = document.getElementById('result-verdict').textContent;
    var renterWealth = document.getElementById('result-renter-portfolio').textContent;
    var ownerWealth = document.getElementById('result-owner-equity').textContent;
    var horizon = document.getElementById('time-horizon').value;

    var text = [
      'Rent vs. Buy over ' + horizon + ' years (via My Contract):',
      verdict,
      'Renter net wealth: ' + renterWealth,
      'Owner net wealth: ' + ownerWealth,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
