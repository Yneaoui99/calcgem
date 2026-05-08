<script setup>
const faqs = [
  { q: 'What is BMI?', a: 'Body Mass Index (BMI) is a simple numerical value calculated from your height and weight. It is widely used as a screening tool to identify possible weight problems in adults. While it is not a direct measure of body fat, it correlates well with more direct measures in most people.' },
  { q: 'How is BMI calculated?', a: 'In metric units, BMI = weight (kg) ÷ height² (m²). In imperial units, BMI = (weight (lbs) ÷ height² (in²)) × 703. For example, a person who is 175 cm tall and weighs 70 kg has a BMI of 70 ÷ (1.75)² = 22.9.' },
  { q: 'Is BMI accurate for everyone?', a: 'BMI is a general screening tool, not a diagnostic one. It may overestimate body fat in athletes and muscular individuals, and underestimate it in older adults who have lost muscle mass. It also does not account for fat distribution, which can be a key health indicator.' },
  { q: 'What BMI is considered healthy?', a: 'For most adults, a BMI between 18.5 and 24.9 is considered healthy. Values below 18.5 suggest underweight, 25–29.9 is overweight, and 30 or above falls into the obesity range. These thresholds may vary slightly for different ethnicities.' },
  { q: 'How can I reach a healthy BMI?', a: 'Achieving a healthy BMI involves a combination of a balanced, calorie-appropriate diet and regular physical activity (at least 150 minutes of moderate exercise per week). Consulting a registered dietitian or healthcare provider gives you a plan personalised to your needs.' },
]

import { ref } from 'vue'
const open = ref(null)
const toggle = (i) => { open.value = open.value === i ? null : i }
</script>

<template>
  <section class="space-y-10">
    <div>
      <h2 class="text-2xl font-bold text-white mb-4">What Is BMI and Why Does It Matter?</h2>
      <p class="text-slate-400 leading-relaxed">
        Body Mass Index (BMI) is one of the most widely used indicators of body weight relative to height.
        Developed in the 19th century by Belgian mathematician Adolphe Quetelet, it has become the global
        standard for categorising weight status in adults. While it does not directly measure body fat,
        research consistently shows that BMI correlates with metabolic risk factors including cardiovascular
        disease, type 2 diabetes, hypertension, and certain cancers.
      </p>
      <p class="text-slate-400 leading-relaxed mt-4">
        Understanding your BMI is a first step — not a final verdict. Use it alongside other indicators
        such as waist circumference, blood pressure, blood sugar, and physical fitness for a full picture
        of your health.
      </p>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-white mb-6">Tips for a Healthy BMI</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tip in [
          { icon:'🥗', title:'Eat Balanced Meals',  text:'Fill half your plate with vegetables and fruit, a quarter with lean protein, and a quarter with whole grains.' },
          { icon:'🏃', title:'Move Every Day',       text:'Aim for at least 30 minutes of moderate activity (brisk walking, cycling, swimming) most days of the week.' },
          { icon:'💧', title:'Stay Hydrated',        text:'Drinking enough water can aid metabolism and reduce unnecessary snacking triggered by thirst.' },
          { icon:'😴', title:'Prioritise Sleep',     text:'Poor sleep disrupts hunger hormones (ghrelin and leptin), often leading to overeating the next day.' },
          { icon:'🧘', title:'Manage Stress',        text:'Chronic stress elevates cortisol, which can lead to fat storage especially around the abdomen.' },
          { icon:'🩺', title:'Regular Check-ups',    text:'Annual health screenings catch risk factors early, making them far easier to address.' },
        ]" :key="tip.title" class="p-5 rounded-2xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors">
          <div class="text-3xl mb-3">{{ tip.icon }}</div>
          <div class="font-bold text-slate-100 mb-1">{{ tip.title }}</div>
          <p class="text-sm text-slate-400 leading-relaxed">{{ tip.text }}</p>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="rounded-2xl border border-slate-700 overflow-hidden">
          <button class="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-slate-800 transition-colors" @click="toggle(i)">
            <span class="font-semibold text-slate-200">{{ faq.q }}</span>
            <span class="text-indigo-400 text-xl flex-shrink-0 transition-transform duration-300" :style="{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }">+</span>
          </button>
          <div v-show="open === i" class="px-6 pb-5">
            <p class="text-slate-400 leading-relaxed text-sm">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-slate-800 border border-slate-700">
      <p class="text-xs text-slate-500 leading-relaxed">
        <strong class="text-slate-400">Medical Disclaimer:</strong> The information provided by this calculator is for general informational
        purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
        Always seek the advice of a qualified health provider with any questions you may have regarding
        your weight or health condition.
      </p>
    </div>
  </section>
</template>
