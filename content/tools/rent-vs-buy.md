---
title: "Rent vs. Buy Comparison"
description: "Which actually costs less over time? A year-by-year simulation with real numbers."
layout: layouts/tool.njk
tags: tool
order: 6
permalink: /tools/rent-vs-buy/
script: rent-vs-buy.js
---

<div class="calculator" id="rent-vs-buy-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Renting</p>

    <div class="calc-field">
      <label for="monthly-rent">Current monthly rent ($)</label>
      <input type="number" id="monthly-rent" min="0" step="50" placeholder="e.g., 1500">
    </div>

    <div class="calc-field">
      <label for="rent-increase">Annual rent increase (%)</label>
      <input type="number" id="rent-increase" min="0" max="15" step="0.5" value="3">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Buying</p>

    <div class="calc-field">
      <label for="home-price">Home price ($)</label>
      <input type="number" id="home-price" min="0" step="5000" placeholder="e.g., 350000">
    </div>

    <div class="calc-field">
      <label for="down-pct">Down payment (%)</label>
      <input type="number" id="down-pct" min="0" max="100" step="1" value="20">
    </div>

    <div class="calc-field">
      <label for="mortgage-rate">Mortgage rate (%)</label>
      <input type="number" id="mortgage-rate" min="0" max="15" step="0.125" value="7">
    </div>

    <div class="calc-field">
      <label for="prop-tax-rate">Property tax rate (%)</label>
      <input type="number" id="prop-tax-rate" min="0" max="5" step="0.1" value="1.2">
    </div>

    <div class="calc-field">
      <label for="annual-ins">Annual insurance ($)</label>
      <input type="number" id="annual-ins" min="0" step="100" value="1500">
    </div>

    <div class="calc-field">
      <label for="annual-maint">Annual maintenance (% of home value)</label>
      <input type="number" id="annual-maint" min="0" max="5" step="0.25" value="1">
    </div>

    <div class="calc-field">
      <label for="appreciation">Home appreciation (%/year)</label>
      <input type="number" id="appreciation" min="-5" max="15" step="0.5" value="3">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Comparison</p>

    <div class="calc-field">
      <label for="invest-return">Investment return if renting (%)</label>
      <input type="number" id="invest-return" min="0" max="15" step="0.5" value="7">
    </div>

    <div class="calc-field">
      <label for="time-horizon">Time horizon (years)</label>
      <input type="number" id="time-horizon" min="1" max="40" step="1" value="7">
    </div>

    <button class="calc-btn" id="calc-rvb-btn" type="button">Compare</button>
  </div>

  <div class="calc-result" id="rvb-result" style="display: none;">
    <p class="calc-result-label">Verdict</p>
    <p class="calc-result-number" id="result-verdict" style="font-size: var(--text-lg);">—</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-rent-total">$0</p>
        <p class="calc-breakdown-label">Total Rent Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-renter-portfolio">$0</p>
        <p class="calc-breakdown-label">Renter's Net Wealth</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-buy-total">$0</p>
        <p class="calc-breakdown-label">Total Owner Costs</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-owner-equity">$0</p>
        <p class="calc-breakdown-label">Owner's Net Wealth</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-home-value">$0</p>
        <p class="calc-breakdown-label">Home Value at End</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-loan-remaining">$0</p>
        <p class="calc-breakdown-label">Loan Remaining</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-rvb-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

"Renting is throwing money away" is one of the most expensive myths in personal finance. Sometimes it's true. Sometimes buying is what throws money away.

This calculator runs a year-by-year simulation that tracks two parallel lives: one where you rent and invest the difference, and one where you buy. It accounts for appreciation, maintenance, taxes, insurance, opportunity cost of the down payment, and selling costs.

The answer depends on your local market, how long you'll stay, and what else you'd do with the money. There's no universal right answer — only your answer.

The framework for thinking about this comes from [Module 02: Financial Architecture](/methodology/financial-architecture/).

</div>
