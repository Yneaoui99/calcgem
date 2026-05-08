<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric')
const gender = ref('male')
const height = ref(''), waist = ref(''), neck = ref(''), hip = ref('')
const weight = ref('')

const toCm = (v) => unit.value === 'metric' ? parseFloat(v)||0 : (parseFloat(v)||0)*2.54

const bodyFat = computed(() => {
  const h = toCm(height.value), w = toCm(waist.value), n = toCm(neck.value)
  if (!h || !w || !n) return null
  if (gender.value === 'male') {
    const val = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450
    return Math.max(0, +val.toFixed(1))
  } else {
    const hp = toCm(hip.value)
    if (!hp) return null
    const val = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450
    return Math.max(0, +val.toFixed(1))
  }
})

const category = computed(() => {
  const bf = bodyFat.value; if (!bf) return null
  if (gender.value === 'male') {
    if (bf < 6)  return { label:'Essential Fat',  color:'text-blue-500', bg:'bg-blue-50 border-blue-200' }
    if (bf < 14) return { label:'Athletic',       color:'text-emerald-500', bg:'bg-emerald-50 border-emerald-200' }
    if (bf < 18) return { label:'Fitness',        color:'text-teal-500', bg:'bg-teal-50 border-teal-200' }
    if (bf < 25) return { label:'Average',        color:'text-amber-500', bg:'bg-amber-50 border-amber-200' }
    return              { label:'Obese',          color:'text-red-500', bg:'bg-red-50 border-red-200' }
  } else {
    if (bf < 14) return { label:'Essential Fat',  color:'text-blue-500', bg:'bg-blue-50 border-blue-200' }
    if (bf < 21) return { label:'Athletic',       color:'text-emerald-500', bg:'bg-emerald-50 border-emerald-200' }
    if (bf < 25) return { label:'Fitness',        color:'text-teal-500', bg:'bg-teal-50 border-teal-200' }
    if (bf < 32) return { label:'Average',        color:'text-amber-500', bg:'bg-amber-50 border-amber-200' }
    return              { label:'Obese',          color:'text-red-500', bg:'bg-red-50 border-red-200' }
  }
})

const leanMass = computed(() => {
  if (!bodyFat.value || !weight.value) return null
  const w = unit.value === 'metric' ? parseFloat(weight.value) : parseFloat(weight.value)*0.453592
  return +(w * (1 - bodyFat.value/100)).toFixed(1)
})

const unit2 = computed(() => unit.value === 'metric' ? 'cm' : 'in')
const wUnit = computed(() => unit.value === 'metric' ? 'kg' : 'lbs')

const faqs = [
  { q:'What is the US Navy body fat method?', a:'The US Navy method uses circumference measurements (neck, waist, and hip for women) and height to estimate body fat percentage. It is a simple, validated field measurement technique used by the US military.' },
  { q:'How accurate is this measurement?', a:'The US Navy method has an accuracy of ±3–4% compared to DEXA scans. It is more accurate than BMI for estimating body composition but less precise than water displacement or DEXA.' },
  { q:'What is a healthy body fat percentage?', a:'For men: 6–17% (athletic to average). For women: 14–24% (athletic to average). Essential fat (needed for survival) is about 3–5% in men and 10–13% in women.' },
]
const tips = [
  { icon:'📐', title:'Measure Consistently', text:'Take all measurements in the morning before eating, using a flexible tape measure. Take 2–3 readings and use the average for best accuracy.' },
  { icon:'💪', title:'Muscle Changes the Number', text:'As you build muscle, your body fat percentage drops even if your weight stays the same. Focus on this trend, not just the scale.' },
  { icon:'🔄', title:'Track Monthly', text:'Body fat percentage changes slowly. Measure monthly rather than weekly to see meaningful trends without unnecessary frustration.' },
]
</script>

<template>
  <CalculatorLayout title="Body Fat Calculator" description="Estimate your body fat percentage using the US Navy circumference method — no expensive equipment required.">
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
        <div v-for="field in gender==='male' ? [{l:'Height',m:height},{l:'Waist (at navel)',m:waist},{l:'Neck',m:neck},{l:'Weight (optional)',m:weight,u:wUnit}] : [{l:'Height',m:height},{l:'Waist (at navel)',m:waist},{l:'Hip (at widest)',m:hip},{l:'Neck',m:neck},{l:'Weight (optional)',m:weight,u:wUnit}]" :key="field.l">
          <label class="block text-sm font-semibold text-slate-600 mb-2">{{ field.l }}</label>
          <div class="relative"><input v-model="field.m.value" type="number" min="1" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{{ field.u || unit2 }}</span></div>
        </div>
        <transition name="result">
          <div v-if="bodyFat !== null && category" :class="['p-6 rounded-2xl border-2', category.bg]">
            <div class="flex items-center justify-between mb-3">
              <span class="font-semibold text-slate-600">Body Fat</span>
              <span :class="['text-4xl font-extrabold', category.color]">{{ bodyFat }}%</span>
            </div>
            <div :class="['text-sm font-bold', category.color]">Category: {{ category.label }}</div>
            <div v-if="leanMass" class="mt-3 text-sm text-slate-600">Lean mass: <strong>{{ leanMass }} {{ wUnit }}</strong></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your measurements above</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Body Fat Percentage</h2><p class='mb-3'>Body fat percentage is the proportion of your body weight that is made up of fat tissue. Unlike BMI, it distinguishes between fat mass and lean mass (muscle, bone, water), making it a more meaningful indicator of body composition and metabolic health.</p><p>The US Navy method used here is a validated, widely used field measurement technique that requires only a tape measure and height measurement.</p>"
        :tips="tips"
        :faqs="faqs"
      />
    </template>
  </CalculatorLayout>
</template>
