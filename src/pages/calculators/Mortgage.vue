<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const price = ref(''), downPct = ref('20'), rate = ref(''), term = ref('30')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

const result = computed(() => {
  const p = parseFloat(price.value), r = parseFloat(rate.value), t = parseInt(term.value)
  if (!p || !r || !t) return null
  const down = p * (parseFloat(downPct.value)||0) / 100
  const loan = p - down
  const monthly = r / 100 / 12
  const n = t * 12
  const payment = loan * (monthly * Math.pow(1+monthly,n)) / (Math.pow(1+monthly,n)-1)
  const total = payment * n
  const interest = total - loan
  return { payment: fmt(payment), total: fmt(total), interest: fmt(interest), loan: fmt(loan), down: fmt(down), ltv: ((loan/p)*100).toFixed(1) }
})

const faqs = [
  { q:'What is included in a mortgage payment?', a:'This calculator shows principal + interest only (P&I). Your actual monthly payment will also include property taxes, homeowner\'s insurance, and possibly PMI if your down payment is less than 20%.' },
  { q:'What is a good mortgage rate?', a:'Rates change daily and vary by loan type, credit score, and location. Compare offers from multiple lenders, and check sites like Bankrate for current rate averages.' },
  { q:'What is PMI?', a:'Private Mortgage Insurance is required on most loans with less than 20% down. It typically adds 0.5–1.5% of the loan amount per year until you reach 20% equity.' },
]
const tips = [
  { icon:'💰', title:'20% Down Avoids PMI', text:'A 20% down payment eliminates the need for private mortgage insurance, saving hundreds of dollars per month.' },
  { icon:'📈', title:'Extra Payments Save Thousands', text:'Making one extra mortgage payment per year can shave years off your loan and save tens of thousands in interest.' },
  { icon:'🔄', title:'Shop Multiple Lenders', text:'Even a 0.25% difference in rate can save over $10,000 on a 30-year loan. Always compare at least 3 lenders.' },
]
</script>

<template>
  <CalculatorLayout title="Mortgage Calculator" description="Calculate your monthly mortgage payment, total interest, and loan summary for any home purchase.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Home Price (USD)</label><div class="relative"><input v-model="price" type="number" min="0" placeholder="e.g. 400000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Down Payment: <strong class="text-emerald-600">{{ downPct }}%</strong></label><input v-model="downPct" type="range" min="0" max="50" class="w-full accent-emerald-500 mt-3"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Annual Interest Rate (%)</label><div class="relative"><input v-model="rate" type="number" step="0.01" min="0" placeholder="e.g. 6.5" class="input-field pr-8"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Loan Term (years)</label><select v-model="term" class="input-field"><option value="10">10 years</option><option value="15">15 years</option><option value="20">20 years</option><option value="25">25 years</option><option value="30">30 years</option></select></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Monthly Payment (P&I)</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.payment }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Loan Amount</div><div class="font-extrabold text-slate-700">{{ result.loan }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Down Payment</div><div class="font-extrabold text-slate-700">{{ result.down }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Payments</div><div class="font-extrabold text-slate-700">{{ result.total }}</div></div>
              <div class="p-4 rounded-2xl bg-red-50 border border-red-200 text-center"><div class="text-xs text-red-400 mb-1">Total Interest</div><div class="font-extrabold text-red-600">{{ result.interest }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Fill in your mortgage details to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Your Mortgage</h2><p class='mb-3'>A mortgage is a loan used to purchase real estate, repaid in equal monthly instalments over a fixed term. Each payment covers interest on the outstanding balance and reduces the principal.</p><p>This calculator shows your monthly principal + interest payment, total payments over the life of the loan, total interest paid, and loan-to-value ratio (LTV).</p>" :tips="tips" :faqs="faqs" disclaimer="This calculator estimates P&I only. Actual costs include property taxes, insurance, HOA fees, and possibly PMI. Rates are for illustration only."/></template>
  </CalculatorLayout>
</template>
