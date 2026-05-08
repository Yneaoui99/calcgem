<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric')
const weight = ref('')
const activity = ref('moderate')
const climate = ref('temperate')

const activityAdd = { sedentary:0, light:0.3, moderate:0.5, active:0.7, veryactive:1.0 }
const climateAdd   = { cold:0, temperate:0, hot:0.3, veryhot:0.5 }

const litres = computed(() => {
  let w = parseFloat(weight.value)
  if (!w) return null
  if (unit.value === 'imperial') w *= 0.453592
  const base = w * 0.033
  return +(base + activityAdd[activity.value] + climateAdd[climate.value]).toFixed(1)
})
const oz = computed(() => litres.value ? Math.round(litres.value * 33.814) : null)
const cups = computed(() => litres.value ? Math.round(litres.value * 4.227) : null)
const glasses = computed(() => litres.value ? Math.round(litres.value / 0.25) : null)

const faqs = [
  { q:'Does the "8 glasses a day" rule apply to everyone?', a:'No. The 8×8 rule is a simplification. Actual needs vary based on body size, activity level, climate, and diet. This calculator provides a more personalised estimate.' },
  { q:'Does water from food count?', a:'Yes. About 20% of daily water intake typically comes from food — especially fruits, vegetables, and soups. Your actual drinking target may be slightly lower.' },
  { q:'What are signs of dehydration?', a:'Dark yellow urine, thirst, headache, fatigue, and difficulty concentrating are early signs. Severe dehydration causes dizziness and rapid heartbeat.' },
]
const tips = [
  { icon:'🌅', title:'Start Your Day with Water', text:'Drink a large glass of water immediately upon waking to rehydrate after 7–8 hours without fluids.' },
  { icon:'🍋', title:'Add Flavour If You Struggle', text:'Slices of lemon, cucumber, or mint make plain water more appealing without adding meaningful calories.' },
  { icon:'⏰', title:'Drink Before You Are Thirsty', text:'Thirst is already a sign of mild dehydration. Drink regularly throughout the day rather than in large amounts infrequently.' },
]
</script>

<template>
  <CalculatorLayout title="Daily Water Intake Calculator" description="Find your personalised daily water needs based on your weight, activity level, and climate.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex justify-center">
          <div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700">
            <button :class="['unit-btn', unit==='metric'?'unit-btn-active':'unit-btn-inactive']" @click="unit='metric'">Metric</button>
            <button :class="['unit-btn', unit==='imperial'?'unit-btn-active':'unit-btn-inactive']" @click="unit='imperial'">Imperial</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Weight</label>
          <div class="relative"><input v-model="weight" type="number" min="20" max="300" :placeholder="unit==='metric'?'e.g. 70':'e.g. 154'" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{{ unit==='metric'?'kg':'lbs' }}</span></div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Activity Level</label>
          <select v-model="activity" class="input-field">
            <option value="sedentary">Sedentary (desk job, little movement)</option>
            <option value="light">Light (some walking)</option>
            <option value="moderate">Moderate (regular exercise)</option>
            <option value="active">Active (daily intense exercise)</option>
            <option value="veryactive">Very Active (athlete / physical job)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Climate</label>
          <select v-model="climate" class="input-field">
            <option value="cold">Cold climate</option>
            <option value="temperate">Temperate / indoor</option>
            <option value="hot">Hot climate</option>
            <option value="veryhot">Very hot / humid</option>
          </select>
        </div>
        <transition name="result">
          <div v-if="litres" class="grid grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center col-span-2">
              <div class="text-sm text-blue-600 font-medium mb-1">Daily Water Target</div>
              <div class="text-5xl font-extrabold text-blue-700">{{ litres }} L</div>
              <div class="text-blue-400 text-sm mt-1">{{ oz }} oz</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-400 mb-1">Standard Glasses</div>
              <div class="text-2xl font-extrabold text-slate-700">{{ glasses }}</div>
              <div class="text-xs text-slate-400">× 250 ml each</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-400 mb-1">US Cups</div>
              <div class="text-2xl font-extrabold text-slate-700">{{ cups }}</div>
              <div class="text-xs text-slate-400">× 237 ml each</div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your weight to see results</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Much Water Do You Really Need?</h2><p class='mb-3'>Water makes up about 60% of the human body and is essential for virtually every physiological process — from regulating body temperature and transporting nutrients to lubricating joints and flushing toxins. Yet many people are chronically mildly dehydrated without knowing it.</p><p>The right amount varies significantly with body size, physical activity, and environment. This calculator gives you a personalised estimate based on your specific circumstances.</p>"
        :tips="tips"
        :faqs="faqs"
      />
    </template>
  </CalculatorLayout>
</template>
