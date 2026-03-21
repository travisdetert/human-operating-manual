// Debt Payoff Strategy Calculator
// Snowball vs. Avalanche comparison with month-by-month simulation

(function () {
  'use strict';

  var container = document.getElementById('debt-payoff-calculator');
  if (!container) return;

  var addBtn = document.getElementById('add-debt-btn');
  var calcBtn = document.getElementById('calc-debt-btn');
  var resultSection = document.getElementById('debt-result');
  var shareBtn = document.getElementById('share-debt-btn');
  var debtListEl = document.getElementById('debt-list');

  var debts = [];
  var debtCounter = 0;

  function formatMoney(amount) {
    return '$' + Math.round(amount).toLocaleString();
  }

  function addDebt(name, balance, rate, minimum) {
    debtCounter++;
    var id = debtCounter;
    debts.push({ id: id, name: name || 'Debt ' + id, balance: balance || 0, rate: rate || 0, minimum: minimum || 0 });
    renderDebts();
  }

  function removeDebt(id) {
    debts = debts.filter(function (d) { return d.id !== id; });
    renderDebts();
  }

  function renderDebts() {
    debtListEl.innerHTML = '';
    debts.forEach(function (d) {
      var row = document.createElement('div');
      row.className = 'debt-entry';
      row.style.cssText = 'display: flex; gap: var(--space-xs); align-items: center; margin-bottom: var(--space-xs); flex-wrap: wrap;';

      row.innerHTML =
        '<input type="text" value="' + d.name + '" style="flex: 2; min-width: 100px;" data-id="' + d.id + '" data-field="name">' +
        '<input type="number" value="' + d.balance + '" placeholder="Balance" style="flex: 1; min-width: 80px;" data-id="' + d.id + '" data-field="balance">' +
        '<input type="number" value="' + d.rate + '" placeholder="APR %" step="0.1" style="flex: 1; min-width: 70px;" data-id="' + d.id + '" data-field="rate">' +
        '<input type="number" value="' + d.minimum + '" placeholder="Min $" style="flex: 1; min-width: 70px;" data-id="' + d.id + '" data-field="minimum">' +
        '<button type="button" class="calc-btn" style="padding: var(--space-xs) var(--space-sm);" data-remove="' + d.id + '">&times;</button>';

      debtListEl.appendChild(row);
    });

    // Attach listeners
    debtListEl.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('change', function () {
        var id = parseInt(this.dataset.id);
        var field = this.dataset.field;
        var debt = debts.find(function (d) { return d.id === id; });
        if (debt) {
          if (field === 'name') debt.name = this.value;
          else debt[field] = parseFloat(this.value) || 0;
        }
      });
    });

    debtListEl.querySelectorAll('button[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeDebt(parseInt(this.dataset.remove));
      });
    });
  }

  function simulate(debtList, extraPayment, strategy) {
    // Deep copy debts
    var sim = debtList.map(function (d) {
      return { name: d.name, balance: d.balance, rate: d.rate, minimum: d.minimum };
    });

    // Sort by strategy
    if (strategy === 'avalanche') {
      sim.sort(function (a, b) { return b.rate - a.rate; }); // highest rate first
    } else {
      sim.sort(function (a, b) { return a.balance - b.balance; }); // lowest balance first
    }

    var totalInterest = 0;
    var months = 0;
    var maxMonths = 1200;

    while (months < maxMonths) {
      var allPaidOff = sim.every(function (d) { return d.balance <= 0.01; });
      if (allPaidOff) break;

      var availableExtra = extraPayment;

      sim.forEach(function (d) {
        if (d.balance <= 0.01) return;

        var interest = d.balance * (d.rate / 100 / 12);
        totalInterest += interest;
        d.balance += interest;

        var payment = Math.min(d.minimum, d.balance);
        d.balance -= payment;
      });

      // Apply extra payment to target debt
      for (var i = 0; i < sim.length; i++) {
        if (sim[i].balance > 0.01 && availableExtra > 0) {
          var extra = Math.min(availableExtra, sim[i].balance);
          sim[i].balance -= extra;
          availableExtra -= extra;
          break;
        }
      }

      // Rollover freed-up minimums
      var freedUp = 0;
      sim.forEach(function (d) {
        if (d.balance <= 0.01 && d.balance >= -0.01) {
          freedUp += d.minimum;
          d.balance = 0;
          d.minimum = 0;
        }
      });

      // Apply freed-up payments to next target
      for (var j = 0; j < sim.length; j++) {
        if (sim[j].balance > 0.01 && freedUp > 0) {
          var apply = Math.min(freedUp, sim[j].balance);
          sim[j].balance -= apply;
          freedUp -= apply;
          break;
        }
      }

      months++;
    }

    return { months: months, totalInterest: Math.round(totalInterest) };
  }

  function calculate() {
    // Re-read values from inputs
    debtListEl.querySelectorAll('input').forEach(function (input) {
      var id = parseInt(input.dataset.id);
      var field = input.dataset.field;
      var debt = debts.find(function (d) { return d.id === id; });
      if (debt) {
        if (field === 'name') debt.name = input.value;
        else debt[field] = parseFloat(input.value) || 0;
      }
    });

    if (debts.length === 0) return;

    var totalBalance = debts.reduce(function (s, d) { return s + d.balance; }, 0);
    if (totalBalance <= 0) return;

    var extraPayment = parseFloat(document.getElementById('extra-payment').value) || 0;

    // Minimum-only scenario
    var minOnly = simulate(debts, 0, 'avalanche');

    // Avalanche
    var avalanche = simulate(debts, extraPayment, 'avalanche');

    // Snowball
    var snowball = simulate(debts, extraPayment, 'snowball');

    var interestSavedAvalanche = minOnly.totalInterest - avalanche.totalInterest;
    var interestSavedSnowball = minOnly.totalInterest - snowball.totalInterest;

    // Format months
    function fmtMonths(m) {
      if (m >= 1200) return '100+ years';
      var y = Math.floor(m / 12);
      var mo = m % 12;
      if (y === 0) return m + ' months';
      if (mo === 0) return y + (y === 1 ? ' year' : ' years');
      return y + 'y ' + mo + 'm';
    }

    document.getElementById('result-avalanche-months').textContent = fmtMonths(avalanche.months);
    document.getElementById('result-avalanche-interest').textContent = formatMoney(avalanche.totalInterest);
    document.getElementById('result-snowball-months').textContent = fmtMonths(snowball.months);
    document.getElementById('result-snowball-interest').textContent = formatMoney(snowball.totalInterest);
    document.getElementById('result-min-months').textContent = fmtMonths(minOnly.months);
    document.getElementById('result-min-interest').textContent = formatMoney(minOnly.totalInterest);
    document.getElementById('result-saved').textContent = formatMoney(interestSavedAvalanche);

    var diff = snowball.totalInterest - avalanche.totalInterest;
    if (diff > 0) {
      document.getElementById('result-strategy-diff').textContent = 'Snowball costs ' + formatMoney(diff) + ' more in interest';
    } else if (diff < 0) {
      document.getElementById('result-strategy-diff').textContent = 'Snowball saves ' + formatMoney(Math.abs(diff)) + ' in interest';
    } else {
      document.getElementById('result-strategy-diff').textContent = 'Both strategies cost the same';
    }

    resultSection.style.display = 'block';
  }

  addBtn.addEventListener('click', function () {
    addDebt('', 0, 0, 0);
  });

  calcBtn.addEventListener('click', calculate);

  shareBtn.addEventListener('click', function () {
    var avMonths = document.getElementById('result-avalanche-months').textContent;
    var avInterest = document.getElementById('result-avalanche-interest').textContent;
    var saved = document.getElementById('result-saved').textContent;

    var text = [
      'Debt payoff plan (via My Contract):',
      'Avalanche: ' + avMonths + ', ' + avInterest + ' interest',
      'Interest saved vs. minimums: ' + saved,
      '',
      'Calculate yours: ' + window.location.href,
    ].join('\n');

    navigator.clipboard.writeText(text).then(function () {
      shareBtn.textContent = 'Copied!';
      setTimeout(function () { shareBtn.textContent = 'Copy Results'; }, 2000);
    });
  });

  // Seed with one empty debt row
  addDebt('', 0, 0, 0);
})();
