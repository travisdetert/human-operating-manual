---
title: "Honest Audit Tool"
description: "Digitize your Module 01 audit. Track finances, health, time, and strengths — then compare over time."
layout: layouts/tool.njk
tags: tool
order: 6
permalink: /tools/honest-audit/
utilScript: /js/tools/mc-store.js
scriptPath: /js/tools/honest-audit.js
---

<div class="calculator" id="honest-audit-tool">

  <div class="tool-tabs" role="tablist">
    <button class="tool-tab active" role="tab" data-tab="financial">Financial</button>
    <button class="tool-tab" role="tab" data-tab="physical">Physical</button>
    <button class="tool-tab" role="tab" data-tab="time">Time</button>
    <button class="tool-tab" role="tab" data-tab="strengths">Strengths</button>
    <button class="tool-tab" role="tab" data-tab="summary">Summary</button>
  </div>

  <!-- FINANCIAL TAB -->
  <div class="tool-tab-panel active" id="tab-financial" role="tabpanel">

    <div class="data-section">
      <p class="data-section-header">Monthly Income (after tax)</p>
      <div class="data-row"><label>Primary job</label><input type="number" data-field="income_primary" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Secondary income</label><input type="number" data-field="income_secondary" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Side work / freelance</label><input type="number" data-field="income_side" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Government benefits</label><input type="number" data-field="income_benefits" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Other income</label><input type="number" data-field="income_other" step="0.01" placeholder="0.00"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Fixed Expenses</p>
      <div class="data-row"><label>Rent / mortgage</label><input type="number" data-field="fixed_rent" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Electric</label><input type="number" data-field="fixed_electric" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Gas / heating</label><input type="number" data-field="fixed_gas" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Water</label><input type="number" data-field="fixed_water" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Internet</label><input type="number" data-field="fixed_internet" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Phone</label><input type="number" data-field="fixed_phone" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Health insurance</label><input type="number" data-field="fixed_health_ins" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Car insurance</label><input type="number" data-field="fixed_car_ins" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Renter's / home insurance</label><input type="number" data-field="fixed_renters_ins" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Car payment</label><input type="number" data-field="fixed_car" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Student loans</label><input type="number" data-field="fixed_student" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Other loan payments</label><input type="number" data-field="fixed_loans" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Credit card minimums</label><input type="number" data-field="fixed_cc_min" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Child support / alimony</label><input type="number" data-field="fixed_child_support" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Childcare</label><input type="number" data-field="fixed_childcare" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Subscriptions</label><input type="number" data-field="fixed_subscriptions" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Other fixed costs</label><input type="number" data-field="fixed_other" step="0.01" placeholder="0.00"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Variable Expenses (monthly average)</p>
      <div class="data-row"><label>Groceries</label><input type="number" data-field="var_groceries" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Dining out</label><input type="number" data-field="var_dining" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Takeout / delivery</label><input type="number" data-field="var_takeout" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Coffee / drinks</label><input type="number" data-field="var_coffee" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Alcohol</label><input type="number" data-field="var_alcohol" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Tobacco / vape</label><input type="number" data-field="var_tobacco" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Cannabis</label><input type="number" data-field="var_cannabis" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Gas / fuel</label><input type="number" data-field="var_gas" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Parking / tolls</label><input type="number" data-field="var_parking" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Transit</label><input type="number" data-field="var_transit" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Clothing</label><input type="number" data-field="var_clothing" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Personal care</label><input type="number" data-field="var_personal" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Household supplies</label><input type="number" data-field="var_household" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Entertainment</label><input type="number" data-field="var_entertainment" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Hobbies</label><input type="number" data-field="var_hobbies" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Shopping / impulse</label><input type="number" data-field="var_shopping" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Gifts</label><input type="number" data-field="var_gifts" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Pet expenses</label><input type="number" data-field="var_pets" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Gambling</label><input type="number" data-field="var_gambling" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Medical copays</label><input type="number" data-field="var_medical" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Untracked cash</label><input type="number" data-field="var_untracked" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Other variable</label><input type="number" data-field="var_other" step="0.01" placeholder="0.00"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Debt Inventory</p>
      <div id="debt-rows" class="dynamic-rows">
        <!-- Populated by JS -->
      </div>
      <button type="button" class="btn-add-row" id="add-debt-btn">+ Add debt</button>
    </div>

    <div class="data-section">
      <p class="data-section-header">Assets</p>
      <div class="data-row"><label>Checking accounts</label><input type="number" data-field="asset_checking" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Savings accounts</label><input type="number" data-field="asset_savings" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Retirement (401k/IRA)</label><input type="number" data-field="asset_retirement" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Investments</label><input type="number" data-field="asset_investments" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Vehicle value</label><input type="number" data-field="asset_vehicles" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Home equity</label><input type="number" data-field="asset_home" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Cash on hand</label><input type="number" data-field="asset_cash" step="0.01" placeholder="0.00"></div>
      <div class="data-row"><label>Other assets</label><input type="number" data-field="asset_other" step="0.01" placeholder="0.00"></div>
    </div>

  </div>

  <!-- PHYSICAL TAB -->
  <div class="tool-tab-panel" id="tab-physical" role="tabpanel">

    <div class="data-section">
      <p class="data-section-header">Body Metrics</p>
      <div class="data-row"><label>Height</label><input type="text" data-field="body_height" placeholder='e.g. 5\'10"'></div>
      <div class="data-row"><label>Weight (lbs)</label><input type="number" data-field="body_weight" step="0.1" placeholder="0"></div>
      <div class="data-row"><label>Waist (inches)</label><input type="number" data-field="body_waist" step="0.1" placeholder="0"></div>
      <div class="data-row"><label>Can climb 3 flights without stopping?</label><select data-field="body_stairs"><option value="">--</option><option value="yes">Yes</option><option value="no">No</option></select></div>
      <div class="data-row"><label>Can touch toes?</label><select data-field="body_flex"><option value="">--</option><option value="yes">Yes</option><option value="no">No</option></select></div>
      <div class="data-row"><label>Chronic pain?</label><select data-field="body_pain"><option value="">--</option><option value="no">No</option><option value="yes">Yes</option></select></div>
      <div class="data-row"><label>Pain location</label><input type="text" data-field="body_pain_where" placeholder="e.g. lower back"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Medical Status</p>
      <div class="data-row"><label>Last physical</label><input type="date" data-field="med_physical"></div>
      <div class="data-row"><label>Last dental cleaning</label><input type="date" data-field="med_dental"></div>
      <div class="data-row"><label>Last eye exam</label><input type="date" data-field="med_eye"></div>
      <div class="data-row"><label>Last blood work</label><input type="date" data-field="med_blood"></div>
      <div class="data-row"><label>Known conditions</label><input type="text" data-field="med_conditions" placeholder="e.g. hypertension, type 2"></div>
      <div class="data-row"><label>Current medications</label><input type="text" data-field="med_medications" placeholder="List medications"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Daily Intake (typical day)</p>
      <div class="data-row"><label>Water (glasses)</label><input type="number" data-field="intake_water" step="1" placeholder="0"></div>
      <div class="data-row"><label>Sodas / energy drinks</label><input type="number" data-field="intake_soda" step="1" placeholder="0"></div>
      <div class="data-row"><label>Coffees</label><input type="number" data-field="intake_coffee" step="1" placeholder="0"></div>
      <div class="data-row"><label>Alcoholic drinks</label><input type="number" data-field="intake_alcohol" step="1" placeholder="0"></div>
      <div class="data-row"><label>Cigarettes / vape sessions</label><input type="number" data-field="intake_tobacco" step="1" placeholder="0"></div>
      <div class="data-row"><label>Estimated daily calories</label><input type="number" data-field="intake_calories" step="50" placeholder="0"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Exercise (last 30 days)</p>
      <div class="data-row"><label>Days with 20+ min exercise</label><input type="number" data-field="exercise_days" step="1" min="0" max="30" placeholder="0"></div>
      <div class="data-row"><label>Primary type</label><input type="text" data-field="exercise_type" placeholder="e.g. walking, weights, running"></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Sleep</p>
      <div class="data-row"><label>Avg bedtime</label><input type="time" data-field="sleep_bedtime"></div>
      <div class="data-row"><label>Avg wake time</label><input type="time" data-field="sleep_wake"></div>
      <div class="data-row"><label>Avg hours of sleep</label><input type="number" data-field="sleep_hours" step="0.5" placeholder="0"></div>
      <div class="data-row"><label>Sleep quality (1-10)</label><input type="number" data-field="sleep_quality" min="1" max="10" placeholder="0"></div>
      <div class="data-row"><label>Screen before bed?</label><select data-field="sleep_screen"><option value="">--</option><option value="yes">Yes</option><option value="no">No</option></select></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Energy Map (1-10)</p>
      <div class="data-row"><label>Morning energy</label><input type="number" data-field="energy_morning" min="1" max="10" placeholder="0"></div>
      <div class="data-row"><label>Midday energy</label><input type="number" data-field="energy_midday" min="1" max="10" placeholder="0"></div>
      <div class="data-row"><label>Afternoon energy</label><input type="number" data-field="energy_afternoon" min="1" max="10" placeholder="0"></div>
      <div class="data-row"><label>Evening energy</label><input type="number" data-field="energy_evening" min="1" max="10" placeholder="0"></div>
    </div>

  </div>

  <!-- TIME TAB -->
  <div class="tool-tab-panel" id="tab-time" role="tabpanel">

    <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-lg);">
      Your week has exactly 168 hours. Account for every one.
      <span id="time-remaining" style="font-family: var(--font-mono); font-weight: 600;"></span>
    </p>

    <div class="data-section">
      <p class="data-section-header">Essentials</p>
      <div class="data-row"><label>Sleep</label><input type="number" data-field="time_sleep" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Work (productive hours)</label><input type="number" data-field="time_work" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Work (overhead: meetings, etc.)</label><input type="number" data-field="time_work_overhead" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Commuting</label><input type="number" data-field="time_commute" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Grooming / hygiene</label><input type="number" data-field="time_grooming" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Cooking</label><input type="number" data-field="time_cooking" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Eating</label><input type="number" data-field="time_eating" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Cleaning / chores</label><input type="number" data-field="time_cleaning" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Errands</label><input type="number" data-field="time_errands" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Childcare</label><input type="number" data-field="time_childcare" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Consumption</p>
      <div class="data-row"><label>Social media</label><input type="number" data-field="time_social" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Messaging / texting</label><input type="number" data-field="time_messaging" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>News / browsing</label><input type="number" data-field="time_news" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>TV / streaming</label><input type="number" data-field="time_streaming" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Gaming</label><input type="number" data-field="time_gaming" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Short-form video</label><input type="number" data-field="time_shortform" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Investment</p>
      <div class="data-row"><label>Exercise / movement</label><input type="number" data-field="time_exercise" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Learning / courses</label><input type="number" data-field="time_learning" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Reading</label><input type="number" data-field="time_reading" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Skill building / practice</label><input type="number" data-field="time_skills" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Hobbies (creative)</label><input type="number" data-field="time_hobbies" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Relationships</p>
      <div class="data-row"><label>Quality time (partner)</label><input type="number" data-field="time_partner" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Quality time (kids)</label><input type="number" data-field="time_kids" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Quality time (friends)</label><input type="number" data-field="time_friends" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
    </div>

    <div class="data-section">
      <p class="data-section-header">Other</p>
      <div class="data-row"><label>Idle / unstructured</label><input type="number" data-field="time_idle" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
      <div class="data-row"><label>Other activities</label><input type="number" data-field="time_other" data-time step="0.5" placeholder="0" class="time-input"> <span class="time-unit">hrs</span></div>
    </div>

    <div id="time-analysis" style="display:none;" class="calc-result">
      <!-- Populated by JS -->
    </div>

  </div>

  <!-- STRENGTHS TAB -->
  <div class="tool-tab-panel" id="tab-strengths" role="tabpanel">

    <div class="data-section">
      <p class="data-section-header">My 5 Strengths</p>
      <div class="calc-field-group">
        <input type="text" data-field="strength_1" placeholder="1. What I'm genuinely good at" class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="strength_2" placeholder="2." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="strength_3" placeholder="3." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="strength_4" placeholder="4." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="strength_5" placeholder="5." class="calc-textarea" style="min-height:auto;">
      </div>
    </div>

    <div class="data-section">
      <p class="data-section-header">My 5 Weaknesses</p>
      <div class="calc-field-group">
        <input type="text" data-field="weakness_1" placeholder="1. What consistently trips me up" class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="weakness_2" placeholder="2." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="weakness_3" placeholder="3." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="weakness_4" placeholder="4." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="weakness_5" placeholder="5." class="calc-textarea" style="min-height:auto;">
      </div>
    </div>

    <div class="data-section">
      <p class="data-section-header">3 Recurring Patterns</p>
      <div class="calc-field-group">
        <textarea data-field="pattern_1" class="calc-textarea" placeholder="1. A cycle I keep repeating..."></textarea>
        <textarea data-field="pattern_2" class="calc-textarea" placeholder="2."></textarea>
        <textarea data-field="pattern_3" class="calc-textarea" placeholder="3."></textarea>
      </div>
    </div>

    <div class="data-section">
      <p class="data-section-header">3 Things I've Tried + Why They Failed</p>
      <div class="calc-field-group">
        <textarea data-field="tried_1" class="calc-textarea" placeholder="1. What I tried and why it didn't work..."></textarea>
        <textarea data-field="tried_2" class="calc-textarea" placeholder="2."></textarea>
        <textarea data-field="tried_3" class="calc-textarea" placeholder="3."></textarea>
      </div>
    </div>

    <div class="data-section">
      <p class="data-section-header">5 Things I'm Avoiding</p>
      <div class="calc-field-group">
        <input type="text" data-field="avoiding_1" placeholder="1. What I know I should do but won't" class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="avoiding_2" placeholder="2." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="avoiding_3" placeholder="3." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="avoiding_4" placeholder="4." class="calc-textarea" style="min-height:auto;">
        <input type="text" data-field="avoiding_5" placeholder="5." class="calc-textarea" style="min-height:auto;">
      </div>
    </div>

  </div>

  <!-- SUMMARY TAB -->
  <div class="tool-tab-panel" id="tab-summary" role="tabpanel">
    <div id="audit-summary">
      <p class="empty-state">Fill in the other tabs to see your summary.</p>
    </div>
  </div>

  <!-- ACTION BAR -->
  <div class="tool-actions">
    <button type="button" class="calc-btn" id="audit-save-btn">Save Audit</button>
    <button type="button" class="calc-btn calc-share-btn" id="audit-new-btn">New Audit</button>
    <button type="button" class="calc-btn calc-share-btn" id="audit-export-btn">Export JSON</button>
    <button type="button" class="calc-btn calc-share-btn" id="audit-import-btn">Import JSON</button>
    <input type="file" id="audit-import-file" accept=".json" style="display:none;">
  </div>

</div>

<div class="prose" style="margin-top: var(--space-2xl);">

## How This Works

This is the digital version of the [Module 01: Honest Audit](/methodology/honest-audit/). It captures your complete financial, physical, time, and personal inventory in one place.

**Everything auto-saves** as you type. When you start a new audit, the previous one is archived so you can compare over time. Your data never leaves your browser.

The Summary tab calculates your net worth, monthly cash flow, and time ratios automatically. If you have a previous audit saved, it shows comparison columns so you can see what changed.

</div>
