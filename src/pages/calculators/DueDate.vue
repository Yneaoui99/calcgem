<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const lmp = ref(''), cycleLen = ref('28')
const addDays = (date, days) => { const d = new Date(date); d.setDate(d.getDate()+days); return d }
const fmtDate = (d) => d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })

const result = computed(() => {
  if (!lmp.value) return null
  const lmpDate = new Date(lmp.value)
  const adj = parseInt(cycleLen.value)||28
  const due = addDays(lmpDate, 280 + (adj - 28))
  const today = new Date()
  today.setHours(0,0,0,0)
  const weeksPregnant = Math.floor((today - lmpDate) / (7*24*3600*1000))
  const daysPregnant = Math.floor((today - lmpDate) / (24*3600*1000))
  const trimester = weeksPregnant < 13 ? '1st' : weeksPregnant < 27 ? '2nd' : '3rd'
  return { due: fmtDate(due), weeks: weeksPregnant, days: daysPregnant, trimester, conceived: fmtDate(addDays(lmpDate, adj-14)) }
})

const faqs = [
  { q:'How accurate is the due date calculation?', a:'Naegele\'s rule gives an estimated due date (EDD) with an accuracy of ±2 weeks. Only about 5% of babies are born on their exact due date; 90% are born within 2 weeks either side.' },
  { q:'What if my cycles are not 28 days?', a:'This calculator adjusts for your cycle length. Shorter cycles mean ovulation (and conception) happened earlier; longer cycles mean later — the due date shifts accordingly.' },
  { q:'When should I see a doctor to confirm my due date?', a:'A first-trimester ultrasound (typically 8–12 weeks) is the most accurate way to confirm your due date. Book an appointment as soon as you know you are pregnant.' },
]
const tips = [
  { icon:'📅', title:'Write Down Your LMP', text:'Your Last Menstrual Period (LMP) date is the starting point for all pregnancy date calculations. Note it down as soon as you suspect pregnancy.' },
  { icon:'🩺', title:'First Trimester Scan', text:'An ultrasound between 8–12 weeks confirms the due date using fetal measurements and is more accurate than LMP-based calculations.' },
  { icon:'🌸', title:'Every Pregnancy Is Different', text:'Due dates are estimates. Healthy full-term pregnancies range from 37 to 42 weeks. Focus on prenatal care, not the exact date.' },
]
</script>

<template>
  <CalculatorLayout title="Due Date Calculator" description="Estimate your baby's due date using Naegele's Rule based on your last menstrual period.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">First Day of Last Menstrual Period (LMP)</label><input v-model="lmp" type="date" class="input-field"/></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Average Cycle Length: <strong class="text-pink-600">{{ cycleLen }} days</strong></label><input v-model="cycleLen" type="range" min="20" max="45" class="w-full accent-pink-500"/></div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-pink-50 border-2 border-pink-200 text-center">
              <div class="text-sm text-pink-600 font-medium mb-1">Estimated Due Date</div>
              <div class="text-2xl font-extrabold text-pink-700">{{ result.due }}</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center" v-if="result.weeks>=0 && result.weeks<=42">
                <div class="text-xs text-slate-400 mb-1">Weeks Pregnant</div>
                <div class="text-2xl font-extrabold text-slate-700">{{ result.weeks }}w</div>
                <div class="text-xs text-slate-400 mt-1">{{ result.trimester }} Trimester</div>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div class="text-xs text-slate-400 mb-1">Estimated Conception</div>
                <div class="text-sm font-bold text-slate-700">{{ result.conceived }}</div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Select your LMP date to calculate</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>How Is Your Due Date Calculated?</h2><p class='mb-3'>Naegele's Rule is the standard method used by healthcare providers worldwide. It adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day cycle with ovulation on day 14. Our calculator adjusts for different cycle lengths.</p><p>The EDD is an estimate — only about 5% of babies arrive on their exact due date. Your healthcare provider may adjust the estimate based on your first-trimester ultrasound.</p>" :tips="tips" :faqs="faqs" disclaimer="This calculator provides estimates only. Always confirm your due date with a qualified healthcare provider."/></template>
  </CalculatorLayout>
</template>
