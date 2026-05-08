<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const goal = ref(''), current = ref('0'), monthly = ref(''), rate = ref('4')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

const result = computed(() => {
  const g = parseFloat(goal.value), s = parseFloat(current.value)||0
  const m = parseFloat(monthly.value), r = parseFloat(rate.value)/100/12
  if (!g || !m || g <= s) return null
  const remaining = g - s
  let months
  if (r === 0) {
    months = Math.ceil(remaining / m)
  } else {
    months = Math.ceil(Math.log(1 + remaining * r / m) / Math.log(1 + r))
  }
  const years = Math.floor(months / 12), remMonths = months % 12
  const totalContrib = s + m * months
  const interest = g - totalContrib > 0 ? g - totalContrib : 0
  const targetDate = new Date()
  targetDate.setMonth(targetDate.getMonth() + months)
  const dateStr = targetDate.toLocaleDateString('en-GB', { month:'long', year:'numeric' })
  return { months, years, remMonths, totalContrib: fmt(totalContrib), interest: fmt(interest), dateStr }
})

const faqs = [
  { q:'What interest rate should I use?', a:'Use your expected annual savings account or investment return rate. High-yield savings accounts currently offer 4–5%. Index funds average ~7–10% annually over the long term.' },
  { q:'What if I can increase my monthly savings?', a:'Adjust the monthly contribution slider to see how much faster you reach your goal. Even an extra $50/month can shave months off your timeline.' },
  { q:'Should I prioritise paying off debt or saving?', a:'If your debt interest rate is higher than your savings return, prioritise debt first. If your savings rate (e.g. employer 401k match) beats the debt rate, contribute to savings first.' },
]
const tips = [
  { icon:'🏦', title:'Open a High-Yield Savings Account', text:'Online banks often offer 10–20× the interest rate of traditional bank savings accounts, accelerating your progress significantly.' },
  { icon:'⚙️', title:'Automate Your Savings', text:'Set up a standing order to move your monthly savings to a dedicated account on payday, before you have a chance to spend it.' },
  { icon:'🎯', title:'Name Your Account After the Goal', text:'Research shows naming savings accounts after specific goals increases the likelihood of reaching them.' },
]
</script>

<template>
  <CalculatorLayout title="Savings Goal Calculator" description="Find out how long it will take to reach your savings goal with regular monthly contributions and compound interest.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Savings Goal</label><div class="relative"><input v-model="goal" type="number" min="0" placeholder="e.g. 20000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Current Savings</label><div class="relative"><input v-model="current" type="number" min="0" placeholder="0" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Monthly Contribution</label><div class="relative"><input v-model="monthly" type="number" min="0" placeholder="e.g. 500" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Annual Interest Rate: <strong class="text-emerald-600">{{ rate }}%</strong></label><input v-model="rate" type="range" min="0" max="15" step="0.5" class="w-full accent-emerald-500 mt-3"/></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Time to Reach Goal</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.years > 0 ? result.years + 'y ' : '' }}{{ result.remMonths }}m</div>
              <div class="text-emerald-400 text-sm mt-1">Estimated by {{ result.dateStr }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Contributed</div><div class="font-extrabold text-slate-700">{{ result.totalContrib }}</div></div>
              <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center"><div class="text-xs text-blue-500 mb-1">Interest Earned</div><div class="font-extrabold text-blue-700">{{ result.interest }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your goal and monthly savings to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How to Reach Any Savings Goal Faster</h2><p class='mb-3'>This calculator tells you exactly how many months it will take to reach your savings target, given your current savings, monthly contribution, and expected interest rate. It accounts for compound interest earned along the way.</p><p>Use it to plan for an emergency fund, a home deposit, a holiday, a car, or any other financial goal.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
