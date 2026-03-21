---
title: "Habit Cost Calculator"
description: "See the 10-year and 30-year compound cost of your daily habits."
layout: layouts/tool.njk
tags: tool
order: 0
permalink: /tools/habit-cost-calculator/
script: habit-cost.js
---

<div class="calculator" id="habit-cost-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="custom-habit-name">Add a daily habit</label>
      <div style="display: flex; gap: var(--space-sm);">
        <input type="text" id="custom-habit-name" placeholder="e.g., Morning Starbucks" style="flex: 2;">
        <input type="number" id="custom-habit-cost" placeholder="$/day" min="0" step="0.25" style="flex: 1;">
        <button class="calc-btn" id="add-habit-btn" type="button">Add</button>
      </div>
    </div>

    <div class="calc-field">
      <label>Common habits (select all that apply)</label>
      <div class="calc-checkboxes" id="habit-checkboxes">
        <!-- Populated by JS -->
      </div>
    </div>

    <div class="calc-field">
      <label for="investment-rate">If invested instead (annual return)</label>
      <select id="investment-rate">
        <option value="0.05">5% (Conservative)</option>
        <option value="0.07" selected>7% (Moderate / Inflation-adjusted S&P)</option>
        <option value="0.10">10% (S&P 500 Historical Average)</option>
      </select>
    </div>
  </div>

  <div class="calc-result" id="habit-result" style="display: none;">
    <p class="calc-result-label">Your daily habits cost you</p>
    <p class="calc-result-number" id="result-daily">$0</p>
    <p class="calc-result-label">per day</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-yearly">$0</p>
        <p class="calc-breakdown-label">Per Year</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-5yr">$0</p>
        <p class="calc-breakdown-label">5-Year Cost (Invested)</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-10yr">$0</p>
        <p class="calc-breakdown-label">10-Year Cost (Invested)</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-30yr">$0</p>
        <p class="calc-breakdown-label">30-Year Cost (Invested)</p>
      </div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How This Works

Every daily expense has two costs:

1. **The direct cost** — what you spend
2. **The opportunity cost** — what that money would have become if invested

A $6.50 daily coffee isn't just $2,372/year. Invested at 7% annually, that's **$34,000+ over 10 years** and **$237,000+ over 30 years**.

This calculator shows you both costs. Not to shame you — some daily expenses are worth it. But you deserve to know the real price.

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
