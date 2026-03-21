// Contract Builder Tool
// Digitizes Module 06 — 7-step wizard to build a personal contract

(function () {
  'use strict';

  var container = document.getElementById('contract-builder-tool');
  if (!container) return;

  var STORE_KEY = 'contract';
  var VERSIONS_KEY = 'contract_versions';
  var AMENDMENTS_KEY = 'contract_amendments';
  var saveTimer = null;

  // --- Wizard navigation ---
  var steps = container.querySelectorAll('.wizard-step');
  var panels = container.querySelectorAll('.wizard-panel');

  function goToStep(n) {
    steps.forEach(function (s) {
      var sn = parseInt(s.getAttribute('data-step'));
      s.classList.remove('active');
      if (sn < n) s.classList.add('completed');
      if (sn === n) s.classList.add('active');
    });
    panels.forEach(function (p) { p.classList.remove('active'); });
    document.getElementById('step-' + n).classList.add('active');
    if (n === 7) renderPreview();
  }

  steps.forEach(function (s) {
    s.addEventListener('click', function () {
      goToStep(parseInt(s.getAttribute('data-step')));
    });
  });

  container.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-goto]');
    if (btn) goToStep(parseInt(btn.getAttribute('data-goto')));
  });

  // --- Terms (Step 3) ---
  var termsData = [];

  function renderTerms() {
    var tc = document.getElementById('terms-container');
    tc.innerHTML = '';
    termsData.forEach(function (term, i) {
      var div = document.createElement('div');
      div.className = 'data-section';
      div.style.borderLeft = '3px solid var(--color-border)';
      div.style.paddingLeft = 'var(--space-md)';
      div.style.marginBottom = 'var(--space-lg)';

      var specScore = (term.binary ? 1 : 0) + (term.clear ? 1 : 0) +
        (term.timed ? 1 : 0) + (term.defined ? 1 : 0) + (term.doable ? 1 : 0);
      var specClass = specScore >= 4 ? 'pass' : 'fail';

      div.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-sm);">' +
        '<strong>Term ' + (i + 1) + '</strong>' +
        '<span class="specificity-score ' + specClass + '">' + specScore + '/5</span>' +
        '<button type="button" class="btn-remove-row" data-remove-term="' + i + '">&times;</button>' +
        '</div>' +
        '<textarea class="calc-textarea" data-term-text="' + i + '" placeholder="e.g. I will walk for 30 minutes every day before 8am.">' +
        escHtml(term.text) + '</textarea>' +
        '<div class="specificity-check">' +
        '<label><input type="checkbox" data-term-check="' + i + '" data-check="binary"' + (term.binary ? ' checked' : '') + '> Binary?</label>' +
        '<label><input type="checkbox" data-term-check="' + i + '" data-check="clear"' + (term.clear ? ' checked' : '') + '> Clear?</label>' +
        '<label><input type="checkbox" data-term-check="' + i + '" data-check="timed"' + (term.timed ? ' checked' : '') + '> Timed?</label>' +
        '<label><input type="checkbox" data-term-check="' + i + '" data-check="defined"' + (term.defined ? ' checked' : '') + '> Defined?</label>' +
        '<label><input type="checkbox" data-term-check="' + i + '" data-check="doable"' + (term.doable ? ' checked' : '') + '> Doable?</label>' +
        '</div>';
      tc.appendChild(div);
    });

    // Bind events
    tc.querySelectorAll('[data-term-text]').forEach(function (el) {
      el.addEventListener('input', function () {
        termsData[parseInt(el.getAttribute('data-term-text'))].text = el.value;
        scheduleSave();
      });
    });
    tc.querySelectorAll('[data-term-check]').forEach(function (el) {
      el.addEventListener('change', function () {
        var idx = parseInt(el.getAttribute('data-term-check'));
        var field = el.getAttribute('data-check');
        termsData[idx][field] = el.checked;
        renderTerms();
        scheduleSave();
      });
    });
    tc.querySelectorAll('[data-remove-term]').forEach(function (el) {
      el.addEventListener('click', function () {
        termsData.splice(parseInt(el.getAttribute('data-remove-term')), 1);
        renderTerms();
        scheduleSave();
      });
    });
  }

  document.getElementById('add-term-btn').addEventListener('click', function () {
    if (termsData.length >= 5) return;
    termsData.push({ text: '', binary: false, clear: false, timed: false, defined: false, doable: false });
    renderTerms();
  });

  // --- Sprint targets (Step 4) ---
  var sprintsData = [];

  function renderSprints() {
    var sc = document.getElementById('sprints-container');
    sc.innerHTML = '';
    sprintsData.forEach(function (s, i) {
      var div = document.createElement('div');
      div.className = 'data-section';
      div.style.marginBottom = 'var(--space-lg)';

      var termOptions = '<option value="">-- Link to term --</option>';
      termsData.forEach(function (t, ti) {
        var sel = s.linkedTerm === ti ? ' selected' : '';
        var label = t.text ? t.text.substring(0, 50) : 'Term ' + (ti + 1);
        termOptions += '<option value="' + ti + '"' + sel + '>' + escHtml(label) + '</option>';
      });

      div.innerHTML =
        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: var(--space-sm);">' +
        '<strong>Target ' + (i + 1) + '</strong>' +
        '<button type="button" class="btn-remove-row" data-remove-sprint="' + i + '">&times;</button>' +
        '</div>' +
        '<div class="calc-field" style="margin-bottom:var(--space-sm);"><label>Description</label>' +
        '<input type="text" data-sprint-field="' + i + '" data-sf="desc" value="' + escAttr(s.desc) + '" placeholder="What will you achieve this sprint?"></div>' +
        '<div class="calc-field" style="margin-bottom:var(--space-sm);"><label>Metric</label>' +
        '<input type="text" data-sprint-field="' + i + '" data-sf="metric" value="' + escAttr(s.metric) + '" placeholder="How will you measure it?"></div>' +
        '<div class="calc-field"><label>Linked term</label>' +
        '<select data-sprint-field="' + i + '" data-sf="linkedTerm">' + termOptions + '</select></div>';
      sc.appendChild(div);
    });

    sc.querySelectorAll('[data-sprint-field]').forEach(function (el) {
      el.addEventListener('input', function () {
        var idx = parseInt(el.getAttribute('data-sprint-field'));
        var field = el.getAttribute('data-sf');
        sprintsData[idx][field] = field === 'linkedTerm' ? (el.value === '' ? null : parseInt(el.value)) : el.value;
        scheduleSave();
      });
      el.addEventListener('change', function () {
        var idx = parseInt(el.getAttribute('data-sprint-field'));
        var field = el.getAttribute('data-sf');
        sprintsData[idx][field] = field === 'linkedTerm' ? (el.value === '' ? null : parseInt(el.value)) : el.value;
        scheduleSave();
      });
    });

    sc.querySelectorAll('[data-remove-sprint]').forEach(function (el) {
      el.addEventListener('click', function () {
        sprintsData.splice(parseInt(el.getAttribute('data-remove-sprint')), 1);
        renderSprints();
        scheduleSave();
      });
    });
  }

  document.getElementById('add-sprint-btn').addEventListener('click', function () {
    if (sprintsData.length >= 5) return;
    sprintsData.push({ desc: '', metric: '', linkedTerm: null });
    renderSprints();
  });

  // --- Prohibitions (Step 6) ---
  var prohibitionsData = [];

  function renderProhibitions() {
    var pc = document.getElementById('prohibitions-container');
    pc.innerHTML = '';
    prohibitionsData.forEach(function (p, i) {
      var row = document.createElement('div');
      row.className = 'dynamic-row';
      row.innerHTML =
        '<input type="text" data-prohibition="' + i + '" value="' + escAttr(p) + '" placeholder="e.g. No social media before noon">' +
        '<button type="button" class="btn-remove-row" data-remove-prohibition="' + i + '">&times;</button>';
      pc.appendChild(row);
    });

    pc.querySelectorAll('[data-prohibition]').forEach(function (el) {
      el.addEventListener('input', function () {
        prohibitionsData[parseInt(el.getAttribute('data-prohibition'))] = el.value;
        scheduleSave();
      });
    });
    pc.querySelectorAll('[data-remove-prohibition]').forEach(function (el) {
      el.addEventListener('click', function () {
        prohibitionsData.splice(parseInt(el.getAttribute('data-remove-prohibition')), 1);
        renderProhibitions();
        scheduleSave();
      });
    });
  }

  document.getElementById('add-prohibition-btn').addEventListener('click', function () {
    if (prohibitionsData.length >= 5) return;
    prohibitionsData.push('');
    renderProhibitions();
  });

  // --- Contract Preview (Step 7) ---
  function renderPreview() {
    var area = document.getElementById('contract-preview-area');
    var data = collectContract();

    var html = '<div class="contract-preview">';
    html += '<h2>My Contract</h2>';

    // Version + date
    html += '<p style="text-align:center; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-muted);">Version ' + (data.version || '1.0') + ' &mdash; ' + MCStore.today() + '</p>';

    // Reality
    html += '<div class="contract-section"><h3>Current Reality</h3>';
    html += row('Net Worth', data.reality_net_worth);
    html += row('Monthly Surplus/Deficit', data.reality_cash_flow);
    html += row('Total Debt', data.reality_debt);
    html += row('Health Status', data.reality_health);
    html += row('Stress Load', data.reality_stress);
    html += '</div>';

    // Strengths
    html += '<div class="contract-section"><h3>Strengths & Weaknesses</h3>';
    html += row('Biggest Strength', data.strength_biggest);
    html += row('Biggest Weakness', data.weakness_biggest);
    html += row('Avoiding', data.avoiding);
    html += '</div>';

    // Terms
    html += '<div class="contract-section"><h3>Non-Negotiable Terms</h3>';
    termsData.forEach(function (t, i) {
      if (t.text) {
        var score = (t.binary ? 1 : 0) + (t.clear ? 1 : 0) + (t.timed ? 1 : 0) + (t.defined ? 1 : 0) + (t.doable ? 1 : 0);
        html += '<div class="contract-term"><strong>' + (i + 1) + '.</strong> ' + escHtml(t.text) +
          ' <span class="specificity-score ' + (score >= 4 ? 'pass' : 'fail') + '">(' + score + '/5)</span></div>';
      }
    });
    html += '</div>';

    // Sprint targets
    html += '<div class="contract-section"><h3>Sprint Targets</h3>';
    sprintsData.forEach(function (s, i) {
      if (s.desc) {
        var linked = s.linkedTerm !== null && termsData[s.linkedTerm] ? termsData[s.linkedTerm].text.substring(0, 40) : '';
        html += '<div class="contract-term"><strong>' + (i + 1) + '.</strong> ' + escHtml(s.desc) +
          (s.metric ? ' <em>(' + escHtml(s.metric) + ')</em>' : '') +
          (linked ? '<br><span style="font-size:var(--text-xs); color:var(--color-text-faint);">Supports: ' + escHtml(linked) + '</span>' : '') +
          '</div>';
      }
    });
    html += '</div>';

    // Schedule
    html += '<div class="contract-section"><h3>Review Schedule</h3>';
    html += row('Daily Reboot', data.schedule_daily);
    html += row('Weekly Review', (data.schedule_weekly_day || '') + (data.schedule_weekly_time ? ' at ' + data.schedule_weekly_time : ''));
    html += row('Monthly Review', data.schedule_monthly_day ? 'Day ' + data.schedule_monthly_day : '');
    html += row('Quarterly', data.schedule_quarterly);
    html += '</div>';

    // Prohibitions
    if (prohibitionsData.some(function (p) { return p; })) {
      html += '<div class="contract-section"><h3>Prohibitions</h3>';
      prohibitionsData.forEach(function (p, i) {
        if (p) html += '<div class="contract-term"><strong>' + (i + 1) + '.</strong> ' + escHtml(p) + '</div>';
      });
      html += '</div>';
    }

    // Signature area
    var sigName = getField('signature_name');
    html += '<div class="contract-signature">';
    html += '<div class="sig-line">' + escHtml(sigName || '_______________') + '</div>';
    html += '<div class="sig-date">' + MCStore.today() + '</div>';
    html += '</div>';

    html += '</div>';
    area.innerHTML = html;
  }

  function row(label, value) {
    return '<div class="contract-term"><span style="color:var(--color-text-muted);">' + label + ':</span> ' + escHtml(value || '—') + '</div>';
  }

  // --- Import from Audit ---
  document.getElementById('import-audit-btn').addEventListener('click', function () {
    var audit = MCStore.get('audit');
    if (!audit) {
      alert('No audit data found. Complete your Honest Audit first.');
      return;
    }
    // Calculate values from audit
    var totalIncome = sumAuditFields(audit, 'income_');
    var totalFixed = sumAuditFields(audit, 'fixed_');
    var totalVariable = sumAuditFields(audit, 'var_');
    var totalAssets = sumAuditFields(audit, 'asset_');
    var totalDebt = 0;
    (audit.debts || []).forEach(function (d) { totalDebt += d.balance || 0; });
    var netWorth = totalAssets - totalDebt;
    var cashFlow = totalIncome - totalFixed - totalVariable;

    setField('reality_net_worth', '$' + Math.round(netWorth).toLocaleString());
    setField('reality_cash_flow', '$' + Math.round(cashFlow).toLocaleString());
    setField('reality_debt', '$' + Math.round(totalDebt).toLocaleString());
    scheduleSave();
    this.textContent = 'Imported!';
    var btn = this;
    setTimeout(function () { btn.textContent = 'Import from Audit'; }, 1500);
  });

  function sumAuditFields(audit, prefix) {
    var total = 0;
    Object.keys(audit).forEach(function (k) {
      if (k.indexOf(prefix) === 0) total += parseFloat(audit[k]) || 0;
    });
    return total;
  }

  // --- Sign ---
  document.getElementById('sign-btn').addEventListener('click', function () {
    var name = getField('signature_name');
    if (!name) {
      alert('Please enter your name to sign.');
      return;
    }
    var data = collectContract();
    data.signed = true;
    data.signedDate = MCStore.today();
    data.signedName = name;
    if (!data.version) data.version = '1.0';
    MCStore.set(STORE_KEY, data);
    document.getElementById('post-sign-actions').style.display = 'flex';
    document.getElementById('contract-status').textContent = 'Signed v' + data.version + ' on ' + data.signedDate;
    this.textContent = 'Signed!';
    var btn = this;
    setTimeout(function () { btn.textContent = 'Sign Contract'; }, 2000);
  });

  document.getElementById('print-btn').addEventListener('click', function () {
    window.print();
  });

  document.getElementById('contract-export-btn').addEventListener('click', function () {
    var data = collectContract();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'my-contract-v' + (data.version || '1') + '-' + MCStore.today() + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // --- Amendments ---
  document.getElementById('add-amendment-btn').addEventListener('click', function () {
    var text = prompt('Describe the amendment:');
    if (!text) return;
    var amendments = MCStore.get(AMENDMENTS_KEY) || [];
    var contract = MCStore.get(STORE_KEY) || {};
    amendments.push({
      id: MCStore.uid(),
      date: MCStore.today(),
      text: text,
      version: contract.version || '1.0'
    });
    MCStore.set(AMENDMENTS_KEY, amendments);
    alert('Amendment recorded.');
  });

  // --- New Version ---
  document.getElementById('new-version-btn').addEventListener('click', function () {
    if (!confirm('Archive current contract and start a new version?')) return;
    var current = MCStore.get(STORE_KEY);
    if (current) {
      var versions = MCStore.get(VERSIONS_KEY) || [];
      versions.push(current);
      MCStore.set(VERSIONS_KEY, versions);
      // Increment version
      var vNum = parseFloat(current.version || '1.0');
      current.version = (vNum + 1).toFixed(1);
      current.signed = false;
      current.signedDate = null;
      current.signedName = null;
      MCStore.set(STORE_KEY, current);
      loadContract();
      document.getElementById('post-sign-actions').style.display = 'none';
      goToStep(1);
    }
  });

  // --- Data helpers ---
  function getField(key) {
    var el = container.querySelector('[data-contract="' + key + '"]');
    return el ? el.value : '';
  }

  function setField(key, value) {
    var el = container.querySelector('[data-contract="' + key + '"]');
    if (el) el.value = value;
  }

  function collectContract() {
    var data = {};
    container.querySelectorAll('[data-contract]').forEach(function (el) {
      data[el.getAttribute('data-contract')] = el.value;
    });
    data.terms = termsData;
    data.sprints = sprintsData;
    data.prohibitions = prohibitionsData;
    // Preserve version info
    var existing = MCStore.get(STORE_KEY);
    if (existing) {
      data.version = existing.version || '1.0';
      data.signed = existing.signed || false;
      data.signedDate = existing.signedDate || null;
      data.signedName = existing.signedName || null;
    }
    return data;
  }

  function loadContract() {
    var data = MCStore.get(STORE_KEY);
    if (!data) {
      // Initialize with defaults
      termsData = [
        { text: '', binary: false, clear: false, timed: false, defined: false, doable: false },
        { text: '', binary: false, clear: false, timed: false, defined: false, doable: false },
        { text: '', binary: false, clear: false, timed: false, defined: false, doable: false }
      ];
      sprintsData = [
        { desc: '', metric: '', linkedTerm: null },
        { desc: '', metric: '', linkedTerm: null },
        { desc: '', metric: '', linkedTerm: null }
      ];
      prohibitionsData = [''];
      renderTerms();
      renderSprints();
      renderProhibitions();
      return;
    }
    container.querySelectorAll('[data-contract]').forEach(function (el) {
      var key = el.getAttribute('data-contract');
      if (data[key] !== undefined) el.value = data[key];
    });
    termsData = data.terms || [];
    sprintsData = data.sprints || [];
    prohibitionsData = data.prohibitions || [];
    if (termsData.length === 0) termsData = [{ text: '', binary: false, clear: false, timed: false, defined: false, doable: false }];
    if (sprintsData.length === 0) sprintsData = [{ desc: '', metric: '', linkedTerm: null }];
    if (prohibitionsData.length === 0) prohibitionsData = [''];
    renderTerms();
    renderSprints();
    renderProhibitions();

    if (data.signed) {
      document.getElementById('post-sign-actions').style.display = 'flex';
      document.getElementById('contract-status').textContent = 'Signed v' + (data.version || '1.0') + ' on ' + (data.signedDate || '');
    }
  }

  // --- Auto-save ---
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      var data = collectContract();
      MCStore.set(STORE_KEY, data);
    }, 500);
  }

  container.querySelectorAll('[data-contract]').forEach(function (el) {
    el.addEventListener('input', scheduleSave);
  });

  // --- Utilities ---
  function escHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escAttr(s) {
    return escHtml(s).replace(/"/g, '&quot;');
  }

  // --- Initialize ---
  loadContract();
})();
