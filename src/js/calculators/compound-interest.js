// Compound Interest Calculator
// Shows growth of savings/investments over time

(function () {
  'use strict';

  const container = document.getElementById('compound-interest-calculator');
  if (!container) return;

  const calcBtn = document.getElementById('calc-compound-btn');
  const resultSection = document.getElementById('compound-result');
  const shareBtn = document.getElementById('share-compound-btn');

  function futureValue(principal, monthlyContrib, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    // FV of lump sum
    const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);

    // FV of monthly contributions (annuity)
    let fvContrib = 0;
    if (monthlyRate > 0) {
      fvContrib = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      fvContrib = monthlyContrib * months;
    }

    return fvPrincipal + fvContrib;
  }

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    const principal = parseFloat(document.getElementById('initial-amount').value) || 0;
    const monthly = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    const rate = parseFloat(document.getElementById('annual-return').value) || 7;
    const years = parseFloat(document.getElementById('time-period').value) || 20;

    if (principal === 0 && monthly === 0) return;

    const total = futureValue(principal, monthly, rate, years);
    const totalContributed = principal + (monthly * 12 * years);
    const interestEarned = total - totalContributed;
    const at10 = futureValue(principal, monthly, rate, Math.min(10, years));
    const multiplier = totalContributed > 0 ? (total / totalContributed) : 0;

    document.getElementById('result-total').textContent = formatMoney(total);
    document.getElementById('result-contributed').textContent = formatMoney(totalContributed);
    document.getElementById('result-interest').textContent = formatMoney(interestEarned);
    document.getElementById('result-10yr-compound').textContent = formatMoney(at10);
    document.getElementById('result-multiplier').textContent = multiplier.toFixed(1) + 'x';

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', () => {
    const total = document.getElementById('result-total').textContent;
    const contributed = document.getElementById('result-contributed').textContent;
    const interest = document.getElementById('result-interest').textContent;

    const text = [
      'Compound interest calculation (via My Contract):',
      'Total value: ' + total,
      'Total contributed: ' + contributed,
      'Interest earned: ' + interest,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
