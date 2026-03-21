// Honest Audit Tool
// Digitizes Module 01 — financial, physical, time, strengths audit

(function () {
  'use strict';

  var container = document.getElementById('honest-audit-tool');
  if (!container) return;

  var STORE_KEY = 'audit';
  var HISTORY_KEY = 'audit_history';
  var saveTimer = null;

  // --- Tab switching ---
  var tabs = container.querySelectorAll('.tool-tab');
  var panels = container.querySelectorAll('.tool-tab-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById('tab-' + target).classList.add('active');
      if (target === 'summary') renderSummary();
      if (target === 'time') updateTimeRemaining();
    });
  });

  // --- Collect all data from fields ---
  function collectData() {
    var data = { debts: [], _date: MCStore.today(), _id: null };
    container.querySelectorAll('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      if (el.type === 'checkbox') {
        data[key] = el.checked;
      } else {
        data[key] = el.value;
      }
    });
    // Collect debt rows
    var debtRows = document.querySelectorAll('#debt-rows .dynamic-row');
    data.debts = [];
    debtRows.forEach(function (row) {
      var inputs = row.querySelectorAll('input');
      if (inputs[0] && inputs[0].value) {
        data.debts.push({
          creditor: inputs[0].value,
          balance: parseFloat(inputs[1].value) || 0,
          apr: parseFloat(inputs[2].value) || 0,
          minimum: parseFloat(inputs[3].value) || 0
        });
      }
    });
    return data;
  }

  // --- Populate fields from data ---
  function populateData(data) {
    if (!data) return;
    container.querySelectorAll('[data-field]').forEach(function (el) {
      var key = el.getAttribute('data-field');
      if (data[key] !== undefined && data[key] !== null) {
        if (el.type === 'checkbox') {
          el.checked = data[key];
        } else {
          el.value = data[key];
        }
      }
    });
    // Populate debt rows
    var debtContainer = document.getElementById('debt-rows');
    debtContainer.innerHTML = '';
    if (data.debts && data.debts.length > 0) {
      data.debts.forEach(function (d) {
        addDebtRow(d.creditor, d.balance, d.apr, d.minimum);
      });
    }
    updateTimeRemaining();
  }

  // --- Debt rows ---
  function addDebtRow(creditor, balance, apr, minimum) {
    var debtContainer = document.getElementById('debt-rows');
    var row = document.createElement('div');
    row.className = 'dynamic-row';
    row.innerHTML =
      '<input type="text" placeholder="Creditor" value="' + (creditor || '') + '">' +
      '<input type="number" placeholder="Balance" step="0.01" value="' + (balance || '') + '">' +
      '<input type="number" placeholder="APR %" step="0.1" value="' + (apr || '') + '">' +
      '<input type="number" placeholder="Minimum" step="0.01" value="' + (minimum || '') + '">' +
      '<button type="button" class="btn-remove-row" aria-label="Remove">&times;</button>';
    row.querySelector('.btn-remove-row').addEventListener('click', function () {
      row.remove();
      scheduleSave();
    });
    row.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('input', function () { scheduleSave(); });
    });
    debtContainer.appendChild(row);
  }

  document.getElementById('add-debt-btn').addEventListener('click', function () {
    addDebtRow('', '', '', '');
  });

  // --- Auto-save ---
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(doSave, 500);
  }

  function doSave() {
    var data = collectData();
    var existing = MCStore.get(STORE_KEY);
    if (existing && existing._id) {
      data._id = existing._id;
    } else {
      data._id = MCStore.uid();
    }
    MCStore.set(STORE_KEY, data);
  }

  // Listen for input changes
  container.querySelectorAll('[data-field]').forEach(function (el) {
    el.addEventListener('input', function () {
      scheduleSave();
      if (el.hasAttribute('data-time')) updateTimeRemaining();
    });
  });

  // --- Time remaining ---
  function updateTimeRemaining() {
    var total = 0;
    container.querySelectorAll('[data-time]').forEach(function (inp) {
      total += parseFloat(inp.value) || 0;
    });
    var remaining = 168 - total;
    var el = document.getElementById('time-remaining');
    if (remaining < 0) {
      el.textContent = Math.abs(remaining).toFixed(1) + ' hours OVER (168 allocated)';
      el.style.color = 'var(--color-accent)';
    } else if (remaining === 0) {
      el.textContent = 'All 168 hours accounted for.';
      el.style.color = 'var(--color-growth)';
    } else {
      el.textContent = remaining.toFixed(1) + ' hours unaccounted.';
      el.style.color = remaining > 10 ? 'var(--color-accent)' : 'var(--color-text-muted)';
    }

    // Time analysis
    var analysis = document.getElementById('time-analysis');
    var consumption = (parseFloat(g('time_social')) || 0) +
      (parseFloat(g('time_messaging')) || 0) +
      (parseFloat(g('time_news')) || 0) +
      (parseFloat(g('time_streaming')) || 0) +
      (parseFloat(g('time_gaming')) || 0) +
      (parseFloat(g('time_shortform')) || 0);
    var investment = (parseFloat(g('time_exercise')) || 0) +
      (parseFloat(g('time_learning')) || 0) +
      (parseFloat(g('time_reading')) || 0) +
      (parseFloat(g('time_skills')) || 0) +
      (parseFloat(g('time_hobbies')) || 0);
    var ratio = investment > 0 ? (consumption / investment).toFixed(1) : (consumption > 0 ? '&infin;' : '0');

    if (total > 0) {
      analysis.style.display = 'block';
      analysis.innerHTML =
        '<p class="data-section-header">Time Analysis</p>' +
        '<div class="summary-cards">' +
        '<div class="summary-card"><span class="card-value">' + consumption.toFixed(1) + 'h</span><span class="card-label">Consumption Block</span></div>' +
        '<div class="summary-card"><span class="card-value">' + investment.toFixed(1) + 'h</span><span class="card-label">Investment Block</span></div>' +
        '<div class="summary-card"><span class="card-value' + (ratio !== '0' && consumption > investment ? ' negative' : ' positive') + '">' + ratio + ':1</span><span class="card-label">Consumption:Investment</span></div>' +
        '<div class="summary-card"><span class="card-value' + (remaining > 10 ? ' negative' : '') + '">' + remaining.toFixed(1) + 'h</span><span class="card-label">Unaccounted</span></div>' +
        '</div>';
    }
  }

  function g(field) {
    var el = container.querySelector('[data-field="' + field + '"]');
    return el ? el.value : '';
  }

  // --- Helpers ---
  function sumFields(prefix) {
    var total = 0;
    container.querySelectorAll('[data-field^="' + prefix + '"]').forEach(function (el) {
      if (el.type === 'number') total += parseFloat(el.value) || 0;
    });
    return total;
  }

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString();
  }

  // --- Summary ---
  function renderSummary() {
    var el = document.getElementById('audit-summary');
    var data = collectData();

    var totalIncome = sumFields('income_');
    var totalFixed = sumFields('fixed_');
    var totalVariable = sumFields('var_');
    var totalExpenses = totalFixed + totalVariable;
    var cashFlow = totalIncome - totalExpenses;

    var totalAssets = sumFields('asset_');
    var totalDebt = 0;
    var totalMinPayments = 0;
    (data.debts || []).forEach(function (d) {
      totalDebt += d.balance || 0;
      totalMinPayments += d.minimum || 0;
    });
    var netWorth = totalAssets - totalDebt;

    // Time
    var consumption = (parseFloat(g('time_social')) || 0) +
      (parseFloat(g('time_messaging')) || 0) + (parseFloat(g('time_news')) || 0) +
      (parseFloat(g('time_streaming')) || 0) + (parseFloat(g('time_gaming')) || 0) +
      (parseFloat(g('time_shortform')) || 0);
    var investment = (parseFloat(g('time_exercise')) || 0) +
      (parseFloat(g('time_learning')) || 0) + (parseFloat(g('time_reading')) || 0) +
      (parseFloat(g('time_skills')) || 0) + (parseFloat(g('time_hobbies')) || 0);

    // Previous audit for comparison
    var prev = null;
    var history = MCStore.get(HISTORY_KEY);
    if (history && history.length > 0) {
      prev = history[history.length - 1];
    }

    var html = '<div class="summary-cards">';
    html += summaryCard('Net Worth', netWorth, fmt, prev ? calcPrevNetWorth(prev) : null);
    html += summaryCard('Monthly Cash Flow', cashFlow, fmt, prev ? calcPrevCashFlow(prev) : null);
    html += summaryCard('Total Debt', totalDebt, fmt, prev ? calcPrevDebt(prev) : null, true);
    html += summaryCard('Total Assets', totalAssets, fmt, prev ? calcPrevAssets(prev) : null);
    html += '</div>';

    html += '<div class="summary-cards" style="margin-top: var(--space-md);">';
    html += '<div class="summary-card"><span class="card-value">' + fmt(totalIncome) + '</span><span class="card-label">Monthly Income</span></div>';
    html += '<div class="summary-card"><span class="card-value">' + fmt(totalFixed) + '</span><span class="card-label">Fixed Expenses</span></div>';
    html += '<div class="summary-card"><span class="card-value">' + fmt(totalVariable) + '</span><span class="card-label">Variable Expenses</span></div>';
    html += '<div class="summary-card"><span class="card-value">' + fmt(totalMinPayments) + '</span><span class="card-label">Min Debt Payments</span></div>';
    html += '</div>';

    if (consumption > 0 || investment > 0) {
      var ratio = investment > 0 ? (consumption / investment).toFixed(1) : '&infin;';
      html += '<div class="summary-cards" style="margin-top: var(--space-md);">';
      html += '<div class="summary-card"><span class="card-value">' + consumption.toFixed(1) + 'h</span><span class="card-label">Weekly Consumption</span></div>';
      html += '<div class="summary-card"><span class="card-value">' + investment.toFixed(1) + 'h</span><span class="card-label">Weekly Investment</span></div>';
      html += '<div class="summary-card"><span class="card-value">' + ratio + ':1</span><span class="card-label">Consumption:Investment</span></div>';
      html += '</div>';
    }

    if (prev) {
      html += '<p style="font-size: var(--text-xs); color: var(--color-text-faint); margin-top: var(--space-md);">Comparing to audit from ' + (prev._date || 'unknown date') + '</p>';
    }

    el.innerHTML = html;
  }

  function summaryCard(label, value, formatter, prevValue, invertColor) {
    var cls = '';
    if (invertColor) {
      cls = value > 0 ? ' negative' : (value < 0 ? ' positive' : '');
    } else {
      cls = value >= 0 ? ' positive' : ' negative';
    }
    var delta = '';
    if (prevValue !== null && prevValue !== undefined) {
      var diff = value - prevValue;
      var arrow = diff > 0 ? '+' : '';
      delta = '<span class="card-label" style="font-family: var(--font-mono);">' +
        arrow + formatter(diff) + ' vs prior</span>';
    }
    return '<div class="summary-card"><span class="card-value' + cls + '">' +
      formatter(value) + '</span><span class="card-label">' + label + '</span>' + delta + '</div>';
  }

  function calcPrevNetWorth(prev) {
    return calcPrevAssets(prev) - calcPrevDebt(prev);
  }

  function calcPrevCashFlow(prev) {
    var income = sumPrevFields(prev, 'income_');
    var fixed = sumPrevFields(prev, 'fixed_');
    var variable = sumPrevFields(prev, 'var_');
    return income - fixed - variable;
  }

  function calcPrevDebt(prev) {
    var total = 0;
    (prev.debts || []).forEach(function (d) { total += d.balance || 0; });
    return total;
  }

  function calcPrevAssets(prev) {
    return sumPrevFields(prev, 'asset_');
  }

  function sumPrevFields(prev, prefix) {
    var total = 0;
    Object.keys(prev).forEach(function (k) {
      if (k.indexOf(prefix) === 0) {
        total += parseFloat(prev[k]) || 0;
      }
    });
    return total;
  }

  // --- Save / New / Export / Import ---
  document.getElementById('audit-save-btn').addEventListener('click', function () {
    doSave();
    this.textContent = 'Saved!';
    var btn = this;
    setTimeout(function () { btn.textContent = 'Save Audit'; }, 1500);
  });

  document.getElementById('audit-new-btn').addEventListener('click', function () {
    var current = MCStore.get(STORE_KEY);
    if (current && Object.keys(current).length > 2) {
      if (!confirm('Archive current audit and start fresh?')) return;
      var history = MCStore.get(HISTORY_KEY) || [];
      history.push(current);
      MCStore.set(HISTORY_KEY, history);
    }
    MCStore.remove(STORE_KEY);
    container.querySelectorAll('[data-field]').forEach(function (el) {
      if (el.type === 'checkbox') {
        el.checked = false;
      } else {
        el.value = '';
      }
    });
    document.getElementById('debt-rows').innerHTML = '';
    updateTimeRemaining();
  });

  document.getElementById('audit-export-btn').addEventListener('click', function () {
    var data = collectData();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'my-contract-audit-' + MCStore.today() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('audit-import-btn').addEventListener('click', function () {
    document.getElementById('audit-import-file').click();
  });

  document.getElementById('audit-import-file').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var data = JSON.parse(ev.target.result);
        MCStore.set(STORE_KEY, data);
        populateData(data);
        alert('Audit imported successfully.');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // --- Initialize ---
  var saved = MCStore.get(STORE_KEY);
  if (saved) {
    populateData(saved);
  }
  updateTimeRemaining();
})();
