// Weekly Review Dashboard
// Digitizes Module 13 review protocols — weekly, monthly, quarterly, annual

(function () {
  'use strict';

  var container = document.getElementById('weekly-review-tool');
  if (!container) return;

  var KEYS = {
    weekly: 'review_weekly',
    monthly: 'review_monthly',
    quarterly: 'review_quarterly',
    annual: 'review_annual'
  };

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
      render(target);
    });
  });

  function render(tab) {
    switch (tab) {
      case 'weekly': renderWeekly(); break;
      case 'monthly': renderMonthly(); break;
      case 'quarterly': renderQuarterly(); break;
      case 'annual': renderAnnual(); break;
      case 'trends': renderTrends(); break;
    }
  }

  // --- Helpers ---
  function getContract() { return MCStore.get('contract'); }
  function getSprint() { return MCStore.get('sprint_current'); }
  function getAudit() { return MCStore.get('audit'); }

  function getReviews(type) { return MCStore.get(KEYS[type]) || []; }
  function saveReviews(type, data) { MCStore.set(KEYS[type], data); }

  function escHtml(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function field(id, label, type, value, placeholder, extra) {
    extra = extra || '';
    if (type === 'textarea') {
      return '<div class="calc-field" style="margin-bottom:var(--space-sm);"><label>' + label + '</label>' +
        '<textarea class="calc-textarea" data-review="' + id + '" placeholder="' + (placeholder || '') + '">' + escHtml(value || '') + '</textarea></div>';
    }
    if (type === 'select') {
      return '<div class="data-row"><label>' + label + '</label>' +
        '<select data-review="' + id + '">' + extra + '</select></div>';
    }
    if (type === 'range') {
      return '<div class="domain-row"><label>' + label + '</label>' +
        '<input type="range" data-review="' + id + '" min="1" max="10" value="' + (value || 5) + '">' +
        '<span class="domain-val" data-range-val="' + id + '">' + (value || 5) + '</span></div>';
    }
    return '<div class="data-row"><label>' + label + '</label>' +
      '<input type="' + type + '" data-review="' + id + '" value="' + escHtml(value || '') + '" placeholder="' + (placeholder || '') + '" ' + extra + '></div>';
  }

  function selectOpts(options, selected) {
    return options.map(function (o) {
      return '<option value="' + o.v + '"' + (selected === o.v ? ' selected' : '') + '>' + o.l + '</option>';
    }).join('');
  }

  var stressOpts = [
    { v: '', l: '--' }, { v: 'low', l: 'Low' }, { v: 'medium', l: 'Medium' },
    { v: 'high', l: 'High' }, { v: 'critical', l: 'Critical' }
  ];

  function collectReviewFields() {
    var data = { date: MCStore.today() };
    container.querySelectorAll('[data-review]').forEach(function (el) {
      data[el.getAttribute('data-review')] = el.value;
    });
    return data;
  }

  function bindRangeDisplays() {
    container.querySelectorAll('input[type="range"][data-review]').forEach(function (el) {
      var id = el.getAttribute('data-review');
      el.addEventListener('input', function () {
        var valEl = container.querySelector('[data-range-val="' + id + '"]');
        if (valEl) valEl.textContent = el.value;
      });
    });
  }

  // --- Weekly Review ---
  function renderWeekly() {
    var el = document.getElementById('review-weekly-content');
    var contract = getContract();

    var html = '<h3 style="margin-bottom: var(--space-lg);">Weekly Review (15 minutes)</h3>';

    // Term compliance
    html += '<div class="data-section"><p class="data-section-header">Contract Compliance</p>';
    if (contract && contract.terms) {
      contract.terms.forEach(function (t, i) {
        if (t.text) {
          html += '<div class="data-row"><label>' + escHtml(t.text) + '</label>' +
            '<select data-review="term_' + i + '">' +
            selectOpts([{ v: '', l: '--' }, { v: 'met', l: 'Met' }, { v: 'partial', l: 'Partial' }, { v: 'missed', l: 'Missed' }], '') +
            '</select></div>';
        }
      });
    } else {
      html += '<p style="font-size: var(--text-sm); color: var(--color-text-muted);">No contract found. <a href="/tools/contract-builder/">Build one first.</a></p>';
    }
    html += '</div>';

    // Financial
    html += '<div class="data-section"><p class="data-section-header">Financial</p>';
    html += field('fin_spent', 'Total spent this week', 'number', '', '$0', 'step="0.01"');
    html += field('fin_largest', 'Largest unnecessary expense', 'text', '', 'What and how much');
    html += field('fin_savings', 'Savings/debt payment made?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }], ''));
    html += field('fin_on_budget', 'On budget?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }], ''));
    html += '</div>';

    // Physical
    html += '<div class="data-section"><p class="data-section-header">Physical</p>';
    html += field('phys_exercise', 'Exercise sessions', 'number', '', '0', 'min="0" max="7"');
    html += field('phys_sleep', 'Avg sleep (hours)', 'number', '', '0', 'step="0.5"');
    html += field('phys_water', 'Adequate water?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }], ''));
    html += field('phys_energy', 'Energy (1-10)', 'number', '', '0', 'min="1" max="10"');
    html += '</div>';

    // Mental
    html += '<div class="data-section"><p class="data-section-header">Mental</p>';
    html += field('mental_stress', 'Stress level', 'select', '', '', selectOpts(stressOpts, ''));
    html += field('mental_avoiding', 'Avoiding anything?', 'text', '', 'Be honest...');
    html += field('mental_win', 'One thing that went well', 'text', '', 'Name it.');
    html += '</div>';

    // Breach log
    html += '<div class="data-section"><p class="data-section-header">Breach Log</p>';
    html += field('breach_1', 'Breach', 'text', '', 'What happened?');
    html += field('breach_1_trigger', 'Trigger', 'text', '', 'What caused it?');
    html += field('breach_1_counter', 'Countermeasure', 'text', '', 'System fix?');
    html += '</div>';

    // Next week
    html += '<div class="data-section"><p class="data-section-header">Next Week</p>';
    html += field('next_improve', 'One thing to improve', 'text', '', '');
    html += field('next_maintain', 'One thing to maintain', 'text', '', '');
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-weekly-btn" style="margin-top: var(--space-md);">Save Weekly Review</button>';

    el.innerHTML = html;

    document.getElementById('save-weekly-btn').addEventListener('click', function () {
      var data = collectReviewFields();
      var reviews = getReviews('weekly');
      reviews.push(data);
      saveReviews('weekly', reviews);
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Weekly Review'; }, 1500);
    });
  }

  // --- Monthly Review ---
  function renderMonthly() {
    var el = document.getElementById('review-monthly-content');
    var sprint = getSprint();

    var html = '<h3 style="margin-bottom: var(--space-lg);">Monthly Sprint Review (30 minutes)</h3>';

    // Sprint targets
    html += '<div class="data-section"><p class="data-section-header">Sprint Targets Assessment</p>';
    if (sprint && sprint.terms) {
      sprint.terms.forEach(function (t, i) {
        html += '<div class="data-row"><label>' + escHtml(t.text) + '</label>' +
          '<select data-review="target_' + i + '">' +
          selectOpts([{ v: '', l: '--' }, { v: 'met', l: 'Met' }, { v: 'partial', l: 'Partial' }, { v: 'missed', l: 'Missed' }], '') +
          '</select></div>';
      });
    } else {
      html += '<p style="font-size: var(--text-sm); color: var(--color-text-muted);">No active sprint. <a href="/tools/sprint-tracker/">Start one.</a></p>';
    }
    html += '</div>';

    // Month-end financials
    html += '<div class="data-section"><p class="data-section-header">Month-End Financials</p>';
    html += field('month_income', 'Income this month', 'number', '', '$0', 'step="0.01"');
    html += field('month_spending', 'Total spending', 'number', '', '$0', 'step="0.01"');
    html += field('month_surplus', 'Surplus / deficit', 'number', '', '$0', 'step="0.01"');
    html += field('month_debt_change', 'Debt change (+/-)', 'number', '', '$0', 'step="0.01"');
    html += field('month_savings_change', 'Savings change (+/-)', 'number', '', '$0', 'step="0.01"');
    html += '</div>';

    // Retrospective
    html += '<div class="data-section"><p class="data-section-header">Retrospective</p>';
    html += field('retro_worked', 'What worked', 'textarea', '', 'Systems and habits that helped...');
    html += field('retro_didnt', 'What didn\'t work and why', 'textarea', '', 'Specific causes...');
    html += field('retro_change', 'One system change', 'textarea', '', 'What concrete change will you make?');
    html += '</div>';

    // Contract review
    html += '<div class="data-section"><p class="data-section-header">Contract Review</p>';
    html += field('contract_appropriate', 'Terms still appropriate?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'Need adjustment' }], ''));
    html += field('contract_upgrade', 'Ready to upgrade?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }, { v: 'downgrade', l: 'Need to downgrade' }], ''));
    html += field('contract_mods', 'Modifications needed', 'textarea', '', 'Terms to add, modify, or suspend...');
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-monthly-btn" style="margin-top: var(--space-md);">Save Monthly Review</button>';

    el.innerHTML = html;

    document.getElementById('save-monthly-btn').addEventListener('click', function () {
      var data = collectReviewFields();
      var reviews = getReviews('monthly');
      reviews.push(data);
      saveReviews('monthly', reviews);
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Monthly Review'; }, 1500);
    });
  }

  // --- Quarterly Review ---
  function renderQuarterly() {
    var el = document.getElementById('review-quarterly-content');
    var audit = getAudit();
    var contract = getContract();

    var html = '<h3 style="margin-bottom: var(--space-lg);">Quarterly Deep Review (60 minutes)</h3>';

    // Big picture
    html += '<div class="data-section"><p class="data-section-header">The Big Picture</p>';
    if (audit) {
      var totalAssets = sumFields(audit, 'asset_');
      var totalDebt = 0;
      (audit.debts || []).forEach(function (d) { totalDebt += d.balance || 0; });
      html += '<p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-sm);">From your audit: Net worth $' + Math.round(totalAssets - totalDebt).toLocaleString() + '</p>';
    }
    html += field('q_nw_3mo', 'Net worth 3 months ago', 'text', '', '$0');
    html += field('q_nw_now', 'Net worth now', 'text', '', '$0');
    html += field('q_weight_3mo', 'Weight 3 months ago', 'text', '', 'lbs');
    html += field('q_weight_now', 'Weight now', 'text', '', 'lbs');
    html += field('q_avg_compliance', 'Avg sprint compliance', 'text', '', '%');
    html += '</div>';

    // Contract evolution
    html += '<div class="data-section"><p class="data-section-header">Contract Evolution</p>';
    html += field('q_version', 'Current version', 'text', contract ? (contract.version || '1.0') : '', '');
    html += field('q_terms_added', 'Terms added this quarter', 'text', '', '');
    html += field('q_terms_modified', 'Terms modified', 'text', '', '');
    html += field('q_terms_failing', 'Consistently failing terms + root cause', 'textarea', '', 'Which terms keep failing and why?');
    html += '</div>';

    // 5-year arc
    html += '<div class="data-section"><p class="data-section-header">5-Year Arc Check</p>';
    html += field('q_arc_track', 'On track?', 'select', '', '', selectOpts([{ v: '', l: '--' }, { v: 'yes', l: 'Yes' }, { v: 'no', l: 'No' }], ''));
    html += field('q_arc_gap', 'Biggest gap', 'text', '', 'Where are you furthest from where you want to be?');
    html += field('q_arc_plan', 'Plan to close the gap', 'textarea', '', '');
    html += '</div>';

    // Domain assessment
    html += '<div class="data-section"><p class="data-section-header">Life Domain Assessment (1-10)</p>';
    html += '<div class="domain-grid">';
    html += field('domain_financial', 'Financial stability', 'range', '5');
    html += field('domain_physical', 'Physical health', 'range', '5');
    html += field('domain_mental', 'Mental health', 'range', '5');
    html += field('domain_career', 'Career / skill capital', 'range', '5');
    html += field('domain_relationships', 'Relationships', 'range', '5');
    html += field('domain_satisfaction', 'Life satisfaction', 'range', '5');
    html += field('domain_overall', 'Overall', 'range', '5');
    html += '</div></div>';

    // Avoidance audit
    html += '<div class="data-section"><p class="data-section-header">Avoidance Audit</p>';
    html += field('q_avoid_1', 'Avoiding #1', 'text', '', 'What are you not facing?');
    html += field('q_avoid_2', 'Avoiding #2', 'text', '', '');
    html += field('q_avoid_3', 'Avoiding #3', 'text', '', '');
    html += '</div>';

    // Next quarter
    html += '<div class="data-section"><p class="data-section-header">Next Quarter Focus</p>';
    html += field('q_next_focus', 'Primary focus', 'text', '', 'One area to prioritize');
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-quarterly-btn" style="margin-top: var(--space-md);">Save Quarterly Review</button>';

    el.innerHTML = html;
    bindRangeDisplays();

    document.getElementById('save-quarterly-btn').addEventListener('click', function () {
      var data = collectReviewFields();
      var reviews = getReviews('quarterly');
      reviews.push(data);
      saveReviews('quarterly', reviews);
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Quarterly Review'; }, 1500);
    });
  }

  // --- Annual Review ---
  function renderAnnual() {
    var el = document.getElementById('review-annual-content');

    var html = '<h3 style="margin-bottom: var(--space-lg);">Annual "State of the Contract" (90 minutes)</h3>';

    // Year in review: financial
    html += '<div class="data-section"><p class="data-section-header">Financial Year in Review</p>';
    html += field('a_nw_jan', 'Net worth Jan 1', 'text', '', '$0');
    html += field('a_nw_dec', 'Net worth Dec 31', 'text', '', '$0');
    html += field('a_debt_jan', 'Total debt Jan 1', 'text', '', '$0');
    html += field('a_debt_dec', 'Total debt Dec 31', 'text', '', '$0');
    html += field('a_total_saved', 'Total saved/invested', 'text', '', '$0');
    html += '</div>';

    // Health
    html += '<div class="data-section"><p class="data-section-header">Health Year in Review</p>';
    html += field('a_weight_jan', 'Weight Jan 1', 'text', '', 'lbs');
    html += field('a_weight_dec', 'Weight Dec 31', 'text', '', 'lbs');
    html += field('a_exercise_avg', 'Avg exercise days/week', 'text', '', '');
    html += field('a_health_events', 'Major health events', 'textarea', '', 'Appointments, diagnoses, changes...');
    html += '</div>';

    // Contract metrics
    html += '<div class="data-section"><p class="data-section-header">Contract Metrics</p>';
    html += field('a_avg_compliance', 'Avg annual compliance (%)', 'text', '', '%');
    html += field('a_versions', 'Versions progressed', 'text', '', 'e.g. 1.0 → 2.0');
    html += field('a_sprints_completed', 'Total sprints completed', 'number', '', '0');
    html += field('a_best_sprint', 'Best sprint compliance (%)', 'text', '', '%');
    html += field('a_worst_sprint', 'Worst sprint compliance (%)', 'text', '', '%');
    html += '</div>';

    // Wins and failures
    html += '<div class="data-section"><p class="data-section-header">Biggest Wins</p>';
    html += field('a_win_1', 'Win #1', 'text', '', '');
    html += field('a_win_2', 'Win #2', 'text', '', '');
    html += field('a_win_3', 'Win #3', 'text', '', '');
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Biggest Failures & Lessons</p>';
    html += field('a_fail_1', 'Failure #1', 'text', '', '');
    html += field('a_fail_2', 'Failure #2', 'text', '', '');
    html += field('a_fail_3', 'Failure #3', 'text', '', '');
    html += '</div>';

    // Next year
    html += '<div class="data-section"><p class="data-section-header">Next Year</p>';
    html += field('a_theme', 'One-word theme', 'text', '', 'e.g. Foundation, Growth, Discipline');
    html += field('a_priority_1', 'Priority #1', 'text', '', '');
    html += field('a_priority_2', 'Priority #2', 'text', '', '');
    html += field('a_priority_3', 'Priority #3', 'text', '', '');
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-annual-btn" style="margin-top: var(--space-md);">Save Annual Review</button>';

    el.innerHTML = html;

    document.getElementById('save-annual-btn').addEventListener('click', function () {
      var data = collectReviewFields();
      var reviews = getReviews('annual');
      reviews.push(data);
      saveReviews('annual', reviews);
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Annual Review'; }, 1500);
    });
  }

  // --- Trends ---
  function renderTrends() {
    var el = document.getElementById('review-trends-content');
    var weekly = getReviews('weekly');
    var monthly = getReviews('monthly');
    var quarterly = getReviews('quarterly');
    var annual = getReviews('annual');

    var total = weekly.length + monthly.length + quarterly.length + annual.length;

    if (total === 0) {
      el.innerHTML = '<div class="empty-state"><p>No reviews saved yet. Complete your first review to see trends.</p></div>';
      return;
    }

    var html = '<h3 style="margin-bottom: var(--space-lg);">Review History</h3>';

    // Timeline
    var all = [];
    weekly.forEach(function (r) { all.push({ type: 'Weekly', date: r.date, data: r }); });
    monthly.forEach(function (r) { all.push({ type: 'Monthly', date: r.date, data: r }); });
    quarterly.forEach(function (r) { all.push({ type: 'Quarterly', date: r.date, data: r }); });
    annual.forEach(function (r) { all.push({ type: 'Annual', date: r.date, data: r }); });

    all.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });

    html += '<div class="review-timeline">';
    all.forEach(function (entry) {
      var badge = '<span class="status-pending">' + entry.type + '</span>';
      var summary = '';
      if (entry.type === 'Weekly') {
        summary = 'Energy: ' + (entry.data.phys_energy || '?') + '/10, Stress: ' + (entry.data.mental_stress || '?');
      } else if (entry.type === 'Monthly') {
        summary = 'Surplus: $' + (entry.data.month_surplus || '0');
      } else if (entry.type === 'Quarterly') {
        summary = 'Domains — Financial: ' + (entry.data.domain_financial || '?') +
          ', Physical: ' + (entry.data.domain_physical || '?') +
          ', Overall: ' + (entry.data.domain_overall || '?');
      } else if (entry.type === 'Annual') {
        summary = 'Theme: ' + (entry.data.a_theme || '?') + ', Compliance: ' + (entry.data.a_avg_compliance || '?') + '%';
      }

      html += '<div class="review-entry">' +
        '<p class="review-date">' + (entry.date || 'No date') + ' ' + badge + '</p>' +
        '<p class="review-summary">' + escHtml(summary) + '</p>' +
        '</div>';
    });
    html += '</div>';

    // Domain chart from quarterly reviews
    if (quarterly.length > 1) {
      html += '<div class="chart-container" style="margin-top: var(--space-xl);">' +
        '<p class="data-section-header">Domain Scores Over Time</p>' +
        '<canvas id="domain-chart"></canvas></div>';
    }

    el.innerHTML = html;

    if (quarterly.length > 1) {
      drawDomainChart(quarterly);
    }
  }

  function drawDomainChart(quarterly) {
    var canvas = document.getElementById('domain-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.parentElement.clientWidth - 32;
    var h = 200;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    var padding = { top: 20, right: 20, bottom: 30, left: 30 };
    var chartW = w - padding.left - padding.right;
    var chartH = h - padding.top - padding.bottom;

    var style = getComputedStyle(document.documentElement);
    var colorGrowth = style.getPropertyValue('--color-growth').trim() || '#2d6a4f';
    var colorAccent = style.getPropertyValue('--color-accent').trim() || '#b83230';
    var colorBorder = style.getPropertyValue('--color-border').trim() || '#d4d0ca';
    var colorText = style.getPropertyValue('--color-text-muted').trim() || '#5c5c5c';

    var domains = ['domain_financial', 'domain_physical', 'domain_mental', 'domain_overall'];
    var colors = [colorGrowth, '#b8860b', colorAccent, colorText];
    var labels = ['Financial', 'Physical', 'Mental', 'Overall'];

    // Grid lines
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 0.5;
    for (var g = 0; g <= 10; g += 2) {
      var y = padding.top + chartH - (g / 10) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = colorText;
      ctx.font = '9px monospace';
      ctx.fillText(g, 5, y + 3);
    }

    // Lines
    domains.forEach(function (domain, di) {
      ctx.strokeStyle = colors[di];
      ctx.lineWidth = 2;
      ctx.beginPath();
      quarterly.forEach(function (q, qi) {
        var x = padding.left + (qi / (quarterly.length - 1)) * chartW;
        var val = parseInt(q[domain]) || 5;
        var y = padding.top + chartH - (val / 10) * chartH;
        if (qi === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Legend
    var legendX = padding.left;
    ctx.font = '10px monospace';
    labels.forEach(function (l, li) {
      ctx.fillStyle = colors[li];
      ctx.fillRect(legendX, h - 12, 12, 8);
      ctx.fillStyle = colorText;
      ctx.fillText(l, legendX + 16, h - 5);
      legendX += ctx.measureText(l).width + 30;
    });

    // X labels
    ctx.fillStyle = colorText;
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    quarterly.forEach(function (q, qi) {
      var x = padding.left + (qi / (quarterly.length - 1)) * chartW;
      ctx.fillText(q.date || ('Q' + (qi + 1)), x, h - 18);
    });
  }

  function sumFields(obj, prefix) {
    var total = 0;
    Object.keys(obj).forEach(function (k) {
      if (k.indexOf(prefix) === 0) total += parseFloat(obj[k]) || 0;
    });
    return total;
  }

  // --- Initialize ---
  renderWeekly();
})();
