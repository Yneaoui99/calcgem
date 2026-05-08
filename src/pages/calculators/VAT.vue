<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const amount = ref(''), vatRate = ref('20'), mode = ref('add')
const fmt = (n) => '$' + n.toFixed(2)
const fmtPct = (n) => n.toFixed(1) + '%'

const commonRates = [
  { label: 'UK 20%', value: 20 },
  { label: 'EU 21%', value: 21 },
  { label: 'Canada 5%', value: 5 },
  { label: 'Australia 10%', value: 10 },
  { label: 'India 18%', value: 18 },
  { label: 'US 0%', value: 0 },
]

const result = computed(() => {
  const a = parseFloat(amount.value), r = parseFloat(vatRate.value) / 100
  if (!a) return null
  let net, vatAmount, gross
  if (mode.value === 'add') {
    net = a; vatAmount = a * r; gross = a + vatAmount
  } else {
    gross = a; net = a / (1 + r); vatAmount = gross - net
  }
  return { net: fmt(net), vatAmount: fmt(vatAmount), gross: fmt(gross), vatRate: fmtPct(parseFloat(vatRate.value)) }
})

const faqs = [
  { q: 'What is VAT?', a: 'Value Added Tax (VAT) is a consumption tax applied at each stage of production and sale. Unlike sales tax (charged only at the final sale), VAT is collected incrementally. The UK standard rate is 20%; EU countries typically range from 17–27%.' },
  { q: 'How do I remove VAT from a price?', a: 'To reverse out VAT from a gross (VAT-inclusive) price, divide by (1 + VAT rate). For 20% VAT: net price = gross ÷ 1.20. For example, £120 ÷ 1.20 = £100 net + £20 VAT.' },
  { q: 'Is VAT the same as sales tax?', a: 'No. Sales tax is added only at the point of final sale to the consumer, and the rate varies by US state. VAT is applied at each production stage and is standard across the EU and UK.' },
]
const tips = [
  { icon: '🌍', title: 'VAT Rates Vary by Country', text: 'Always check the local VAT rate. UK standard is 20%, but reduced (5%) and zero (0%) rates apply to some goods like food and children\'s clothing.' },
  { icon: '🧾', title: 'Always Request a VAT Invoice', text: 'If you\'re VAT-registered, you can reclaim VAT on business expenses — but only if you have a valid VAT invoice. Always request one from suppliers.' },
  { icon: '💡', title: 'Prices May Be Shown Ex-VAT', text: 'B2B prices are often shown excluding VAT. Always check whether a price is ex-VAT or VAT-inclusive before comparing offers or budgeting.' },
]
</script>

<template>
  <CalculatorLayout title="VAT Calculator" description="Add or remove VAT from any price at any rate. Instantly see net, VAT, and gross amounts.">
    <template #calculator>
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Calculation Mode</label>
          <div class="flex gap-2">
            <button @click="mode = 'add'" :class="['flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition', mode === 'add' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-400']">Add VAT</button>
            <button @click="mode = 'remove'" :class="['flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition', mode === 'remove' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-400']">Remove VAT</button>
          </div>
        </div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">{{ mode === 'add' ? 'Net Amount (ex-VAT)' : 'Gross Amount (inc-VAT)' }}</label><div class="relative"><input v-model="amount" type="number" min="0" step="0.01" placeholder="e.g. 100.00" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">VAT Rate: <strong class="text-blue-600">{{ vatRate }}%</strong></label>
          <div class="flex gap-2 flex-wrap mb-3">
            <button v-for="r in commonRates" :key="r.value" @click="vatRate = r.value" :class="['px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition', parseFloat(vatRate) === r.value ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-400']">{{ r.label }}</button>
          </div>
          <input v-model="vatRate" type="range" min="0" max="30" step="0.5" class="w-full accent-blue-500"/>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Net (ex-VAT)</div><div class="font-extrabold text-slate-700">{{ result.net }}</div></div>
              <div class="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center"><div class="text-xs text-orange-500 mb-1">VAT ({{ result.vatRate }})</div><div class="font-extrabold text-orange-600">{{ result.vatAmount }}</div></div>
              <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center"><div class="text-xs text-blue-500 mb-1">Gross (inc-VAT)</div><div class="font-extrabold text-blue-700">{{ result.gross }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter an amount to calculate VAT</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding VAT</h2><p class='mb-3'>Value Added Tax (VAT) is a consumption tax used in the UK, EU, Australia, Canada, and many other countries. It is typically included in the final consumer price but can also be quoted separately for business purchases.</p><p>This calculator works both ways: add VAT to a net price (e.g., you\'re pricing a product), or remove VAT from a gross price (e.g., you need to know the pre-tax amount for accounting).</p>" formula="Add VAT: Gross = Net × (1 + VAT rate)
Remove VAT: Net = Gross ÷ (1 + VAT rate)
VAT Amount = Gross − Net" :tips="tips" :faqs="faqs" disclaimer="VAT rates and rules vary by country and product category. Consult a tax professional or your local tax authority for compliance advice."/></template>
  </CalculatorLayout>
</template>
