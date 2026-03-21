---
title: "Land Contract Calculator"
description: "Compare a land contract to a traditional mortgage — see what seller financing actually costs you."
layout: layouts/tool.njk
tags: tool
order: 14
permalink: /tools/land-contract/
script: land-contract.js
---

<div class="calculator" id="land-contract-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Property</p>

    <div class="calc-field">
      <label for="lc-price">Purchase price ($)</label>
      <input type="number" id="lc-price" min="0" step="5000" placeholder="e.g., 150000">
    </div>

    <div class="calc-field">
      <label for="lc-down">Down payment ($)</label>
      <input type="number" id="lc-down" min="0" step="1000" placeholder="e.g., 15000">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Land Contract Terms</p>

    <div class="calc-field">
      <label for="lc-rate">Interest rate (%)</label>
      <input type="number" id="lc-rate" min="0" max="25" step="0.25" value="9">
    </div>

    <div class="calc-field">
      <label for="lc-term">Contract term (years)</label>
      <input type="number" id="lc-term" min="1" max="30" step="1" value="5">
    </div>

    <div class="calc-field">
      <label for="lc-amort">Amortization period (years)</label>
      <input type="number" id="lc-amort" min="1" max="40" step="1" value="30">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Traditional Mortgage</p>

    <div class="calc-field">
      <label for="mort-rate">Mortgage rate (%)</label>
      <input type="number" id="mort-rate" min="0" max="15" step="0.125" value="7">
    </div>

    <div class="calc-field">
      <label for="mort-term">Mortgage term (years)</label>
      <input type="number" id="mort-term" min="5" max="40" step="5" value="30">
    </div>

    <button class="calc-btn" id="calc-lc-btn" type="button">Compare</button>
  </div>

  <div class="calc-result" id="lc-result" style="display: none;">
    <p class="calc-result-label">Cost Difference</p>
    <p class="calc-result-number" id="result-cost-diff" style="font-size: var(--text-lg);">—</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-lc-monthly">$0</p>
        <p class="calc-breakdown-label">Land Contract Monthly</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-mort-monthly">$0</p>
        <p class="calc-breakdown-label">Mortgage Monthly</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-lc-total">$0</p>
        <p class="calc-breakdown-label">Total LC Payments</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-mort-total">$0</p>
        <p class="calc-breakdown-label">Total Mortgage Payments</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-lc-interest">$0</p>
        <p class="calc-breakdown-label">LC Interest Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-mort-interest">$0</p>
        <p class="calc-breakdown-label">Mortgage Interest Paid</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-balloon">$0</p>
        <p class="calc-breakdown-label">Balloon Payment Due</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-mort-balance">$0</p>
        <p class="calc-breakdown-label">Mortgage Balance at Same Point</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-lc-equity">$0</p>
        <p class="calc-breakdown-label">LC Equity Built</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-mort-equity">$0</p>
        <p class="calc-breakdown-label">Mortgage Equity Built</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-lc-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## What This Calculator Shows You

A land contract (contract for deed) is seller financing — you pay the seller instead of a bank. But the terms are almost always worse: higher interest rates, shorter terms, and a balloon payment at the end.

This calculator runs both scenarios on the same property so you can see exactly what seller financing costs compared to a traditional mortgage. The balloon payment line is the one that matters most — that's the lump sum you'll owe when the contract ends. If you can't refinance into a mortgage by then, you lose the house.

For the full picture on what land contracts are, how they work, and how to protect yourself, read [The Land Contract deep dive](/deep-dives/land-contracts/).

For broader homeownership cost analysis, see [The Homeownership Contract](/deep-dives/homeownership/).

</div>
