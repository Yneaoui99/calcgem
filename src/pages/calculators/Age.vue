<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const dob = ref('')
let timer = null
const now = ref(new Date())

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))

const result = computed(() => {
  if (!dob.value) return null
  const birth = new Date(dob.value)
  const n = now.value
  if (birth > n) return null
  let years = n.getFullYear() - birth.getFullYear()
  let months = n.getMonth() - birth.getMonth()
  let days = n.getDate() - birth.getDate()
  if (days < 0) { months--; const prev = new Date(n.getFullYear(), n.getMonth(), 0); days += prev.getDate() }
  if (months < 0) { years--; months += 12 }
  const totalDays   = Math.floor((n - birth) / 86400000)
  const totalWeeks  = Math.floor(totalDays / 7)
  const totalHours  = Math.floor((n - birth) / 3600000)
  const totalMins   = Math.floor((n - birth) / 60000)
  const nextBday = new Date(n.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBday <= n) nextBday.setFullYear(n.getFullYear()+1)
  const daysToNext = Math.ceil((nextBday - n) / 86400000)
  return { years, months, days, totalDays, totalWeeks, totalHours, totalMins, daysToNext }
})

const faqs = [
  { q:'Why might my age calculation differ from other tools?', a:'Age calculation methods vary slightly. This calculator uses the most common method: counting complete calendar years, then remaining months, then remaining days.' },
  { q:'What if I was born on 29 February?', a:'On non-leap years, birthday is typically observed on 28 February or 1 March. This calculator uses 1 March for years without 29 February.' },
]
const tips = [
  { icon:'🎂', title:'Days to Birthday', text:'The result shows how many days until your next birthday — useful for planning celebrations.' },
  { icon:'📊', title:'Total Days Alive', text:'The total days figure can be surprising — most 30-year-olds have lived over 10,000 days!' },
]
</script>

<template>
  <CalculatorLayout title="Age Calculator" description="Calculate your exact age in years, months, days, hours, and minutes — updated live every second.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Date of Birth</label><input v-model="dob" type="date" class="input-field"/></div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
              <div class="text-sm text-violet-600 font-medium mb-2">Your Age</div>
              <div class="text-5xl font-extrabold text-violet-700">{{ result.years }}</div>
              <div class="text-violet-500 mt-1">years, {{ result.months }} months, {{ result.days }} days</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Days</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalDays.toLocaleString() }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Weeks</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalWeeks.toLocaleString() }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Hours</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalHours.toLocaleString() }}</div></div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center"><div class="text-xs text-slate-400 mb-1">Total Minutes</div><div class="text-xl font-extrabold text-slate-700">{{ result.totalMins.toLocaleString() }}</div></div>
            </div>
            <div class="p-4 rounded-2xl bg-violet-50 border border-violet-200 text-center">
              <div class="text-xs text-violet-500 mb-1">Days until next birthday 🎂</div>
              <div class="text-2xl font-extrabold text-violet-700">{{ result.daysToNext }} days</div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your date of birth to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Exact Age Is Calculated</h2><p class='mb-3'>This calculator measures your exact age by counting the complete years, months, and days from your date of birth to today. The live counters for hours and minutes update every second for a real-time view of your age.</p><p>It also calculates the number of days until your next birthday, total days and weeks you have been alive, and total hours and minutes.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
