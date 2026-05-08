<script setup>
import { RouterView, RouterLink } from 'vue-router'
import NavBar from './components/NavBar.vue'
import CookieBanner from './components/CookieBanner.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0d0f1a]">
    <NavBar />
    <RouterView />
    <CookieBanner />
    <footer class="border-t border-slate-800 mt-16 py-10 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <img src="/favicon.svg" alt="CalcGem logo" class="w-7 h-7" />
            <span class="font-extrabold text-white">Calc<span class="text-indigo-400">Gem</span></span>
          </div>
          <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <RouterLink to="/about" class="hover:text-slate-300 transition-colors">About</RouterLink>
            <RouterLink to="/contact" class="hover:text-slate-300 transition-colors">Contact</RouterLink>
            <RouterLink to="/privacy-policy" class="hover:text-slate-300 transition-colors">Privacy Policy</RouterLink>
          </nav>
        </div>
        <div class="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p>© {{ new Date().getFullYear() }} CalcGem — Free Calculators for Health, Finance &amp; More</p>
          <p>For informational purposes only. Not a substitute for professional advice.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
