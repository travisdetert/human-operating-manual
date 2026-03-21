---
title: "Debt Payoff Strategy"
description: "Snowball vs. avalanche — see exactly what each strategy costs and saves."
layout: layouts/tool.njk
tags: tool
order: 10
permalink: /tools/debt-payoff/
script: debt-payoff.js
---

<div class="calculator" id="debt-payoff-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Your debts</p>
    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-sm);">Add each debt with its name, balance, APR, and minimum payment.</p>

    <div id="debt-list"></div>

    <div style="margin-bottom: var(--space-lg);">
      <button class="calc-btn" id="add-debt-btn" type="button">+ Add Debt</button>
    </div>

    <div class="calc-field">
      <label for="extra-payment">Extra monthly payment ($) <small>above all minimums</small></label>
      <input type="number" id="extra-payment" min="0" step="25" placeholder="e.g., 200" value="0">
    </div>

    <button class="calc-btn" id="calc-debt-btn" type="button">Calculate Payoff</button>
  </div>

  <div class="calc-result" id="debt-result" style="display: none;">
    <p class="calc-result-label">Interest saved vs. minimums only</p>
    <p class="calc-result-number" id="result-saved">$0</p>

    <div style="margin-top: var(--space-xl); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">Avalanche (highest rate first)</p>
      <div class="calc-breakdown">
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-avalanche-months">0</p>
          <p class="calc-breakdown-label">Time to Debt-Free</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-avalanche-interest">$0</p>
          <p class="calc-breakdown-label">Total Interest</p>
        </div>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">Snowball (lowest balance first)</p>
      <div class="calc-breakdown">
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-snowball-months">0</p>
          <p class="calc-breakdown-label">Time to Debt-Free</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-snowball-interest">$0</p>
          <p class="calc-breakdown-label">Total Interest</p>
        </div>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">Minimum payments only</p>
      <div class="calc-breakdown">
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-min-months">0</p>
          <p class="calc-breakdown-label">Time to Debt-Free</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-min-interest">$0</p>
          <p class="calc-breakdown-label">Total Interest</p>
        </div>
      </div>
    </div>

    <p style="margin-top: var(--space-lg); font-size: var(--text-sm); font-weight: 600;" id="result-strategy-diff"></p>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-debt-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

Two strategies, one goal: get to zero.

**Avalanche** (highest interest rate first) saves the most money mathematically. **Snowball** (lowest balance first) gives you quick wins that keep you motivated. This calculator shows both so you can see exactly what snowball's psychological wins cost in dollars.

The answer for most people: if the interest difference is under $500, pick snowball. The motivation of seeing debts disappear is worth more than a few hundred dollars in interest. If the difference is thousands, use avalanche and find motivation elsewhere.

Either strategy crushes minimum payments. The real enemy isn't which order — it's paying minimums forever.

The debt framework comes from [Module 05: The Debt of Avoidance](/methodology/debt-of-avoidance/) and [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
