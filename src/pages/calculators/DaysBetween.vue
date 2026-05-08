<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const start = ref(''), end = ref('')
const result = computed(() => {
  if (!start.value || !end.value) return null
  const s = new Date(start.value), e = new Date(end.value)
  const diffMs = e - s
  const totalDays = Math.round(diffMs / 86400000)
  if (isNaN(totalDays)) return null
  const abs = Math.abs(totalDays)
  const weeks = Math.floor(abs / 7), remDays = abs % 7
  const months = Math.floor(abs / 30.44)
  const years  = Math.floor(abs / 365.25)
  return { totalDays, abs, weeks, remDays, months, years, negative: totalDays < 0 }
})

const faqs = [
  { q:'Does this include or exclude the start/end dates?', a:'The calculation counts the number of days between the two dates (exclusive of both endpoints). To include both endpoints, add 1 to the result.' },
  { q:'How are months calculated?', a:'Months are estimated by dividing total days by the average month length (30.44 days). For exact calendar months, use a calendar and count manually.' },
]
const tips = [
  { icon:'📅', title:'Planning Events', text:'Use this to count down to vacations, deadlines, anniversaries, or any future event.' },
  { icon:'📋', title:'Project Timelines', text:'Quickly calculate the duration of a project by entering the start and end dates.' },
]
</script>

<template>
  <CalculatorLayout title="Days Between Dates Calculator" description="Find the exact number of days, weeks, and months between any two dates.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Start Date</label><input v-model="start" type="date" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">End Date</label><input v-model="end" type="date" class="input-field"/></div>
        </div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
              <div class="text-sm text-violet-600 font-medium mb-1">{{ result.negative ? 'Days Ago' : 'Days Between' }}</div>
              <div class="text-5xl font-extrabold text-violet-700">{{ result.abs.toLocaleString() }}</div>
              <div class="text-violet-400 mt-1">{{ result.negative ? 'End date is before start date' : 'days' }}</div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Weeks</div><div class="text-xl font-extrabold text-slate-700">{{ result.weeks }}</div><div class="text-xs text-slate-400">+{{ result.remDays }}d</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Months (~)</div><div class="text-xl font-extrabold text-slate-700">{{ result.months }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Years (~)</div><div class="text-xl font-extrabold text-slate-700">{{ result.years }}</div></div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Select both dates to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Calculate the Duration Between Any Two Dates</h2><p>This calculator instantly finds the number of calendar days between a start date and end date. It also converts the result into weeks, approximate months, and approximate years for easier interpretation.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
