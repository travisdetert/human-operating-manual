---
title: "Sprint Tracker"
description: "Track your 28-day sprint cycles from Module 07. Daily compliance, weekly check-ins, and retrospectives."
layout: layouts/tool.njk
tags: tool
order: 7
permalink: /tools/sprint-tracker/
utilScript: /js/tools/mc-store.js
scriptPath: /js/tools/sprint-tracker.js
---

<div class="calculator" id="sprint-tracker-tool">

  <div class="tool-tabs" role="tablist">
    <button class="tool-tab active" role="tab" data-tab="current">Current Sprint</button>
    <button class="tool-tab" role="tab" data-tab="daily">Daily Tracking</button>
    <button class="tool-tab" role="tab" data-tab="weekly">Weekly Check-In</button>
    <button class="tool-tab" role="tab" data-tab="retro">Retrospective</button>
    <button class="tool-tab" role="tab" data-tab="history">History</button>
  </div>

  <!-- CURRENT SPRINT -->
  <div class="tool-tab-panel active" id="tab-current" role="tabpanel">
    <div id="sprint-current-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- DAILY TRACKING -->
  <div class="tool-tab-panel" id="tab-daily" role="tabpanel">
    <div id="sprint-daily-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- WEEKLY CHECK-IN -->
  <div class="tool-tab-panel" id="tab-weekly" role="tabpanel">
    <div id="sprint-weekly-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- RETROSPECTIVE -->
  <div class="tool-tab-panel" id="tab-retro" role="tabpanel">
    <div id="sprint-retro-content">
      <!-- Populated by JS -->
    </div>
  </div>

  <!-- HISTORY -->
  <div class="tool-tab-panel" id="tab-history" role="tabpanel">
    <div id="sprint-history-content">
      <!-- Populated by JS -->
    </div>
  </div>

</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How This Works

This is the digital version of the [Module 07: Sprint Cycles](/methodology/sprint-cycles/) tracking protocol.

**Each sprint is 28 days.** You start a sprint from your contract terms, then track daily compliance, do weekly check-ins, and run a retrospective at the end.

Your compliance rate determines your next move:
- **75%+** — Solid. Consider upgrading your contract.
- **60-74%** — Slight overcommitment. Reduce by one notch.
- **Below 60%** — Something systemic is wrong. Strip to 2 terms.

Build your [contract](/tools/contract-builder/) first — the sprint tracker pulls your terms from there.

</div>
