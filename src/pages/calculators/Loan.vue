<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const amount = ref(''), rate = ref(''), termVal = ref(''), termUnit = ref('months')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

const result = computed(() => {
  const p = parseFloat(amount.value), r = parseFloat(rate.value)
  let n = parseInt(termVal.value)
  if (!p || !r || !n) return null
  if (termUnit.value === 'years') n *= 12
  const monthly = r / 100 / 12
  const payment = p * (monthly * Math.pow(1+monthly,n)) / (Math.pow(1+monthly,n)-1)
  const total = payment * n
  const interest = total - p
  return { payment: fmt(payment), total: fmt(total), interest: fmt(interest), months: n, pctInterest: ((interest/p)*100).toFixed(1) }
})

const faqs = [
  { q:'What is an APR vs. interest rate?', a:'The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus any fees (origination fees, etc.), giving a truer cost of the loan.' },
  { q:'How can I reduce the total interest I pay?', a:'Make extra payments toward the principal, choose a shorter loan term, or refinance to a lower rate. Even small extra monthly payments significantly reduce total interest.' },
  { q:'What is a good personal loan rate?', a:'Rates vary by credit score. Borrowers with excellent credit (720+) typically qualify for 6–10% APR. Lower credit scores may see rates of 15–30% or higher.' },
]
const tips = [
  { icon:'📋', title:'Compare APR, Not Just Rate', text:'Always compare loans using APR, which includes fees, rather than the nominal interest rate alone.' },
  { icon:'⚡', title:'Pay Extra When You Can', text:'Any amount above the minimum payment goes directly to principal, reducing interest and shortening the loan term.' },
  { icon:'🔄', title:'Avoid Rolling Over Debt', text:'Taking a new loan to pay off an old one (debt consolidation) only helps if the new rate is meaningfully lower.' },
]
</script>

<template>
  <CalculatorLayout title="Loan Calculator" description="Calculate your monthly payment and total interest cost for any personal or auto loan.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Loan Amount (USD)</label><div class="relative"><input v-model="amount" type="number" min="0" placeholder="e.g. 15000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Annual Interest Rate (%)</label><div class="relative"><input v-model="rate" type="number" step="0.01" min="0" placeholder="e.g. 8.5" class="input-field pr-8"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span></div></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Loan Term</label>
          <div class="flex gap-2">
            <input v-model="termVal" type="number" min="1" placeholder="e.g. 36" class="input-field flex-1"/>
            <select v-model="termUnit" class="input-field w-32"><option value="months">Months</option><option value="years">Years</option></select>
          </div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Monthly Payment</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.payment }}</div>
              <div class="text-emerald-400 text-sm mt-1">for {{ result.months }} months</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Cost</div><div class="font-extrabold text-slate-700">{{ result.total }}</div></div>
              <div class="p-4 rounded-2xl bg-red-50 border border-red-200 text-center"><div class="text-xs text-red-400 mb-1">Total Interest</div><div class="font-extrabold text-red-600">{{ result.interest }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your loan details to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Loan Payments Are Calculated</h2><p class='mb-3'>Loans are typically repaid through equal monthly instalments (EMIs). Each payment covers interest on the current outstanding balance plus a portion of the principal. Early payments are mostly interest; later payments are mostly principal — this is called amortisation.</p><p>This calculator works for personal loans, auto loans, student loans, and any other fixed-rate instalment loan.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
