---
title: "Subscription Audit"
description: "The average American underestimates subscription spending by 2.5x. Find your real number."
layout: layouts/tool.njk
tags: tool
order: 13
permalink: /tools/subscription-audit/
script: subscription-audit.js
---

<div class="calculator" id="subscription-audit-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label>Select your active subscriptions</label>
      <div class="calc-checkboxes" id="sub-checkboxes">
        <!-- Populated by JS -->
      </div>
    </div>

    <div class="calc-field">
      <label>Custom subscriptions</label>
      <div id="custom-sub-list"></div>
      <button class="calc-btn" id="add-sub-btn" type="button" style="margin-top: var(--space-xs);">+ Add Custom</button>
    </div>

    <div class="calc-field">
      <label for="sub-return-rate">If invested instead (annual return %)</label>
      <select id="sub-return-rate">
        <option value="5">5% (Conservative)</option>
        <option value="7" selected>7% (Moderate)</option>
        <option value="10">10% (S&P 500 Historical)</option>
      </select>
    </div>

    <div class="calc-field">
      <label for="sub-hourly-wage">Your hourly wage ($) <small>optional — shows cost in life-hours</small></label>
      <input type="number" id="sub-hourly-wage" min="0" step="1" placeholder="e.g., 25">
    </div>

    <button class="calc-btn" id="calc-sub-btn" type="button">Audit My Subscriptions</button>
  </div>

  <div class="calc-result" id="sub-result" style="display: none;">
    <p class="calc-result-label">Your subscriptions cost</p>
    <p class="calc-result-number" id="result-sub-monthly">$0</p>
    <p class="calc-result-label">per month</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sub-count">0</p>
        <p class="calc-breakdown-label">Active Subscriptions</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sub-annual">$0</p>
        <p class="calc-breakdown-label">Annual Cost</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sub-5yr">$0</p>
        <p class="calc-breakdown-label">5-Year Opportunity Cost</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sub-10yr">$0</p>
        <p class="calc-breakdown-label">10-Year Opportunity Cost</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-sub-hours">—</p>
        <p class="calc-breakdown-label">Cost in Life-Hours/Year</p>
      </div>
    </div>

    <p style="margin-top: var(--space-lg); font-size: var(--text-sm); font-weight: 600;" id="result-sub-top3"></p>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-sub-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

The average American spends $219/month on subscriptions but thinks they spend $86. That's not a rounding error — it's a blind spot.

Each subscription is "only" $10-15/month. But stack twenty of them and you're bleeding $200+/month without noticing. Over 10 years at 7% returns, that's over $34,000 in opportunity cost.

This isn't about deprivation. It's about intention. Keep the subscriptions that genuinely improve your life. Cancel the ones you forgot you had. The three most expensive ones are almost always the best place to start.

This connects to [Module 04: Habit Engineering](/methodology/habit-engineering/) and [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
