<script setup>
const categories = [
  { range:'Below 18.5',  label:'Underweight',      color:'bg-blue-500',    dark:'bg-blue-900/40 text-blue-300',   desc:'May indicate malnutrition, an eating disorder, or other health issues. Consult a doctor.' },
  { range:'18.5 – 24.9', label:'Normal weight',    color:'bg-emerald-500', dark:'bg-emerald-900/40 text-emerald-300', desc:'A healthy BMI range associated with the lowest health risks for most adults.' },
  { range:'25 – 29.9',   label:'Overweight',       color:'bg-amber-500',   dark:'bg-amber-900/40 text-amber-300', desc:'Slightly elevated health risk. Lifestyle changes may help reduce future complications.' },
  { range:'30 – 34.9',   label:'Obese (Class I)',  color:'bg-orange-500',  dark:'bg-orange-900/40 text-orange-300', desc:'Increased risk of heart disease, type 2 diabetes, and other conditions. Medical advice recommended.' },
  { range:'35 – 39.9',   label:'Obese (Class II)', color:'bg-red-400',     dark:'bg-red-900/40 text-red-300',    desc:'High health risk. A healthcare professional should be consulted for a personalised plan.' },
  { range:'40 and above',label:'Obese (Class III)',color:'bg-red-600',     dark:'bg-red-900/60 text-red-200',    desc:'Very high health risk. Immediate medical consultation is strongly recommended.' },
]
</script>

<template>
  <section id="bmi-chart">
    <h2 class="text-2xl font-bold text-white mb-2">BMI Categories Chart</h2>
    <p class="text-slate-400 mb-6">Understanding what your BMI score means for your health.</p>

    <div class="flex h-4 rounded-full overflow-hidden mb-8">
      <div class="flex-1 bg-blue-500"></div>
      <div class="flex-[2] bg-emerald-500"></div>
      <div class="flex-[1.5] bg-amber-500"></div>
      <div class="flex-[1.5] bg-orange-500"></div>
      <div class="flex-[1.5] bg-red-400"></div>
      <div class="flex-[1.5] bg-red-600"></div>
    </div>

    <div class="space-y-3">
      <div v-for="cat in categories" :key="cat.label"
        class="flex gap-4 items-start p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors">
        <div class="pt-1 flex-shrink-0">
          <div :class="['w-3 h-3 rounded-full', cat.color]"></div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span class="font-bold text-slate-100 text-sm">{{ cat.label }}</span>
            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', cat.dark]">BMI {{ cat.range }}</span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">{{ cat.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
