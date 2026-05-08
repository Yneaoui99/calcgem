<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const mode = ref('pace') // pace | time | distance
const distUnit = ref('km')
const distance = ref(''), timeH = ref('0'), timeM = ref(''), timeS = ref('0')
const paceM = ref(''), paceS = ref('0')

const totalSeconds = computed(() => (parseInt(timeH.value)||0)*3600 + (parseInt(timeM.value)||0)*60 + (parseInt(timeS.value)||0))
const paceSecs = computed(() => (parseInt(paceM.value)||0)*60 + (parseInt(paceS.value)||0))
const fmt = (secs) => { const m=Math.floor(secs/60), s=Math.round(secs%60); return `${m}:${String(s).padStart(2,'0')}` }
const fmtHMS = (secs) => { const h=Math.floor(secs/3600), m=Math.floor((secs%3600)/60), s=Math.round(secs%60); return h>0?`${h}h ${m}m ${s}s`:`${m}m ${s}s` }

const result = computed(() => {
  const dist = parseFloat(distance.value)
  if (mode.value==='pace' && dist && totalSeconds.value) {
    const ps = totalSeconds.value / dist
    return { label:'Pace', value: fmt(ps) + ' /' + distUnit.value, sub:`Speed: ${(3600/ps).toFixed(2)} ${distUnit.value}/h` }
  }
  if (mode.value==='time' && dist && paceSecs.value) {
    const ts = dist * paceSecs.value
    return { label:'Finish Time', value: fmtHMS(ts), sub:`Total seconds: ${Math.round(ts)}` }
  }
  if (mode.value==='distance' && totalSeconds.value && paceSecs.value) {
    const d = totalSeconds.value / paceSecs.value
    return { label:'Distance', value: d.toFixed(2) + ' ' + distUnit.value, sub:`At ${fmt(paceSecs.value)}/${distUnit.value} pace` }
  }
  return null
})

const faqs = [
  { q:'What is a good running pace for beginners?', a:'A comfortable conversational pace for beginners is typically 7–9 min/km (11–14 min/mile). Focus on consistency and building distance before worrying about speed.' },
  { q:'How do I improve my running pace?', a:'Incorporate one interval or tempo run per week, increase weekly mileage gradually (no more than 10% per week), and ensure adequate recovery.' },
  { q:'What is negative split running?', a:'Running the second half of a race faster than the first. It is the most effective pacing strategy for most distance events.' },
]
const tips = [
  { icon:'🏃', title:'Easy Runs First', text:'80% of your running should be at a comfortable, conversational pace (Zone 2). This builds your aerobic base without excessive fatigue.' },
  { icon:'🎯', title:'Use Goal Pace in Training', text:'Include race-pace segments in your long runs so your body adapts to the exact effort level required on race day.' },
  { icon:'😴', title:'Rest Days Are Training Days', text:'Your fitness improves during recovery, not during the run itself. Protect rest days as carefully as workout days.' },
]
</script>

<template>
  <CalculatorLayout title="Running Pace Calculator" description="Calculate your running pace, total time, or distance — pick what you know and find what you need.">
    <template #calculator>
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">Calculate</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="m in [{v:'pace',l:'Pace'},{v:'time',l:'Finish Time'},{v:'distance',l:'Distance'}]" :key="m.v" :class="['py-2.5 rounded-xl text-sm font-bold border-2 transition-all', mode===m.v?'border-blue-500 bg-blue-50 text-blue-700':'border-slate-200 text-slate-500 hover:border-slate-300']" @click="mode=m.v">{{ m.l }}</button>
          </div>
        </div>
        <div class="flex justify-end"><div class="inline-flex bg-slate-800 rounded-xl p-1 gap-1 border border-slate-700"><button :class="['unit-btn', distUnit==='km'?'unit-btn-active':'unit-btn-inactive']" @click="distUnit='km'">km</button><button :class="['unit-btn', distUnit==='mi'?'unit-btn-active':'unit-btn-inactive']" @click="distUnit='mi'">mi</button></div></div>
        <!-- Distance input -->
        <div v-if="mode!=='distance'"><label class="block text-sm font-semibold text-slate-600 mb-2">Distance ({{ distUnit }})</label><div class="relative"><input v-model="distance" type="number" step="0.1" placeholder="e.g. 10" class="input-field pr-16"/><span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{{ distUnit }}</span></div></div>
        <!-- Time input -->
        <div v-if="mode!=='time'"><label class="block text-sm font-semibold text-slate-600 mb-2">Total Time</label><div class="flex gap-2">
          <div class="relative flex-1"><input v-model="timeH" type="number" min="0" max="99" placeholder="0" class="input-field pr-10"/><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">h</span></div>
          <div class="relative flex-1"><input v-model="timeM" type="number" min="0" max="59" placeholder="45" class="input-field pr-10"/><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">m</span></div>
          <div class="relative flex-1"><input v-model="timeS" type="number" min="0" max="59" placeholder="0" class="input-field pr-10"/><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">s</span></div>
        </div></div>
        <!-- Pace input -->
        <div v-if="mode!=='pace'"><label class="block text-sm font-semibold text-slate-600 mb-2">Pace (per {{ distUnit }})</label><div class="flex gap-2">
          <div class="relative flex-1"><input v-model="paceM" type="number" min="0" placeholder="5" class="input-field pr-10"/><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">m</span></div>
          <div class="relative flex-1"><input v-model="paceS" type="number" min="0" max="59" placeholder="30" class="input-field pr-10"/><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">s</span></div>
        </div></div>
        <transition name="result">
          <div v-if="result" class="p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 text-center">
            <div class="text-sm text-blue-600 font-medium mb-2">{{ result.label }}</div>
            <div class="text-4xl font-extrabold text-blue-700">{{ result.value }}</div>
            <div class="text-blue-400 text-sm mt-2">{{ result.sub }}</div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Fill in the fields above to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How to Use the Running Pace Calculator</h2><p class='mb-3'>This calculator solves any of the three running variables — pace, time, and distance — when you know the other two. Choose what you want to calculate, fill in the other two fields, and get your answer instantly.</p><p>Use it to plan your training runs, predict race finish times, or figure out how far you can run in a given time at your target pace.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
