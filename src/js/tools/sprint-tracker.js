// Sprint Tracker Tool
// Digitizes Module 07 — 28-day sprint cycle management

(function () {
  'use strict';

  var container = document.getElementById('sprint-tracker-tool');
  if (!container) return;

  var CURRENT_KEY = 'sprint_current';
  var HISTORY_KEY = 'sprint_history';
  var SPRINT_DAYS = 28;

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
      case 'current': renderCurrent(); break;
      case 'daily': renderDaily(); break;
      case 'weekly': renderWeekly(); break;
      case 'retro': renderRetro(); break;
      case 'history': renderHistory(); break;
    }
  }

  // --- Helpers ---
  function getContract() { return MCStore.get('contract'); }
  function getSprint() { return MCStore.get(CURRENT_KEY); }
  function saveSprint(data) { MCStore.set(CURRENT_KEY, data); }

  function daysBetween(a, b) {
    return Math.floor((new Date(b) - new Date(a)) / 86400000);
  }

  function addDays(dateStr, n) {
    var d = new Date(dateStr);
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function escHtml(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function calcCompliance(sprint, termIdx) {
    var met = 0;
    var total = 0;
    var log = sprint.dailyLog || {};
    Object.keys(log).forEach(function (date) {
      if (log[date][termIdx] !== undefined) {
        total++;
        if (log[date][termIdx]) met++;
      }
    });
    return total > 0 ? Math.round((met / total) * 100) : 0;
  }

  function calcOverallCompliance(sprint) {
    if (!sprint.terms || sprint.terms.length === 0) return 0;
    var rates = sprint.terms.map(function (_, i) { return calcCompliance(sprint, i); });
    return Math.round(rates.reduce(function (a, b) { return a + b; }, 0) / rates.length);
  }

  function barClass(pct) {
    if (pct >= 75) return 'high';
    if (pct >= 60) return 'mid';
    return 'low';
  }

  // --- Current Sprint ---
  function renderCurrent() {
    var el = document.getElementById('sprint-current-content');
    var contract = getContract();
    var sprint = getSprint();

    if (!contract || !contract.terms || contract.terms.length === 0) {
      el.innerHTML = '<div class="empty-state"><p>No contract found.</p>' +
        '<a href="/tools/contract-builder/" class="calc-btn">Build Your Contract</a></div>';
      return;
    }

    if (!sprint) {
      // No active sprint — offer to start one
      var termsHtml = '';
      contract.terms.forEach(function (t, i) {
        if (t.text) {
          termsHtml += '<div class="contract-term"><strong>' + (i + 1) + '.</strong> ' + escHtml(t.text) + '</div>';
        }
      });
      el.innerHTML =
        '<h3 style="margin-bottom: var(--space-lg);">Start a New Sprint</h3>' +
        '<p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">Your contract terms will be tracked for 28 days.</p>' +
        '<div class="data-section"><p class="data-section-header">Contract Terms</p>' + termsHtml + '</div>' +
        '<button type="button" class="calc-btn" id="start-sprint-btn">Start Sprint</button>';

      document.getElementById('start-sprint-btn').addEventListener('click', function () {
        startSprint(contract);
        renderCurrent();
      });
      return;
    }

    // Active sprint
    var dayNum = daysBetween(sprint.startDate, MCStore.today()) + 1;
    var daysLeft = SPRINT_DAYS - dayNum;
    if (dayNum > SPRINT_DAYS) dayNum = SPRINT_DAYS;
    var overall = calcOverallCompliance(sprint);

    var html = '<h3 style="margin-bottom: var(--space-md);">Sprint #' + sprint.number + '</h3>';
    html += '<div class="summary-cards">';
    html += '<div class="summary-card"><span class="card-value">' + dayNum + '/' + SPRINT_DAYS + '</span><span class="card-label">Day</span></div>';
    html += '<div class="summary-card"><span class="card-value">' + sprint.startDate + '</span><span class="card-label">Started</span></div>';
    html += '<div class="summary-card"><span class="card-value">' + sprint.endDate + '</span><span class="card-label">Ends</span></div>';
    html += '<div class="summary-card"><span class="card-value ' + (overall >= 75 ? 'positive' : (overall >= 60 ? '' : 'negative')) + '">' + overall + '%</span><span class="card-label">Compliance</span></div>';
    html += '</div>';

    // Per-term compliance bars
    html += '<div class="data-section" style="margin-top: var(--space-xl);"><p class="data-section-header">Term Compliance</p>';
    html += '<div class="bar-chart">';
    sprint.terms.forEach(function (t, i) {
      var pct = calcCompliance(sprint, i);
      html += '<div class="bar-chart-row">' +
        '<span class="bar-chart-label" title="' + escHtml(t.text) + '">Term ' + (i + 1) + '</span>' +
        '<div class="bar-chart-track"><div class="bar-chart-bar ' + barClass(pct) + '" style="width:' + pct + '%;"></div></div>' +
        '<span class="bar-chart-value">' + pct + '%</span>' +
        '</div>';
    });
    html += '</div></div>';

    if (daysLeft <= 0) {
      html += '<div style="margin-top: var(--space-xl);"><button type="button" class="calc-btn" id="end-sprint-btn">End Sprint</button></div>';
    }

    el.innerHTML = html;

    var endBtn = document.getElementById('end-sprint-btn');
    if (endBtn) {
      endBtn.addEventListener('click', function () {
        endSprint();
        renderCurrent();
      });
    }
  }

  function startSprint(contract) {
    var history = MCStore.get(HISTORY_KEY) || [];
    var sprint = {
      id: MCStore.uid(),
      number: history.length + 1,
      startDate: MCStore.today(),
      endDate: addDays(MCStore.today(), SPRINT_DAYS - 1),
      terms: contract.terms.filter(function (t) { return t.text; }).map(function (t) {
        return { text: t.text };
      }),
      dailyLog: {},
      weeklyCheckins: {},
      retro: { worked: '', didnt: '', changes: '' }
    };
    saveSprint(sprint);
  }

  function endSprint() {
    var sprint = getSprint();
    if (!sprint) return;
    sprint.finalCompliance = calcOverallCompliance(sprint);
    sprint.endedDate = MCStore.today();
    var history = MCStore.get(HISTORY_KEY) || [];
    history.push(sprint);
    MCStore.set(HISTORY_KEY, history);
    MCStore.remove(CURRENT_KEY);
  }

  // --- Daily Tracking ---
  function renderDaily() {
    var el = document.getElementById('sprint-daily-content');
    var sprint = getSprint();

    if (!sprint) {
      el.innerHTML = '<div class="empty-state"><p>No active sprint. Start one from the Current Sprint tab.</p></div>';
      return;
    }

    var today = MCStore.today();
    var html = '<div class="data-row" style="margin-bottom: var(--space-lg);">' +
      '<label>Date</label><input type="date" id="daily-date" value="' + today + '" min="' + sprint.startDate + '" max="' + sprint.endDate + '">' +
      '</div>';

    html += '<div class="data-section"><p class="data-section-header">Term Compliance</p>';
    sprint.terms.forEach(function (t, i) {
      var checked = sprint.dailyLog[today] && sprint.dailyLog[today][i] ? ' checked' : '';
      html += '<div class="data-row">' +
        '<label style="flex:1;">' + escHtml(t.text) + '</label>' +
        '<label class="calc-checkbox-item" style="width:auto; flex:none; border:none; padding:0;">' +
        '<input type="checkbox" data-daily-term="' + i + '"' + checked + '>' +
        '<span class="calc-checkbox-label">Met</span></label>' +
        '</div>';
    });
    html += '</div>';

    // 28-day grids
    html += '<div class="data-section" style="margin-top: var(--space-xl);"><p class="data-section-header">28-Day Compliance Grids</p>';
    sprint.terms.forEach(function (t, i) {
      html += '<div style="margin-bottom: var(--space-md);">';
      html += '<p style="font-size: var(--text-sm); font-weight: 500; margin-bottom: var(--space-xs);">' + escHtml(t.text) + '</p>';
      html += '<div class="compliance-grid">';
      for (var d = 0; d < SPRINT_DAYS; d++) {
        var date = addDays(sprint.startDate, d);
        var cls = 'compliance-cell';
        if (date === today) cls += ' today';
        if (date > today) {
          cls += ' future';
        } else if (sprint.dailyLog[date] && sprint.dailyLog[date][i]) {
          cls += ' met';
        } else if (sprint.dailyLog[date] && sprint.dailyLog[date][i] === false) {
          cls += ' missed';
        }
        html += '<div class="' + cls + '" title="' + date + '"></div>';
      }
      html += '</div>';
      html += '<span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-faint);">' + calcCompliance(sprint, i) + '% compliance</span>';
      html += '</div>';
    });
    html += '</div>';

    el.innerHTML = html;

    // Bind events
    var dateInput = document.getElementById('daily-date');
    dateInput.addEventListener('change', function () {
      renderDaily();
    });

    el.querySelectorAll('[data-daily-term]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var date = dateInput.value;
        var idx = parseInt(cb.getAttribute('data-daily-term'));
        var s = getSprint();
        if (!s.dailyLog[date]) s.dailyLog[date] = {};
        s.dailyLog[date][idx] = cb.checked;
        saveSprint(s);
        renderDaily();
      });
    });
  }

  // --- Weekly Check-In ---
  function renderWeekly() {
    var el = document.getElementById('sprint-weekly-content');
    var sprint = getSprint();

    if (!sprint) {
      el.innerHTML = '<div class="empty-state"><p>No active sprint.</p></div>';
      return;
    }

    // Week selector
    var html = '<div class="data-row" style="margin-bottom: var(--space-lg);">' +
      '<label>Week</label><select id="weekly-selector">';
    for (var w = 1; w <= 4; w++) {
      html += '<option value="' + w + '">Week ' + w + '</option>';
    }
    html += '</select></div>';

    var weekNum = 1;
    var checkin = (sprint.weeklyCheckins && sprint.weeklyCheckins[weekNum]) || {};

    html += '<div class="data-section"><p class="data-section-header">Contract Compliance</p>';
    var overall = calcOverallCompliance(sprint);
    html += '<p style="font-family: var(--font-mono); font-size: var(--text-lg); margin-bottom: var(--space-md);">' + overall + '% overall</p>';
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Financial Snapshot</p>';
    html += '<div class="data-row"><label>Spent this week</label><input type="number" data-weekly="spent" step="0.01" value="' + (checkin.spent || '') + '" placeholder="$0"></div>';
    html += '<div class="data-row"><label>Budget remaining</label><input type="number" data-weekly="budget_remaining" step="0.01" value="' + (checkin.budget_remaining || '') + '" placeholder="$0"></div>';
    html += '<div class="data-row"><label>On track?</label><select data-weekly="on_track"><option value="">--</option><option value="yes"' + (checkin.on_track === 'yes' ? ' selected' : '') + '>Yes</option><option value="no"' + (checkin.on_track === 'no' ? ' selected' : '') + '>No</option></select></div>';
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Physical Snapshot</p>';
    html += '<div class="data-row"><label>Exercise days</label><input type="number" data-weekly="exercise_days" min="0" max="7" value="' + (checkin.exercise_days || '') + '" placeholder="0"></div>';
    html += '<div class="data-row"><label>Avg sleep (hours)</label><input type="number" data-weekly="sleep_avg" step="0.5" value="' + (checkin.sleep_avg || '') + '" placeholder="0"></div>';
    html += '<div class="data-row"><label>Energy (1-10)</label><input type="number" data-weekly="energy" min="1" max="10" value="' + (checkin.energy || '') + '" placeholder="0"></div>';
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Mental Check</p>';
    html += '<div class="data-row"><label>Stress level</label><select data-weekly="stress"><option value="">--</option><option value="low"' + (checkin.stress === 'low' ? ' selected' : '') + '>Low</option><option value="medium"' + (checkin.stress === 'medium' ? ' selected' : '') + '>Medium</option><option value="high"' + (checkin.stress === 'high' ? ' selected' : '') + '>High</option><option value="critical"' + (checkin.stress === 'critical' ? ' selected' : '') + '>Critical</option></select></div>';
    html += '<div class="data-row"><label>Avoiding anything?</label><input type="text" data-weekly="avoiding" value="' + escHtml(checkin.avoiding || '') + '" placeholder="Be honest..."></div>';
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Breach Log</p>';
    html += '<div id="weekly-breaches" class="dynamic-rows">';
    var breaches = checkin.breaches || [];
    breaches.forEach(function (b, i) {
      html += '<div class="dynamic-row">' +
        '<input type="text" data-breach="' + i + '" data-bf="breach" placeholder="Breach" value="' + escHtml(b.breach || '') + '">' +
        '<input type="text" data-breach="' + i + '" data-bf="trigger" placeholder="Trigger" value="' + escHtml(b.trigger || '') + '">' +
        '<input type="text" data-breach="' + i + '" data-bf="counter" placeholder="Countermeasure" value="' + escHtml(b.counter || '') + '">' +
        '</div>';
    });
    html += '</div>';
    html += '<button type="button" class="btn-add-row" id="add-breach-btn">+ Add breach</button>';
    html += '</div>';

    html += '<div class="data-section"><p class="data-section-header">Next Week</p>';
    html += '<div class="calc-field" style="margin-bottom:var(--space-sm);"><label>One thing to improve</label><input type="text" data-weekly="improve" value="' + escHtml(checkin.improve || '') + '"></div>';
    html += '<div class="calc-field"><label>One thing to maintain</label><input type="text" data-weekly="maintain" value="' + escHtml(checkin.maintain || '') + '"></div>';
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-weekly-btn" style="margin-top: var(--space-md);">Save Check-In</button>';

    el.innerHTML = html;

    // Bind events
    var weekSelector = document.getElementById('weekly-selector');
    weekSelector.addEventListener('change', function () {
      // Re-render with selected week
      var wn = parseInt(weekSelector.value);
      loadWeeklyData(wn);
    });

    document.getElementById('add-breach-btn').addEventListener('click', function () {
      var s = getSprint();
      var wn = parseInt(weekSelector.value);
      if (!s.weeklyCheckins) s.weeklyCheckins = {};
      if (!s.weeklyCheckins[wn]) s.weeklyCheckins[wn] = {};
      if (!s.weeklyCheckins[wn].breaches) s.weeklyCheckins[wn].breaches = [];
      s.weeklyCheckins[wn].breaches.push({ breach: '', trigger: '', counter: '' });
      saveSprint(s);
      renderWeekly();
    });

    document.getElementById('save-weekly-btn').addEventListener('click', function () {
      saveWeeklyData(parseInt(weekSelector.value));
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Check-In'; }, 1500);
    });
  }

  function loadWeeklyData(weekNum) {
    // Re-render will pick up correct data
    renderWeekly();
    document.getElementById('weekly-selector').value = weekNum;
  }

  function saveWeeklyData(weekNum) {
    var sprint = getSprint();
    if (!sprint) return;
    if (!sprint.weeklyCheckins) sprint.weeklyCheckins = {};
    var data = {};
    container.querySelectorAll('[data-weekly]').forEach(function (el) {
      data[el.getAttribute('data-weekly')] = el.value;
    });
    // Collect breaches
    data.breaches = [];
    container.querySelectorAll('[data-breach]').forEach(function (el) {
      var idx = parseInt(el.getAttribute('data-breach'));
      var field = el.getAttribute('data-bf');
      if (!data.breaches[idx]) data.breaches[idx] = {};
      data.breaches[idx][field] = el.value;
    });
    sprint.weeklyCheckins[weekNum] = data;
    saveSprint(sprint);
  }

  // --- Retrospective ---
  function renderRetro() {
    var el = document.getElementById('sprint-retro-content');
    var sprint = getSprint();

    if (!sprint) {
      el.innerHTML = '<div class="empty-state"><p>No active sprint.</p></div>';
      return;
    }

    var overall = calcOverallCompliance(sprint);
    var retro = sprint.retro || {};

    var html = '<h3 style="margin-bottom: var(--space-lg);">Sprint #' + sprint.number + ' Retrospective</h3>';

    // Decision tree
    var advice = '';
    var adviceClass = '';
    if (overall >= 75) {
      advice = 'Solid performance. Consider upgrading your contract — add a term or raise the bar.';
      adviceClass = 'positive';
    } else if (overall >= 60) {
      advice = 'Slight overcommitment. Reduce one term by a notch — you\'re close but grinding.';
      adviceClass = '';
    } else {
      advice = 'Something systemic is wrong. Strip to your 2 most important terms and rebuild from there.';
      adviceClass = 'negative';
    }

    html += '<div class="summary-cards">';
    html += '<div class="summary-card"><span class="card-value ' + adviceClass + '">' + overall + '%</span><span class="card-label">Overall Compliance</span></div>';
    html += '</div>';
    html += '<div class="calc-result" style="margin: var(--space-lg) 0;"><p style="font-size: var(--text-sm);">' + advice + '</p></div>';

    html += '<div class="data-section">';
    html += '<div class="calc-field" style="margin-bottom:var(--space-md);"><label>What worked well?</label>' +
      '<textarea class="calc-textarea" data-retro="worked" placeholder="Systems, habits, and conditions that helped...">' + escHtml(retro.worked || '') + '</textarea></div>';
    html += '<div class="calc-field" style="margin-bottom:var(--space-md);"><label>What didn\'t work?</label>' +
      '<textarea class="calc-textarea" data-retro="didnt" placeholder="Specific causes, not just outcomes...">' + escHtml(retro.didnt || '') + '</textarea></div>';
    html += '<div class="calc-field"><label>What will you change?</label>' +
      '<textarea class="calc-textarea" data-retro="changes" placeholder="One concrete system adjustment per failure...">' + escHtml(retro.changes || '') + '</textarea></div>';
    html += '</div>';

    html += '<button type="button" class="calc-btn" id="save-retro-btn" style="margin-top: var(--space-md);">Save Retrospective</button>';

    el.innerHTML = html;

    document.getElementById('save-retro-btn').addEventListener('click', function () {
      var s = getSprint();
      s.retro = {};
      container.querySelectorAll('[data-retro]').forEach(function (el) {
        s.retro[el.getAttribute('data-retro')] = el.value;
      });
      saveSprint(s);
      this.textContent = 'Saved!';
      var btn = this;
      setTimeout(function () { btn.textContent = 'Save Retrospective'; }, 1500);
    });
  }

  // --- History ---
  function renderHistory() {
    var el = document.getElementById('sprint-history-content');
    var history = MCStore.get(HISTORY_KEY) || [];

    if (history.length === 0) {
      el.innerHTML = '<div class="empty-state"><p>No completed sprints yet.</p></div>';
      return;
    }

    var html = '<h3 style="margin-bottom: var(--space-lg);">Sprint History</h3>';

    // History list
    html += '<div class="review-timeline">';
    history.slice().reverse().forEach(function (s) {
      var pct = s.finalCompliance || 0;
      html += '<div class="review-entry">' +
        '<p class="review-date">Sprint #' + s.number + ' &mdash; ' + s.startDate + ' to ' + (s.endedDate || s.endDate) + '</p>' +
        '<p class="review-summary">' +
        '<span class="' + (pct >= 75 ? 'status-met' : (pct >= 60 ? 'status-partial' : 'status-missed')) + '">' + pct + '%</span> compliance' +
        ' &mdash; ' + (s.terms ? s.terms.length : 0) + ' terms tracked</p>' +
        '</div>';
    });
    html += '</div>';

    // Velocity chart
    if (history.length > 1) {
      html += '<div class="chart-container" style="margin-top: var(--space-xl);">' +
        '<p class="data-section-header">Velocity</p>' +
        '<canvas id="velocity-chart"></canvas></div>';
    }

    el.innerHTML = html;

    // Draw velocity chart
    if (history.length > 1) {
      drawVelocityChart(history);
    }
  }

  function drawVelocityChart(history) {
    var canvas = document.getElementById('velocity-chart');
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

    var padding = { top: 20, right: 20, bottom: 30, left: 40 };
    var chartW = w - padding.left - padding.right;
    var chartH = h - padding.top - padding.bottom;

    // Get computed colors
    var style = getComputedStyle(document.documentElement);
    var colorGrowth = style.getPropertyValue('--color-growth').trim() || '#2d6a4f';
    var colorAccent = style.getPropertyValue('--color-accent').trim() || '#b83230';
    var colorBorder = style.getPropertyValue('--color-border').trim() || '#d4d0ca';
    var colorText = style.getPropertyValue('--color-text-muted').trim() || '#5c5c5c';

    var barWidth = Math.min(40, chartW / history.length - 4);

    // Reference lines
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [60, 75].forEach(function (line) {
      var y = padding.top + chartH - (line / 100) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = colorText;
      ctx.font = '10px monospace';
      ctx.fillText(line + '%', 2, y + 3);
    });
    ctx.setLineDash([]);

    // Bars
    history.forEach(function (s, i) {
      var pct = s.finalCompliance || 0;
      var barH = (pct / 100) * chartH;
      var x = padding.left + (i / history.length) * chartW + (chartW / history.length - barWidth) / 2;
      var y = padding.top + chartH - barH;

      ctx.fillStyle = pct >= 75 ? colorGrowth : (pct >= 60 ? '#b8860b' : colorAccent);
      ctx.fillRect(x, y, barWidth, barH);

      // Label
      ctx.fillStyle = colorText;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('#' + s.number, x + barWidth / 2, h - 8);
      ctx.fillText(pct + '%', x + barWidth / 2, y - 5);
    });
  }

  // --- Initialize ---
  renderCurrent();
})();
