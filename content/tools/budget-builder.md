---
title: "Budget Builder"
description: "See exactly where your money goes — income in, expenses out, what's left."
layout: layouts/tool.njk
tags: tool
order: 16
permalink: /tools/budget-builder/
script: budget-builder.js
---

<div class="calculator" id="budget-builder-calculator">
  <div class="calc-form">
    <p class="sidebar-heading">Monthly Income</p>

    <div class="calc-field">
      <label for="bb-primary">Primary income (after tax)</label>
      <input type="number" id="bb-primary" min="0" step="100" placeholder="e.g., 3200">
    </div>

    <div class="calc-field">
      <label for="bb-secondary">Secondary income</label>
      <input type="number" id="bb-secondary" min="0" step="50" value="0">
    </div>

    <div class="calc-field">
      <label for="bb-other-income">Other income (benefits, child support, etc.)</label>
      <input type="number" id="bb-other-income" min="0" step="50" value="0">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Needs</p>

    <div class="calc-field">
      <label for="bb-housing">Housing (rent/mortgage)</label>
      <input type="number" id="bb-housing" min="0" step="50" placeholder="e.g., 1200">
    </div>

    <div class="calc-field">
      <label for="bb-utilities">Utilities (electric, gas, water, trash)</label>
      <input type="number" id="bb-utilities" min="0" step="25" placeholder="e.g., 200">
    </div>

    <div class="calc-field">
      <label for="bb-transportation">Transportation (car payment, gas, transit)</label>
      <input type="number" id="bb-transportation" min="0" step="25" placeholder="e.g., 350">
    </div>

    <div class="calc-field">
      <label for="bb-groceries">Groceries</label>
      <input type="number" id="bb-groceries" min="0" step="25" placeholder="e.g., 400">
    </div>

    <div class="calc-field">
      <label for="bb-insurance">Insurance (health, auto, renters)</label>
      <input type="number" id="bb-insurance" min="0" step="25" placeholder="e.g., 250">
    </div>

    <div class="calc-field">
      <label for="bb-healthcare">Healthcare (Rx, copays, dental)</label>
      <input type="number" id="bb-healthcare" min="0" step="25" value="0">
    </div>

    <div class="calc-field">
      <label for="bb-phone">Phone / Internet</label>
      <input type="number" id="bb-phone" min="0" step="10" placeholder="e.g., 120">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Debt & Savings</p>

    <div class="calc-field">
      <label for="bb-debt">Debt payments (credit cards, loans, etc.)</label>
      <input type="number" id="bb-debt" min="0" step="25" value="0">
    </div>

    <div class="calc-field">
      <label for="bb-savings">Savings / emergency fund</label>
      <input type="number" id="bb-savings" min="0" step="25" value="0">
    </div>

    <p class="sidebar-heading" style="margin-top: var(--space-lg);">Everything Else</p>

    <div class="calc-field">
      <label for="bb-subscriptions">Subscriptions (streaming, apps, memberships)</label>
      <input type="number" id="bb-subscriptions" min="0" step="5" value="0">
    </div>

    <div class="calc-field">
      <label for="bb-personal">Personal (dining out, clothes, entertainment)</label>
      <input type="number" id="bb-personal" min="0" step="25" value="0">
    </div>

    <div class="calc-field">
      <label for="bb-other-expenses">Other expenses</label>
      <input type="number" id="bb-other-expenses" min="0" step="25" value="0">
    </div>

    <button class="calc-btn" id="calc-bb-btn" type="button">Build Budget</button>
  </div>

  <div class="calc-result" id="bb-result" style="display: none;">
    <p class="calc-result-label" id="result-surplus-label">Monthly Surplus</p>
    <p class="calc-result-number" id="result-surplus" style="font-size: var(--text-lg);">—</p>

    <div id="result-warnings" style="display: none; margin: var(--space-md) 0; padding: var(--space-sm) var(--space-md); background: var(--color-surface, #1a1a1a); border-left: 3px solid var(--color-danger, #c0392b); font-size: var(--text-sm);"></div>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-income">$0</p>
        <p class="calc-breakdown-label">Total Monthly Income</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-expenses">$0</p>
        <p class="calc-breakdown-label">Total Monthly Expenses</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-annual-surplus">$0</p>
        <p class="calc-breakdown-label">Annual Surplus/Deficit</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-savings-rate">0%</p>
        <p class="calc-breakdown-label">Savings Rate</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-housing-pct">0%</p>
        <p class="calc-breakdown-label">Housing % of Income</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-debt-pct">0%</p>
        <p class="calc-breakdown-label">Debt % of Income</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-needs-pct">0%</p>
        <p class="calc-breakdown-label">Needs % of Income</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-bb-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How to Use This

Enter your actual numbers. Not what you think they should be — what they are. Check your bank statement for the last 3 months and average each category.

The 50/30/20 guideline says: 50% needs, 30% wants, 20% savings. That's a guideline for people who can afford guidelines. If you're at 85% needs and 0% savings, this tool shows you that reality so you can work with it.

The warnings aren't judgments — they're flags. Housing over 30% of income means one bad month wipes you out. Debt over 20% means you're feeding past decisions instead of building future ones.

If the number at the top is red, you're spending more than you earn. That's not sustainable, and now you can see exactly where the money goes. That visibility is the first step in [The Honest Audit](/methodology/honest-audit/).

For tracking subscriptions specifically, use the [Subscription Audit](/tools/subscription-audit/). For debt payoff strategy, see the [Debt Payoff tool](/tools/debt-payoff/).

</div>
