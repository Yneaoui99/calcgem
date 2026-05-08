<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const invested = ref(''), finalValue = ref(''), years = ref('')
const fmt = (n) => '$' + Math.round(n).toLocaleString()
const fmtPct = (n) => n.toFixed(2) + '%'

const result = computed(() => {
  const i = parseFloat(invested.value), f = parseFloat(finalValue.value)
  const y = parseFloat(years.value)
  if (!i || !f || i <= 0) return null
  const gain = f - i
  const roi = (gain / i) * 100
  const annualized = y > 0 ? (Math.pow(f / i, 1 / y) - 1) * 100 : null
  return { gain: fmt(gain), roi: fmtPct(roi), annualized: annualized !== null ? fmtPct(annualized) : null, positive: gain >= 0 }
})

const faqs = [
  { q: 'What is a good ROI?', a: 'It depends on the investment type. The US stock market averages ~10% annually. Real estate typically returns 8–12%. A good ROI for a business investment is often considered 15%+.' },
  { q: 'What is the difference between ROI and annualized ROI?', a: 'ROI is the total percentage return over the full investment period. Annualized ROI (CAGR) converts that into an equivalent yearly rate, making it easier to compare investments of different durations.' },
  { q: 'Does ROI account for inflation?', a: 'Standard ROI does not. To find real ROI, subtract the inflation rate (e.g., ~2.5%) from your annualized ROI. A 7% annualized return in a 2.5% inflation environment equals ~4.5% real return.' },
]
const tips = [
  { icon: '📊', title: 'Compare on Annualized Basis', text: 'Always compare investments using annualized ROI, not total ROI. A 100% return over 10 years is far less impressive than 100% over 2 years.' },
  { icon: '💸', title: 'Include All Costs', text: 'ROI is only meaningful when you include every cost — purchase fees, maintenance, taxes, and selling costs. Hidden costs destroy real returns.' },
  { icon: '🔄', title: 'Reinvest Returns', text: 'Reinvesting dividends and returns allows compound growth. The difference between reinvesting and not can double your final balance over 20 years.' },
]
</script>

<template>
  <CalculatorLayout title="ROI Calculator" description="Calculate your return on investment as a percentage and annualized rate to compare the profitability of any investment.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Amount Invested</label><div class="relative"><input v-model="invested" type="number" min="0" placeholder="e.g. 10000" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Final Value</label><div class="relative"><input v-model="finalValue" type="number" min="0" placeholder="e.g. 14500" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div class="col-span-2"><label class="block text-sm font-semibold text-slate-600 mb-2">Investment Duration (years, optional)</label><input v-model="years" type="number" min="0" step="0.5" placeholder="e.g. 3" class="input-field"/></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div :class="['p-5 rounded-2xl border-2 text-center', result.positive ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200']">
                <div :class="['text-xs font-medium mb-1', result.positive ? 'text-emerald-600' : 'text-red-500']">Total ROI</div>
                <div :class="['text-3xl font-extrabold', result.positive ? 'text-emerald-700' : 'text-red-600']">{{ result.roi }}</div>
              </div>
              <div class="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center">
                <div class="text-xs text-slate-500 font-medium mb-1">Net Gain / Loss</div>
                <div :class="['text-2xl font-extrabold', result.positive ? 'text-slate-700' : 'text-red-600']">{{ result.gain }}</div>
              </div>
            </div>
            <div v-if="result.annualized" class="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
              <div class="text-sm text-blue-600 font-medium mb-1">Annualized ROI (CAGR)</div>
              <div class="text-3xl font-extrabold text-blue-700">{{ result.annualized }}</div>
              <div class="text-xs text-blue-400 mt-1">equivalent yearly return</div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your investment figures to calculate ROI</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>What is Return on Investment?</h2><p class='mb-3'>Return on Investment (ROI) is the most widely used metric for evaluating the profitability of an investment. It expresses the net gain (or loss) as a percentage of the original amount invested, making it easy to compare opportunities regardless of scale.</p><p>For investments held over multiple years, the annualized ROI (also called CAGR — Compound Annual Growth Rate) gives a more accurate picture by expressing the equivalent yearly return.</p>" formula="ROI = (Final Value − Amount Invested) / Amount Invested × 100
Annualized ROI = (Final Value / Amount Invested)^(1 / Years) − 1" :tips="tips" :faqs="faqs" disclaimer="ROI does not account for taxes, transaction costs, inflation, or risk. Use it as a starting point, not a definitive measure of investment quality."/></template>
  </CalculatorLayout>
</template>
