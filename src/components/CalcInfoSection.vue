<script setup>
import { ref } from 'vue'
defineProps({
  intro: String,
  formula: String,
  tips: Array,
  faqs: Array,
  disclaimer: String,
})
const open = ref(null)
const toggle = (i) => { open.value = open.value === i ? null : i }
</script>

<template>
  <div class="space-y-6">
    <div v-if="intro" class="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm">
      <div class="text-slate-300 leading-relaxed [&_h2]:text-white [&_h2]:font-extrabold [&_strong]:text-white" v-html="intro"></div>
    </div>

    <div v-if="formula" class="bg-indigo-950/60 border border-indigo-800/50 rounded-2xl p-6">
      <h3 class="font-bold text-indigo-300 mb-2">How It's Calculated</h3>
      <pre class="font-mono text-sm text-indigo-200 whitespace-pre-wrap">{{ formula }}</pre>
    </div>

    <div v-if="tips?.length" class="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm">
      <h2 class="text-xl font-extrabold text-white mb-5">Tips & Recommendations</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tip in tips" :key="tip.title" class="p-4 rounded-2xl bg-slate-800 border border-slate-700">
          <div class="text-2xl mb-2">{{ tip.icon }}</div>
          <div class="font-bold text-slate-100 text-sm mb-1">{{ tip.title }}</div>
          <p class="text-xs text-slate-400 leading-relaxed">{{ tip.text }}</p>
        </div>
      </div>
    </div>

    <div v-if="faqs?.length" class="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm">
      <h2 class="text-xl font-extrabold text-white mb-5">Frequently Asked Questions</h2>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="rounded-2xl border border-slate-700 overflow-hidden">
          <button class="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-slate-800 transition-colors" @click="toggle(i)">
            <span class="font-semibold text-slate-200 text-sm">{{ faq.q }}</span>
            <span class="text-indigo-400 text-xl flex-shrink-0 transition-transform duration-300" :style="{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }">+</span>
          </button>
          <div v-show="open === i" class="px-5 pb-4">
            <p class="text-slate-400 text-sm leading-relaxed">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="disclaimer" class="p-4 rounded-xl bg-slate-900 border border-slate-800">
      <p class="text-xs text-slate-500 leading-relaxed"><strong class="text-slate-400">Note:</strong> {{ disclaimer }}</p>
    </div>
  </div>
</template>
