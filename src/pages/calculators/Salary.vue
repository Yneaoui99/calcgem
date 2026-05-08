<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const amount = ref(''), inputUnit = ref('annual'), hoursPerWeek = ref('40'), weeksPerYear = ref('52')
const fmt = (n) => '$' + Math.round(n).toLocaleString()
const fmtCents = (n) => '$' + n.toFixed(2)

const result = computed(() => {
  const a = parseFloat(amount.value)
  const h = parseFloat(hoursPerWeek.value) || 40
  const w = parseFloat(weeksPerYear.value) || 52
  if (!a) return null
  let annual
  if (inputUnit.value === 'annual') annual = a
  else if (inputUnit.value === 'monthly') annual = a * 12
  else if (inputUnit.value === 'weekly') annual = a * w
  else if (inputUnit.value === 'daily') annual = a * 5 * w
  else if (inputUnit.value === 'hourly') annual = a * h * w
  const monthly = annual / 12
  const biweekly = annual / 26
  const weekly = annual / w
  const daily = annual / (5 * w)
  const hourly = annual / (h * w)
  return { annual: fmt(annual), monthly: fmt(monthly), biweekly: fmt(biweekly), weekly: fmt(weekly), daily: fmt(daily), hourly: fmtCents(hourly) }
})

const units = [
  { v: 'hourly', l: 'Hourly' }, { v: 'daily', l: 'Daily' }, { v: 'weekly', l: 'Weekly' },
  { v: 'monthly', l: 'Monthly' }, { v: 'annual', l: 'Annual' },
]

const faqs = [
  { q: 'How many work hours are in a year?', a: 'A standard full-time worker works 40 hours/week × 52 weeks = 2,080 hours per year. Subtracting ~10 holidays gives approximately 2,000 billable hours, which is why many freelancers use 2,000 as their rate base.' },
  { q: 'What is the difference between gross and net salary?', a: 'Gross salary is the total before deductions. Net salary (take-home pay) is what you receive after income tax, National Insurance/Social Security, pension contributions, and other deductions are removed.' },
  { q: 'How do I convert an hourly rate to an annual salary?', a: 'Multiply your hourly rate by hours per week, then by weeks per year. For a standard job: hourly rate × 40 × 52 = annual salary. Example: $25/hr × 2,080 = $52,000/year.' },
]
const tips = [
  { icon: '📊', title: 'Negotiate Annually, Think Hourly', text: 'When comparing job offers, always convert to an equivalent hourly rate. A higher salary with more hours can pay less per hour than a lower salary with fewer hours.' },
  { icon: '🏖️', title: 'Account for Unpaid Time Off', text: 'If you take unpaid leave, reduce your weeks per year accordingly. Two weeks unpaid leave reduces a $70,000 salary\'s effective hourly rate by ~4%.' },
  { icon: '💡', title: 'Freelance Rate: Add 30–40%', text: 'Freelancers should add 30–40% to their desired equivalent employee salary to cover taxes, benefits, equipment, downtime, and unpaid admin time.' },
]
</script>

<template>
  <CalculatorLayout title="Salary Calculator" description="Convert any salary or rate between hourly, daily, weekly, monthly, and annual figures instantly.">
    <template #calculator>
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Input as</label>
          <div class="flex gap-2 flex-wrap">
            <button v-for="u in units" :key="u.v" @click="inputUnit = u.v" :class="['px-4 py-2 rounded-xl text-sm font-semibold border-2 transition', inputUnit === u.v ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600 hover:border-indigo-400']">{{ u.l }}</button>
          </div>
        </div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">{{ units.find(u => u.v === inputUnit)?.l }} Amount</label><div class="relative"><input v-model="amount" type="number" min="0" step="0.01" placeholder="e.g. 75000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Hours per Week</label><input v-model="hoursPerWeek" type="number" min="1" max="168" placeholder="40" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Weeks per Year</label><input v-model="weeksPerYear" type="number" min="1" max="52" placeholder="52" class="input-field"/></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-center">
              <div class="text-xs text-indigo-500 font-medium mb-1">Annual Salary</div>
              <div class="text-3xl font-extrabold text-indigo-700">{{ result.annual }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Monthly</div><div class="font-extrabold text-slate-700">{{ result.monthly }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Bi-weekly</div><div class="font-extrabold text-slate-700">{{ result.biweekly }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Weekly</div><div class="font-extrabold text-slate-700">{{ result.weekly }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Daily</div><div class="font-extrabold text-slate-700">{{ result.daily }}</div></div>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center"><div class="text-xs text-emerald-600 mb-1">Hourly Rate</div><div class="font-extrabold text-emerald-700 text-xl">{{ result.hourly }}</div></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter a salary or rate to convert</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Converting Between Pay Periods</h2><p class='mb-3'>Whether you\'re comparing a job offer quoted as an annual salary to a freelance rate quoted hourly, or simply trying to understand your daily equivalent, this calculator converts any pay rate into every other pay period instantly.</p><p>Adjust the hours per week and working weeks per year to match your actual schedule for an accurate conversion.</p>" formula="Annual ÷ 12 = Monthly | Annual ÷ 26 = Bi-weekly
Annual ÷ (Weeks × 5) = Daily | Annual ÷ (Weeks × Hours/week) = Hourly" :tips="tips" :faqs="faqs" disclaimer="This calculator shows gross (pre-tax) figures only. Actual take-home pay depends on your tax bracket, deductions, and location."/></template>
  </CalculatorLayout>
</template>
