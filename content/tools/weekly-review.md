---
title: "Weekly Review Dashboard"
description: "Run your weekly, monthly, quarterly, and annual reviews from Module 13's protocols."
layout: layouts/tool.njk
tags: tool
order: 8
permalink: /tools/weekly-review/
utilScript: /js/tools/mc-store.js
scriptPath: /js/tools/weekly-review.js
---

<div class="calculator" id="weekly-review-tool">

  <div class="tool-tabs" role="tablist">
    <button class="tool-tab active" role="tab" data-tab="weekly">Weekly (15min)</button>
    <button class="tool-tab" role="tab" data-tab="monthly">Monthly (30min)</button>
    <button class="tool-tab" role="tab" data-tab="quarterly">Quarterly (60min)</button>
    <button class="tool-tab" role="tab" data-tab="annual">Annual (90min)</button>
    <button class="tool-tab" role="tab" data-tab="trends">Trends</button>
  </div>

  <!-- WEEKLY -->
  <div class="tool-tab-panel active" id="tab-weekly" role="tabpanel">
    <div id="review-weekly-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- MONTHLY -->
  <div class="tool-tab-panel" id="tab-monthly" role="tabpanel">
    <div id="review-monthly-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- QUARTERLY -->
  <div class="tool-tab-panel" id="tab-quarterly" role="tabpanel">
    <div id="review-quarterly-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- ANNUAL -->
  <div class="tool-tab-panel" id="tab-annual" role="tabpanel">
    <div id="review-annual-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- TRENDS -->
  <div class="tool-tab-panel" id="tab-trends" role="tabpanel">
    <div id="review-trends-content">
      <!-- Populated by JS -->
    </div>
  </div>

</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How This Works

These are the review protocols from [Module 13: Appendices](/methodology/appendices/), digitized for quick use.

- **Weekly (15 min):** Contract compliance, financial/physical/mental snapshot, breach log.
- **Monthly (30 min):** Sprint target assessment, month-end financials, retrospective, next sprint planning.
- **Quarterly (60 min):** Net worth comparison, domain assessment (7 life areas rated 1-10), avoidance audit, contract evolution review.
- **Annual (90 min):** Year-over-year progress across all domains, biggest wins and failures, next year planning.
- **Trends:** Timeline of all reviews with domain score visualization.

Each review pulls data from your [contract](/tools/contract-builder/) and [sprint tracker](/tools/sprint-tracker/) when available. Your review history is saved locally.

</div>
