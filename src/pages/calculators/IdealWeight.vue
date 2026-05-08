<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric')
const gender = ref('male')
const heightCm = ref(''), heightFt = ref(''), heightIn = ref('')

const heightInCm = computed(() => {
  if (unit.value === 'metric') return parseFloat(heightCm.value) || 0
  return ((parseFloat(heightFt.value) || 0) * 12 + (parseFloat(heightIn.value) || 0)) * 2.54
})

const results = computed(() => {
  const h = heightInCm.value
  if (h < 100) return null
  const hInches = h / 2.54
  const over60 = hInches - 60
  let devine, robinson, miller, hamwi
  if (gender.value === 'male') {
    devine  = 50 + 2.3 * over60
    robinson = 52 + 1.9 * over60
    miller  = 56.2 + 1.41 * over60
    hamwi   = 48 + 2.7 * over60
  } else {
    devine  = 45.5 + 2.3 * over60
    robinson = 49 + 1.7 * over60
    miller  = 53.1 + 1.36 * over60
    hamwi   = 45.5 + 2.2 * over60
  }
  const toDisplay = (kg) => unit.value === 'metric' ? kg.toFixed(1) + ' kg' : (kg * 2.205).toFixed(1) + ' lbs'
  const avg = (devine + robinson + miller + hamwi) / 4
  return [
    { name:'Devine Formula',   value:toDisplay(devine)   },
    { name:'Robinson Formula', value:toDisplay(robinson) },
    { name:'Miller Formula',   value:toDisplay(miller)   },
    { name:'Hamwi Formula',    value:toDisplay(hamwi)    },
    { name:'Average',          value:toDisplay(avg), highlight:true },
  ]
})

const faqs = [
  { q:'Which ideal weight formula is most accurate?', a:'No single formula is universally accurate. The Devine formula is most commonly used in clinical settings, but the average of all four gives a balanced estimate for most people.' },
  { q:'Does ideal weight account for muscle mass?', a:'No. These formulas are based on height and gender only. Athletes or muscular individuals may healthily weigh more than the calculated ideal.' },
  { q:'Is ideal weight the same as a healthy BMI weight?', a:'They are related but not identical. A healthy BMI of 18.5–24.9 gives a range, while ideal weight formulas give a single midpoint estimate.' },
]
const tips = [
  { icon:'💪', title:'Focus on Body Composition', text:'Body weight alone is less informative than your ratio of muscle to fat. Two people at the same weight can have very different health profiles.' },
  { icon:'📏', title:'Use It as a Guide, Not a Target', text:'Ideal weight is a statistical estimate. Health is better measured through energy levels, strength, and lab markers.' },
  { icon:'🩺', title:'Consult a Professional', text:'If your weight significantly differs from the estimates, speak with a doctor or dietitian to understand what a healthy target looks like for you.' },
]
</script>

<template>
  <CalculatorLayout title="Ideal Weight Calculator" description="Estimate your ideal body weight using four scientifically recognized formulas based on your height and gender.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex justify-center">
          <div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700">
            <button :class="['unit-btn', unit==='metric'?'unit-btn-active':'unit-btn-inactive']" @click="unit='metric'">Metric</button>
            <button :class="['unit-btn', unit==='imperial'?'unit-btn-active':'unit-btn-inactive']" @click="unit='imperial'">Imperial</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Gender</label>
          <select v-model="gender" class="input-field"><option value="male">Male</option><option value="female">Female</option></select>
        </div>
        <div v-if="unit==='metric'">
          <label class="block text-sm font-semibold text-slate-600 mb-2">Height</label>
          <div class="relative"><input v-model="heightCm" type="number" placeholder="e.g. 175" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">cm</span></div>
        </div>
        <div v-else>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Height</label>
          <div class="flex gap-3">
            <div class="relative flex-1"><input v-model="heightFt" type="number" placeholder="5" class="input-field pr-12"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">ft</span></div>
            <div class="relative flex-1"><input v-model="heightIn" type="number" placeholder="10" class="input-field pr-12"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">in</span></div>
          </div>
        </div>
        <transition name="result">
          <div v-if="results" class="space-y-3">
            <div v-for="r in results" :key="r.name"
              :class="['flex justify-between items-center p-4 rounded-2xl border', r.highlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200']">
              <span :class="['font-semibold text-sm', r.highlight ? 'text-blue-700' : 'text-slate-700']">{{ r.name }}</span>
              <span :class="['font-extrabold', r.highlight ? 'text-blue-700 text-lg' : 'text-slate-800']">{{ r.value }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your height to see results</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>What Is Ideal Body Weight?</h2><p class='mb-3'>Ideal body weight (IBW) formulas were originally developed in clinical settings to help calculate medication dosages and nutritional needs. They estimate the weight at which the average person of a given height and gender tends to be healthiest.</p><p>This calculator shows results from four widely cited formulas — Devine, Robinson, Miller, and Hamwi — along with the average. No single formula is perfect for every individual; use the average as a central estimate and the range as a realistic target.</p>"
        :tips="tips"
        :faqs="faqs"
        disclaimer="Ideal weight formulas are population-based estimates and do not account for individual differences in bone density, muscle mass, or body composition."
      />
    </template>
  </CalculatorLayout>
</template>
