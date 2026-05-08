<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const age = ref(''), restingHR = ref('60')

const maxHR = computed(() => age.value ? 220 - parseInt(age.value) : null)

const zones = computed(() => {
  if (!maxHR.value) return null
  const rhr = parseInt(restingHR.value) || 60
  const hrr = maxHR.value - rhr
  const zone = (lo, hi) => ({ lo: Math.round(rhr + hrr * lo), hi: Math.round(rhr + hrr * hi) })
  return [
    { name:'Zone 1 — Warm Up',     color:'bg-blue-100 border-blue-300 text-blue-700',   ...zone(0.5,  0.6),  desc:'Light activity; improves overall health and recovery.' },
    { name:'Zone 2 — Fat Burn',    color:'bg-green-100 border-green-300 text-green-700', ...zone(0.6,  0.7),  desc:'Aerobic base; best zone for burning fat as fuel.' },
    { name:'Zone 3 — Aerobic',     color:'bg-yellow-100 border-yellow-300 text-yellow-700',...zone(0.7, 0.8), desc:'Improves cardiovascular fitness and endurance.' },
    { name:'Zone 4 — Threshold',   color:'bg-orange-100 border-orange-300 text-orange-700',...zone(0.8,0.9),  desc:'Increases speed and performance; challenging intensity.' },
    { name:'Zone 5 — Max Effort',  color:'bg-red-100 border-red-300 text-red-700',       ...zone(0.9,  1.0),  desc:'Maximum effort; only sustainable for short bursts.' },
  ]
})

const faqs = [
  { q:'What is the Karvonen formula?', a:'The Karvonen formula calculates target heart rate zones using the Heart Rate Reserve (HRR = Max HR − Resting HR), making it more personalised than using maximum heart rate alone.' },
  { q:'How do I measure my resting heart rate?', a:'Measure your resting heart rate first thing in the morning before getting out of bed. Count your pulse for 60 seconds, or for 15 seconds and multiply by 4.' },
  { q:'Which zone is best for fat loss?', a:'Zone 2 (60–70% of HRR) uses the highest proportion of fat as fuel, making it excellent for fat loss during longer, steady-state cardio sessions.' },
]
const tips = [
  { icon:'⌚', title:'Use a Heart Rate Monitor', text:'A chest strap or wrist-based heart rate monitor lets you train in the right zone rather than guessing by perceived effort.' },
  { icon:'🏃', title:'Build Your Aerobic Base First', text:'Spending 80% of training time in Zones 1–2 builds the cardiovascular foundation that makes higher-intensity training more effective.' },
  { icon:'😌', title:'Zone 1 Is Underrated', text:'Low-intensity Zone 1 sessions accelerate recovery between hard workouts and can be done daily without taxing your system.' },
]
</script>

<template>
  <CalculatorLayout title="Heart Rate Zone Calculator" description="Calculate your personalized heart rate training zones using the Karvonen formula for optimal workout intensity.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">Age</label>
            <input v-model="age" type="number" min="10" max="100" placeholder="e.g. 30" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-600 mb-2">Resting Heart Rate (bpm)</label>
            <input v-model="restingHR" type="number" min="30" max="120" placeholder="60" class="input-field" />
          </div>
        </div>
        <div v-if="maxHR" class="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p class="text-sm text-blue-700 font-medium">Estimated Max HR: <strong>{{ maxHR }} bpm</strong> <span class="text-blue-400 font-normal">(220 − age)</span></p>
        </div>
        <transition name="result">
          <div v-if="zones" class="space-y-3">
            <div v-for="z in zones" :key="z.name" :class="['p-4 rounded-2xl border-2', z.color]">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-sm">{{ z.name }}</span>
                <span class="font-extrabold text-lg">{{ z.lo }}–{{ z.hi }} <span class="text-sm font-normal">bpm</span></span>
              </div>
              <p class="text-xs opacity-75">{{ z.desc }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your age to see your zones</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Why Heart Rate Zones Matter</h2><p class='mb-3'>Training in the right heart rate zone makes the difference between a workout that achieves your goal and one that doesn't. Different intensities trigger different physiological adaptations — fat burning, aerobic fitness, speed, or maximum power.</p><p>The Karvonen method (used here) is more accurate than simple max-HR percentages because it accounts for your resting heart rate, giving zones tailored to your fitness level.</p>"
        :tips="tips"
        :faqs="faqs"
        disclaimer="Maximum heart rate estimates (220 − age) are population averages. Your actual max HR may differ by ±10–20 bpm. For precise values, consider a supervised maximal exercise test."
      />
    </template>
  </CalculatorLayout>
</template>
