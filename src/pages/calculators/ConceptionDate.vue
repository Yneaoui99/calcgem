<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const mode = ref('dueDate')
const dueDate = ref(''), lmp = ref('')
const addDays = (d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r}
const fmtDate = (d) => d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})

const result = computed(() => {
  if (mode.value==='dueDate') {
    if (!dueDate.value) return null
    const dd = new Date(dueDate.value)
    const conceptionEst = addDays(dd, -266)
    const rangeStart = addDays(dd, -273)
    const rangeEnd   = addDays(dd, -259)
    const lmpEst     = addDays(dd, -280)
    return { conception: fmtDate(conceptionEst), rangeStart: fmtDate(rangeStart), rangeEnd: fmtDate(rangeEnd), lmp: fmtDate(lmpEst) }
  } else {
    if (!lmp.value) return null
    const lmpD = new Date(lmp.value)
    const conceptionEst = addDays(lmpD, 14)
    const rangeStart = addDays(lmpD, 11)
    const rangeEnd   = addDays(lmpD, 21)
    const dd = addDays(lmpD, 280)
    return { conception: fmtDate(conceptionEst), rangeStart: fmtDate(rangeStart), rangeEnd: fmtDate(rangeEnd), due: fmtDate(dd) }
  }
})

const faqs = [
  { q:'How accurate is the conception date estimate?', a:'Conception date estimates have an accuracy of about ±7 days. Sperm can survive up to 5 days in the reproductive tract, so conception can occur on any day within the fertile window.' },
  { q:'Why is conception usually 2 weeks after LMP?', a:'Pregnancy is dated from the LMP, but ovulation (and therefore conception) typically occurs around day 14 of a 28-day cycle — 2 weeks after the LMP starts.' },
  { q:'Can a DNA test confirm the conception date?', a:'Paternity/conception date tests exist but are rare. Ultrasound measurements in the first trimester are the most accurate clinical tool for estimating when conception occurred.' },
]
const tips = [
  { icon:'📅', title:'First Trimester Ultrasound', text:'An ultrasound at 8–12 weeks measures the embryo and provides the most accurate conception date estimate.' },
  { icon:'📋', title:'Keep a Cycle Record', text:'A history of regular period dates makes conception and due date calculations much more accurate.' },
  { icon:'🩺', title:'Confirm with Your Provider', text:'Your OB or midwife will use ultrasound measurements and cycle history together to give you the most accurate dating.' },
]
</script>

<template>
  <CalculatorLayout title="Conception Date Calculator" description="Estimate when conception occurred based on your due date or last menstrual period.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-2">
          <button :class="['py-2.5 rounded-xl text-sm font-bold border-2', mode==='dueDate'?'border-pink-500 bg-pink-50 text-pink-700':'border-slate-200 text-slate-500']" @click="mode='dueDate'">From Due Date</button>
          <button :class="['py-2.5 rounded-xl text-sm font-bold border-2', mode==='lmp'?'border-pink-500 bg-pink-50 text-pink-700':'border-slate-200 text-slate-500']" @click="mode='lmp'">From LMP</button>
        </div>
        <div v-if="mode==='dueDate'"><label class="block text-sm font-semibold text-slate-600 mb-2">Due Date</label><input v-model="dueDate" type="date" class="input-field"/></div>
        <div v-else><label class="block text-sm font-semibold text-slate-600 mb-2">First Day of Last Period</label><input v-model="lmp" type="date" class="input-field"/></div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-pink-50 border-2 border-pink-200 text-center">
              <div class="text-sm text-pink-600 font-medium mb-1">Estimated Conception Date</div>
              <div class="text-xl font-extrabold text-pink-700">{{ result.conception }}</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div class="text-xs font-bold text-slate-500 mb-1">Likely Conception Range</div>
              <div class="font-semibold text-slate-700 text-sm">{{ result.rangeStart }} → {{ result.rangeEnd }}</div>
            </div>
            <div v-if="result.lmp" class="p-4 rounded-2xl bg-slate-50 border border-slate-200"><div class="text-xs text-slate-400">Estimated LMP: <strong class="text-slate-600">{{ result.lmp }}</strong></div></div>
            <div v-if="result.due" class="p-4 rounded-2xl bg-slate-50 border border-slate-200"><div class="text-xs text-slate-400">Estimated Due Date: <strong class="text-slate-600">{{ result.due }}</strong></div></div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter a date to calculate conception</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>When Did Conception Happen?</h2><p class='mb-3'>Conception occurs when a sperm fertilises an egg, typically within 24 hours of ovulation. This calculator estimates the conception date by working backwards from either the due date (subtracting 266 days) or forwards from the LMP (adding 14 days for average ovulation timing).</p><p>Because sperm can survive several days and ovulation timing varies, the conception date is presented as a range of approximately 7–10 days rather than a precise date.</p>" :tips="tips" :faqs="faqs" disclaimer="Conception date estimates are approximate. Only DNA testing or clinical imaging can narrow the range further."/></template>
  </CalculatorLayout>
</template>
