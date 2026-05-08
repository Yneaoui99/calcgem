<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { categories, calculators } from '../calculators.js'

const route = useRoute()
const openMenu = ref(null)
const mobileOpen = ref(false)
const mobileExpanded = ref(null)
let closeTimer = null

const byCategory = computed(() => {
  const map = {}
  for (const cat of categories) {
    map[cat.id] = calculators.filter(c => c.category === cat.id)
  }
  return map
})

const enter = (id) => { clearTimeout(closeTimer); openMenu.value = id }
const leave = () => { closeTimer = setTimeout(() => { openMenu.value = null }, 180) }
const closeAll = () => { openMenu.value = null; mobileOpen.value = false }

const toggleMobile = (id) => {
  mobileExpanded.value = mobileExpanded.value === id ? null : id
}
</script>

<template>
  <header class="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 shadow-lg shadow-black/40">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

      <!-- Logo → Home -->
      <RouterLink to="/" class="flex items-center gap-2 flex-shrink-0" @click="closeAll">
        <img src="/favicon.svg" alt="CalcGem logo" class="w-9 h-9 drop-shadow-lg" />
        <span class="font-extrabold text-xl text-white tracking-tight">Calc<span class="text-indigo-400">Gem</span></span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <div
          v-for="cat in categories" :key="cat.id"
          class="relative"
          @mouseenter="enter(cat.id)"
          @mouseleave="leave"
        >
          <button
            :class="[
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
              openMenu === cat.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            ]"
          >
            <span>{{ cat.icon }}</span>
            {{ cat.label }}
            <svg
              class="w-3.5 h-3.5 text-slate-500 transition-transform duration-200"
              :style="{ transform: openMenu === cat.id ? 'rotate(180deg)' : 'rotate(0deg)' }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Dropdown — uses RouterLink for real navigation -->
          <transition name="fade">
            <div v-if="openMenu === cat.id" class="nav-dropdown" @mouseenter="enter(cat.id)" @mouseleave="leave">
              <RouterLink
                v-for="calc in byCategory[cat.id]"
                :key="calc.id"
                :to="calc.route"
                class="nav-dropdown-item"
                @click="openMenu = null"
              >
                <span class="text-lg leading-none">{{ calc.icon }}</span>
                <span class="flex-1">{{ calc.name }}</span>
                <span v-if="calc.popular" class="badge bg-indigo-900/60 text-indigo-300">Popular</span>
              </RouterLink>
            </div>
          </transition>
        </div>
      </nav>

      <!-- CTA button -->
      <RouterLink
        to="/bmi"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-900/50 transition-all hover:-translate-y-0.5"
      >
        Try BMI Calculator
      </RouterLink>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div v-if="mobileOpen" class="md:hidden border-t border-slate-800 bg-slate-950 max-h-[80vh] overflow-y-auto">
        <div v-for="cat in categories" :key="cat.id">
          <!-- Category toggle -->
          <button
            class="w-full flex items-center justify-between px-5 py-3.5 text-slate-300 font-semibold text-sm hover:bg-slate-900 transition-colors"
            @click="toggleMobile(cat.id)"
          >
            <span class="flex items-center gap-2">{{ cat.icon }} {{ cat.label }}</span>
            <svg
              class="w-4 h-4 text-slate-500 transition-transform duration-200"
              :style="{ transform: mobileExpanded === cat.id ? 'rotate(180deg)' : 'rotate(0deg)' }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <!-- Category items -->
          <div v-if="mobileExpanded === cat.id" class="bg-slate-900/60 border-t border-b border-slate-800">
            <RouterLink
              v-for="calc in byCategory[cat.id]"
              :key="calc.id"
              :to="calc.route"
              class="flex items-center gap-3 px-7 py-3 text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors"
              @click="closeAll"
            >
              <span>{{ calc.icon }}</span>
              <span>{{ calc.name }}</span>
            </RouterLink>
          </div>
        </div>
        <div class="p-4">
          <RouterLink to="/bmi" class="block text-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm" @click="closeAll">
            Try BMI Calculator
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>
