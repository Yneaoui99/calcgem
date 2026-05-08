<script setup>
import { ref, computed } from 'vue'
import BMIGauge from './BMIGauge.vue'

const unit = ref('metric')
const heightCm = ref(''), weightKg = ref('')
const heightFt = ref(''), heightIn = ref(''), weightLb = ref('')

const bmi = computed(() => {
  let h, w
  if (unit.value === 'metric') {
    h = parseFloat(heightCm.value); w = parseFloat(weightKg.value)
    if (!h || !w || h <= 0 || w <= 0) return null
    return +(w / ((h / 100) ** 2)).toFixed(1)
  } else {
    const ft = parseFloat(heightFt.value) || 0
    const inch = parseFloat(heightIn.value) || 0
    w = parseFloat(weightLb.value)
    const totalInches = ft * 12 + inch
    if (!totalInches || !w || totalInches <= 0 || w <= 0) return null
    return +((w / (totalInches ** 2)) * 703).toFixed(1)
  }
})

const category = computed(() => {
  if (!bmi.value) return ''
  if (bmi.value < 18.5) return 'Underweight'
  if (bmi.value < 25)   return 'Normal weight'
  if (bmi.value < 30)   return 'Overweight'
  if (bmi.value < 35)   return 'Obese (Class I)'
  if (bmi.value < 40)   return 'Obese (Class II)'
  return 'Obese (Class III)'
})

const categoryColor = computed(() => {
  if (!bmi.value) return 'text-slate-400'
  if (bmi.value < 18.5) return 'text-blue-400'
  if (bmi.value < 25)   return 'text-emerald-400'
  if (bmi.value < 30)   return 'text-amber-400'
  if (bmi.value < 35)   return 'text-orange-400'
  return 'text-red-400'
})

const categoryBg = computed(() => {
  if (!bmi.value) return 'bg-slate-800 border-slate-700'
  if (bmi.value < 18.5) return 'bg-blue-900/30 border-blue-700/40'
  if (bmi.value < 25)   return 'bg-emerald-900/30 border-emerald-700/40'
  if (bmi.value < 30)   return 'bg-amber-900/30 border-amber-700/40'
  if (bmi.value < 35)   return 'bg-orange-900/30 border-orange-700/40'
  return 'bg-red-900/30 border-red-700/40'
})

const categoryDescription = computed(() => {
  if (!bmi.value) return ''
  if (bmi.value < 18.5) return 'Your BMI is below the healthy range. Consider speaking with a healthcare provider about a balanced nutrition plan.'
  if (bmi.value < 25)   return 'Great news! Your BMI is within the healthy range. Maintain your lifestyle with a balanced diet and regular exercise.'
  if (bmi.value < 30)   return 'Your BMI is above the healthy range. Small lifestyle changes — more movement and a balanced diet — can make a big difference.'
  if (bmi.value < 35)   return "Your BMI indicates obesity (Class I). It's a good idea to consult a healthcare provider for a personalised health plan."
  if (bmi.value < 40)   return 'Your BMI indicates obesity (Class II). Please consult a healthcare provider to discuss your options and build a health plan.'
  return 'Your BMI indicates severe obesity (Class III). We strongly recommend consulting a healthcare professional as soon as possible.'
})

const healthyRange = computed(() => {
  let h
  if (unit.value === 'metric') {
    h = parseFloat(heightCm.value)
    if (!h) return null
    const hm = h / 100
    return { low: (18.5 * hm * hm).toFixed(1) + ' kg', high: (24.9 * hm * hm).toFixed(1) + ' kg' }
  } else {
    const ft = parseFloat(heightFt.value) || 0
    const inch = parseFloat(heightIn.value) || 0
    const totalInches = ft * 12 + inch
    if (!totalInches) return null
    return {
      low:  ((18.5 * totalInches * totalInches) / 703).toFixed(1) + ' lbs',
      high: ((24.9 * totalInches * totalInches) / 703).toFixed(1) + ' lbs',
    }
  }
})

const switchUnit = (u) => {
  unit.value = u
  heightCm.value = ''; weightKg.value = ''
  heightFt.value = ''; heightIn.value = ''; weightLb.value = ''
}
</script>

<template>
  <section class="w-full">
    <!-- Unit toggle -->
    <div class="flex justify-center mb-8">
      <div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700">
        <button :class="['unit-btn', unit === 'metric' ? 'unit-btn-active' : 'unit-btn-inactive']" @click="switchUnit('metric')">Metric (kg / cm)</button>
        <button :class="['unit-btn', unit === 'imperial' ? 'unit-btn-active' : 'unit-btn-inactive']" @click="switchUnit('imperial')">Imperial (lbs / ft)</button>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8 items-start">
      <!-- Inputs -->
      <div class="space-y-5">
        <transition name="fade" mode="out-in">
          <div v-if="unit === 'metric'" key="metric" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-slate-400 mb-2">Height</label>
              <div class="relative">
                <input v-model="heightCm" type="number" min="50" max="300" placeholder="e.g. 175" class="input-field pr-16" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">cm</span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label>
              <div class="relative">
                <input v-model="weightKg" type="number" min="1" max="500" placeholder="e.g. 70" class="input-field pr-16" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">kg</span>
              </div>
            </div>
          </div>
          <div v-else key="imperial" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-slate-400 mb-2">Height</label>
              <div class="flex gap-3">
                <div class="relative flex-1">
                  <input v-model="heightFt" type="number" min="1" max="9" placeholder="5" class="input-field pr-12" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">ft</span>
                </div>
                <div class="relative flex-1">
                  <input v-model="heightIn" type="number" min="0" max="11" placeholder="10" class="input-field pr-12" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">in</span>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label>
              <div class="relative">
                <input v-model="weightLb" type="number" min="1" max="1000" placeholder="e.g. 154" class="input-field pr-16" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">lbs</span>
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="healthyRange" class="p-4 rounded-xl bg-indigo-900/30 border border-indigo-700/40">
            <p class="text-sm text-indigo-300 font-medium">
              Healthy weight for your height:
              <span class="font-bold text-indigo-200">{{ healthyRange.low }} – {{ healthyRange.high }}</span>
            </p>
          </div>
        </transition>
      </div>

      <!-- Gauge + Result -->
      <div class="flex flex-col items-center gap-6">
        <BMIGauge :bmi="bmi" :category="category" />
        <transition name="result">
          <div v-if="bmi" :class="['w-full p-5 rounded-2xl border-2 transition-all', categoryBg]">
            <p class="text-sm leading-relaxed text-slate-300">{{ categoryDescription }}</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
