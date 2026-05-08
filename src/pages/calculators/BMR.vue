<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric'), gender = ref('male')
const age = ref(''), heightCm = ref(''), weightKg = ref('')
const heightFt = ref(''), heightIn = ref(''), weightLb = ref('')

const wKg = computed(() => unit.value==='metric' ? parseFloat(weightKg.value)||0 : (parseFloat(weightLb.value)||0)*0.453592)
const hCm = computed(() => unit.value==='metric' ? parseFloat(heightCm.value)||0 : ((parseFloat(heightFt.value)||0)*12+(parseFloat(heightIn.value)||0))*2.54)
const a = computed(() => parseFloat(age.value)||0)

const mifflin = computed(() => {
  if (!wKg.value||!hCm.value||!a.value) return null
  const base = 10*wKg.value + 6.25*hCm.value - 5*a.value
  return Math.round(gender.value==='male' ? base+5 : base-161)
})
const harris = computed(() => {
  if (!wKg.value||!hCm.value||!a.value) return null
  if (gender.value==='male') return Math.round(88.362 + 13.397*wKg.value + 4.799*hCm.value - 5.677*a.value)
  return Math.round(447.593 + 9.247*wKg.value + 3.098*hCm.value - 4.330*a.value)
})

const faqs = [
  { q:'Which BMR formula is most accurate?', a:'The Mifflin-St Jeor equation is the most accurate for the general population according to the Academy of Nutrition and Dietetics. The revised Harris-Benedict formula is also widely used and validated.' },
  { q:'Why does BMR decrease with age?', a:'BMR decreases roughly 1–2% per decade after age 20, primarily because we lose lean muscle mass as we age. Regular strength training slows this decline.' },
  { q:'How is BMR different from TDEE?', a:'BMR is the calories needed at complete rest. TDEE (Total Daily Energy Expenditure) is BMR multiplied by an activity factor to account for all physical activity throughout the day.' },
]
const tips = [
  { icon:'🏋️', title:'Build Muscle to Raise BMR', text:'Every kilogram of muscle burns approximately 13 kcal per day at rest. Increasing lean mass is the most effective long-term way to raise your BMR.' },
  { icon:'🌡️', title:'Illness Raises BMR', text:'Fever increases BMR by roughly 10% per degree Celsius above normal body temperature.' },
  { icon:'🥗', title:'Don\'t Go Too Far Below BMR', text:'Eating below your BMR for extended periods causes muscle loss and metabolic adaptation, making long-term weight management harder.' },
]
</script>

<template>
  <CalculatorLayout title="BMR Calculator" description="Calculate your Basal Metabolic Rate — the number of calories your body burns at complete rest to sustain vital functions.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex justify-center"><div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700"><button :class="['unit-btn', unit==='metric'?'unit-btn-active':'unit-btn-inactive']" @click="unit='metric'">Metric</button><button :class="['unit-btn', unit==='imperial'?'unit-btn-active':'unit-btn-inactive']" @click="unit='imperial'">Imperial</button></div></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-400 mb-2">Gender</label><select v-model="gender" class="input-field"><option value="male">Male</option><option value="female">Female</option></select></div>
          <div><label class="block text-sm font-semibold text-slate-400 mb-2">Age</label><input v-model="age" type="number" min="10" max="100" placeholder="30" class="input-field"/></div>
        </div>
        <div v-if="unit==='metric'"><label class="block text-sm font-semibold text-slate-400 mb-2">Height</label><div class="relative"><input v-model="heightCm" type="number" placeholder="175" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">cm</span></div></div>
        <div v-else><label class="block text-sm font-semibold text-slate-400 mb-2">Height</label><div class="flex gap-3"><div class="relative flex-1"><input v-model="heightFt" type="number" placeholder="5" class="input-field pr-12"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">ft</span></div><div class="relative flex-1"><input v-model="heightIn" type="number" placeholder="10" class="input-field pr-12"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">in</span></div></div></div>
        <div v-if="unit==='metric'"><label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label><div class="relative"><input v-model="weightKg" type="number" placeholder="70" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">kg</span></div></div>
        <div v-else><label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label><div class="relative"><input v-model="weightLb" type="number" placeholder="154" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">lbs</span></div></div>
        <transition name="result">
          <div v-if="mifflin" class="grid grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center"><div class="text-sm text-blue-600 font-medium mb-1">Mifflin-St Jeor</div><div class="text-4xl font-extrabold text-blue-700">{{ mifflin }}</div><div class="text-xs text-blue-400 mt-1">kcal / day</div></div>
            <div class="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-center"><div class="text-sm text-indigo-600 font-medium mb-1">Harris-Benedict</div><div class="text-4xl font-extrabold text-indigo-700">{{ harris }}</div><div class="text-xs text-indigo-400 mt-1">kcal / day</div></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Fill in your details to see results</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>What Is Basal Metabolic Rate?</h2><p class='mb-3'>Your Basal Metabolic Rate (BMR) is the minimum amount of energy your body needs to maintain basic life functions — breathing, circulation, cell production, and temperature regulation — while at complete rest. It accounts for 60–75% of total daily calorie expenditure for most people.</p><p>Understanding your BMR is the starting point for any nutrition or weight management plan. Multiply it by an activity factor to get your Total Daily Energy Expenditure (TDEE).</p>"
        formula="Mifflin-St Jeor:
Male:   BMR = 10×w(kg) + 6.25×h(cm) − 5×age + 5
Female: BMR = 10×w(kg) + 6.25×h(cm) − 5×age − 161

Revised Harris-Benedict:
Male:   BMR = 88.362 + 13.397×w + 4.799×h − 5.677×age
Female: BMR = 447.593 + 9.247×w + 3.098×h − 4.330×age"
        :tips="tips" :faqs="faqs"
      />
    </template>
  </CalculatorLayout>
</template>
