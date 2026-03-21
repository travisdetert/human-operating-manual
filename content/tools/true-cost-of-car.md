---
title: "True Cost of a Car"
description: "A $35K car actually costs $65K+ when you add everything up. See your real number."
layout: layouts/tool.njk
tags: tool
order: 12
permalink: /tools/true-cost-of-car/
script: true-cost-of-car.js
---

<div class="calculator" id="car-cost-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Purchase</p>

    <div class="calc-field">
      <label for="car-price">Purchase price ($)</label>
      <input type="number" id="car-price" min="0" step="500" placeholder="e.g., 35000">
    </div>

    <div class="calc-field">
      <label for="car-down">Down payment ($)</label>
      <input type="number" id="car-down" min="0" step="500" value="0">
    </div>

    <div class="calc-field">
      <label for="car-loan-rate">Loan APR (%)</label>
      <input type="number" id="car-loan-rate" min="0" max="25" step="0.25" value="6">
    </div>

    <div class="calc-field">
      <label for="car-loan-term">Loan term (years)</label>
      <select id="car-loan-term">
        <option value="3">3 years</option>
        <option value="4">4 years</option>
        <option value="5" selected>5 years</option>
        <option value="6">6 years</option>
        <option value="7">7 years</option>
      </select>
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Annual running costs</p>

    <div class="calc-field">
      <label for="car-insurance">Insurance ($/year)</label>
      <input type="number" id="car-insurance" min="0" step="100" value="1800">
    </div>

    <div class="calc-field">
      <label for="car-fuel">Fuel ($/year)</label>
      <input type="number" id="car-fuel" min="0" step="100" value="2400">
    </div>

    <div class="calc-field">
      <label for="car-maintenance">Maintenance & repairs ($/year)</label>
      <input type="number" id="car-maintenance" min="0" step="100" value="1200">
    </div>

    <div class="calc-field">
      <label for="car-registration">Registration & fees ($/year)</label>
      <input type="number" id="car-registration" min="0" step="50" value="300">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Ownership</p>

    <div class="calc-field">
      <label for="car-years">Years you'll keep the car</label>
      <input type="number" id="car-years" min="1" max="20" step="1" value="5">
    </div>

    <div class="calc-field">
      <label for="car-resale">Estimated resale value ($)</label>
      <input type="number" id="car-resale" min="0" step="500" placeholder="e.g., 15000">
    </div>

    <button class="calc-btn" id="calc-car-btn" type="button">Calculate True Cost</button>
  </div>

  <div class="calc-result" id="car-result" style="display: none;">
    <p class="calc-result-label">True total cost of ownership</p>
    <p class="calc-result-number" id="result-true-total">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-true-monthly">$0/mo</p>
        <p class="calc-breakdown-label">True Monthly Cost</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-interest">$0</p>
        <p class="calc-breakdown-label">Loan Interest</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-depreciation">$0</p>
        <p class="calc-breakdown-label">Depreciation</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-running-costs">$0</p>
        <p class="calc-breakdown-label">Running Costs</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-opportunity">$0</p>
        <p class="calc-breakdown-label">If Invested Instead (7%)</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-car-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

Nobody buys a $35,000 car. They buy a $65,000+ car and pretend it cost $35,000.

The sticker price is just the beginning. Add loan interest, insurance, fuel, maintenance, registration, and depreciation — and your car costs nearly double what you think. Then factor in what that money could have earned if invested, and the real cost is staggering.

This doesn't mean never buy a car. It means know the real price before you sign. A $25K reliable used car vs. a $45K new SUV isn't a $20K decision — it's closer to a $60K decision over 5 years.

The math behind opportunity cost comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
