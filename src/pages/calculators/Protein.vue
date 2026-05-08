<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric'), weight = ref(''), weightLb = ref(''), goal = ref('maintain')
const goals = [
  { val:'sedentary',   label:'Sedentary',        factor:0.8,  desc:'Little to no exercise' },
  { val:'maintain',    label:'Maintain / Light',  factor:1.2,  desc:'1–3 workouts/week' },
  { val:'performance', label:'Athletic / Endurance', factor:1.6, desc:'3–5 workouts/week' },
  { val:'muscle',      label:'Build Muscle',      factor:2.0,  desc:'Heavy training 5+ days' },
  { val:'elite',       label:'Elite Athlete',     factor:2.4,  desc:'Twice daily training' },
]

const wKg = computed(() => unit.value==='metric' ? parseFloat(weight.value)||0 : (parseFloat(weightLb.value)||0)*0.453592)
const selectedGoal = computed(() => goals.find(g=>g.val===goal.value))
const grams = computed(() => wKg.value ? Math.round(wKg.value * selectedGoal.value.factor) : null)

const faqs = [
  { q:'Why is protein important?', a:'Protein is essential for repairing and building muscle tissue, producing enzymes and hormones, and supporting the immune system. It also has the highest satiety value of all macronutrients.' },
  { q:'Can you eat too much protein?', a:'For healthy individuals, consuming up to 3.5g/kg of body weight per day appears safe. However, very high intakes offer diminishing returns and excess protein is simply converted to energy.' },
  { q:'What are the best protein sources?', a:'Complete protein sources include chicken, fish, eggs, dairy, beef, and soy. Incomplete sources like beans, lentils, and nuts can be combined to form complete proteins for plant-based diets.' },
]
const tips = [
  { icon:'🥩', title:'Spread Across Meals', text:'Aim for 25–40g of protein per meal. The body can absorb protein continuously but muscle protein synthesis is maximised when spread evenly.' },
  { icon:'⏰', title:'Post-Workout Window', text:'Consuming 25–40g of protein within 1–2 hours of resistance training supports muscle repair and growth.' },
  { icon:'🥛', title:'Greek Yoghurt & Cottage Cheese', text:'High-protein, low-effort snacks that can add 15–25g of protein without significant prep time.' },
]
</script>

<template>
  <CalculatorLayout title="Protein Calculator" description="Find your optimal daily protein intake based on your body weight and fitness goals.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex justify-center"><div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700"><button :class="['unit-btn', unit==='metric'?'unit-btn-active':'unit-btn-inactive']" @click="unit='metric'">Metric</button><button :class="['unit-btn', unit==='imperial'?'unit-btn-active':'unit-btn-inactive']" @click="unit='imperial'">Imperial</button></div></div>
        <div v-if="unit==='metric'"><label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label><div class="relative"><input v-model="weight" type="number" placeholder="70" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">kg</span></div></div>
        <div v-else><label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label><div class="relative"><input v-model="weightLb" type="number" placeholder="154" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">lbs</span></div></div>
        <div><label class="block text-sm font-semibold text-slate-400 mb-2">Goal / Activity Level</label>
          <div class="grid gap-2">
            <label v-for="g in goals" :key="g.val" :class="['flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all', goal===g.val?'border-blue-500 bg-blue-50':'border-slate-200 hover:border-slate-300']">
              <input type="radio" v-model="goal" :value="g.val" class="sr-only"/>
              <div :class="['w-3 h-3 rounded-full flex-shrink-0', goal===g.val?'bg-blue-500':'bg-slate-300']"></div>
              <div><div class="font-semibold text-sm text-slate-800">{{ g.label }}</div><div class="text-xs text-slate-400">{{ g.desc }} · {{ g.factor }}g/kg</div></div>
            </label>
          </div>
        </div>
        <transition name="result">
          <div v-if="grams" class="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
            <div class="text-sm text-blue-600 font-medium mb-2">Daily Protein Target</div>
            <div class="text-5xl font-extrabold text-blue-700">{{ grams }}g</div>
            <div class="text-blue-400 text-sm mt-2">per day · {{ selectedGoal.factor }}g × {{ wKg.toFixed(1) }} kg</div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your weight to see your protein goal</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Much Protein Do You Need?</h2><p class='mb-3'>Protein requirements vary significantly depending on activity level, age, and goals. The standard recommendation of 0.8g/kg is the minimum to prevent deficiency in sedentary adults. Athletes, those building muscle, and older adults need considerably more.</p><p>This calculator uses research-backed per-kg recommendations for each activity level, based on guidelines from the International Society of Sports Nutrition (ISSN).</p>"
        :tips="tips" :faqs="faqs"
      />
    </template>
  </CalculatorLayout>
</template>
