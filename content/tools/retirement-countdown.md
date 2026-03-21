---
title: "Retirement Countdown"
description: "Your FIRE number, projected savings, and whether you're on track — or not."
layout: layouts/tool.njk
tags: tool
order: 7
permalink: /tools/retirement-countdown/
script: retirement-countdown.js
---

<div class="calculator" id="retirement-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="current-age">Current age</label>
      <input type="number" id="current-age" min="16" max="90" step="1" placeholder="e.g., 30">
    </div>

    <div class="calc-field">
      <label for="current-savings">Current retirement savings ($)</label>
      <input type="number" id="current-savings" min="0" step="1000" placeholder="e.g., 50000" value="0">
    </div>

    <div class="calc-field">
      <label for="monthly-contribution">Monthly contribution ($)</label>
      <input type="number" id="monthly-contribution" min="0" step="50" placeholder="e.g., 500">
    </div>

    <div class="calc-field">
      <label for="return-rate">Expected annual return (%)</label>
      <input type="number" id="return-rate" min="0" max="15" step="0.5" value="7">
    </div>

    <div class="calc-field">
      <label for="annual-expenses">Annual retirement expenses ($)</label>
      <input type="number" id="annual-expenses" min="0" step="1000" placeholder="e.g., 50000">
    </div>

    <div class="calc-field">
      <label for="other-income">Other retirement income ($) <small>Social Security, pension, etc.</small></label>
      <input type="number" id="other-income" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="target-age">Target retirement age</label>
      <input type="number" id="target-age" min="30" max="90" step="1" value="65">
    </div>

    <div class="calc-field">
      <label for="swr">Safe withdrawal rate (%)</label>
      <select id="swr">
        <option value="3">3% (Conservative)</option>
        <option value="3.5">3.5% (Moderate-conservative)</option>
        <option value="4" selected>4% (Traditional)</option>
        <option value="4.5">4.5% (Moderate-aggressive)</option>
      </select>
    </div>

    <button class="calc-btn" id="calc-retire-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="retire-result" style="display: none;">
    <p class="calc-result-label">Your FIRE number</p>
    <p class="calc-result-number" id="result-fire-number">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-projected">$0</p>
        <p class="calc-breakdown-label">Projected Savings at Retirement</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-gap">$0</p>
        <p class="calc-breakdown-label">Annual Income Gap/Surplus</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-lasts">0 years</p>
        <p class="calc-breakdown-label">How Long Money Lasts</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-fire-eta">—</p>
        <p class="calc-breakdown-label">Years to FIRE Number</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-withdrawal">$0/yr</p>
        <p class="calc-breakdown-label">Annual Withdrawal</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-retire-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

Retirement is a number, not an age. Your FIRE (Financial Independence, Retire Early) number is the portfolio size that generates enough income to cover your expenses indefinitely. Once you know that number, everything else is just a savings rate problem.

The 4% rule says you can withdraw 4% of your portfolio annually with low risk of running out over 30 years. That means you need 25x your annual expenses saved. Lower withdrawal rates (3-3.5%) add a safety margin.

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/) and the planning framework from [Module 02: Financial Architecture](/methodology/financial-architecture/).

</div>
