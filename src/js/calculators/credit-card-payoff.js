// Credit Card Payoff Calculator
// Shows payoff timeline and interest savings at different payment levels

(function () {
  'use strict';

  const container = document.getElementById('credit-card-calculator');
  if (!container) return;

  const calcBtn = document.getElementById('calc-payoff-btn');
  const resultSection = document.getElementById('payoff-result');
  const shareBtn = document.getElementById('share-payoff-btn');

  function calculatePayoff(balance, apr, monthlyPayment) {
    const monthlyRate = apr / 100 / 12;
    let remaining = balance;
    let totalPaid = 0;
    let months = 0;
    const maxMonths = 1200; // 100 years cap

    if (monthlyPayment <= remaining * monthlyRate) {
      // Payment doesn't cover interest
      return { months: Infinity, totalPaid: Infinity, interestPaid: Infinity };
    }

    while (remaining > 0.01 && months < maxMonths) {
      const interest = remaining * monthlyRate;
      const principal = Math.min(monthlyPayment - interest, remaining);
      remaining -= principal;
      totalPaid += monthlyPayment;
      months++;

      // Handle final partial payment
      if (remaining < monthlyPayment && remaining > 0) {
        // Continue to next iteration, it will resolve
      }
    }

    // Adjust last payment
    if (remaining <= 0.01) {
      remaining = 0;
    }

    return {
      months,
      totalPaid: Math.round(totalPaid),
      interestPaid: Math.round(totalPaid - balance),
    };
  }

  function formatMonths(months) {
    if (months === Infinity || months >= 1200) return '100+ years';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return months + ' months';
    if (remainingMonths === 0) return years + (years === 1 ? ' year' : ' years');
    return years + (years === 1 ? ' year, ' : ' years, ') + remainingMonths + (remainingMonths === 1 ? ' month' : ' months');
  }

  function formatMoney(amount) {
    if (amount === Infinity) return 'N/A';
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    const balance = parseFloat(document.getElementById('card-balance').value);
    const apr = parseFloat(document.getElementById('card-apr').value);
    const payment = parseFloat(document.getElementById('monthly-payment').value);

    if (!balance || balance <= 0 || !apr || !payment || payment <= 0) return;

    const result = calculatePayoff(balance, apr, payment);

    // Calculate minimum payment scenario (2% of balance or $25, whichever is greater)
    const minPayment = Math.max(balance * 0.02, 25);
    const minResult = calculatePayoff(balance, apr, minPayment);

    document.getElementById('result-months').textContent = formatMonths(result.months);
    document.getElementById('result-total-paid').textContent = formatMoney(result.totalPaid);
    document.getElementById('result-interest-paid').textContent = formatMoney(result.interestPaid);
    document.getElementById('result-min-payment').textContent = formatMoney(minPayment);
    document.getElementById('result-min-interest').textContent = formatMoney(minResult.interestPaid);

    // Payment comparison table
    const comparisonDiv = document.getElementById('payment-comparison');
    if (comparisonDiv) {
      const payments = [
        minPayment,
        Math.max(payment * 0.75, minPayment + 25),
        payment,
        payment * 1.5,
        payment * 2,
      ].filter((p, i, arr) => {
        // Remove duplicates and ensure each is larger than previous
        if (i === 0) return true;
        return p > arr[i - 1] + 5;
      });

      let html = '<table class="prose" style="margin-top: var(--space-md); display: table;"><thead><tr><th>Monthly Payment</th><th>Time to Pay Off</th><th>Total Interest</th></tr></thead><tbody>';

      payments.forEach((p) => {
        const r = calculatePayoff(balance, apr, p);
        const isCurrentPayment = Math.abs(p - payment) < 1;
        const rowStyle = isCurrentPayment ? ' style="font-weight: 600;"' : '';
        html += '<tr' + rowStyle + '><td>' + formatMoney(p) + '</td><td>' + formatMonths(r.months) + '</td><td>' + formatMoney(r.interestPaid) + '</td></tr>';
      });

      html += '</tbody></table>';

      if (result.interestPaid < minResult.interestPaid && minResult.interestPaid !== Infinity) {
        const savings = minResult.interestPaid - result.interestPaid;
        html += '<p style="margin-top: var(--space-md); font-size: var(--text-sm);"><strong>Paying ' + formatMoney(payment) + '/mo instead of minimums saves you ' + formatMoney(savings) + ' in interest.</strong></p>';
      }

      comparisonDiv.innerHTML = html;
    }

    resultSection.style.display = 'block';
  }

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', () => {
    const months = document.getElementById('result-months').textContent;
    const totalPaid = document.getElementById('result-total-paid').textContent;
    const interestPaid = document.getElementById('result-interest-paid').textContent;

    const text = [
      'Credit card payoff calculation (via My Contract):',
      'Time to pay off: ' + months,
      'Total paid: ' + totalPaid,
      'Interest paid: ' + interestPaid,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });
})();
