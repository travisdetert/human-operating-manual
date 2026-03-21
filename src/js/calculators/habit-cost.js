// Habit Cost Calculator
// Shows the compound opportunity cost of daily habits

(function () {
  'use strict';

  const defaultHabits = [
    { name: 'Morning coffee (Starbucks)', dailyCost: 6.50 },
    { name: 'Lunch out', dailyCost: 15.00 },
    { name: 'Cigarettes (1 pack/day)', dailyCost: 9.00 },
    { name: 'Vaping', dailyCost: 5.00 },
    { name: 'Energy drinks (2/day)', dailyCost: 7.00 },
    { name: 'DoorDash/UberEats', dailyCost: 25.00 },
    { name: 'Alcohol (2 drinks/day)', dailyCost: 12.00 },
    { name: 'Impulse Amazon purchases', dailyCost: 8.00 },
    { name: 'Convenience store snacks', dailyCost: 5.00 },
    { name: 'Lottery tickets', dailyCost: 5.00 },
    { name: 'Rideshare instead of transit', dailyCost: 15.00 },
    { name: 'Bottled water (vs. filter)', dailyCost: 3.00 },
  ];

  const container = document.getElementById('habit-cost-calculator');
  if (!container) return;

  const checkboxContainer = document.getElementById('habit-checkboxes');
  const resultSection = document.getElementById('habit-result');
  const addBtn = document.getElementById('add-habit-btn');
  const shareBtn = document.getElementById('share-btn');

  // Track custom habits
  const customHabits = [];

  // Render default habit checkboxes
  function renderCheckboxes() {
    checkboxContainer.innerHTML = '';
    const allHabits = defaultHabits.concat(customHabits);

    allHabits.forEach((habit, i) => {
      const label = document.createElement('label');
      label.className = 'calc-checkbox-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.cost = habit.dailyCost;
      checkbox.dataset.index = i;
      checkbox.addEventListener('change', calculate);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'calc-checkbox-label';
      nameSpan.textContent = habit.name;

      const costSpan = document.createElement('span');
      costSpan.className = 'calc-checkbox-cost';
      costSpan.textContent = '$' + habit.dailyCost.toFixed(2) + '/day';

      label.appendChild(checkbox);
      label.appendChild(nameSpan);
      label.appendChild(costSpan);
      checkboxContainer.appendChild(label);
    });
  }

  // Calculate future value of monthly investment
  function futureValue(monthlyAmount, annualRate, years) {
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    if (monthlyRate === 0) return monthlyAmount * months;
    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function calculate() {
    const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
    let dailyTotal = 0;

    checkboxes.forEach((cb) => {
      dailyTotal += parseFloat(cb.dataset.cost);
    });

    if (dailyTotal === 0) {
      resultSection.style.display = 'none';
      return;
    }

    const rate = parseFloat(document.getElementById('investment-rate').value);
    const yearly = dailyTotal * 365;
    const monthly = yearly / 12;

    const fv5 = futureValue(monthly, rate, 5);
    const fv10 = futureValue(monthly, rate, 10);
    const fv30 = futureValue(monthly, rate, 30);

    document.getElementById('result-daily').textContent = formatMoney(dailyTotal);
    document.getElementById('result-yearly').textContent = formatMoney(yearly);
    document.getElementById('result-5yr').textContent = formatMoney(fv5);
    document.getElementById('result-10yr').textContent = formatMoney(fv10);
    document.getElementById('result-30yr').textContent = formatMoney(fv30);

    resultSection.style.display = 'block';
  }

  // Add custom habit
  addBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('custom-habit-name');
    const costInput = document.getElementById('custom-habit-cost');
    const name = nameInput.value.trim();
    const cost = parseFloat(costInput.value);

    if (name && cost > 0) {
      customHabits.push({ name, dailyCost: cost });
      renderCheckboxes();
      nameInput.value = '';
      costInput.value = '';
    }
  });

  // Recalculate on rate change
  document.getElementById('investment-rate').addEventListener('change', calculate);

  // Share results
  shareBtn.addEventListener('click', () => {
    const daily = document.getElementById('result-daily').textContent;
    const yearly = document.getElementById('result-yearly').textContent;
    const tenYr = document.getElementById('result-10yr').textContent;
    const thirtyYr = document.getElementById('result-30yr').textContent;

    const text = [
      'My daily habit costs (via My Contract):',
      'Daily: ' + daily,
      'Yearly: ' + yearly,
      '10-year opportunity cost: ' + tenYr,
      '30-year opportunity cost: ' + thirtyYr,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });

  // Initialize
  renderCheckboxes();
})();
