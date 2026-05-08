<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12 space-y-6">
    <h1 class="text-3xl font-extrabold text-white">About CalcGem</h1>

    <!-- Mission -->
    <div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-5 text-slate-400 leading-relaxed text-sm">
      <p class="text-base text-slate-300">
        CalcGem is a free, all-in-one calculator hub designed to help you make smarter decisions about your health, finances, pregnancy, and daily life — with no sign-up, no paywalls, and no fluff.
      </p>

      <section>
        <h2 class="text-base font-bold text-white mb-2">Our Mission</h2>
        <p>
          Most online calculators are outdated, buried in ads, or hidden behind registration walls. We built CalcGem to be different: fast, accurate, and genuinely free. Every tool on this site runs entirely in your browser — we never store your inputs or require an account.
        </p>
      </section>

      <section>
        <h2 class="text-base font-bold text-white mb-2">What We Offer</h2>
        <p class="mb-3">Over <strong class="text-white">34 free calculators</strong> across four major categories:</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div class="rounded-xl bg-blue-950/30 border border-blue-800/40 p-4">
            <div class="text-blue-300 font-bold mb-1">💪 Health &amp; Fitness</div>
            <p class="text-slate-500 text-xs leading-relaxed">BMI, Calories, Body Fat, BMR, Macros, Ideal Weight, Heart Rate, Water Intake, Protein, Sleep, Running Pace, One Rep Max</p>
          </div>
          <div class="rounded-xl bg-pink-950/30 border border-pink-800/40 p-4">
            <div class="text-pink-300 font-bold mb-1">🤰 Pregnancy &amp; Fertility</div>
            <p class="text-slate-500 text-xs leading-relaxed">Due Date, Pregnancy Week, Ovulation, Conception Date, Baby Weight</p>
          </div>
          <div class="rounded-xl bg-violet-950/30 border border-violet-800/40 p-4">
            <div class="text-violet-300 font-bold mb-1">📅 Dates &amp; Time</div>
            <p class="text-slate-500 text-xs leading-relaxed">Age, Days Between Dates, Work Days, Time Duration, Countdown</p>
          </div>
          <div class="rounded-xl bg-emerald-950/30 border border-emerald-800/40 p-4">
            <div class="text-emerald-300 font-bold mb-1">💰 Finance</div>
            <p class="text-slate-500 text-xs leading-relaxed">Mortgage, Loan, Tax, VAT, Compound Interest, Savings, Retirement, ROI, Salary, Currency, Discount, Tip</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-base font-bold text-white mb-2">Accuracy You Can Trust</h2>
        <p>Every calculator on CalcGem is built on established, peer-reviewed formulas — the same ones used by healthcare professionals, certified financial planners, and fitness experts. We document our sources and update our tools when standards evolve.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-white mb-2">Important Disclaimer</h2>
        <p class="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300">
          CalcGem tools are for informational and educational purposes only. They are not a substitute for professional medical, financial, or legal advice. Always consult a qualified professional before making decisions based on our results.
        </p>
      </section>

      <section>
        <h2 class="text-base font-bold text-white mb-2">Get in Touch</h2>
        <p>Have a suggestion, found an error, or want to request a new calculator? We'd love to hear from you.</p>
        <RouterLink to="/contact" class="inline-block mt-3 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all hover:-translate-y-0.5">
          Contact Us →
        </RouterLink>
      </section>
    </div>
  </div>
</template>
