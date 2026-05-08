<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

// WHO weight-for-age median (kg) and SD at key months — simplified for boys/girls
// Source: WHO Child Growth Standards
const who = {
  boys:  [3.35,4.47,5.57,6.38,7.01,7.51,7.93,8.30,8.62,8.90,9.16,9.37,9.58,9.96,10.32,10.65,10.96,11.25,11.52,11.78,12.02,12.24,12.44,12.64,12.84,13.03,13.22,13.41,13.60,13.79,13.98,14.16,14.35,14.54,14.72,14.90,15.08,15.26,15.44,15.62,15.80,15.97,16.15,16.32,16.50,16.67,16.84,17.01,17.18,17.35,17.52,17.68,17.84,18.00,18.16,18.32,18.47,18.63,18.78,18.93,19.07],
  girls: [3.23,4.18,5.12,5.80,6.40,6.90,7.30,7.65,7.95,8.23,8.48,8.71,8.93,9.25,9.56,9.85,10.13,10.40,10.65,10.90,11.13,11.36,11.57,11.78,11.99,12.19,12.39,12.58,12.77,12.96,13.14,13.32,13.50,13.68,13.86,14.03,14.21,14.38,14.55,14.72,14.89,15.06,15.23,15.39,15.56,15.72,15.89,16.05,16.22,16.38,16.54,16.70,16.86,17.02,17.18,17.33,17.49,17.64,17.79,17.95,18.10],
}
const sdApprox = 0.12 // ~12% SD approximation

const ageMonths = ref('6'), weightKg = ref(''), unit = ref('kg'), sex = ref('boy')

const wKg = computed(() => unit.value==='kg' ? parseFloat(weightKg.value)||0 : (parseFloat(weightKg.value)||0)*0.453592)
const result = computed(() => {
  const m = Math.min(60, Math.max(0, parseInt(ageMonths.value)||0))
  const w = wKg.value
  if (!w) return null
  const median = who[sex.value==='boy'?'boys':'girls'][m]
  const sd = median * sdApprox
  const z = (w - median) / sd
  let percentile, category
  if (z < -2)      { percentile = '<3rd';    category = { label:'Underweight',    color:'text-blue-600',   bg:'bg-blue-50 border-blue-200' } }
  else if (z < -1) { percentile = '3–16th';  category = { label:'Below Average',  color:'text-amber-600',  bg:'bg-amber-50 border-amber-200' } }
  else if (z <= 1) { percentile = '16–84th'; category = { label:'Normal / Healthy',color:'text-emerald-600',bg:'bg-emerald-50 border-emerald-200'} }
  else if (z <= 2) { percentile = '84–97th'; category = { label:'Above Average',  color:'text-amber-600',  bg:'bg-amber-50 border-amber-200' } }
  else             { percentile = '>97th';   category = { label:'Overweight',     color:'text-orange-600', bg:'bg-orange-50 border-orange-200'} }
  return { median: median.toFixed(2), weight: w.toFixed(2), percentile, ...category }
})

const faqs = [
  { q:'What are WHO growth charts?', a:'WHO growth charts describe how healthy children grow under optimal conditions. They are used worldwide as the standard reference for child growth assessment.' },
  { q:'My baby is in the 10th percentile — should I worry?', a:'Not necessarily. Percentile tells you where your baby ranks relative to others, not whether they are healthy. A baby consistently growing along a low percentile curve is usually healthy. Sudden drops in percentile are more concerning.' },
  { q:'How often should I weigh my baby?', a:'In the first year, babies are typically weighed at each well-child visit (approximately monthly). After the first year, every 2–3 months is sufficient unless there is a concern.' },
]
const tips = [
  { icon:'📈', title:'Trends Matter More Than Numbers', text:'A single measurement is less meaningful than a series. Your child\'s growth curve trend over time is what healthcare providers focus on.' },
  { icon:'🍼', title:'Feed on Demand', text:'For infants, feeding on demand (when hungry) naturally regulates intake and supports healthy weight gain.' },
  { icon:'🩺', title:'Discuss at Every Check-up', text:'Bring your baby\'s weight records to every well-child visit. Your paediatrician can identify any deviations from their personal growth curve early.' },
]
</script>

<template>
  <CalculatorLayout title="Baby Weight Percentile Calculator" description="Check if your baby's weight falls within the healthy WHO percentile range for their age and sex.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Sex</label><select v-model="sex" class="input-field"><option value="boy">Boy</option><option value="girl">Girl</option></select></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Age (months)</label><input v-model="ageMonths" type="number" min="0" max="60" placeholder="6" class="input-field"/></div>
        </div>
        <div class="flex justify-center"><div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700"><button :class="['unit-btn', unit==='kg'?'unit-btn-active':'unit-btn-inactive']" @click="unit='kg'">kg</button><button :class="['unit-btn', unit==='lbs'?'unit-btn-active':'unit-btn-inactive']" @click="unit='lbs'">lbs</button></div></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Baby's Weight</label><div class="relative"><input v-model="weightKg" type="number" step="0.1" min="0.5" :placeholder="unit==='kg'?'e.g. 7.5':'e.g. 16.5'" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{{ unit }}</span></div></div>
        <transition name="result">
          <div v-if="result" :class="['p-6 rounded-2xl border-2', result.bg]">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-slate-600">WHO Percentile</span>
              <span :class="['text-2xl font-extrabold', result.color]">{{ result.percentile }}</span>
            </div>
            <div :class="['font-bold', result.color]">{{ result.label }}</div>
            <div class="text-sm text-slate-500 mt-2">WHO median for this age/sex: <strong>{{ result.median }} kg</strong></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter baby's age and weight to check percentile</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Baby Growth Percentiles</h2><p class='mb-3'>WHO growth charts show the distribution of weight-for-age among healthy children worldwide. The 50th percentile is the median — half of healthy children weigh more, half weigh less at that age. Being at the 10th or 90th percentile does not indicate a problem on its own.</p><p>What matters is consistent growth along your child's individual curve. This calculator provides an approximate percentile based on WHO weight-for-age standards (0–60 months).</p>" :tips="tips" :faqs="faqs" disclaimer="This calculator uses approximate WHO z-score thresholds and is not a substitute for professional paediatric assessment."/></template>
  </CalculatorLayout>
</template>
