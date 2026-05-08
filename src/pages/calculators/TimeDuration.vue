<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const startTime = ref(''), endTime = ref(''), crossMidnight = ref(false)

const result = computed(() => {
  if (!startTime.value || !endTime.value) return null
  const [sh, sm] = startTime.value.split(':').map(Number)
  const [eh, em] = endTime.value.split(':').map(Number)
  let startMins = sh * 60 + sm
  let endMins   = eh * 60 + em
  if (crossMidnight && endMins < startMins) endMins += 24 * 60
  const diff = endMins - startMins
  if (diff < 0) return null
  const h = Math.floor(diff / 60), m = diff % 60
  return { hours: h, minutes: m, totalMins: diff, totalSecs: diff * 60 }
})

const faqs = [
  { q:'How do I calculate time across midnight?', a:'Enable the "Spans midnight" toggle if your end time is on the following day. For example, 22:00 to 06:00 gives 8 hours.' },
  { q:'Can I calculate work shift durations?', a:'Yes. Enter your clock-in and clock-out times to find total hours worked, which you can then multiply by your hourly rate.' },
]
const tips = [
  { icon:'⏱️', title:'Track Billable Hours', text:'Use this for consulting or freelance work to ensure accurate invoicing by tracking exact time spent on projects.' },
  { icon:'🌙', title:'Night Shift Duration', text:'Enable "Spans midnight" for shifts that cross into the next day.' },
]
</script>

<template>
  <CalculatorLayout title="Time Duration Calculator" description="Calculate the exact duration between two times in hours, minutes, and seconds — including overnight spans.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Start Time</label><input v-model="startTime" type="time" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">End Time</label><input v-model="endTime" type="time" class="input-field"/></div>
        </div>
        <label class="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600"><input type="checkbox" v-model="crossMidnight" class="accent-blue-600"/> Spans midnight (next day)</label>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
              <div class="text-sm text-violet-600 font-medium mb-2">Duration</div>
              <div class="text-5xl font-extrabold text-violet-700">{{ result.hours }}<span class="text-2xl">h</span> {{ String(result.minutes).padStart(2,'0') }}<span class="text-2xl">m</span></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Minutes</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalMins.toLocaleString() }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Seconds</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalSecs.toLocaleString() }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter start and end times to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Calculate Time Duration Instantly</h2><p>Enter a start time and end time to instantly calculate the duration in hours, minutes, total minutes, and total seconds. The calculator handles standard same-day durations as well as overnight spans (e.g. night shifts or late events that run past midnight).</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
