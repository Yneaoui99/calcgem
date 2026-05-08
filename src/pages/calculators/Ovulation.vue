<script setup>
import { ref, computed } from 'vue'
import CalculatorLayout from '../../components/CalculatorLayout.vue'
import CalcInfoSection from '../../components/CalcInfoSection.vue'

const lmp = ref(''), cycleLen = ref('28')
const addDays = (d, n) => { const r=new Date(d); r.setDate(r.getDate()+n); return r }
const fmtDate = (d) => d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})
const fmtDay  = (d) => d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})

const result = computed(() => {
  if (!lmp.value) return null
  const lmpD = new Date(lmp.value)
  const cl = parseInt(cycleLen.value)||28
  const ovDay = cl - 14
  const ovulation = addDays(lmpD, ovDay)
  const fertileStart = addDays(ovulation, -5)
  const fertileEnd   = addDays(ovulation, 1)
  const nextPeriod   = addDays(lmpD, cl)
  const days = []
  for (let i=0; i<cl; i++) {
    const d = addDays(lmpD, i)
    let type = 'normal'
    if (i >= ovDay-5 && i <= ovDay+1) type = 'fertile'
    if (i === ovDay) type = 'ovulation'
    if (i < 5) type = 'period'
    days.push({ d, type })
  }
  return { ovulation: fmtDate(ovulation), fertileStart: fmtDate(fertileStart), fertileEnd: fmtDate(fertileEnd), nextPeriod: fmtDate(nextPeriod), days }
})

const dayClass = { period:'bg-rose-200', fertile:'bg-pink-100 border border-pink-300', ovulation:'bg-pink-500 text-white font-bold', normal:'bg-slate-50' }

const faqs = [
  { q:'When is ovulation most likely?', a:'Ovulation typically occurs 14 days before your next period, regardless of cycle length. For a 28-day cycle, that is day 14; for a 32-day cycle, it is day 18.' },
  { q:'How long is the fertile window?', a:'The fertile window is approximately 6 days — the five days before ovulation and the day of ovulation. Sperm can survive up to 5 days in the reproductive tract.' },
  { q:'Can I get pregnant on any other day?', a:'Technically yes, but the probability is much lower. The days immediately before and during ovulation have by far the highest conception probability.' },
]
const tips = [
  { icon:'🌡️', title:'Track Basal Body Temperature', text:'BBT rises slightly (0.2–0.5°C) after ovulation. Tracking it daily with a sensitive thermometer reveals your ovulation pattern over several months.' },
  { icon:'🔬', title:'Ovulation Predictor Kits', text:'OPKs detect the LH surge that precedes ovulation by 24–36 hours, giving advance warning of your most fertile days.' },
  { icon:'📲', title:'Use a Period Tracking App', text:'Apps like Clue or Flo track cycle history and give increasingly accurate predictions over time as they learn your personal pattern.' },
]
</script>

<template>
  <CalculatorLayout title="Ovulation Calculator" description="Find your most fertile days and estimated ovulation date based on your last menstrual period and cycle length.">
    <template #calculator>
      <div class="space-y-5">
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">First Day of Last Period</label><input v-model="lmp" type="date" class="input-field"/></div>
        <div><label class="block text-sm font-semibold text-slate-600 mb-2">Cycle Length: <strong class="text-pink-600">{{ cycleLen }} days</strong></label><input v-model="cycleLen" type="range" min="20" max="45" class="w-full accent-pink-500"/></div>
        <transition name="result">
          <div v-if="result" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="p-4 rounded-2xl bg-pink-100 border-2 border-pink-300 text-center"><div class="text-xs font-bold text-pink-600 mb-1">OVULATION DAY</div><div class="text-sm font-extrabold text-pink-800">{{ result.ovulation }}</div></div>
              <div class="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center"><div class="text-xs font-bold text-rose-600 mb-1">NEXT PERIOD</div><div class="text-sm font-extrabold text-rose-700">{{ result.nextPeriod }}</div></div>
            </div>
            <div class="p-4 rounded-2xl bg-pink-50 border border-pink-200"><div class="text-xs font-bold text-pink-600 mb-1">FERTILE WINDOW</div><div class="font-semibold text-pink-800">{{ result.fertileStart }} → {{ result.fertileEnd }}</div></div>
            <!-- Mini calendar -->
            <div class="grid grid-cols-7 gap-1">
              <div v-for="(day, i) in result.days" :key="i" :class="['rounded-lg p-1.5 text-center text-xs', dayClass[day.type]]">
                {{ day.d.getDate() }}
              </div>
            </div>
            <div class="flex flex-wrap gap-3 text-xs">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-rose-200 inline-block"></span>Period</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-pink-100 border border-pink-300 inline-block"></span>Fertile</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-pink-500 inline-block"></span>Ovulation</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-300 font-semibold">Enter your period date to see results</div>
        </transition>
      </div>
    </template>
    <template #info><CalcInfoSection intro="<h2 class='text-xl font-extrabold text-slate-800 mb-3'>Understanding Your Fertile Window</h2><p class='mb-3'>Ovulation is the release of a mature egg from the ovary. It happens once per cycle, roughly 14 days before your next expected period. The fertile window — the days when conception is most likely — spans approximately 5 days before ovulation and the day of ovulation itself.</p><p>This calculator estimates your fertile window based on your cycle length. Natural variation in cycles means these dates are estimates; tracking additional signs such as basal body temperature and cervical mucus improves accuracy.</p>" :tips="tips" :faqs="faqs" disclaimer="These calculations are estimates based on average hormonal patterns. Actual ovulation can vary. For fertility treatment, consult a reproductive specialist."/></template>
  </CalculatorLayout>
</template>
