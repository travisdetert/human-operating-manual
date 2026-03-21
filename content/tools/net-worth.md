---
title: "Net Worth Snapshot"
description: "Your real financial score: assets minus liabilities, in one clear number."
layout: layouts/tool.njk
tags: tool
order: 9
permalink: /tools/net-worth/
script: net-worth.js
---

<div class="calculator" id="net-worth-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Assets (what you own)</p>

    <div class="calc-field">
      <label for="nw-checking">Checking accounts ($)</label>
      <input type="number" id="nw-checking" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-savings">Savings & money market ($)</label>
      <input type="number" id="nw-savings" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-retirement">Retirement accounts ($) <small>401k, IRA, etc.</small></label>
      <input type="number" id="nw-retirement" min="0" step="1000" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-investments">Taxable investments ($) <small>brokerage, crypto, etc.</small></label>
      <input type="number" id="nw-investments" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-home">Home value ($)</label>
      <input type="number" id="nw-home" min="0" step="5000" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-other-assets">Other assets ($) <small>vehicles, property, valuables</small></label>
      <input type="number" id="nw-other-assets" min="0" step="100" value="0">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Liabilities (what you owe)</p>

    <div class="calc-field">
      <label for="nw-mortgage">Mortgage balance ($)</label>
      <input type="number" id="nw-mortgage" min="0" step="1000" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-student-loans">Student loans ($)</label>
      <input type="number" id="nw-student-loans" min="0" step="500" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-car-loans">Car loans ($)</label>
      <input type="number" id="nw-car-loans" min="0" step="500" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-credit-cards">Credit card balances ($)</label>
      <input type="number" id="nw-credit-cards" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-personal-loans">Personal loans ($)</label>
      <input type="number" id="nw-personal-loans" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="nw-other-debt">Other debts ($)</label>
      <input type="number" id="nw-other-debt" min="0" step="100" value="0">
    </div>

    <button class="calc-btn" id="calc-nw-btn" type="button">Calculate Net Worth</button>
  </div>

  <div class="calc-result" id="nw-result" style="display: none;">
    <p class="calc-result-label">Your net worth</p>
    <p class="calc-result-number" id="result-net-worth">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-assets">$0</p>
        <p class="calc-breakdown-label">Total Assets</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-liabilities">$0</p>
        <p class="calc-breakdown-label">Total Liabilities</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-debt-ratio">0%</p>
        <p class="calc-breakdown-label">Debt-to-Asset Ratio</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-liquid-nw">$0</p>
        <p class="calc-breakdown-label">Liquid Net Worth</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-nw-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

Your salary is not your wealth. Your net worth is. It's the single most honest number in personal finance — everything you own minus everything you owe.

A doctor earning $300K with $400K in student loans and a $600K mortgage might have a lower net worth than a teacher who's been investing $500/month for 15 years. Income is vanity. Net worth is sanity.

Liquid net worth strips out your home and retirement accounts to show what you could actually access. It's the number that determines whether you have real financial flexibility or just look like you do.

Track this number quarterly. The direction matters more than the amount. This connects to [Module 01: The Honest Audit](/methodology/honest-audit/) and [Module 02: Financial Architecture](/methodology/financial-architecture/).

</div>
