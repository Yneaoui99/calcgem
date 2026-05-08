import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',                 component: () => import('../pages/Home.vue') },
  // Health & Fitness
  { path: '/bmi',              component: () => import('../pages/calculators/BMI.vue') },
  { path: '/calories',         component: () => import('../pages/calculators/Calories.vue') },
  { path: '/ideal-weight',     component: () => import('../pages/calculators/IdealWeight.vue') },
  { path: '/body-fat',         component: () => import('../pages/calculators/BodyFat.vue') },
  { path: '/heart-rate',       component: () => import('../pages/calculators/HeartRate.vue') },
  { path: '/water-intake',     component: () => import('../pages/calculators/WaterIntake.vue') },
  { path: '/bmr',              component: () => import('../pages/calculators/BMR.vue') },
  { path: '/macros',           component: () => import('../pages/calculators/Macros.vue') },
  { path: '/protein',          component: () => import('../pages/calculators/Protein.vue') },
  { path: '/one-rep-max',      component: () => import('../pages/calculators/OneRepMax.vue') },
  { path: '/running-pace',     component: () => import('../pages/calculators/RunningPace.vue') },
  { path: '/sleep',            component: () => import('../pages/calculators/Sleep.vue') },
  // Pregnancy & Fertility
  { path: '/due-date',         component: () => import('../pages/calculators/DueDate.vue') },
  { path: '/pregnancy-week',   component: () => import('../pages/calculators/PregnancyWeek.vue') },
  { path: '/ovulation',        component: () => import('../pages/calculators/Ovulation.vue') },
  { path: '/conception-date',  component: () => import('../pages/calculators/ConceptionDate.vue') },
  { path: '/baby-weight',      component: () => import('../pages/calculators/BabyWeight.vue') },
  // Dates & Time
  { path: '/age',              component: () => import('../pages/calculators/Age.vue') },
  { path: '/days-between',     component: () => import('../pages/calculators/DaysBetween.vue') },
  { path: '/work-days',        component: () => import('../pages/calculators/WorkDays.vue') },
  { path: '/time-duration',    component: () => import('../pages/calculators/TimeDuration.vue') },
  { path: '/countdown',        component: () => import('../pages/calculators/Countdown.vue') },
  // Finance
  { path: '/tax',              component: () => import('../pages/calculators/Tax.vue') },
  { path: '/mortgage',         component: () => import('../pages/calculators/Mortgage.vue') },
  { path: '/loan',             component: () => import('../pages/calculators/Loan.vue') },
  { path: '/compound-interest',component: () => import('../pages/calculators/CompoundInterest.vue') },
  { path: '/savings',          component: () => import('../pages/calculators/Savings.vue') },
  { path: '/retirement',       component: () => import('../pages/calculators/Retirement.vue') },
  { path: '/roi',              component: () => import('../pages/calculators/ROI.vue') },
  { path: '/tip',              component: () => import('../pages/calculators/Tip.vue') },
  { path: '/discount',         component: () => import('../pages/calculators/Discount.vue') },
  { path: '/vat',              component: () => import('../pages/calculators/VAT.vue') },
  { path: '/salary',           component: () => import('../pages/calculators/Salary.vue') },
  { path: '/currency',         component: () => import('../pages/calculators/Currency.vue') },
  // Info pages
  { path: '/about',            component: () => import('../pages/About.vue') },
  { path: '/contact',          component: () => import('../pages/Contact.vue') },
  { path: '/privacy-policy',   component: () => import('../pages/PrivacyPolicy.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return saved || { top: 0, behavior: 'smooth' }
  },
})
