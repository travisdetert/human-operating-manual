---
title: "Home Affordability Calculator"
description: "Find out how much house you can actually afford — and how much you should spend."
layout: layouts/tool.njk
tags: tool
order: 5
permalink: /tools/home-affordability/
script: home-affordability.js
---

<div class="calculator" id="home-affordability-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="annual-income">Annual gross income ($)</label>
      <input type="number" id="annual-income" min="0" step="1000" placeholder="e.g., 75000">
    </div>

    <div class="calc-field">
      <label for="monthly-debts">Monthly debt payments ($) <small>car loans, student loans, credit cards</small></label>
      <input type="number" id="monthly-debts" min="0" step="50" placeholder="e.g., 400" value="0">
    </div>

    <div class="calc-field">
      <label for="down-payment">Down payment ($)</label>
      <input type="number" id="down-payment" min="0" step="1000" placeholder="e.g., 40000">
    </div>

    <div class="calc-field">
      <label for="credit-score">Credit score range</label>
      <select id="credit-score">
        <option value="excellent">Excellent (740+) — ~6.5%</option>
        <option value="good" selected>Good (670-739) — ~7.0%</option>
        <option value="fair">Fair (580-669) — ~7.5%</option>
        <option value="poor">Below 580 — ~8.5%</option>
      </select>
    </div>

    <div class="calc-field">
      <label for="property-tax-rate">Property tax rate (%)</label>
      <input type="number" id="property-tax-rate" min="0" max="5" step="0.1" value="1.2">
    </div>

    <div class="calc-field">
      <label for="annual-insurance">Annual homeowner's insurance ($)</label>
      <input type="number" id="annual-insurance" min="0" step="100" value="1200">
    </div>

    <div class="calc-field">
      <label for="monthly-hoa">Monthly HOA ($)</label>
      <input type="number" id="monthly-hoa" min="0" step="25" value="0">
    </div>

    <button class="calc-btn" id="calc-home-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="home-result" style="display: none;">
    <p class="calc-result-label">Bank-approved maximum</p>
    <p class="calc-result-number" id="result-max-price">$0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-monthly-piti">$0</p>
        <p class="calc-breakdown-label">Monthly PITI Payment</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-dti">0%</p>
        <p class="calc-breakdown-label">DTI Ratios</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-conservative-price">$0</p>
        <p class="calc-breakdown-label">What You Should Spend</p>
      </div>
    </div>

    <div style="margin-top: var(--space-xl); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">Payment breakdown</p>
      <div class="calc-breakdown">
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-pi">$0</p>
          <p class="calc-breakdown-label">Principal & Interest</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-tax">$0</p>
          <p class="calc-breakdown-label">Property Tax</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-ins">$0</p>
          <p class="calc-breakdown-label">Insurance</p>
        </div>
        <div class="calc-breakdown-item">
          <p class="calc-breakdown-value" id="result-hoa-out">$0</p>
          <p class="calc-breakdown-label">HOA</p>
        </div>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-home-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

Banks will approve you for the maximum. That doesn't mean you should take it. The 28/36 rule says your housing shouldn't exceed 28% of gross income, and total debts shouldn't exceed 36%. But those are ceilings — not targets.

This calculator shows two numbers: what the bank says you can afford, and what you should actually spend. The gap between them is where financial stress lives.

A more conservative target: 25% of your take-home pay (not gross). That leaves room for savings, emergencies, and actually enjoying the house you bought.

The math behind this comes from [Module 02: Financial Architecture](/methodology/financial-architecture/) and [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
