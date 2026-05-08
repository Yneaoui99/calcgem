<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)

const submit = () => {
  const { name, email, subject, message } = form.value
  if (!name || !email || !message) return
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
  const subj = encodeURIComponent(subject || 'CalcGem Enquiry')
  window.location.href = `mailto:contact@calcgem.com?subject=${subj}&body=${body}`
  submitted.value = true
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-12 space-y-6">
    <div>
      <h1 class="text-3xl font-extrabold text-white mb-1">Contact Us</h1>
      <p class="text-slate-400 text-sm">Got a question, bug report, or calculator suggestion? We read every message.</p>
    </div>

    <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">

      <div v-if="!submitted" class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1.5">Your Name</label>
            <input v-model="form.name" type="text" placeholder="Jane Smith" class="input-field text-base" required />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
            <input v-model="form.email" type="email" placeholder="jane@example.com" class="input-field text-base" required />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">Subject</label>
          <input v-model="form.subject" type="text" placeholder="e.g. Bug report, Feature request…" class="input-field text-base" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">Message</label>
          <textarea v-model="form.message" rows="5" placeholder="Tell us what's on your mind…" class="input-field text-base resize-none" required></textarea>
        </div>

        <button
          @click="submit"
          :disabled="!form.name || !form.email || !form.message"
          class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:-translate-y-0.5"
        >
          Send Message →
        </button>

        <p class="text-xs text-center text-slate-600">
          Or email us directly at
          <a href="mailto:contact@calcgem.com" class="text-indigo-400 hover:text-indigo-300">contact@calcgem.com</a>
        </p>
      </div>

      <div v-else class="text-center py-10 space-y-3">
        <div class="text-4xl">✅</div>
        <h2 class="text-lg font-bold text-white">Message sent!</h2>
        <p class="text-slate-400 text-sm">Your email client should have opened with your message pre-filled. We'll get back to you as soon as possible.</p>
        <button @click="submitted = false; form = { name:'', email:'', subject:'', message:'' }" class="mt-4 text-sm text-indigo-400 hover:text-indigo-300 underline">
          Send another message
        </button>
      </div>
    </div>

    <!-- Contact info cards -->
    <div class="grid sm:grid-cols-2 gap-4">
      <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex items-start gap-3">
        <div class="text-2xl">📧</div>
        <div>
          <div class="text-sm font-bold text-white mb-0.5">Email</div>
          <a href="mailto:contact@calcgem.com" class="text-indigo-400 hover:text-indigo-300 text-sm">contact@calcgem.com</a>
          <p class="text-slate-500 text-xs mt-1">We typically respond within 48 hours.</p>
        </div>
      </div>
      <div class="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex items-start gap-3">
        <div class="text-2xl">🐛</div>
        <div>
          <div class="text-sm font-bold text-white mb-0.5">Bug Reports</div>
          <p class="text-slate-400 text-xs mt-1 leading-relaxed">Found a calculation error? Please include the calculator name, your inputs, and the result you got.</p>
        </div>
      </div>
    </div>
  </div>
</template>
