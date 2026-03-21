// Real Hourly Rate Calculator
// Calculates true hourly wage accounting for all work-related time

(function () {
  'use strict';

  const container = document.getElementById('real-hourly-rate-calculator');
  if (!container) return;

  const calcBtn = document.getElementById('calc-rate-btn');
  const resultSection = document.getElementById('rate-result');
  const shareBtn = document.getElementById('share-rate-btn');

  function formatMoney(amount) {
    return '$' + amount.toFixed(2);
  }

  function calculate() {
    const income = parseFloat(document.getElementById('annual-income').value);
    if (!income || income <= 0) return;

    const hoursAtWork = parseFloat(document.getElementById('hours-at-work').value) || 0;
    const commuteTime = parseFloat(document.getElementById('commute-time').value) || 0;
    const gettingReady = parseFloat(document.getElementById('getting-ready').value) || 0;
    const decompression = parseFloat(document.getElementById('decompression').value) || 0;
    const workAtHome = parseFloat(document.getElementById('work-at-home').value) || 0;
    const workDays = parseFloat(document.getElementById('work-days').value) || 5;
    const workWeeks = parseFloat(document.getElementById('work-weeks').value) || 50;

    const totalDailyHours = hoursAtWork + commuteTime + gettingReady + decompression + workAtHome;
    const totalWeeklyHours = totalDailyHours * workDays;
    const totalAnnualHours = totalWeeklyHours * workWeeks;

    const standardRate = income / 2080;
    const realRate = totalAnnualHours > 0 ? income / totalAnnualHours : 0;
    const reduction = standardRate > 0 ? ((standardRate - realRate) / standardRate * 100) : 0;

    document.getElementById('result-real-rate').textContent = formatMoney(realRate);
    document.getElementById('result-standard-rate').textContent = formatMoney(standardRate);
    document.getElementById('result-real-hours').textContent = Math.round(totalAnnualHours).toLocaleString();
    document.getElementById('result-reduction').textContent = Math.round(reduction) + '%';
    document.getElementById('result-daily-hours').textContent = totalDailyHours.toFixed(1);

    // Purchase translations
    const purchases = [
      { name: 'Morning coffee + pastry', cost: 9.50 },
      { name: 'Lunch out', cost: 15 },
      { name: 'New shoes (impulse)', cost: 120 },
      { name: 'Bar tab (Friday night)', cost: 65 },
      { name: 'Monthly car payment', cost: 450 },
      { name: 'Weekend getaway', cost: 800 },
      { name: 'iPhone upgrade', cost: 1200 },
      { name: 'Annual unused subscriptions', cost: 2400 },
    ];

    const translationsDiv = document.getElementById('purchase-translations');
    if (translationsDiv && realRate > 0) {
      let html = '<table class="prose" style="margin-top: var(--space-md); display: table;"><thead><tr><th>Purchase</th><th>Cost</th><th>Life-Hours</th></tr></thead><tbody>';
      purchases.forEach((p) => {
        const hours = p.cost / realRate;
        const hoursStr = hours < 1
          ? Math.round(hours * 60) + ' min'
          : hours.toFixed(1) + ' hrs';
        html += '<tr><td>' + p.name + '</td><td>$' + p.cost.toLocaleString() + '</td><td>' + hoursStr + '</td></tr>';
      });
      html += '</tbody></table>';
      translationsDiv.innerHTML = html;
    }

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  // Share results
  shareBtn.addEventListener('click', () => {
    const realRate = document.getElementById('result-real-rate').textContent;
    const standardRate = document.getElementById('result-standard-rate').textContent;
    const reduction = document.getElementById('result-reduction').textContent;

    const text = [
      'My real hourly rate (via My Contract):',
      'Standard rate: ' + standardRate,
      'Real rate: ' + realRate,
      'That\'s a ' + reduction + ' reduction.',
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
