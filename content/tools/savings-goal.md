---
title: "Savings Goal Calculator"
description: "Turn any financial goal into an exact monthly number."
layout: layouts/tool.njk
tags: tool
order: 11
permalink: /tools/savings-goal/
script: savings-goal.js
---

<div class="calculator" id="savings-goal-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="sg-goal">Goal amount ($)</label>
      <input type="number" id="sg-goal" min="0" step="100" placeholder="e.g., 10000">
    </div>

    <div class="calc-field">
      <label for="sg-current">Current savings toward this goal ($)</label>
      <input type="number" id="sg-current" min="0" step="100" value="0">
    </div>

    <div class="calc-field">
      <label for="sg-months">Timeline (months) <small>leave blank to solve for time</small></label>
      <input type="number" id="sg-months" min="0" max="600" step="1" placeholder="e.g., 24">
    </div>

    <div class="calc-field">
      <label for="sg-monthly">Monthly contribution ($) <small>leave blank to solve for amount</small></label>
      <input type="number" id="sg-monthly" min="0" step="25" placeholder="e.g., 300">
    </div>

    <div class="calc-field">
      <label for="sg-return">Savings vehicle return (%)</label>
      <select id="sg-return">
        <option value="0">0% (Cash / checking)</option>
        <option value="2">2% (Savings account)</option>
        <option value="4" selected>4% (High-yield savings / CDs)</option>
        <option value="5">5% (Money market)</option>
        <option value="7">7% (Index fund / moderate risk)</option>
      </select>
    </div>

    <button class="calc-btn" id="calc-sg-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="sg-result" style="display: none;">
    <p class="calc-result-label">Result</p>
    <p class="calc-result-number" id="result-sg-primary" style="font-size: var(--text-lg);">—</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sg-monthly-needed">$0/mo</p>
        <p class="calc-breakdown-label">Monthly Amount</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sg-time">—</p>
        <p class="calc-breakdown-label">Timeline</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sg-interest">$0</p>
        <p class="calc-breakdown-label">Interest Earned</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sg-total-contributed">$0</p>
        <p class="calc-breakdown-label">Total Contributed</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-sg-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

A wish without a number is a fantasy. A wish with a monthly savings target is a plan.

This calculator works two ways: give it a timeline and it tells you the monthly amount. Give it a monthly amount and it tells you the timeline. Either way, you leave with a specific, actionable number.

Whether it's a vacation, a down payment, a wedding, or an emergency fund — the math is the same. The only question is whether you'll automate the transfer.

The sprint cycle approach to goal-setting comes from [Module 07: Sprint Cycles](/methodology/sprint-cycles/).

</div>
