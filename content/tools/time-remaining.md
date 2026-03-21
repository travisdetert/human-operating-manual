---
title: "Time Remaining Calculator"
description: "How many healthy, discretionary days do you actually have left?"
layout: layouts/tool.njk
tags: tool
order: 1
permalink: /tools/time-remaining/
script: time-remaining.js
---

<div class="calculator" id="time-remaining-calculator">
  <div class="calc-form">
    <div class="calc-field">
      <label for="current-age">Your current age</label>
      <input type="number" id="current-age" min="1" max="120" placeholder="e.g., 35">
    </div>

    <div class="calc-field">
      <label for="sex">Biological sex (for baseline life expectancy)</label>
      <select id="sex">
        <option value="77">Average (77 years)</option>
        <option value="76.4">Male (76.4 years)</option>
        <option value="81.2">Female (81.2 years)</option>
      </select>
    </div>

    <div class="calc-field">
      <label>Lifestyle adjustments (check all that apply)</label>
      <div class="calc-checkboxes" id="lifestyle-checks">
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="-10" id="adj-smoker">
          <span class="calc-checkbox-label">Current smoker</span>
          <span class="calc-checkbox-cost">-10 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="-7.5" id="adj-drinker">
          <span class="calc-checkbox-label">Heavy drinker</span>
          <span class="calc-checkbox-cost">-7.5 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="-6.5" id="adj-obese">
          <span class="calc-checkbox-label">Obese (BMI 30+)</span>
          <span class="calc-checkbox-cost">-6.5 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="-4" id="adj-sedentary">
          <span class="calc-checkbox-label">Sedentary lifestyle</span>
          <span class="calc-checkbox-cost">-4 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="-4" id="adj-family">
          <span class="calc-checkbox-label">Family history of early death</span>
          <span class="calc-checkbox-cost">-4 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="4" id="adj-exercise">
          <span class="calc-checkbox-label">Regular exerciser</span>
          <span class="calc-checkbox-cost">+4 years</span>
        </label>
        <label class="calc-checkbox-item">
          <input type="checkbox" data-years="2.5" id="adj-weight">
          <span class="calc-checkbox-label">Healthy weight</span>
          <span class="calc-checkbox-cost">+2.5 years</span>
        </label>
      </div>
    </div>

    <button class="calc-btn" id="calc-time-btn" type="button">Calculate</button>
  </div>

  <div class="calc-result" id="time-result" style="display: none;">
    <p class="calc-result-label">Estimated healthy years remaining</p>
    <p class="calc-result-number" id="result-years">0</p>

    <div class="calc-breakdown">
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-total-years">0</p>
        <p class="calc-breakdown-label">Total Years Left</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-weeks">0</p>
        <p class="calc-breakdown-label">Weeks</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-days">0</p>
        <p class="calc-breakdown-label">Days</p>
      </div>
      <div class="calc-breakdown-item">
        <p class="calc-breakdown-value" id="result-discretionary">0</p>
        <p class="calc-breakdown-label">Discretionary Days</p>
      </div>
    </div>

    <p style="margin-top: var(--space-lg); font-size: var(--text-sm); color: var(--color-text-muted);">
      Discretionary days = total days minus sleep (~33%), work (~20%), and maintenance (~10%). This is your actual budget of free time for the rest of your life.
    </p>

    <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
      <button class="calc-btn calc-share-btn" id="share-time-btn" type="button">Copy Results</button>
    </div>
  </div>
</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## Why This Matters

If you're 35, you have roughly **15,000 days** left. Subtract sleeping (5,000), working (3,500), and basic maintenance (1,500). You have approximately **5,000 days** of discretionary time left.

Five thousand days. That's your actual budget of free time for the rest of your life.

The math comes from [Module 09: The Math of Your Life](/methodology/math-of-your-life/).

</div>
