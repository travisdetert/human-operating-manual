// Time Remaining Calculator
// Estimates healthy years, days, and discretionary time remaining

(function () {
  'use strict';

  const container = document.getElementById('time-remaining-calculator');
  if (!container) return;

  const calcBtn = document.getElementById('calc-time-btn');
  const resultSection = document.getElementById('time-result');
  const shareBtn = document.getElementById('share-time-btn');

  function calculate() {
    const age = parseFloat(document.getElementById('current-age').value);
    const baseExpectancy = parseFloat(document.getElementById('sex').value);

    if (!age || age < 1 || age > 120) return;

    // Sum lifestyle adjustments
    let adjustment = 0;
    const checkboxes = document.querySelectorAll('#lifestyle-checks input[type="checkbox"]:checked');
    checkboxes.forEach((cb) => {
      adjustment += parseFloat(cb.dataset.years);
    });

    const adjustedExpectancy = Math.max(baseExpectancy + adjustment, age + 1);
    const totalYears = Math.max(adjustedExpectancy - age, 0);

    // Healthy years = total minus 10-15 for decline in final years
    const declineYears = Math.min(12.5, totalYears * 0.3);
    const healthyYears = Math.max(totalYears - declineYears, 0);

    const totalDays = Math.round(totalYears * 365);
    const weeks = Math.round(totalYears * 52);

    // Discretionary days: subtract sleep (33%), work (20%), maintenance (10%)
    const discretionaryDays = Math.round(totalDays * 0.37);

    document.getElementById('result-years').textContent = healthyYears.toFixed(0);
    document.getElementById('result-total-years').textContent = totalYears.toFixed(1);
    document.getElementById('result-weeks').textContent = weeks.toLocaleString();
    document.getElementById('result-days').textContent = totalDays.toLocaleString();
    document.getElementById('result-discretionary').textContent = discretionaryDays.toLocaleString();

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  // Share results
  shareBtn.addEventListener('click', () => {
    const years = document.getElementById('result-years').textContent;
    const days = document.getElementById('result-days').textContent;
    const disc = document.getElementById('result-discretionary').textContent;

    const text = [
      'My time remaining (via My Contract):',
      'Estimated healthy years: ' + years,
      'Total days: ' + days,
      'Discretionary days: ' + disc,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
