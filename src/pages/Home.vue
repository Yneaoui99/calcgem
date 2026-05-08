<script setup>
import { RouterLink } from 'vue-router'
import { categories, calculators } from '../calculators.js'

const byCategory = (id) => calculators.filter(c => c.category === id)
const popular = calculators.filter(c => c.popular)

const catStyle = {
  health:    { gradient:'from-blue-600 to-indigo-700',      icon:'bg-blue-900/60 text-blue-300',    heading:'text-blue-300',    bar:'bg-blue-500',    border:'border-blue-800/40',   card:'bg-blue-950/30' },
  pregnancy: { gradient:'from-pink-600 to-rose-700',        icon:'bg-pink-900/60 text-pink-300',    heading:'text-pink-300',    bar:'bg-pink-500',    border:'border-pink-800/40',   card:'bg-pink-950/30' },
  dates:     { gradient:'from-violet-600 to-purple-700',    icon:'bg-violet-900/60 text-violet-300',heading:'text-violet-300',  bar:'bg-violet-500',  border:'border-violet-800/40', card:'bg-violet-950/30'},
  finance:   { gradient:'from-emerald-600 to-teal-700',     icon:'bg-emerald-900/60 text-emerald-300',heading:'text-emerald-300',bar:'bg-emerald-500', border:'border-emerald-800/40',card:'bg-emerald-950/30'},
}

const catDesc = {
  health:    'From body composition to fitness performance — our health tools are built on peer-reviewed formulas used by doctors, dietitians, and personal trainers worldwide.',
  pregnancy: 'Carefully designed tools for every stage of your pregnancy journey, from conception planning to tracking your baby\'s growth week by week.',
  dates:     'Precise date and time calculators for everyday needs — count down to events, calculate working days, and measure durations with accuracy.',
  finance:   'Make smarter money decisions with our free financial calculators — from mortgage payments and tax estimates to compound interest and retirement projections.',
}
</script>

<template>
  <!-- Hero -->
  <section class="bg-gradient-to-br from-[#0d0f1a] via-[#111827] to-indigo-950 text-white py-20 px-4 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
    <div class="max-w-3xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center gap-2 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        ✅ Trusted by 100,000+ people worldwide
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5">
        Free Health, Fitness<br class="hidden sm:block" /> &amp; Finance Calculators
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
        Over <strong class="text-white">34 free calculators</strong> covering health, pregnancy, dates, and finance — all based on scientifically validated formulas. No sign-up. Always free.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="#calculators" class="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-900/50 transition-all hover:-translate-y-0.5">
          Browse All Calculators ↓
        </a>
        <RouterLink to="/bmi" class="px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all hover:-translate-y-0.5">
          Start with BMI →
        </RouterLink>
      </div>
      <div class="flex flex-wrap justify-center gap-8 mt-12 text-center">
        <div v-for="s in [{ value:'34', label:'Calculators' },{ value:'100K+', label:'Monthly Users' },{ value:'4', label:'Categories' },{ value:'100%', label:'Free Forever' }]" :key="s.label">
          <div class="text-2xl font-extrabold text-white">{{ s.value }}</div>
          <div class="text-xs text-slate-500 font-medium mt-0.5">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- What is CalcGem -->
  <section class="max-w-5xl mx-auto px-4 py-12">
    <div class="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 shadow-sm">
      <h2 class="text-2xl font-extrabold text-white mb-4">What is CalcGem?</h2>
      <p class="text-slate-400 leading-relaxed mb-4">
        CalcGem is a free, all-in-one calculator hub designed to help you make better decisions about your health, finances, and daily life. Every calculator on this site is built on established, peer-reviewed formulas — the same ones used by healthcare professionals, certified financial planners, and fitness experts.
      </p>
      <p class="text-slate-400 leading-relaxed">
        Whether you want to check your BMI, plan your retirement savings, calculate your due date, or find out how many days until your next vacation — CalcGem has a tool for it. All calculators are completely free, require no account, and work instantly in your browser.
      </p>
    </div>
  </section>

  <!-- Popular Calculators -->
  <section class="max-w-5xl mx-auto px-4 pb-10" id="calculators">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-2xl">⭐</span>
      <h2 class="text-2xl font-extrabold text-white">Most Popular</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <RouterLink
        v-for="calc in popular" :key="calc.id"
        :to="calc.route"
        class="group relative bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1.5 transition-all duration-200 overflow-hidden hover:border-indigo-700/50"
      >
        <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl"></div>
        <div class="text-3xl mb-3">{{ calc.icon }}</div>
        <div class="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mb-1">{{ calc.name }}</div>
        <p class="text-xs text-slate-500 leading-relaxed">{{ calc.desc }}</p>
        <div class="mt-3 text-indigo-400 text-xs font-bold flex items-center gap-1">
          Open <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
        </div>
      </RouterLink>
    </div>
  </section>

  <div class="max-w-5xl mx-auto px-4 pb-6"><div class="ad-slot h-24 w-full"><span>Advertisement</span></div></div>

  <!-- Category Sections -->
  <section v-for="cat in categories" :key="cat.id" class="max-w-5xl mx-auto px-4 pb-14">
    <!-- Category Header -->
    <div class="flex items-start gap-4 mb-6">
      <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border', catStyle[cat.id].icon, catStyle[cat.id].border]">
        {{ cat.icon }}
      </div>
      <div>
        <h2 :class="['text-2xl font-extrabold', catStyle[cat.id].heading]">{{ cat.label }}</h2>
        <p class="text-slate-500 text-sm leading-relaxed max-w-2xl mt-1">{{ catDesc[cat.id] }}</p>
      </div>
    </div>

    <!-- Cube Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <RouterLink
        v-for="calc in byCategory(cat.id)" :key="calc.id"
        :to="calc.route"
        :class="['group bg-slate-900 rounded-2xl border p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col min-h-[130px] hover:border-slate-600', catStyle[cat.id].border]"
      >
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform group-hover:scale-110 border', catStyle[cat.id].icon, catStyle[cat.id].border]">
          {{ calc.icon }}
        </div>
        <div class="font-bold text-sm mb-1 text-slate-200 group-hover:text-white transition-colors flex-1">
          {{ calc.name }}
        </div>
        <div :class="['flex items-center gap-1 text-xs font-semibold mt-auto', catStyle[cat.id].heading]">
          Calculate
          <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
        </div>
      </RouterLink>
    </div>

    <div v-if="cat.id === 'health'" class="mt-8"><div class="ad-slot h-24 w-full"><span>Advertisement</span></div></div>
  </section>

  <!-- Bottom CTA -->
  <section class="max-w-5xl mx-auto px-4 pb-12">
    <div class="rounded-3xl bg-gradient-to-r from-indigo-900 to-violet-900 border border-indigo-800/50 text-white p-8 md:p-10 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 pointer-events-none"></div>
      <h3 class="text-2xl font-extrabold mb-2 relative z-10">Your go-to calculator for everything</h3>
      <p class="text-slate-300 mb-6 relative z-10">Health, fitness, pregnancy, dates, and finance — all in one free place.</p>
      <RouterLink to="/bmi" class="relative z-10 inline-block px-8 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-slate-100 shadow-md transition-all hover:-translate-y-0.5">
        Start with BMI →
      </RouterLink>
    </div>
  </section>
</template>
