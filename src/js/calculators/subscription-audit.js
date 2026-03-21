// Subscription Audit Calculator
// Shows true cost of subscriptions including opportunity cost

(function () {
  'use strict';

  var container = document.getElementById('subscription-audit-calculator');
  if (!container) return;

  var calcBtn = document.getElementById('calc-sub-btn');
  var resultSection = document.getElementById('sub-result');
  var shareBtn = document.getElementById('share-sub-btn');
  var addBtn = document.getElementById('add-sub-btn');
  var customListEl = document.getElementById('custom-sub-list');

  var defaultSubs = [
    { name: 'Netflix', monthly: 15.49 },
    { name: 'Spotify', monthly: 11.99 },
    { name: 'Amazon Prime', monthly: 14.99 },
    { name: 'Disney+', monthly: 13.99 },
    { name: 'Hulu', monthly: 17.99 },
    { name: 'HBO Max', monthly: 16.99 },
    { name: 'Apple TV+', monthly: 9.99 },
    { name: 'YouTube Premium', monthly: 13.99 },
    { name: 'Apple Music', monthly: 10.99 },
    { name: 'iCloud+', monthly: 2.99 },
    { name: 'Google One', monthly: 2.99 },
    { name: 'Microsoft 365', monthly: 6.99 },
    { name: 'Adobe Creative Cloud', monthly: 59.99 },
    { name: 'Gym membership', monthly: 50.00 },
    { name: 'Meal kit (HelloFresh etc.)', monthly: 80.00 },
    { name: 'News (NYT, WSJ, etc.)', monthly: 17.00 },
    { name: 'Cloud gaming (Game Pass)', monthly: 16.99 },
    { name: 'VPN service', monthly: 12.99 },
    { name: 'Audible', monthly: 14.95 },
    { name: 'DoorDash DashPass', monthly: 9.99 },
  ];

  var customSubs = [];
  var customCounter = 0;

  // Render checkboxes for default subs
  var checkboxContainer = document.getElementById('sub-checkboxes');

  function renderCheckboxes() {
    checkboxContainer.innerHTML = '';
    defaultSubs.forEach(function (sub, i) {
      var label = document.createElement('label');
      label.className = 'calc-checkbox-item';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.cost = sub.monthly;
      checkbox.dataset.index = i;

      var nameSpan = document.createElement('span');
      nameSpan.className = 'calc-checkbox-label';
      nameSpan.textContent = sub.name;

      var costSpan = document.createElement('span');
      costSpan.className = 'calc-checkbox-cost';
      costSpan.textContent = '$' + sub.monthly.toFixed(2) + '/mo';

      label.appendChild(checkbox);
      label.appendChild(nameSpan);
      label.appendChild(costSpan);
      checkboxContainer.appendChild(label);
    });
  }

  function renderCustomSubs() {
    customListEl.innerHTML = '';
    customSubs.forEach(function (sub) {
      var row = document.createElement('div');
      row.style.cssText = 'display: flex; gap: var(--space-xs); align-items: center; margin-bottom: var(--space-xs);';

      row.innerHTML =
        '<input type="text" value="' + sub.name + '" style="flex: 2;" data-cid="' + sub.id + '" data-field="name">' +
        '<input type="number" value="' + sub.monthly + '" placeholder="$/mo" step="0.01" style="flex: 1;" data-cid="' + sub.id + '" data-field="monthly">' +
        '<button type="button" class="calc-btn" style="padding: var(--space-xs) var(--space-sm);" data-cremove="' + sub.id + '">&times;</button>';

      customListEl.appendChild(row);
    });

    customListEl.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('change', function () {
        var id = parseInt(this.dataset.cid);
        var field = this.dataset.field;
        var sub = customSubs.find(function (s) { return s.id === id; });
        if (sub) {
          if (field === 'name') sub.name = this.value;
          else sub.monthly = parseFloat(this.value) || 0;
        }
      });
    });

    customListEl.querySelectorAll('button[data-cremove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = parseInt(this.dataset.cremove);
        customSubs = customSubs.filter(function (s) { return s.id !== id; });
        renderCustomSubs();
      });
    });
  }

  function futureValue(monthlyAmount, annualRate, years) {
    var monthlyRate = annualRate / 12;
    var months = years * 12;
    if (monthlyRate === 0) return monthlyAmount * months;
    return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  function calculate() {
    // Read custom sub inputs
    customListEl.querySelectorAll('input').forEach(function (input) {
      var id = parseInt(input.dataset.cid);
      var field = input.dataset.field;
      var sub = customSubs.find(function (s) { return s.id === id; });
      if (sub) {
        if (field === 'name') sub.name = input.value;
        else sub.monthly = parseFloat(input.value) || 0;
      }
    });

    var returnRate = parseFloat(document.getElementById('sub-return-rate').value) || 7;
    var hourlyWage = parseFloat(document.getElementById('sub-hourly-wage').value) || 0;

    // Gather all selected subs
    var allSelected = [];
    checkboxContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(function (cb) {
      var idx = parseInt(cb.dataset.index);
      allSelected.push({ name: defaultSubs[idx].name, monthly: defaultSubs[idx].monthly });
    });

    customSubs.forEach(function (s) {
      if (s.monthly > 0) allSelected.push({ name: s.name, monthly: s.monthly });
    });

    if (allSelected.length === 0) return;

    var monthlyTotal = allSelected.reduce(function (sum, s) { return sum + s.monthly; }, 0);
    var annualTotal = monthlyTotal * 12;

    var fv5 = futureValue(monthlyTotal, returnRate / 100, 5);
    var fv10 = futureValue(monthlyTotal, returnRate / 100, 10);

    // Life-hours cost
    var lifeHoursYear = hourlyWage > 0 ? annualTotal / hourlyWage : 0;

    // Find top 3 most expensive
    allSelected.sort(function (a, b) { return b.monthly - a.monthly; });
    var top3 = allSelected.slice(0, 3);
    var top3Monthly = top3.reduce(function (s, t) { return s + t.monthly; }, 0);
    var top3Annual = top3Monthly * 12;
    var top3fv10 = futureValue(top3Monthly, returnRate / 100, 10);

    document.getElementById('result-sub-monthly').textContent = formatMoney(monthlyTotal);
    document.getElementById('result-sub-annual').textContent = formatMoney(annualTotal);
    document.getElementById('result-sub-5yr').textContent = formatMoney(fv5);
    document.getElementById('result-sub-10yr').textContent = formatMoney(fv10);

    if (hourlyWage > 0) {
      document.getElementById('result-sub-hours').textContent = Math.round(lifeHoursYear) + ' hours/year';
    } else {
      document.getElementById('result-sub-hours').textContent = 'Enter hourly wage above';
    }

    var top3Text = top3.map(function (t) { return t.name; }).join(', ');
    document.getElementById('result-sub-top3').textContent =
      'Cancel ' + top3Text + ' → save ' + formatMoney(top3Annual) + '/yr (' + formatMoney(top3fv10) + ' over 10 years)';

    document.getElementById('result-sub-count').textContent = allSelected.length + ' subscriptions';

    resultSection.style.display = 'block';
  }

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  addBtn.addEventListener('click', function () {
    customCounter++;
    customSubs.push({ id: customCounter, name: '', monthly: 0 });
    renderCustomSubs();
  });

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var monthly = document.getElementById('result-sub-monthly').textContent;
    var annual = document.getElementById('result-sub-annual').textContent;
    var tenYr = document.getElementById('result-sub-10yr').textContent;
    var count = document.getElementById('result-sub-count').textContent;

    var text = [
      'Subscription audit (' + count + ', via My Contract):',
      'Monthly: ' + monthly,
      'Annual: ' + annual,
      '10-year opportunity cost: ' + tenYr,
      '',
      'Audit yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });

  renderCheckboxes();
})();
