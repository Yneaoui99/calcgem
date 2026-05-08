<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const mode = ref('lmp')
const lmp = ref(''), dueDate = ref('')

const result = computed(() => {
  let lmpDate
  if (mode.value==='lmp') {
    if (!lmp.value) return null
    lmpDate = new Date(lmp.value)
  } else {
    if (!dueDate.value) return null
    lmpDate = new Date(dueDate.value)
    lmpDate.setDate(lmpDate.getDate() - 280)
  }
  const today = new Date(); today.setHours(0,0,0,0)
  const days = Math.floor((today - lmpDate) / 86400000)
  if (days < 0) return null
  const weeks = Math.floor(days / 7)
  const rem = days % 7
  const trimester = weeks < 13 ? '1st' : weeks < 27 ? '2nd' : '3rd'
  const dueD = new Date(lmpDate); dueD.setDate(dueD.getDate()+280)
  const daysLeft = Math.floor((dueD - today) / 86400000)
  const milestones = {
    4:'Implantation occurs. The embryo is about the size of a poppy seed.',
    8:'Major organs begin forming. Embryo is now called a fetus.',
    12:'End of 1st trimester. Risk of miscarriage drops significantly.',
    16:'Baby can make sucking movements. Gender may be visible on ultrasound.',
    20:'Mid-pregnancy. Anatomy scan usually performed this week.',
    24:'Baby is considered viable. Lungs begin producing surfactant.',
    28:'Start of 3rd trimester. Baby can open and close eyes.',
    32:'Baby gains weight rapidly. May be in head-down position.',
    36:'Baby is considered late preterm. Lungs nearly mature.',
    40:'Full term! Due date week.',
  }
  const closestMilestone = Object.entries(milestones).find(([w]) => parseInt(w)>=weeks)
  return { weeks, rem, trimester, daysLeft, milestone: closestMilestone?.[1] }
})

const faqs = [
  { q:'Why does pregnancy start at the LMP, not conception?', a:'Pregnancy is dated from the LMP because doctors can pinpoint it accurately, while the exact date of ovulation and conception is often unknown. In practice, conception typically occurs ~2 weeks after LMP.' },
  { q:'What are the three trimesters?', a:'1st trimester: weeks 1–12. 2nd trimester: weeks 13–26. 3rd trimester: weeks 27–40+. Each trimester brings distinct developmental milestones and physical changes.' },
  { q:'What is a full-term pregnancy?', a:'A pregnancy is considered full-term at 39–40 weeks. Early term is 37–38 weeks; late term is 41 weeks; post-term is 42+ weeks.' },
]
const tips = [
  { icon:'📝', title:'Keep a Pregnancy Journal', text:'Note symptoms, cravings, and milestones each week. It becomes a treasured record and helps you track patterns to discuss with your midwife.' },
  { icon:'🥦', title:'Folic Acid Every Day', text:'Take at least 400mcg of folic acid daily from before conception through the first 12 weeks to reduce the risk of neural tube defects.' },
  { icon:'🚶', title:'Gentle Movement', text:'Regular low-impact exercise like walking, swimming, or prenatal yoga supports circulation, mood, and prepares the body for labour.' },
]
</script>

<template>
  <CalculatorLayout title="Pregnancy Week Calculator" description="Find out exactly how many weeks pregnant you are and what is happening with your baby this week.">
    <template #calculator>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-2">
          <button :class="['py-2.5 rounded-xl text-sm font-bold border-2 transition-all', mode==='lmp'?'border-pink-500 bg-pink-50 text-pink-700':'border-slate-200 text-slate-500']" @click="mode='lmp'">I know my LMP</button>
          <button :class="['py-2.5 rounded-xl text-sm font-bold border-2 transition-all', mode==='due'?'border-pink-500 bg-pink-50 text-pink-700':'border-slate-200 text-slate-500']" @click="mode='due'">I know my due date</button>
        </div>
        <div v-if="mode==='lmp'"><label class="block text-sm font-semibold text-slate-600 mb-2">First Day of Last Period</label><input v-model="lmp" type="date" class="input-field"/></div>
        <div v-else><label class="block text-sm font-semibold text-slate-600 mb-2">Due Date</label><input v-model="dueDate" type="date" class="input-field"/></div>
        <transition name="result">
          <div v-if="result" class="space-y-3">
            <div class="p-6 rounded-2xl bg-pink-50 border-2 border-pink-200 text-center">
              <div class="text-sm text-pink-600 font-medium mb-1">You are</div>
              <div class="text-5xl font-extrabold text-pink-700">{{ result.weeks }}<span class="text-2xl"> weeks</span></div>
              <div class="text-pink-400 mt-1">and {{ result.rem }} day{{ result.rem!==1?'s':'' }} pregnant</div>
              <div class="mt-2 text-sm font-semibold text-pink-600">{{ result.trimester }} Trimester</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center" v-if="result.daysLeft>0">
              <div class="text-xs text-slate-400 mb-1">Days until due date</div>
              <div class="text-2xl font-extrabold text-slate-700">{{ result.daysLeft }} days</div>
            </div>
            <div v-if="result.milestone" class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
              <div class="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wide">What's happening this week</div>
              <p class="text-sm text-slate-600">{{ result.milestone }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter a date to see your pregnancy week</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Tracking Your Pregnancy Week by Week</h2><p class='mb-3'>Pregnancy is divided into 40 weeks (from the LMP) and three trimesters, each with important developmental milestones and different physical experiences for the mother.</p><p>This calculator tells you your current week, trimester, days remaining until your estimated due date, and a developmental milestone for your stage of pregnancy.</p>" :tips="tips" :faqs="faqs" disclaimer="Developmental milestones are general estimates. Every pregnancy is unique. Regular prenatal check-ups are essential."/></template>
  </CalculatorLayout>
</template>
