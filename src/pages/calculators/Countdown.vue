<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const target = ref(''), targetTime = ref('12:00')
const now = ref(new Date())
let timer = null
onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))

const result = computed(() => {
  if (!target.value) return null
  const t = new Date(`${target.value}T${targetTime.value}:00`)
  const diff = Math.max(0, Math.floor((t - now.value) / 1000))
  if (isNaN(diff)) return null
  const days    = Math.floor(diff / 86400)
  const hours   = Math.floor((diff % 86400) / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = diff % 60
  const past = t <= now.value
  return { days, hours, minutes, seconds, past, total: diff }
})

const quick = [
  { label:'New Year', fn:() => { const y=new Date().getFullYear()+1; target.value=`${y}-01-01`; targetTime.value='00:00' } },
  { label:'Christmas', fn:() => { const y=new Date().getFullYear(); const d=new Date(`${y}-12-25`); if(d<new Date()) d.setFullYear(y+1); target.value=d.toISOString().split('T')[0]; targetTime.value='00:00' } },
]

const faqs = [
  { q:'Does the countdown update in real time?', a:'Yes. The countdown updates every second automatically as long as the page is open.' },
  { q:'What happens when the countdown reaches zero?', a:"The display shows 'Event has passed!' once the target date and time is reached." },
]
const tips = [
  { icon:'🎯', title:'Set a Motivating Deadline', text:'Research shows that visible countdowns increase focus and urgency, helping you meet goals and deadlines.' },
  { icon:'🔖', title:'Bookmark This Page', text:'Save the URL after setting your event — the date is not saved automatically between sessions.' },
]
</script>

<template>
  <CalculatorLayout title="Countdown Timer" description="Set a target date and watch a live second-by-second countdown to your event, deadline, or special occasion.">
    <template #calculator>
      <div class="space-y-5">
        <div class="flex flex-wrap gap-2 mb-2">
          <button v-for="q in quick" :key="q.label" @click="q.fn()" class="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors">{{ q.label }}</button>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Target Date</label><input v-model="target" type="date" class="input-field"/></div>
          <div><label class="block text-sm font-semibold text-slate-600 mb-2">Target Time</label><input v-model="targetTime" type="time" class="input-field"/></div>
        </div>
        <transition name="result">
          <div v-if="result">
            <div v-if="result.past" class="p-6 rounded-2xl bg-slate-800 border-2 border-slate-700 text-center text-slate-300 font-bold text-xl">🎉 Event has passed!</div>
            <div v-else class="grid grid-cols-4 gap-3">
              <div v-for="unit in [{v:result.days,l:'Days'},{v:result.hours,l:'Hours'},{v:result.minutes,l:'Minutes'},{v:result.seconds,l:'Seconds'}]" :key="unit.l" class="p-4 rounded-2xl bg-violet-50 border-2 border-violet-200 text-center">
                <div class="text-4xl font-extrabold text-violet-700 tabular-nums">{{ String(unit.v).padStart(2,'0') }}</div>
                <div class="text-xs text-violet-500 font-medium mt-1">{{ unit.l }}</div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Set a target date to start the countdown</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Live Countdown to Any Event</h2><p>This live countdown timer shows exactly how many days, hours, minutes, and seconds remain until any future date and time. The display updates every second in real time. Use it to count down to events, project deadlines, holidays, birthdays, exams, or any upcoming occasion.</p>" :tips="tips" :faqs="faqs"/></template>
  </CalculatorLayout>
</template>
