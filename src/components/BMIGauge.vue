<script setup>
import { computed } from 'vue'

const props = defineProps({ bmi: Number, category: String })

// Gauge: arc from -210deg to 30deg (240deg total sweep), mapped to BMI 10–45
const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARC_FRACTION = 240 / 360

const dashArray = computed(() => CIRCUMFERENCE * ARC_FRACTION)

const dashOffset = computed(() => {
  if (!props.bmi) return dashArray.value
  const clamped = Math.min(Math.max(props.bmi, 10), 45)
  const pct = (clamped - 10) / 35
  return dashArray.value * (1 - pct)
})

const needleAngle = computed(() => {
  if (!props.bmi) return -120
  const clamped = Math.min(Math.max(props.bmi, 10), 45)
  const pct = (clamped - 10) / 35
  return -120 + pct * 240
})

const color = computed(() => {
  if (!props.bmi) return '#94a3b8'
  if (props.bmi < 18.5) return '#3b82f6'
  if (props.bmi < 25)   return '#10b981'
  if (props.bmi < 30)   return '#f59e0b'
  if (props.bmi < 35)   return '#f97316'
  return '#ef4444'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <svg viewBox="0 0 200 120" class="w-56 h-32 overflow-visible">
      <!-- Track -->
      <circle
        cx="100" cy="100" :r="RADIUS"
        fill="none" stroke="#1e293b" stroke-width="14"
        :stroke-dasharray="`${dashArray} ${CIRCUMFERENCE}`"
        stroke-dashoffset="0"
        stroke-linecap="round"
        transform="rotate(-210 100 100)"
      />
      <!-- Colored fill -->
      <circle
        cx="100" cy="100" :r="RADIUS"
        fill="none" :stroke="color" stroke-width="14"
        :stroke-dasharray="`${dashArray} ${CIRCUMFERENCE}`"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        transform="rotate(-210 100 100)"
        class="gauge-fill"
      />
      <!-- Needle -->
      <g :transform="`rotate(${needleAngle} 100 100)`" style="transition: transform 1s cubic-bezier(0.4,0,0.2,1)">
        <line x1="100" y1="100" x2="100" y2="28" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="6" fill="#e2e8f0"/>
      </g>
      <!-- Zone labels -->
      <text x="18"  y="108" class="text-xs" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">10</text>
      <text x="178" y="108" class="text-xs" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">45</text>
    </svg>

    <!-- BMI number -->
    <transition name="fade" mode="out-in">
      <div v-if="bmi" :key="bmi" class="text-center -mt-2">
        <div class="text-5xl font-extrabold" :style="{ color }">{{ bmi }}</div>
        <div class="text-sm font-semibold mt-1 uppercase tracking-widest" :style="{ color }">{{ category }}</div>
      </div>
      <div v-else class="text-center -mt-2 text-slate-500">
        <div class="text-5xl font-extrabold">—</div>
        <div class="text-sm font-semibold mt-1 uppercase tracking-widest">Enter your data</div>
      </div>
    </transition>
  </div>
</template>
