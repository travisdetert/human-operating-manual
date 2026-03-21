---
title: "Predatory Loan Cost Calculator"
description: "See what a payday loan, title loan, or cash advance actually costs you — especially after rollovers."
layout: layouts/tool.njk
tags: tool
order: 15
permalink: /tools/predatory-loan-cost/
script: predatory-loan-cost.js
---

<div class="calculator" id="predatory-loan-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Loan Details</p>

    <div class="calc-field">
      <label for="pl-amount">Amount borrowed ($)</label>
      <input type="number" id="pl-amount" min="0" step="50" placeholder="e.g., 400">
    </div>

    <div class="calc-field">
      <label for="pl-fee">Fee per $100 borrowed ($)</label>
      <input type="number" id="pl-fee" min="0" max="100" step="1" value="15">
    </div>

    <div class="calc-field">
      <label for="pl-term">Loan term (days)</label>
      <input type="number" id="pl-term" min="1" max="90" step="1" value="14">
    </div>

    <div class="calc-field">
      <label for="pl-rollovers">Number of rollovers</label>
      <input type="number" id="pl-rollovers" min="0" max="24" step="1" value="3">
    </div>

    <button class="calc-btn" id="calc-pl-btn" type="button">Calculate True Cost</button>
  </div>

  <div class="calc-result" id="pl-result" style="display: none;">
    <p class="calc-result-label">Compared to Alternatives</p>
    <p class="calc-result-number" id="result-savings" style="font-size: var(--text-lg);">—</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-fee-per-loan">$0</p>
        <p class="calc-breakdown-label">Fee Each Time</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-fees">$0</p>
        <p class="calc-breakdown-label">Total Fees Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-repay">$0</p>
        <p class="calc-breakdown-label">Total Repayment</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-effective-apr">0%</p>
        <p class="calc-breakdown-label">Effective APR</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-cost-pct">0%</p>
        <p class="calc-breakdown-label">Fees as % of Loan</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-days">0 days</p>
        <p class="calc-breakdown-label">Total Time in Debt</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-cc-cost">$0</p>
        <p class="calc-breakdown-label">Credit Card Total (24.99% APR)</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-cc-interest">$0</p>
        <p class="calc-breakdown-label">Credit Card Interest</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-personal-cost">$0</p>
        <p class="calc-breakdown-label">Personal Loan Total (12% APR)</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-personal-interest">$0</p>
        <p class="calc-breakdown-label">Personal Loan Interest</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-pl-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## What This Calculator Shows You

A payday loan looks simple: borrow $400, pay back $460 in two weeks. That's $60. Not that bad, right?

But most people can't pay it back in two weeks — that's why they needed the loan. So they roll it over. Each rollover costs another $60. Roll it three times and you've paid $240 in fees on a $400 loan. That's 60% of the original amount, and you still owe the $400.

This calculator shows the true cost of the loan including rollovers, the effective APR, and what the same money would cost on a credit card or personal loan. The comparison is not close.

For the full picture on predatory lending — payday loans, title loans, buy-here-pay-here lots, rent-to-own, and how to escape them — read [The Predatory Lending Contract](/deep-dives/predatory-lending/).

</div>
