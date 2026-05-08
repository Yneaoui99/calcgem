<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const bill = ref(''), tipPct = ref('18'), people = ref('1')
const fmt = (n) => '$' + n.toFixed(2)

const result = computed(() => {
  const b = parseFloat(bill.value), p = parseInt(people.value) || 1
  const t = parseFloat(tipPct.value)
  if (!b) return null
  const tipAmount = b * t / 100
  const total = b + tipAmount
  const perPerson = total / p
  const tipPerPerson = tipAmount / p
  return { tipAmount: fmt(tipAmount), total: fmt(total), perPerson: fmt(perPerson), tipPerPerson: fmt(tipPerPerson), people: p }
})

const faqs = [
  { q: 'How much should I tip at a restaurant?', a: '15% is considered the minimum for acceptable service, 18–20% is standard for good service, and 25%+ is for exceptional service. In the US, tipping is culturally expected in restaurants, bars, and personal services.' },
  { q: 'Do I tip on tax?', a: 'You can tip on either the pre-tax or total bill — it\'s personal preference. Most people tip on the pre-tax total. This calculator uses the bill amount you enter, so just enter your pre-tax total if you prefer.' },
  { q: 'When is tipping not expected?', a: 'Tipping is generally not expected at fast food counters, self-serve buffets, or when purchasing retail goods. In some countries (Japan, Australia), tipping is not customary at all.' },
]
const tips = [
  { icon: '🧮', title: 'Quick Mental Tip Trick', text: 'For 20% tip: move the decimal (10% of $42 = $4.20), then double it ($8.40). Much faster than calculating 20% directly.' },
  { icon: '👥', title: 'Split Unevenly by Choice', text: 'If splitting a bill unequally, agree on percentages before dividing. Round each person\'s share up slightly to avoid the bill coming up short.' },
  { icon: '💳', title: 'Always Tip in Cash When Possible', text: 'In many restaurants, tips left on a card go through payroll and may be taxed or pooled differently. Cash tips often go directly to your server.' },
]
</script>

<template>
  <CalculatorLayout title="Tip Calculator" description="Calculate the tip amount for any bill and split it evenly among any number of people.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2"><label class="block text-sm font-semibold text-slate-600 mb-2">Bill Amount</label><div class="relative"><input v-model="bill" type="number" min="0" step="0.01" placeholder="e.g. 65.00" class="input-field pl-8"/><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Tip: <strong class="text-emerald-600">{{ tipPct }}%</strong></label><input v-model="tipPct" type="range" min="0" max="30" step="1" class="w-full accent-emerald-500 mt-3"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Split Among</label><div class="flex items-center gap-2"><button @click="people = Math.max(1, parseInt(people) - 1)" class="w-10 h-10 rounded-xl border-2 border-slate-200 font-bold text-lg hover:bg-slate-50">−</button><input v-model="people" type="number" min="1" class="input-field text-center" style="width:80px"/><button @click="people = parseInt(people) + 1" class="w-10 h-10 rounded-xl border-2 border-slate-200 font-bold text-lg hover:bg-slate-50">+</button><span class="text-slate-500 text-sm ml-1">{{ parseInt(people) === 1 ? 'person' : 'people' }}</span></div></div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="pct in [10, 15, 18, 20, 25]" :key="pct" @click="tipPct = pct" :class="['px-4 py-2 rounded-xl text-sm font-semibold border-2 transition', parseInt(tipPct) === pct ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400']">{{ pct }}%</button>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center">
              <div class="text-sm text-emerald-600 font-medium mb-1">Tip Amount</div>
              <div class="text-4xl font-extrabold text-emerald-700">{{ result.tipAmount }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Bill</div><div class="font-extrabold text-slate-700">{{ result.total }}</div></div>
              <div v-if="result.people > 1" class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center"><div class="text-xs text-blue-500 mb-1">Per Person (incl. tip)</div><div class="font-extrabold text-blue-700">{{ result.perPerson }}</div></div>
              <div v-if="result.people > 1" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Tip Per Person</div><div class="font-extrabold text-slate-700">{{ result.tipPerPerson }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter a bill amount to calculate the tip</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How to Calculate a Tip</h2><p class='mb-3'>Tipping is a social custom in many countries that compensates service workers beyond their base wage. In the United States, a 15–20% tip on restaurant bills is standard, though norms vary by service type and country.</p><p>This calculator lets you pick a tip percentage, see the exact dollar amount, and split the total — including tip — among any number of people in a group.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
