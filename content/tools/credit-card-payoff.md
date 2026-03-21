---
title: "Credit Card Payoff Calculator"
description: "See how long your debt takes to pay off and how much extra payments save you."
layout: layouts/tool.njk
tags: tool
order: 4
permalink: /tools/credit-card-payoff/
script: credit-card-payoff.js
---

<div class="calculator" id="credit-card-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="card-balance">Current balance ($)</label>
      <input type="number" id="card-balance" min="0" step="100" placeholder="e.g., 5000">
    </div>

    <div class="calc-field">
      <label for="card-apr">APR (%)</label>
      <input type="number" id="card-apr" min="0" max="40" step="0.1" placeholder="e.g., 24" value="24">
    </div>

    <div class="calc-field">
      <label for="monthly-payment">Your monthly payment ($)</label>
      <input type="number" id="monthly-payment" min="0" step="10" placeholder="e.g., 200">
    </div>

    <button class="calc-btn" id="calc-payoff-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="payoff-result" style="display: none;">
    <p class="calc-result-label">Time to pay off</p>
    <p class="calc-result-number" id="result-months">0 months</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-paid">$0</p>
        <p class="calc-breakdown-label">Total Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-interest-paid">$0</p>
        <p class="calc-breakdown-label">Interest Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-min-payment">$0</p>
        <p class="calc-breakdown-label">Minimum Payment</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-min-interest">$0</p>
        <p class="calc-breakdown-label">Interest at Minimum</p>
      </div>
    </div>

    <div style="margin-top: var(--space-xl); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">Payment comparison</p>
      <div id="payment-comparison"></div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-payoff-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How Credit Card Math Works

A $5,000 balance at 24% APR with minimum payments takes **27+ years** to pay off. You'll pay **$12,700 total** — $7,700 in interest alone.

Going from $100/month to $200/month saves you **$5,500 in interest and 24 years of payments**. That extra $100/month is worth $5,500. Where else can you get a guaranteed 55x return?

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
