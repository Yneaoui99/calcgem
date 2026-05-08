<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

// Static rates relative to USD (approximate mid-market rates)
const rates = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53,
  CHF: 0.89, CNY: 7.24, INR: 83.1, MXN: 17.2, BRL: 4.97, KRW: 1325,
  SGD: 1.34, HKD: 7.82, NOK: 10.6, SEK: 10.4, DKK: 6.89, NZD: 1.63,
  ZAR: 18.6, AED: 3.67, SAR: 3.75, THB: 35.1, MYR: 4.67, IDR: 15400,
  PHP: 55.7, PLN: 4.02, CZK: 22.8, HUF: 355, TRY: 30.5, ILS: 3.68,
}

const currencies = Object.keys(rates).map(code => ({ code, label: code }))

const amount = ref('1'), fromCur = ref('USD'), toCur = ref('EUR')

const result = computed(() => {
  const a = parseFloat(amount.value)
  if (!a || !rates[fromCur.value] || !rates[toCur.value]) return null
  const converted = (a / rates[fromCur.value]) * rates[toCur.value]
  const rate = rates[toCur.value] / rates[fromCur.value]
  return {
    converted: converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
    rate: rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 }),
    inverse: (1 / rate).toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 }),
  }
})

const swap = () => { const t = fromCur.value; fromCur.value = toCur.value; toCur.value = t }

const popular = [
  { from: 'USD', to: 'EUR' }, { from: 'GBP', to: 'USD' }, { from: 'USD', to: 'JPY' },
  { from: 'EUR', to: 'GBP' }, { from: 'USD', to: 'CAD' },
]

const faqs = [
  { q: 'Why are these rates different from my bank?', a: 'Banks and exchange services charge a spread (markup) above the mid-market rate shown here. That markup — typically 1–5% — is how they profit from currency exchange. This calculator shows the mid-market rate for reference.' },
  { q: 'When is the best time to exchange currency?', a: 'Currency rates fluctuate constantly during weekdays when forex markets are open. There is no reliable way to time the market. For travel, exchange before you go and avoid airport kiosks, which charge the highest fees.' },
  { q: 'What is the difference between mid-market and retail rate?', a: 'The mid-market rate is the midpoint between buy and sell prices — it\'s what you see on Google or XE.com. Retail rates (at banks, exchanges) add a fee on top of this. Always compare the effective rate, not just the headline number.' },
]
const tips = [
  { icon: '💳', title: 'Use a No-Fee Travel Card', text: 'Cards like Wise, Revolut, or Charles Schwab offer mid-market or near-mid-market rates with no foreign transaction fees — far better than airport kiosks or traditional banks.' },
  { icon: '🏧', title: 'Decline Dynamic Currency Conversion', text: 'When paying abroad and asked to pay in your home currency, always choose the local currency. Dynamic currency conversion adds a hidden 3–7% fee.' },
  { icon: '📅', title: 'Exchange in Advance for Travel', text: 'Order foreign currency a few days before your trip for the best rates. Last-minute airport exchanges cost significantly more.' },
]
</script>

<template>
  <CalculatorLayout title="Currency Converter" description="Convert between 30 major world currencies using indicative mid-market rates.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex gap-3 flex-wrap">
          <button v-for="p in popular" :key="p.from+p.to" @click="fromCur = p.from; toCur = p.to" :class="['px-3 py-1.5 text-xs rounded-lg font-semibold border-2 transition', fromCur === p.from && toCur === p.to ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-400']">{{ p.from }}/{{ p.to }}</button>
        </div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Amount</label><input v-model="amount" type="number" min="0" step="any" placeholder="e.g. 100" class="input-field"/></div>
        <div class="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">From</label>
            <select v-model="fromCur" class="input-field">
              <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
            </select>
          </div>
          <button @click="swap" class="mb-0.5 w-10 h-10 rounded-xl border-2 border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-lg flex items-center justify-center">⇄</button>
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">To</label>
            <select v-model="toCur" class="input-field">
              <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }}</option>
            </select>
          </div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
              <div class="text-sm text-blue-600 font-medium mb-1">Converted Amount</div>
              <div class="text-4xl font-extrabold text-blue-700">{{ result.converted }} <span class="text-2xl text-blue-500">{{ toCur }}</span></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">1 {{ fromCur }} =</div><div class="font-extrabold text-slate-700 text-sm">{{ result.rate }} {{ toCur }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">1 {{ toCur }} =</div><div class="font-extrabold text-slate-700 text-sm">{{ result.inverse }} {{ fromCur }}</div></div>
            </div>
            <p class="text-xs text-slate-400 text-center">Indicative mid-market rates · Not for financial transactions</p>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter an amount to convert</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Currency Conversion Works</h2><p class='mb-3'>Currency exchange rates represent how much one currency is worth in terms of another. Rates fluctuate constantly based on economic data, interest rates, geopolitical events, and market sentiment — 24 hours a day, 5 days a week on the global forex market.</p><p>This calculator uses indicative mid-market rates for 30 major currencies and is intended as a reference tool for estimates and planning, not for live financial transactions.</p>" :tips="tips" :faqs="faqs" disclaimer="Rates shown are approximate mid-market reference rates and may not reflect real-time or transactional rates from banks, brokers, or exchanges. Always verify with your provider before transacting."/></template>
  </CalculatorLayout>
</template>
