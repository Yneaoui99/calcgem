<script setup>
import { RouterLink } from 'vue-router'
defineProps({ title: String, description: String })
</script>

<template>
  <div>
    <div class="max-w-5xl mx-auto px-4 pt-6">
      <nav class="text-sm text-slate-500 flex items-center gap-1.5">
        <RouterLink to="/" class="hover:text-indigo-400 transition-colors">All Calculators</RouterLink>
        <span>›</span>
        <span class="text-slate-300 font-medium">{{ title }}</span>
      </nav>
    </div>
    <div class="max-w-5xl mx-auto px-4 pt-4 pb-2">
      <h1 class="text-3xl font-extrabold text-white">{{ title }}</h1>
      <p class="text-slate-400 mt-1.5 text-base leading-relaxed">{{ description }}</p>
    </div>
    <main class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>
      <div class="bg-slate-900 rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-10 border border-slate-800">
        <slot name="calculator" />
      </div>
      <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>
      <slot name="info" />
      <div class="ad-slot h-24 w-full"><span>Advertisement</span></div>
      <div class="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 text-amber-300/80 text-xs leading-relaxed">
        <span class="text-base flex-shrink-0">⚠️</span>
        <p><strong class="font-semibold">Disclaimer:</strong> Results provided by CalcGem are for informational and educational purposes only. They are not a substitute for professional medical, financial, or legal advice. Always consult a qualified professional before making decisions based on these results.</p>
      </div>
    </main>
  </div>
</template>
