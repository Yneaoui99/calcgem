<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const unit = ref('metric')
const age = ref(''), gender = ref('male'), heightCm = ref(''), weightKg = ref('')
const heightFt = ref(''), heightIn = ref(''), weightLb = ref('')
const activity = ref('1.55')

const activityLevels = [
  { val:'1.2',   label:'Sedentary',         sub:'Little or no exercise' },
  { val:'1.375', label:'Lightly Active',     sub:'1–3 days/week' },
  { val:'1.55',  label:'Moderately Active',  sub:'3–5 days/week' },
  { val:'1.725', label:'Very Active',        sub:'6–7 days/week' },
  { val:'1.9',   label:'Extra Active',       sub:'Intense daily exercise' },
]

const bmr = computed(() => {
  let w, h, a = parseFloat(age.value)
  if (unit.value === 'metric') {
    w = parseFloat(weightKg.value); h = parseFloat(heightCm.value)
  } else {
    w = (parseFloat(weightLb.value) || 0) * 0.453592
    const ft = parseFloat(heightFt.value) || 0
    const inch = parseFloat(heightIn.value) || 0
    h = (ft * 12 + inch) * 2.54
  }
  if (!w || !h || !a) return null
  if (gender.value === 'male') return Math.round(10 * w + 6.25 * h - 5 * a + 5)
  return Math.round(10 * w + 6.25 * h - 5 * a - 161)
})

const tdee     = computed(() => bmr.value ? Math.round(bmr.value * parseFloat(activity.value)) : null)
const loseWeek = computed(() => tdee.value ? tdee.value - 500 : null)
const gainWeek = computed(() => tdee.value ? tdee.value + 500 : null)

const faqs = [
  { q:'What is TDEE?', a:'Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, including your base metabolism and all physical activity.' },
  { q:'Which BMR formula does this use?', a:'This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate for the general population by the Academy of Nutrition and Dietetics.' },
  { q:'How many calories should I eat to lose weight?', a:'A deficit of 500 calories per day leads to approximately 0.5 kg (1 lb) of weight loss per week. Avoid going below 1,200 kcal (women) or 1,500 kcal (men) without medical supervision.' },
  { q:'Does muscle mass affect calorie needs?', a:'Yes. Muscle tissue burns more calories at rest than fat tissue. Individuals with higher muscle mass generally have a higher BMR.' },
]
const tips = [
  { icon:'🥗', title:'Eat Protein at Every Meal', text:'Protein boosts satiety and has the highest thermic effect of food — you burn more calories digesting it.' },
  { icon:'🚶', title:'NEAT Matters More Than You Think', text:'Non-exercise activity thermogenesis (walking, fidgeting, standing) can account for 200–400 extra calories burned daily.' },
  { icon:'📊', title:'Track for 1–2 Weeks', text:'Counting calories for just a short period builds awareness and helps you understand your eating patterns without obsessing.' },
]
</script>

<template>
  <CalculatorLayout title="Calorie Calculator (TDEE)" description="Find out how many calories your body needs each day based on your age, size, gender, and activity level.">
    <template #calculator>
      <div class="space-y-6">

        <!-- Unit toggle -->
        <div class="flex justify-center">
          <div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700">
            <button :class="['unit-btn', unit==='metric' ? 'unit-btn-active':'unit-btn-inactive']" @click="unit='metric'">Metric</button>
            <button :class="['unit-btn', unit==='imperial' ? 'unit-btn-active':'unit-btn-inactive']" @click="unit='imperial'">Imperial</button>
          </div>
        </div>

        <!-- Gender + Age -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-400 mb-2">Gender</label>
            <select v-model="gender" class="input-field">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-400 mb-2">Age</label>
            <input v-model="age" type="number" min="10" max="100" placeholder="e.g. 30" class="input-field" />
          </div>
        </div>

        <!-- Height -->
        <div v-if="unit==='metric'">
          <label class="block text-sm font-semibold text-slate-400 mb-2">Height</label>
          <div class="relative">
            <input v-model="heightCm" type="number" placeholder="e.g. 175" class="input-field pr-16" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">cm</span>
          </div>
        </div>
        <div v-else>
          <label class="block text-sm font-semibold text-slate-400 mb-2">Height</label>
          <div class="flex gap-3">
            <div class="relative flex-1"><input v-model="heightFt" type="number" placeholder="5" class="input-field pr-12" /><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">ft</span></div>
            <div class="relative flex-1"><input v-model="heightIn" type="number" placeholder="10" class="input-field pr-12" /><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">in</span></div>
          </div>
        </div>

        <!-- Weight — separate inputs per unit to avoid invalid v-model expression -->
        <div v-if="unit==='metric'">
          <label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label>
          <div class="relative">
            <input v-model="weightKg" type="number" placeholder="e.g. 70" class="input-field pr-16" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">kg</span>
          </div>
        </div>
        <div v-else>
          <label class="block text-sm font-semibold text-slate-400 mb-2">Weight</label>
          <div class="relative">
            <input v-model="weightLb" type="number" placeholder="e.g. 154" class="input-field pr-16" />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">lbs</span>
          </div>
        </div>

        <!-- Activity Level -->
        <div>
          <label class="block text-sm font-semibold text-slate-400 mb-2">Activity Level</label>
          <div class="grid gap-2">
            <label v-for="lvl in activityLevels" :key="lvl.val"
              :class="['flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all',
                activity===lvl.val ? 'border-indigo-500 bg-indigo-900/30' : 'border-slate-700 hover:border-slate-600']">
              <input type="radio" v-model="activity" :value="lvl.val" class="sr-only" />
              <div :class="['w-3 h-3 rounded-full flex-shrink-0', activity===lvl.val ? 'bg-indigo-400' : 'bg-slate-600']"></div>
              <div>
                <div class="font-semibold text-sm text-slate-200">{{ lvl.label }}</div>
                <div class="text-xs text-slate-500">{{ lvl.sub }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Results -->
        <transition name="result">
          <div v-if="tdee" class="grid grid-cols-2 gap-4">
            <div class="p-5 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div class="text-sm text-slate-400 mb-1">BMR (at rest)</div>
              <div class="text-3xl font-extrabold text-slate-100">{{ bmr }}</div>
              <div class="text-xs text-slate-500 mt-1">kcal / day</div>
            </div>
            <div class="p-5 rounded-2xl bg-blue-900/30 border border-blue-700/40 text-center">
              <div class="text-sm text-blue-400 mb-1 font-medium">Maintenance (TDEE)</div>
              <div class="text-3xl font-extrabold text-blue-300">{{ tdee }}</div>
              <div class="text-xs text-blue-500 mt-1">kcal / day</div>
            </div>
            <div class="p-5 rounded-2xl bg-emerald-900/30 border border-emerald-700/40 text-center">
              <div class="text-sm text-emerald-400 mb-1 font-medium">Lose Weight</div>
              <div class="text-3xl font-extrabold text-emerald-300">{{ loseWeek }}</div>
              <div class="text-xs text-emerald-500 mt-1">kcal / day (−500)</div>
            </div>
            <div class="p-5 rounded-2xl bg-orange-900/30 border border-orange-700/40 text-center">
              <div class="text-sm text-orange-400 mb-1 font-medium">Gain Weight</div>
              <div class="text-3xl font-extrabold text-orange-300">{{ gainWeek }}</div>
              <div class="text-xs text-orange-500 mt-1">kcal / day (+500)</div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-600 text-lg font-semibold">Fill in your details above to see results</div>
        </transition>

      </div>
    </template>
    <template #info>
      <CalcInfoSection
        intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Your Daily Calorie Needs</h2><p class='mb-3'>Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns each day. It combines your Basal Metabolic Rate (BMR) — the energy needed to keep you alive at rest — with the calories burned through all physical activity.</p><p>Knowing your TDEE is the foundation of any nutrition strategy. Whether your goal is weight loss, muscle gain, or simply maintaining a healthy weight, hitting the right calorie target is more effective than any fad diet.</p>"
        formula="Mifflin-St Jeor BMR:
Male:   BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5
Female: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age − 161

TDEE = BMR × Activity Factor
Sedentary 1.2 · Light 1.375 · Moderate 1.55 · Very Active 1.725 · Extra Active 1.9"
        :tips="tips"
        :faqs="faqs"
        disclaimer="These calculations are estimates. Individual calorie needs vary based on genetics, body composition, and health conditions. Consult a registered dietitian for personalized advice."
      />
    </template>
  </CalculatorLayout>
</template>
