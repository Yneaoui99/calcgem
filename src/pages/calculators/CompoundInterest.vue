<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const principal = ref(''), rate = ref(''), years = ref(''), freq = ref('12'), monthly = ref('0')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

const freqOptions = [
  { v:'1', l:'Annually' }, { v:'2', l:'Semi-annually' }, { v:'4', l:'Quarterly' },
  { v:'12', l:'Monthly' }, { v:'52', l:'Weekly' }, { v:'365', l:'Daily' },
]

const result = computed(() => {
  const p = parseFloat(principal.value), r = parseFloat(rate.value)/100
  const t = parseFloat(years.value), n = parseFloat(freq.value)
  const m = parseFloat(monthly.value)||0
  if (!p || !r || !t || !n) return null
  // FV of lump sum
  const fvLump = p * Math.pow(1 + r/n, n*t)
  // FV of regular monthly contributions (if any)
  const monthlyR = r / 12
  const fvContrib = m > 0 ? m * (Math.pow(1+monthlyR, t*12)-1) / monthlyR : 0
  const finalBalance = fvLump + fvContrib
  const totalContrib = p + m * t * 12
  const interest = finalBalance - totalContrib
  return {
    finalBalance: fmt(finalBalance),
    totalContrib: fmt(totalContrib),
    interest: fmt(interest),
    multiplier: (finalBalance / p).toFixed(2),
    pctGain: ((interest / totalContrib)*100).toFixed(1),
  }
})

const faqs = [
  { q:'What is the difference between simple and compound interest?', a:'Simple interest is calculated only on the principal. Compound interest is calculated on the principal PLUS accumulated interest, causing exponential growth over time.' },
  { q:'How often should interest compound?', a:'More frequent compounding (daily vs. annually) leads to slightly higher returns. The difference is significant over long periods but modest over shorter ones.' },
  { q:'What is the Rule of 72?', a:'Divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 8% annual return, your money doubles in approximately 9 years (72 ÷ 8).' },
]
const tips = [
  { icon:'⏰', title:'Start as Early as Possible', text:'Time is the most powerful factor in compound interest. Starting at 25 instead of 35 can more than double your retirement balance at 65.' },
  { icon:'🔄', title:'Reinvest All Returns', text:'Compound interest only works if you reinvest the interest earned. Withdrawing returns breaks the compounding chain.' },
  { icon:'📈', title:'Consistent Contributions Matter', text:'Regular monthly contributions, even small ones, dramatically accelerate compound growth compared to a one-time investment.' },
]
</script>

<template>
  <CalculatorLayout title="Compound Interest Calculator" description="See how your money grows over time with the power of compound interest and regular contributions.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Initial Investment</label><div class="relative"><input v-model="principal" type="number" min="0" placeholder="e.g. 10000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Annual Interest Rate</label><div class="relative"><input v-model="rate" type="number" step="0.1" min="0" placeholder="e.g. 7" class="input-field pr-8"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Time Period (years)</label><input v-model="years" type="number" min="1" max="100" placeholder="e.g. 20" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Compounding Frequency</label><select v-model="freq" class="input-field"><option v-for="f in freqOptions" :key="f.v" :value="f.v">{{ f.l }}</option></select></div>
          <div class="col-span-2"><label class="block text-sm font-semibold text-slate-600 mb-2">Monthly Contribution (optional)</label><div class="relative"><input v-model="monthly" type="number" min="0" placeholder="e.g. 200" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Final Balance</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.finalBalance }}</div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Invested</div><div class="font-extrabold text-slate-700">{{ result.totalContrib }}</div></div>
              <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center"><div class="text-xs text-blue-500 mb-1">Interest Earned</div><div class="font-extrabold text-blue-700">{{ result.interest }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">×{{ result.multiplier }}</div><div class="font-extrabold text-slate-700">{{ result.pctGain }}% gain</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your investment details to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>The Power of Compound Interest</h2><p class='mb-3'>Albert Einstein reportedly called compound interest the eighth wonder of the world. When interest earns interest on itself, growth becomes exponential rather than linear. A $10,000 investment at 7% annual return grows to over $38,000 in 20 years — without adding a single extra dollar.</p><p>Add regular monthly contributions and the growth becomes even more dramatic. This calculator shows exactly how your money can grow given your starting amount, expected return, time horizon, and monthly additions.</p>" formula="FV = P × (1 + r/n)^(n×t)  +  M × ((1 + r/12)^(12t) − 1) / (r/12)
Where: P = principal, r = annual rate, n = compounding periods/year, t = years, M = monthly contribution" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
