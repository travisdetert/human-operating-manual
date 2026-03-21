---
title: "Real Hourly Rate Calculator"
description: "Your paycheck lies. Calculate what you actually earn per hour of life given to work."
layout: layouts/tool.njk
tags: tool
order: 2
permalink: /tools/real-hourly-rate/
script: real-hourly-rate.js
---

<div class="calculator" id="real-hourly-rate-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="annual-income">Annual income (after tax)</label>
      <input type="number" id="annual-income" min="0" step="1000" placeholder="e.g., 60000">
    </div>

    <div class="calc-field">
      <label for="hours-at-work">Hours at work per day</label>
      <input type="number" id="hours-at-work" min="0" max="24" step="0.5" placeholder="e.g., 9" value="9">
    </div>

    <div class="calc-field">
      <label for="commute-time">Commute time (round trip, hours)</label>
      <input type="number" id="commute-time" min="0" max="8" step="0.25" placeholder="e.g., 1" value="1">
    </div>

    <div class="calc-field">
      <label for="getting-ready">Getting ready for work (hours)</label>
      <input type="number" id="getting-ready" min="0" max="4" step="0.25" placeholder="e.g., 0.5" value="0.5">
    </div>

    <div class="calc-field">
      <label for="decompression">Decompression after work (hours)</label>
      <input type="number" id="decompression" min="0" max="4" step="0.25" placeholder="e.g., 0.5" value="0.5">
    </div>

    <div class="calc-field">
      <label for="work-at-home">Work done at home — email, prep, thinking (hours)</label>
      <input type="number" id="work-at-home" min="0" max="8" step="0.25" placeholder="e.g., 0.5" value="0.5">
    </div>

    <div class="calc-field">
      <label for="work-days">Work days per week</label>
      <input type="number" id="work-days" min="1" max="7" step="1" placeholder="e.g., 5" value="5">
    </div>

    <div class="calc-field">
      <label for="work-weeks">Work weeks per year (minus vacation)</label>
      <input type="number" id="work-weeks" min="1" max="52" step="1" placeholder="e.g., 50" value="50">
    </div>

    <button class="calc-btn" id="calc-rate-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="rate-result" style="display: none;">
    <p class="calc-result-label">Your real hourly rate</p>
    <p class="calc-result-number" id="result-real-rate">$0.00</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-standard-rate">$0.00</p>
        <p class="calc-breakdown-label">Standard Rate (2,080 hrs)</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-real-hours">0</p>
        <p class="calc-breakdown-label">Real Annual Hours for Work</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-reduction">0%</p>
        <p class="calc-breakdown-label">Rate Reduction</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-daily-hours">0</p>
        <p class="calc-breakdown-label">Total Daily Hours for Work</p>
      </div>
    </div>

    <div style="margin-top: var(--space-xl); border-top: 1px solid var(--color-border-light); padding-top: var(--space-lg);">
      <p class="sidebar-heading">What things really cost you (in life-hours)</p>
      <div id="purchase-translations"></div>
    </div>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-rate-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## The Reframe

Every purchase is a trade — your life-hours for a thing. The question isn't "can I afford it?" The question is "**is this worth X hours of my life?**"

Some things are worth it. A weekend with family? Probably worth 38 hours. Unused subscriptions? 115 hours of your life for nothing.

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
