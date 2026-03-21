---
title: "Contract Builder"
description: "Build your personal contract from Module 06. Define terms, set sprints, and sign it."
layout: layouts/tool.njk
tags: tool
order: 5
permalink: /tools/contract-builder/
utilScript: /js/tools/mc-store.js
scriptPath: /js/tools/contract-builder.js
---

<div class="calculator" id="contract-builder-tool">

  <div class="wizard-steps" role="tablist">
    <button class="wizard-step active" data-step="1"><span class="step-num">1</span> Reality</button>
    <button class="wizard-step" data-step="2"><span class="step-num">2</span> Strengths</button>
    <button class="wizard-step" data-step="3"><span class="step-num">3</span> Terms</button>
    <button class="wizard-step" data-step="4"><span class="step-num">4</span> Sprints</button>
    <button class="wizard-step" data-step="5"><span class="step-num">5</span> Schedule</button>
    <button class="wizard-step" data-step="6"><span class="step-num">6</span> Prohibitions</button>
    <button class="wizard-step" data-step="7"><span class="step-num">7</span> Sign</button>
  </div>

  <!-- STEP 1: Reality -->
  <div class="wizard-panel active" id="step-1">
    <h3 style="margin-bottom: var(--space-lg);">Current Reality</h3>
    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">
      Where you actually are right now. No aspirations — just facts.
    </p>
    <button type="button" class="calc-btn calc-share-btn" id="import-audit-btn" style="margin-bottom: var(--space-lg);">Import from Audit</button>
    <div class="data-section">
      <div class="data-row"><label>Net worth</label><input type="text" data-contract="reality_net_worth" placeholder="$0"></div>
      <div class="data-row"><label>Monthly surplus / deficit</label><input type="text" data-contract="reality_cash_flow" placeholder="$0"></div>
      <div class="data-row"><label>Total debt</label><input type="text" data-contract="reality_debt" placeholder="$0"></div>
      <div class="data-row"><label>Health status</label><input type="text" data-contract="reality_health" placeholder="e.g. overweight, sedentary"></div>
      <div class="data-row"><label>Stress load</label>
        <select data-contract="reality_stress">
          <option value="">--</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
    </div>
    <div class="wizard-nav">
      <span></span>
      <button type="button" class="calc-btn" data-goto="2">Next &rarr;</button>
    </div>
  </div>

  <!-- STEP 2: Strengths -->
  <div class="wizard-panel" id="step-2">
    <h3 style="margin-bottom: var(--space-lg);">Strengths & Weaknesses</h3>
    <div class="data-section">
      <div class="calc-field" style="margin-bottom: var(--space-md);">
        <label>Biggest strength</label>
        <textarea data-contract="strength_biggest" class="calc-textarea" placeholder="The one thing you can reliably count on about yourself."></textarea>
      </div>
      <div class="calc-field" style="margin-bottom: var(--space-md);">
        <label>Biggest weakness</label>
        <textarea data-contract="weakness_biggest" class="calc-textarea" placeholder="The pattern that most consistently undermines you."></textarea>
      </div>
      <div class="calc-field">
        <label>What you've been avoiding</label>
        <textarea data-contract="avoiding" class="calc-textarea" placeholder="The thing you know you need to do but won't face."></textarea>
      </div>
    </div>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="1">&larr; Back</button>
      <button type="button" class="calc-btn" data-goto="3">Next &rarr;</button>
    </div>
  </div>

  <!-- STEP 3: Terms -->
  <div class="wizard-panel" id="step-3">
    <h3 style="margin-bottom: var(--space-lg);">Non-Negotiable Terms</h3>
    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">
      3-5 specific, measurable, binary commitments. Each must pass the specificity test.
    </p>
    <div id="terms-container">
      <!-- Populated by JS -->
    </div>
    <button type="button" class="btn-add-row" id="add-term-btn">+ Add term</button>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="2">&larr; Back</button>
      <button type="button" class="calc-btn" data-goto="4">Next &rarr;</button>
    </div>
  </div>

  <!-- STEP 4: Sprints -->
  <div class="wizard-panel" id="step-4">
    <h3 style="margin-bottom: var(--space-lg);">Sprint Targets</h3>
    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">
      3-5 measurable targets for your first 28-day sprint. Link each to a contract term.
    </p>
    <div id="sprints-container">
      <!-- Populated by JS -->
    </div>
    <button type="button" class="btn-add-row" id="add-sprint-btn">+ Add target</button>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="3">&larr; Back</button>
      <button type="button" class="calc-btn" data-goto="5">Next &rarr;</button>
    </div>
  </div>

  <!-- STEP 5: Schedule -->
  <div class="wizard-panel" id="step-5">
    <h3 style="margin-bottom: var(--space-lg);">Review Schedule</h3>
    <div class="data-section">
      <div class="data-row"><label>Daily reboot time</label><input type="time" data-contract="schedule_daily"></div>
      <div class="data-row"><label>Weekly review day</label>
        <select data-contract="schedule_weekly_day">
          <option value="">--</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>
      <div class="data-row"><label>Weekly review time</label><input type="time" data-contract="schedule_weekly_time"></div>
      <div class="data-row"><label>Monthly review day</label><input type="number" data-contract="schedule_monthly_day" min="1" max="28" placeholder="e.g. 1"></div>
      <div class="data-row"><label>Quarterly schedule</label><input type="text" data-contract="schedule_quarterly" placeholder="e.g. Jan 1, Apr 1, Jul 1, Oct 1"></div>
    </div>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="4">&larr; Back</button>
      <button type="button" class="calc-btn" data-goto="6">Next &rarr;</button>
    </div>
  </div>

  <!-- STEP 6: Prohibitions -->
  <div class="wizard-panel" id="step-6">
    <h3 style="margin-bottom: var(--space-lg);">Prohibitions</h3>
    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">
      1-5 things you commit to stopping or limiting.
    </p>
    <div id="prohibitions-container" class="calc-field-group">
      <!-- Populated by JS -->
    </div>
    <button type="button" class="btn-add-row" id="add-prohibition-btn">+ Add prohibition</button>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="5">&larr; Back</button>
      <button type="button" class="calc-btn" data-goto="7">Preview Contract &rarr;</button>
    </div>
  </div>

  <!-- STEP 7: Sign -->
  <div class="wizard-panel" id="step-7">
    <h3 style="margin-bottom: var(--space-lg);">Review & Sign</h3>
    <div id="contract-preview-area">
      <!-- Populated by JS -->
    </div>
    <div class="data-section" style="margin-top: var(--space-xl);">
      <div class="data-row"><label>Your name (signature)</label><input type="text" data-contract="signature_name" placeholder="Full name"></div>
    </div>
    <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; margin-top: var(--space-lg);">
      <button type="button" class="calc-btn" id="sign-btn">Sign Contract</button>
      <button type="button" class="calc-btn calc-share-btn" id="print-btn">Print / PDF</button>
      <button type="button" class="calc-btn calc-share-btn" id="contract-export-btn">Export JSON</button>
    </div>
    <div class="wizard-nav">
      <button type="button" class="calc-btn calc-share-btn" data-goto="6">&larr; Back</button>
      <span></span>
    </div>
  </div>

  <!-- ACTION BAR (post-sign) -->
  <div class="tool-actions" id="post-sign-actions" style="display:none;">
    <button type="button" class="calc-btn calc-share-btn" id="add-amendment-btn">Add Amendment</button>
    <button type="button" class="calc-btn calc-share-btn" id="new-version-btn">Start New Version</button>
    <span id="contract-status" style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-muted); margin-left: auto;"></span>
  </div>

</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How This Works

This is the digital version of the [Module 06: The Contract](/methodology/the-contract/). Walk through each step to build your personal accountability contract.

**Step 3 is the most important.** Each term must pass the specificity test: Is it binary? Clear to a stranger? Timed? Defines "done"? Achievable starting tomorrow? Terms that fail this test are aspirations, not commitments.

If you've completed your [Honest Audit](/tools/honest-audit/), you can import that data directly into Step 1.

When you sign, you can print it or save as PDF. Your contract is stored locally — start a new version anytime to track your evolution.

</div>
