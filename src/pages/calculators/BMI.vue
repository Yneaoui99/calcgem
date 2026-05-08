<script setup>
import { RouterLink } from 'vue-router'
import BMICalculator from '../../components/BMICalculator.vue'
import BMIChart from '../../components/BMIChart.vue'
import InfoSection from '../../components/InfoSection.vue'
</script>

<template>
  <!-- Breadcrumb -->
  <div class="max-w-5xl mx-auto px-4 pt-6">
    <nav class="flex items-center gap-2 text-sm text-slate-500">
      <RouterLink to="/" class="hover:text-indigo-400 transition-colors">All Calculators</RouterLink>
      <span>/</span>
      <span class="text-slate-300 font-medium">BMI Calculator</span>
    </nav>
  </div>

  <!-- Page header -->
  <div class="max-w-5xl mx-auto px-4 pt-6 pb-2">
    <h1 class="text-3xl font-extrabold text-white">BMI Calculator</h1>
    <p class="text-slate-400 mt-1">Calculate your Body Mass Index — supports metric and imperial units.</p>
  </div>

  <main class="max-w-5xl mx-auto px-4 py-6 space-y-6">
    <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>

    <div class="bg-slate-900 rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-10 border border-slate-800">
      <BMICalculator />
    </div>

    <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>

    <div id="bmi-chart" class="bg-slate-900 rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-10 border border-slate-800">
      <BMIChart />
    </div>

    <div id="info" class="bg-slate-900 rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-10 border border-slate-800">
      <InfoSection />
    </div>

    <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>
    <div class="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-amber-300/80 text-xs leading-relaxed">
      <span class="text-base flex-shrink-0">⚠️</span>
      <p><strong class="font-semibold">Disclaimer:</strong> BMI is a screening tool, not a diagnostic measure. Results are for informational purposes only and are not a substitute for professional medical advice. Consult your doctor for a full health assessment.</p>
    </div>
  </main>
</template>
