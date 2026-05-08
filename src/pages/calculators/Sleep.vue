<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const mode = ref('bedtime') // bedtime | wakeup
const bedtime = ref('22:30'), wakeup = ref('07:00')
const fallAsleep = ref('14') // minutes

const addMins = (timeStr, mins) => {
  const [h,m] = timeStr.split(':').map(Number)
  const total = h*60 + m + mins
  const nh = Math.floor((total%(24*60))/60)
  const nm = total % 60
  return `${String(nh).padStart(2,'0')}:${String(nm).padStart(2,'0')}`
}
const subMins = (timeStr, mins) => addMins(timeStr, -mins)

const fmt12 = (t) => {
  const [h,m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2,'0')} ${ampm}`
}

const cycles = computed(() => {
  const fa = parseInt(fallAsleep.value)||14
  const times = []
  if (mode.value==='bedtime') {
    for (let c=6; c>=4; c--) {
      const wake = addMins(bedtime.value, fa + c*90)
      times.push({ label:`${c} cycles (${c*1.5}h sleep)`, time:fmt12(wake), cycles:c, quality:c>=6?'Excellent':c>=5?'Good':'Minimum' })
    }
  } else {
    for (let c=6; c>=4; c--) {
      const bed = subMins(wakeup.value, fa + c*90)
      times.push({ label:`${c} cycles (${c*1.5}h sleep)`, time:fmt12(bed), cycles:c, quality:c>=6?'Excellent':c>=5?'Good':'Minimum' })
    }
  }
  return times
})

const faqs = [
  { q:'What is a sleep cycle?', a:'A complete sleep cycle lasts approximately 90 minutes and includes light sleep, deep (slow-wave) sleep, and REM sleep. Most adults complete 4–6 cycles per night.' },
  { q:'Why does waking mid-cycle feel so bad?', a:'Waking during deep sleep or REM sleep causes sleep inertia — the groggy, disoriented feeling after waking. Timing wake-up to the end of a cycle minimises this.' },
  { q:'How much sleep do adults need?', a:'The National Sleep Foundation recommends 7–9 hours for adults aged 18–64. Individual needs vary; genetics and lifestyle both play a role.' },
]
const tips = [
  { icon:'🌅', title:'Keep a Consistent Schedule', text:'Going to bed and waking at the same time every day — including weekends — is the single most impactful sleep habit you can build.' },
  { icon:'📵', title:'Screen-Free 60 Minutes Before Bed', text:'Blue light suppresses melatonin production. Replace screens with reading, stretching, or journalling before bed.' },
  { icon:'🌡️', title:'Cool Room, Better Sleep', text:'Core body temperature drops during sleep. A cool room (16–19°C / 60–67°F) signals the body that it\'s time to sleep.' },
]
</script>

<template>
  <CalculatorLayout title="Sleep Calculator" description="Find the optimal bedtime or wake-up time based on 90-minute sleep cycles to wake up feeling refreshed.">
    <template #calculator>
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-600 mb-2">I want to know my...</label>
          <div class="grid grid-cols-2 gap-2">
            <button :class="['py-2.5 rounded-xl text-sm font-bold border-2 transition-all', mode==='bedtime'?'border-blue-500 bg-blue-50 text-blue-700':'border-slate-200 text-slate-500']" @click="mode='bedtime'">😴 Wake-up time</button>
            <button :class="['py-2.5 rounded-xl text-sm font-bold border-2 transition-all', mode==='wakeup'?'border-blue-500 bg-blue-50 text-blue-700':'border-slate-200 text-slate-500']" @click="mode='wakeup'">🌅 Bedtime</button>
          </div>
        </div>
        <div v-if="mode==='bedtime'"><label class="block text-sm font-semibold text-slate-600 mb-2">I plan to go to bed at</label><input v-model="bedtime" type="time" class="input-field"/></div>
        <div v-else><label class="block text-sm font-semibold text-slate-600 mb-2">I need to wake up at</label><input v-model="wakeup" type="time" class="input-field"/></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Minutes to fall asleep: <strong class="text-blue-600">{{ fallAsleep }}</strong></label><input v-model="fallAsleep" type="range" min="5" max="30" class="w-full accent-blue-600"/></div>
        <div class="space-y-3">
          <div v-for="c in cycles" :key="c.cycles"
            :class="['p-4 rounded-2xl border-2 flex justify-between items-center', c.quality==='Excellent'?'bg-emerald-50 border-emerald-200':c.quality==='Good'?'bg-blue-50 border-blue-200':'bg-slate-50 border-slate-200']">
            <div>
              <div :class="['font-bold text-sm', c.quality==='Excellent'?'text-emerald-700':c.quality==='Good'?'text-blue-700':'text-slate-700']">{{ c.label }}</div>
              <div :class="['text-xs font-medium', c.quality==='Excellent'?'text-emerald-500':c.quality==='Good'?'text-blue-400':'text-slate-400']">{{ c.quality }}</div>
            </div>
            <div :class="['text-2xl font-extrabold', c.quality==='Excellent'?'text-emerald-600':c.quality==='Good'?'text-blue-600':'text-slate-600']">
              {{ mode==='bedtime' ? '⏰' : '🛌' }} {{ c.time }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Why Sleep Cycles Matter</h2><p class='mb-3'>Sleep is not a uniform state — it cycles through distinct stages every ~90 minutes. Waking at the natural end of a cycle leaves you feeling alert and refreshed. Waking mid-cycle during deep sleep causes the groggy, disoriented feeling known as sleep inertia.</p><p>This calculator recommends wake-up or bedtime options aligned with the completion of full sleep cycles, accounting for the average time it takes to fall asleep.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
