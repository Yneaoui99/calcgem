<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const currentAge = ref(''), retireAge = ref('65'), currentSavings = ref('0'), monthlyContrib = ref(''), annualReturn = ref('7'), inflation = ref('2.5')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

const result = computed(() => {
  const ca = parseInt(currentAge.value), ra = parseInt(retireAge.value)
  const cs = parseFloat(currentSavings.value)||0, mc = parseFloat(monthlyContrib.value)||0
  const r = parseFloat(annualReturn.value)/100, inf = parseFloat(inflation.value)/100
  if (!ca || !ra || ra <= ca) return null
  const years = ra - ca, n = years * 12, monthlyR = r / 12
  const fvSavings = cs * Math.pow(1 + r, years)
  const fvContrib = mc > 0 ? mc * (Math.pow(1 + monthlyR, n) - 1) / monthlyR : 0
  const nominal = fvSavings + fvContrib
  const real = nominal / Math.pow(1 + inf, years)
  const rule4pct = nominal * 0.04 / 12
  const totalContrib = cs + mc * n
  return { nominal: fmt(nominal), real: fmt(real), rule4pct: fmt(rule4pct), totalContrib: fmt(totalContrib), years, interest: fmt(nominal - totalContrib) }
})

const faqs = [
  { q:'What is the 4% rule?', a:'The 4% rule suggests you can withdraw 4% of your retirement portfolio per year without running out of money over a 30-year retirement. It is a widely cited starting point, not a guarantee.' },
  { q:'What return rate should I use?', a:'The US stock market has averaged ~10% annually historically. After inflation (~2.5%), a real return of 7% is commonly used for long-term planning. For conservative estimates, use 5–6%.' },
  { q:'How much do I need to retire?', a:'A common rule of thumb is 25× your annual expenses (the inverse of the 4% rule). If you plan to spend $60,000/year, you need $1.5M saved.' },
]
const tips = [
  { icon:'⏰', title:'Start Now — Every Year Counts', text:'Delaying retirement savings by just 10 years can cut your final balance roughly in half due to the compounding effect.' },
  { icon:'💼', title:'Max Your Employer Match', text:'A 401(k) match is a 100% immediate return on your contribution. Always contribute at least enough to get the full employer match.' },
  { icon:'📊', title:'Increase Contributions Annually', text:'Increase your monthly contribution by 1% each year — especially after a pay raise. Small annual increases compound into major long-term differences.' },
]
</script>

<template>
  <CalculatorLayout title="Retirement Calculator" description="Project your retirement savings balance and estimated monthly income based on your current savings plan.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Current Age</label><input v-model="currentAge" type="number" min="15" max="80" placeholder="e.g. 30" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Retirement Age</label><input v-model="retireAge" type="number" min="40" max="90" placeholder="65" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Current Savings</label><div class="relative"><input v-model="currentSavings" type="number" min="0" placeholder="0" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Monthly Contribution</label><div class="relative"><input v-model="monthlyContrib" type="number" min="0" placeholder="e.g. 500" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Annual Return: <strong class="text-emerald-600">{{ annualReturn }}%</strong></label><input v-model="annualReturn" type="range" min="1" max="15" step="0.5" class="w-full accent-emerald-500 mt-3"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Inflation Rate: <strong class="text-orange-500">{{ inflation }}%</strong></label><input v-model="inflation" type="range" min="0" max="8" step="0.5" class="w-full accent-orange-400 mt-3"/></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div class="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center"><div class="text-xs text-emerald-600 font-medium mb-1">Projected Balance (nominal)</div><div class="text-2xl font-extrabold text-emerald-700">{{ result.nominal }}</div><div class="text-xs text-emerald-400 mt-1">in {{ result.years }} years</div></div>
              <div class="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center"><div class="text-xs text-blue-600 font-medium mb-1">Inflation-Adjusted Value</div><div class="text-2xl font-extrabold text-blue-700">{{ result.real }}</div><div class="text-xs text-blue-400 mt-1">in today's dollars</div></div>
            </div>
            <div class="p-5 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
              <div class="text-sm text-violet-600 font-medium mb-1">Estimated Monthly Income (4% rule)</div>
              <div class="text-3xl font-extrabold text-violet-700">{{ result.rule4pct }}</div>
              <div class="text-violet-400 text-xs mt-1">per month in retirement</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Contributed</div><div class="font-extrabold text-slate-700">{{ result.totalContrib }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Interest Earned</div><div class="font-extrabold text-slate-700">{{ result.interest }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your details to project retirement savings</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Planning for Retirement</h2><p class='mb-3'>Retirement planning is about ensuring you accumulate enough wealth to sustain your lifestyle without earned income. The earlier you start and the more consistently you contribute, the more compound interest does the heavy lifting.</p><p>This calculator projects your retirement balance, shows the inflation-adjusted real value of that balance, and estimates monthly income using the widely-cited 4% withdrawal rule.</p>" :tips="tips" :faqs="faqs" disclaimer="This calculator is for illustrative purposes only. Actual investment returns vary and are not guaranteed. Consult a certified financial planner for personalised retirement advice."/></template>
  </CalculatorLayout>
</template>
