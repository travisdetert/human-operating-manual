// Net Worth Snapshot Calculator
// Assets minus liabilities with ratio analysis

(function () {
  'use strict';

  var container = document.getElementById('net-worth-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-nw-btn');
  var resultSection = document.getElementById('nw-result');
  var shareBtn = document.getElementById('share-nw-btn');

  function formatMoney(amount) {
    if (amount < 0) return '-$' + Math.abs(Math.round(amount)).toLocaleString();
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    // Assets
    var checking = parseFloat(document.getElementById('nw-checking').value) || 0;
    var savings = parseFloat(document.getElementById('nw-savings').value) || 0;
    var retirement = parseFloat(document.getElementById('nw-retirement').value) || 0;
    var investments = parseFloat(document.getElementById('nw-investments').value) || 0;
    var homeValue = parseFloat(document.getElementById('nw-home').value) || 0;
    var otherAssets = parseFloat(document.getElementById('nw-other-assets').value) || 0;

    // Liabilities
    var mortgage = parseFloat(document.getElementById('nw-mortgage').value) || 0;
    var studentLoans = parseFloat(document.getElementById('nw-student-loans').value) || 0;
    var carLoans = parseFloat(document.getElementById('nw-car-loans').value) || 0;
    var creditCards = parseFloat(document.getElementById('nw-credit-cards').value) || 0;
    var personalLoans = parseFloat(document.getElementById('nw-personal-loans').value) || 0;
    var otherDebt = parseFloat(document.getElementById('nw-other-debt').value) || 0;

    var totalAssets = checking + savings + retirement + investments + homeValue + otherAssets;
    var liquidAssets = checking + savings + investments;
    var totalLiabilities = mortgage + studentLoans + carLoans + creditCards + personalLoans + otherDebt;
    var netWorth = totalAssets - totalLiabilities;
    var liquidNetWorth = liquidAssets - (creditCards + personalLoans + otherDebt);
    var debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    document.getElementById('result-net-worth').textContent = formatMoney(netWorth);
    if (netWorth < 0) {
      document.getElementById('result-net-worth').style.color = 'var(--color-danger, #c00)';
    } else {
      document.getElementById('result-net-worth').style.color = '';
    }

    document.getElementById('result-total-assets').textContent = formatMoney(totalAssets);
    document.getElementById('result-total-liabilities').textContent = formatMoney(totalLiabilities);
    document.getElementById('result-debt-ratio').textContent = debtToAssetRatio.toFixed(1) + '%';
    document.getElementById('result-liquid-nw').textContent = formatMoney(liquidNetWorth);

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var netWorth = document.getElementById('result-net-worth').textContent;
    var assets = document.getElementById('result-total-assets').textContent;
    var liabilities = document.getElementById('result-total-liabilities').textContent;

    var text = [
      'Net worth snapshot (via My Contract):',
      'Net worth: ' + netWorth,
      'Assets: ' + assets,
      'Liabilities: ' + liabilities,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
