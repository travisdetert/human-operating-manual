---
title: "Compound Interest Calculator"
description: "See what your savings actually become over 10, 20, 30 years."
layout: layouts/tool.njk
tags: tool
order: 3
permalink: /tools/compound-interest/
script: compound-interest.js
---

<div class="calculator" id="compound-interest-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="initial-amount">Starting amount ($)</label>
      <input type="number" id="initial-amount" min="0" step="100" placeholder="e.g., 1000" value="0">
    </div>

    <div class="calc-field">
      <label for="monthly-contribution">Monthly contribution ($)</label>
      <input type="number" id="monthly-contribution" min="0" step="25" placeholder="e.g., 200">
    </div>

    <div class="calc-field">
      <label for="annual-return">Annual return (%)</label>
      <select id="annual-return">
        <option value="4">4% (Savings / Bonds)</option>
        <option value="5">5% (Conservative)</option>
        <option value="7" selected>7% (Moderate / Inflation-adjusted S&P)</option>
        <option value="10">10% (S&P 500 Historical Average)</option>
        <option value="12">12% (Aggressive)</option>
      </select>
    </div>

    <div class="calc-field">
      <label for="time-period">Time period (years)</label>
      <input type="number" id="time-period" min="1" max="50" step="1" placeholder="e.g., 20" value="20">
    </div>

    <button class="calc-btn" id="calc-compound-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="compound-result" style="display: none;">
    <p class="calc-result-label">Your investment grows to</p>
    <p class="calc-result-number" id="result-total">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-contributed">$0</p>
        <p class="calc-breakdown-label">Total Contributed</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-interest">$0</p>
        <p class="calc-breakdown-label">Interest Earned</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-10yr-compound">$0</p>
        <p class="calc-breakdown-label">At 10 Years</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-multiplier">0x</p>
        <p class="calc-breakdown-label">Money Multiplier</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-compound-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why Compound Interest Matters

$200/month invested at 7% for 30 years becomes **$227,000+**. You contributed $72,000. The other $155,000 came from compound growth — your money making money making money.

This is the same math that makes credit card debt devastating in reverse. The question is which side of the equation you're on.

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
