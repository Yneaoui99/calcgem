<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const start = ref(''), end = ref('')
const includeStart = ref(true), includeEnd = ref(true)

const result = computed(() => {
  if (!start.value || !end.value) return null
  const s = new Date(start.value), e = new Date(end.value)
  if (e < s) return null
  let workDays = 0, totalDays = 0, weekendDays = 0
  const cur = new Date(s)
  const endD = new Date(e)
  if (!includeStart.value) cur.setDate(cur.getDate()+1)
  if (!includeEnd.value)   endD.setDate(endD.getDate()-1)
  while (cur <= endD) {
    totalDays++
    const day = cur.getDay()
    if (day !== 0 && day !== 6) workDays++
    else weekendDays++
    cur.setDate(cur.getDate()+1)
  }
  return { workDays, totalDays, weekendDays }
})

const faqs = [
  { q:'Are public holidays excluded?', a:'This calculator excludes weekends (Saturday and Sunday) only. Public holidays vary by country and region, so they are not automatically excluded. Subtract any known holidays manually.' },
  { q:'How do I calculate working hours?', a:'Multiply working days by your daily working hours. For an 8-hour day, multiply the working days result by 8.' },
]
const tips = [
  { icon:'📋', title:'Subtract Holidays Manually', text:'Note how many public holidays fall in your date range and subtract them from the working days total.' },
  { icon:'📊', title:'Project Scheduling', text:'Use working days for project timelines and deadlines rather than calendar days for a realistic estimate.' },
]
</script>

<template>
  <CalculatorLayout title="Working Days Calculator" description="Count the exact number of working days (Monday–Friday) between two dates, excluding weekends.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Start Date</label><input v-model="start" type="date" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">End Date</label><input v-model="end" type="date" class="input-field"/></div>
        </div>
        <div class="flex gap-6">
          <label class="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600"><input type="checkbox" v-model="includeStart" class="accent-blue-600"/> Include start date</label>
          <label class="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600"><input type="checkbox" v-model="includeEnd" class="accent-blue-600"/> Include end date</label>
        </div>
        <transition name="result">
          <div v-if="result" class="grid grid-cols-3 gap-4">
            <div class="p-5 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
              <div class="text-xs text-violet-600 font-medium mb-1">Working Days</div>
              <div class="text-3xl font-extrabold text-violet-700">{{ result.workDays }}</div>
            </div>
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-400 mb-1">Calendar Days</div>
              <div class="text-3xl font-extrabold text-slate-700">{{ result.totalDays }}</div>
            </div>
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div class="text-xs text-slate-400 mb-1">Weekend Days</div>
              <div class="text-3xl font-extrabold text-slate-700">{{ result.weekendDays }}</div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Select a date range to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Count Working Days Accurately</h2><p>This calculator counts only Monday–Friday days between your two selected dates, automatically excluding Saturday and Sunday. It is useful for project planning, calculating notice periods, setting business deadlines, or counting annual leave entitlement.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
