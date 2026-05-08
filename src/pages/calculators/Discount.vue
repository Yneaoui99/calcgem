<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const original = ref(''), discountType = ref('percent'), discountPct = ref(''), discountFlat = ref('')
const fmt = (n) => '$' + n.toFixed(2)
const fmtPct = (n) => n.toFixed(1) + '%'

const result = computed(() => {
  const p = parseFloat(original.value)
  if (!p) return null
  let savings, salePrice, pctOff
  if (discountType.value === 'percent') {
    const d = parseFloat(discountPct.value)
    if (!d) return null
    savings = p * d / 100
    salePrice = p - savings
    pctOff = d
  } else {
    const d = parseFloat(discountFlat.value)
    if (!d) return null
    savings = d
    salePrice = Math.max(0, p - d)
    pctOff = (savings / p) * 100
  }
  return { savings: fmt(savings), salePrice: fmt(salePrice), pctOff: fmtPct(pctOff) }
})

const faqs = [
  { q: 'How do I calculate a percentage discount?', a: 'Multiply the original price by the discount percentage and divide by 100. That gives the discount amount. Subtract it from the original price to get the sale price. Example: 30% off $80 = 0.30 × 80 = $24 savings → $56 sale price.' },
  { q: 'What is a good discount percentage?', a: '10–15% is a modest discount often used to reward loyal customers. 25–30% is considered a significant sale. 50%+ is used for clearance or major events like Black Friday.' },
  { q: 'How do stores profit if they discount heavily?', a: 'Retailers use discounts to clear inventory, attract new customers, or increase volume. They factor in the cost of goods (COGS) and ensure the sale price still exceeds that cost, even if margins are thin.' },
]
const tips = [
  { icon: '🔍', title: 'Check the Original Price', text: 'Some retailers inflate the "original" price before a sale to make the discount look bigger. Research the product\'s typical price before buying.' },
  { icon: '🧾', title: 'Stack Coupons Wisely', text: 'Many stores allow a coupon code on top of a sale price. Apply the higher percentage discount first, then the flat coupon, for the maximum saving.' },
  { icon: '📅', title: 'Wait for Seasonal Sales', text: 'The best discounts typically happen in January (post-holiday), July (mid-year clearance), and November (Black Friday/Cyber Monday). Patience pays off.' },
]
</script>

<template>
  <CalculatorLayout title="Discount Calculator" description="Find the sale price and savings for any item after a percentage or flat-amount discount.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Original Price</label><div class="relative"><input v-model="original" type="number" min="0" step="0.01" placeholder="e.g. 120.00" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Discount Type</label>
          <div class="flex gap-2">
            <button @click="discountType = 'percent'" :class="['flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition', discountType === 'percent' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400']">Percentage (%)</button>
            <button @click="discountType = 'flat'" :class="['flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition', discountType === 'flat' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400']">Flat Amount ($)</button>
          </div>
        </div>
        <div v-if="discountType === 'percent'">
          <label class="block text-sm font-semibold text-slate-600 mb-2">Discount: <strong class="text-emerald-600">{{ discountPct || 0 }}%</strong></label>
          <input v-model="discountPct" type="range" min="0" max="100" step="1" class="w-full accent-emerald-500 mb-3"/>
          <div class="flex gap-2 flex-wrap">
            <button v-for="pct in [10, 15, 20, 25, 30, 50, 70]" :key="pct" @click="discountPct = pct" :class="['px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition', parseInt(discountPct) === pct ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400']">{{ pct }}%</button>
          </div>
        </div>
        <div v-else><label class="block text-sm font-semibold text-slate-600 mb-2">Discount Amount</label><div class="relative"><input v-model="discountFlat" type="number" min="0" step="0.01" placeholder="e.g. 25.00" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Sale Price</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.salePrice }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center"><div class="text-xs text-blue-500 mb-1">You Save</div><div class="font-extrabold text-blue-700">{{ result.savings }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Discount</div><div class="font-extrabold text-slate-700">{{ result.pctOff }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter a price and discount to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Discounts Work</h2><p class='mb-3'>A discount reduces the original price of an item by either a fixed percentage or a flat dollar amount. Retailers use discounts to increase sales volume, clear inventory, and attract price-sensitive customers.</p><p>This calculator handles both types: percentage discounts (e.g. '30% off') and flat discounts (e.g. '$20 off'). It shows the exact sale price and total savings in both dollars and as a percentage.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
