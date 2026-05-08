<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const calories = ref('')
const split = ref('balanced')
const splits = {
  balanced:   { label:'Balanced (30P/40C/30F)',   p:30, c:40, f:30 },
  lowcarb:    { label:'Low Carb (40P/20C/40F)',   p:40, c:20, f:40 },
  highprotein:{ label:'High Protein (40P/35C/25F)',p:40, c:35, f:25 },
  muscle:     { label:'Muscle Gain (35P/45C/20F)', p:35, c:45, f:20 },
  keto:       { label:'Keto (25P/5C/70F)',         p:25, c:5,  f:70 },
}

const result = computed(() => {
  const kcal = parseFloat(calories.value)
  if (!kcal || kcal < 100) return null
  const s = splits[split.value]
  return {
    protein: Math.round(kcal * s.p / 100 / 4),
    carbs:   Math.round(kcal * s.c / 100 / 4),
    fat:     Math.round(kcal * s.f / 100 / 9),
    ...s,
  }
})

const faqs = [
  { q:'How many calories are in each macronutrient?', a:'Protein: 4 kcal/g · Carbohydrates: 4 kcal/g · Fat: 9 kcal/g. Alcohol provides 7 kcal/g but is not a macronutrient.' },
  { q:'What macro split is best for weight loss?', a:'Higher protein (30–40%) diets are most effective for weight loss because protein increases satiety and preserves muscle mass during a calorie deficit.' },
  { q:'Should I hit my macros every day?', a:'Hitting weekly averages is more practical and sustainable than obsessing over daily targets. Small daily variations are normal and acceptable.' },
]
const tips = [
  { icon:'🥚', title:'Protein First', text:'Plan meals around your protein source first, then add carbs and fats to hit your calorie target.' },
  { icon:'📱', title:'Track for Awareness', text:'Use an app like Cronometer or MyFitnessPal for a few weeks to build an intuitive sense of food macros.' },
  { icon:'🔄', title:'Adjust Based on Results', text:'If you are not seeing results after 3–4 weeks, adjust calories by 100–200 kcal rather than overhauling your entire approach.' },
]
</script>

<template>
  <CalculatorLayout title="Macro Calculator" description="Get your personalised daily protein, carbohydrate, and fat targets from your total calorie goal.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Daily Calorie Goal (kcal)</label><div class="relative"><input v-model="calories" type="number" min="800" max="6000" placeholder="e.g. 2000" class="input-field pr-20"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">kcal</span></div></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Macro Split</label>
          <div class="grid gap-2">
            <label v-for="(s, key) in splits" :key="key" :class="['flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all', split===key?'border-blue-500 bg-blue-50':'border-slate-200 hover:border-slate-300']">
              <input type="radio" v-model="split" :value="key" class="sr-only"/>
              <div :class="['w-3 h-3 rounded-full flex-shrink-0', split===key?'bg-blue-500':'bg-slate-300']"></div>
              <span class="font-semibold text-sm text-slate-800">{{ s.label }}</span>
            </label>
          </div>
        </div>
        <transition name="result">
          <div v-if="result" class="grid grid-cols-3 gap-4">
            <div class="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center"><div class="text-xs text-blue-600 font-medium mb-1">Protein</div><div class="text-3xl font-extrabold text-blue-700">{{ result.protein }}g</div><div class="text-xs text-blue-400 mt-1">{{ result.p }}%</div></div>
            <div class="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-center"><div class="text-xs text-amber-600 font-medium mb-1">Carbs</div><div class="text-3xl font-extrabold text-amber-700">{{ result.carbs }}g</div><div class="text-xs text-amber-400 mt-1">{{ result.c }}%</div></div>
            <div class="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-center"><div class="text-xs text-emerald-600 font-medium mb-1">Fat</div><div class="text-3xl font-extrabold text-emerald-700">{{ result.fat }}g</div><div class="text-xs text-emerald-400 mt-1">{{ result.f }}%</div></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your calorie goal to see macros</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Macronutrients</h2><p class='mb-3'>Macronutrients — protein, carbohydrates, and fat — are the three main categories of nutrients that provide energy (calories). Getting the right balance for your specific goals is more important than just hitting a calorie number.</p><p>Use our <a href='/calories' class='text-blue-600 font-semibold hover:underline'>Calorie Calculator</a> to find your TDEE first, then use this tool to split those calories into macros based on your goal.</p>"
        :tips="tips" :faqs="faqs"
      />
    </template>
  </CalculatorLayout>
</template>
