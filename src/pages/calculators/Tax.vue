<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const income = ref(''), status = ref('single'), country = ref('us')
const fmt = (n) => '$' + Math.round(n).toLocaleString()

// 2024 US Federal Tax Brackets
const brackets = {
  single:  [[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]],
  married: [[23200,0.10],[94300,0.12],[201050,0.22],[383900,0.24],[487450,0.32],[731200,0.35],[Infinity,0.37]],
  hoh:     [[16550,0.10],[63100,0.12],[100500,0.22],[191950,0.24],[243700,0.32],[609350,0.35],[Infinity,0.37]],
}
const stdDed = { single:14600, married:29200, hoh:21900 }

const result = computed(() => {
  const gross = parseFloat(income.value)
  if (!gross || gross < 0) return null
  const ded = stdDed[status.value] || 14600
  const taxable = Math.max(0, gross - ded)
  const b = brackets[status.value] || brackets.single
  let tax = 0, prev = 0
  const breakdown = []
  for (const [limit, rate] of b) {
    const top = Math.min(taxable, limit)
    if (top <= prev) break
    const amount = (top - prev) * rate
    breakdown.push({ rate: (rate*100)+'%', income: fmt(top - prev), tax: fmt(amount) })
    tax += amount
    prev = top
    if (top >= taxable) break
  }
  const effective = gross > 0 ? (tax / gross * 100).toFixed(1) : 0
  const marginal = b.find(([lim]) => taxable <= lim)?.[1] || 0.37
  return { gross: fmt(gross), taxable: fmt(taxable), tax: fmt(tax), takeHome: fmt(gross - tax), effective, marginal: (marginal*100)+'%', breakdown }
})

const faqs = [
  { q:'What is the standard deduction?', a:'The standard deduction reduces your taxable income. For 2024: $14,600 (single), $29,200 (married filing jointly), $21,900 (head of household).' },
  { q:'What is effective vs. marginal tax rate?', a:'Your marginal rate is the rate on your last dollar earned. Your effective rate is total tax divided by gross income — always lower than marginal because lower income is taxed at lower rates.' },
  { q:'Does this include state taxes?', a:'No. This calculator covers US federal income tax only. State income tax rates vary from 0% to over 13% depending on your state.' },
]
const tips = [
  { icon:'💰', title:'Maximise Pre-Tax Contributions', text:'Contributing to a 401(k) or Traditional IRA reduces your taxable income, lowering your tax bill while building retirement savings.' },
  { icon:'🏠', title:'Consider Itemising', text:'If your deductible expenses (mortgage interest, state taxes, charitable donations) exceed the standard deduction, itemising saves more money.' },
  { icon:'🧾', title:'Estimated Tax Payments', text:'Self-employed individuals must pay quarterly estimated taxes to avoid underpayment penalties at year-end.' },
]
</script>

<template>
  <CalculatorLayout title="Income Tax Calculator" description="Estimate your US federal income tax, effective tax rate, and take-home pay for 2024.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">Annual Income (USD)</label>
            <div class="relative"><input v-model="income" type="number" min="0" placeholder="e.g. 75000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">Filing Status</label>
            <select v-model="status" class="input-field">
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center"><div class="text-xs text-emerald-600 font-medium mb-1">Take-Home Pay</div><div class="text-2xl font-extrabold text-emerald-700">{{ result.takeHome }}</div></div>
              <div class="p-5 rounded-2xl bg-red-50 border-2 border-red-200 text-center"><div class="text-xs text-red-500 font-medium mb-1">Total Federal Tax</div><div class="text-2xl font-extrabold text-red-600">{{ result.tax }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Effective Rate</div><div class="text-xl font-extrabold text-slate-700">{{ result.effective }}%</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Marginal Rate</div><div class="text-xl font-extrabold text-slate-700">{{ result.marginal }}</div></div>
            </div>
            <!-- Bracket breakdown -->
            <div class="rounded-2xl border border-slate-200 overflow-hidden">
              <div class="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 uppercase">Tax Bracket Breakdown</div>
              <table class="w-full text-sm">
                <thead class="border-b border-slate-200"><tr><th class="p-3 text-left text-slate-600">Rate</th><th class="p-3 text-right text-slate-600">Taxable Income</th><th class="p-3 text-right text-slate-600">Tax</th></tr></thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="b in result.breakdown" :key="b.rate">
                    <td class="p-3 font-bold text-blue-600">{{ b.rate }}</td>
                    <td class="p-3 text-right">{{ b.income }}</td>
                    <td class="p-3 text-right font-semibold">{{ b.tax }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your income to calculate taxes</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How US Federal Income Tax Works</h2><p class='mb-3'>The US uses a progressive marginal tax system. Your income is taxed in brackets — the first portion at 10%, the next at 12%, and so on. You only pay the higher rate on the income within that bracket, not on all your income.</p><p>This calculator applies the 2024 federal tax brackets and the standard deduction. It does not include FICA taxes (Social Security 6.2% + Medicare 1.45%), state income tax, or investment income rules.</p>" :tips="tips" :faqs="faqs" disclaimer="This calculator is for estimation only and uses 2024 US federal tax brackets with the standard deduction. Consult a tax professional for accurate tax planning."/></template>
  </CalculatorLayout>
</template>
