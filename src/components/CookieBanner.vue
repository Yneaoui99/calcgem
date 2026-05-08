<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem('cookie_consent')) visible.value = true
})

const accept = () => {
  localStorage.setItem('cookie_consent', 'accepted')
  visible.value = false
}

const decline = () => {
  localStorage.setItem('cookie_consent', 'declined')
  visible.value = false
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-0 inset-x-0 z-50 p-4 md:p-5"
    >
      <div class="max-w-4xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex-1 text-sm text-slate-400 leading-relaxed">
          <span class="text-white font-semibold">We use cookies</span> to analyse traffic and serve personalised ads via Google AdSense.
          By clicking <span class="text-white font-medium">Accept</span>, you consent to our use of cookies as described in our
          <RouterLink to="/privacy-policy" class="text-indigo-400 hover:text-indigo-300 underline">Privacy Policy</RouterLink>.
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
          <button
            @click="decline"
            class="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
          >
            Decline
          </button>
          <button
            @click="accept"
            class="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40 transition-all hover:-translate-y-0.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
