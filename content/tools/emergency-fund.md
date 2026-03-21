---
title: "Emergency Fund Calculator"
description: "Your exact emergency fund target — calibrated to your expenses and risk profile."
layout: layouts/tool.njk
tags: tool
order: 8
permalink: /tools/emergency-fund/
script: emergency-fund.js
---

<div class="calculator" id="emergency-fund-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Monthly essential expenses</p>

    <div class="calc-field">
      <label for="ef-housing">Housing (rent/mortgage) ($)</label>
      <input type="number" id="ef-housing" min="0" step="50" placeholder="e.g., 1500">
    </div>

    <div class="calc-field">
      <label for="ef-utilities">Utilities ($)</label>
      <input type="number" id="ef-utilities" min="0" step="25" placeholder="e.g., 200">
    </div>

    <div class="calc-field">
      <label for="ef-food">Food & groceries ($)</label>
      <input type="number" id="ef-food" min="0" step="25" placeholder="e.g., 500">
    </div>

    <div class="calc-field">
      <label for="ef-transport">Transportation ($)</label>
      <input type="number" id="ef-transport" min="0" step="25" placeholder="e.g., 300">
    </div>

    <div class="calc-field">
      <label for="ef-insurance">Insurance premiums ($)</label>
      <input type="number" id="ef-insurance" min="0" step="25" placeholder="e.g., 200">
    </div>

    <div class="calc-field">
      <label for="ef-debt-payments">Minimum debt payments ($)</label>
      <input type="number" id="ef-debt-payments" min="0" step="25" placeholder="e.g., 300">
    </div>

    <div class="calc-field">
      <label for="ef-other">Other essentials ($)</label>
      <input type="number" id="ef-other" min="0" step="25" value="0">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Risk factors</p>

    <div class="calc-field">
      <label for="ef-stability">Employment stability</label>
      <select id="ef-stability">
        <option value="stable">Stable (government, tenured, etc.)</option>
        <option value="variable" selected>Variable (private sector, typical)</option>
        <option value="unstable">Unstable (freelance, contract, seasonal)</option>
      </select>
    </div>

    <div class="calc-field">
      <label for="ef-dependents">Number of dependents</label>
      <input type="number" id="ef-dependents" min="0" max="10" step="1" value="0">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Current progress</p>

    <div class="calc-field">
      <label for="ef-current">Current emergency savings ($)</label>
      <input type="number" id="ef-current" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="ef-monthly-save">Monthly amount you can save ($)</label>
      <input type="number" id="ef-monthly-save" min="0" step="25" placeholder="e.g., 200">
    </div>

    <button class="calc-btn" id="calc-ef-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="ef-result" style="display: none;">
    <p class="calc-result-label">Your emergency fund target</p>
    <p class="calc-result-number" id="result-target">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-months-rec">0 months</p>
        <p class="calc-breakdown-label">Recommended Coverage</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-monthly-expenses">$0/mo</p>
        <p class="calc-breakdown-label">Monthly Essentials</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-coverage">0 months</p>
        <p class="calc-breakdown-label">Current Coverage</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-remaining">$0</p>
        <p class="calc-breakdown-label">Remaining to Save</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-time-to-fund">—</p>
        <p class="calc-breakdown-label">Time to Fully Funded</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-ef-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

"Save 3-6 months of expenses" is the standard advice. But how many months depends on your situation — a tenured professor with no kids needs less cushion than a freelancer with three dependents.

This calculator gives you an exact dollar target calibrated to your actual expenses and risk profile. It accounts for employment stability and dependents to recommend anywhere from 3 to 12 months of coverage.

An emergency fund isn't an investment. It's insurance. It sits in a boring savings account earning boring interest, and that's exactly right. Its job is to be there when everything else falls apart.

The framework for building this comes from [Module 02: Financial Architecture](/methodology/financial-architecture/).

</div>
