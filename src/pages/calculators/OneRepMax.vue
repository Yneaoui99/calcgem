<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const weight = ref(''), reps = ref(''), unit = ref('kg')
const orm = computed(() => {
  const w = parseFloat(weight.value), r = parseInt(reps.value)
  if (!w || !r || r < 1 || r > 30) return null
  if (r === 1) return w
  return +(w * (1 + r / 30)).toFixed(1)
})
const percentages = [100,95,90,85,80,75,70,65,60,55,50]

const faqs = [
  { q:'What is the Epley formula?', a:'The Epley formula (1RM = weight × (1 + reps/30)) is the most commonly used one-rep max estimator. It is most accurate for 1–10 reps and becomes less reliable above 15 reps.' },
  { q:'Should I ever actually lift my true 1RM?', a:'Maximal singles carry higher injury risk. Most athletes test true 1RM only a few times per year. The Epley estimate from a working set is safer for regular programming.' },
  { q:'How do I use my 1RM for programming?', a:'Most training programmes prescribe loads as a percentage of 1RM. For example, 5×5 at 75%, or 3×8 at 70%. Use the percentage table below to plan your working weights.' },
]
const tips = [
  { icon:'🏋️', title:'Test at 3–5 Reps for Accuracy', text:'The Epley formula is most accurate at lower rep ranges. Use a 3–5 rep set at near-maximum effort for the best estimate.' },
  { icon:'📈', title:'Re-test Every 4–8 Weeks', text:'Your 1RM changes as you progress. Update it regularly to keep your training percentages accurate.' },
  { icon:'🛡️', title:'Warm Up Thoroughly', text:'Never attempt a heavy maximal lift without a thorough warm-up including several progressively heavier sets.' },
]
</script>

<template>
  <CalculatorLayout title="One Rep Max Calculator" description="Estimate your maximum lift weight (1RM) from any working set using the Epley formula.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex justify-center"><div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700"><button :class="['unit-btn', unit==='kg'?'unit-btn-active':'unit-btn-inactive']" @click="unit='kg'">kg</button><button :class="['unit-btn', unit==='lbs'?'unit-btn-active':'unit-btn-inactive']" @click="unit='lbs'">lbs</button></div></div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Weight Lifted</label><div class="relative"><input v-model="weight" type="number" min="1" placeholder="e.g. 100" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{{ unit }}</span></div></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Reps Completed</label><input v-model="reps" type="number" min="1" max="30" placeholder="e.g. 5" class="input-field"/></div>
        </div>
        <transition name="result">
          <div v-if="orm" class="space-y-4">
            <div class="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
              <div class="text-sm text-blue-600 font-medium mb-2">Estimated 1 Rep Max</div>
              <div class="text-5xl font-extrabold text-blue-700">{{ orm }} <span class="text-2xl">{{ unit }}</span></div>
            </div>
            <div class="overflow-auto rounded-2xl border border-slate-200">
              <table class="w-full text-sm">
                <thead class="bg-slate-50"><tr><th class="p-3 text-left font-semibold text-slate-600">% of 1RM</th><th class="p-3 text-right font-semibold text-slate-600">Weight</th><th class="p-3 text-right font-semibold text-slate-600">Common Use</th></tr></thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="pct in percentages" :key="pct" :class="pct===100?'bg-blue-50':''">
                    <td class="p-3 font-semibold" :class="pct===100?'text-blue-700':''">{{ pct }}%</td>
                    <td class="p-3 text-right font-bold" :class="pct===100?'text-blue-700':''">{{ (orm * pct / 100).toFixed(1) }} {{ unit }}</td>
                    <td class="p-3 text-right text-slate-400 text-xs">{{ {100:'Max effort',95:'2–3 reps',90:'3–4 reps',85:'4–5 reps',80:'5–6 reps',75:'8–10 reps',70:'10–12 reps',65:'12–15 reps',60:'15–20 reps',55:'20–25 reps',50:'25–30 reps'}[pct] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter weight and reps to calculate your 1RM</div>
        </transition>
      </div>
    </template>
    <template #info>
      <CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>What Is One Rep Max (1RM)?</h2><p class='mb-3'>Your one-rep max (1RM) is the maximum weight you can lift for a single repetition of any exercise with correct form. It is the standard metric for measuring absolute strength and is widely used for planning strength training programmes.</p><p>The Epley formula used here estimates 1RM from a submaximal set, making it safe and practical for everyday training. Enter any working set of 1–20 reps to get your estimate and a full percentage breakdown.</p>" :tips="tips" :faqs="faqs"/>
    </template>
  </CalculatorLayout>
</template>
