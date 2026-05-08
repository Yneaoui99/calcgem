export const categories = [
  { id: 'health',    label: 'Health & Fitness',     icon: '💪', color: 'blue'    },
  { id: 'pregnancy', label: 'Pregnancy & Fertility', icon: '🤰', color: 'pink'    },
  { id: 'dates',     label: 'Dates & Time',          icon: '📅', color: 'violet'  },
  { id: 'finance',   label: 'Finance',               icon: '💰', color: 'emerald' },
]

export const calculators = [
  // Health & Fitness
  { id:'bmi',              category:'health',    name:'BMI Calculator',         icon:'⚖️',  route:'/bmi',              desc:'Calculate your Body Mass Index and find your healthy weight range.',                         popular:true  },
  { id:'calories',         category:'health',    name:'Calorie Calculator',     icon:'🔥',  route:'/calories',         desc:'Find your Total Daily Energy Expenditure (TDEE) based on your activity level.'                          },
  { id:'ideal-weight',     category:'health',    name:'Ideal Weight',           icon:'🎯',  route:'/ideal-weight',     desc:'Find your ideal body weight based on height, age, and frame size.'                                   },
  { id:'body-fat',         category:'health',    name:'Body Fat %',             icon:'📏',  route:'/body-fat',         desc:'Estimate your body fat percentage using body measurements (US Navy method).'                          },
  { id:'heart-rate',       category:'health',    name:'Heart Rate Zones',       icon:'❤️',  route:'/heart-rate',       desc:'Calculate your target heart rate zones for optimal training intensity.'                               },
  { id:'water-intake',     category:'health',    name:'Daily Water Intake',     icon:'💧',  route:'/water-intake',     desc:'Calculate your recommended daily water intake based on weight and activity.'                          },
  { id:'bmr',              category:'health',    name:'BMR Calculator',         icon:'⚡',  route:'/bmr',              desc:'Calculate your Basal Metabolic Rate — calories burned at complete rest.'                              },
  { id:'macros',           category:'health',    name:'Macro Calculator',       icon:'🥩',  route:'/macros',           desc:'Get your ideal protein, carbs, and fat breakdown for your fitness goals.'                             },
  { id:'protein',          category:'health',    name:'Protein Calculator',     icon:'💪',  route:'/protein',          desc:'Find your daily protein needs based on your weight, goals, and activity level.'                       },
  { id:'one-rep-max',      category:'health',    name:'One Rep Max',            icon:'🏋️', route:'/one-rep-max',      desc:'Estimate your maximum lift weight from your reps and weight using the Epley formula.'                 },
  { id:'running-pace',     category:'health',    name:'Running Pace',           icon:'🏃',  route:'/running-pace',     desc:'Calculate your running pace, time, or distance for any race distance.'                               },
  { id:'sleep',            category:'health',    name:'Sleep Calculator',       icon:'😴',  route:'/sleep',            desc:'Find the best bedtime or wake-up time based on 90-minute sleep cycles.'                               },
  // Pregnancy & Fertility
  { id:'due-date',         category:'pregnancy', name:'Due Date Calculator',    icon:'👶',  route:'/due-date',         desc:"Estimate your baby's due date based on your last menstrual period.",                 popular:true  },
  { id:'pregnancy-week',   category:'pregnancy', name:'Pregnancy Week',         icon:'🤰',  route:'/pregnancy-week',   desc:'Find out exactly how many weeks pregnant you are and what to expect this week.'                       },
  { id:'ovulation',        category:'pregnancy', name:'Ovulation Calculator',   icon:'🌸',  route:'/ovulation',        desc:'Identify your most fertile days to maximize your chances of conception.'                              },
  { id:'conception-date',  category:'pregnancy', name:'Conception Date',        icon:'📍',  route:'/conception-date',  desc:'Estimate when conception occurred based on your due date or last period.'                             },
  { id:'baby-weight',      category:'pregnancy', name:'Baby Weight Percentile', icon:'🍼',  route:'/baby-weight',      desc:"Check if your baby's weight is within the healthy WHO percentile range."                            },
  // Dates & Time
  { id:'age',              category:'dates',     name:'Age Calculator',         icon:'🎂',  route:'/age',              desc:'Calculate your exact age in years, months, days, hours, and minutes.',         popular:true  },
  { id:'days-between',     category:'dates',     name:'Days Between Dates',     icon:'📆',  route:'/days-between',     desc:'Find the exact number of days, weeks, or months between any two dates.'                              },
  { id:'work-days',        category:'dates',     name:'Working Days',           icon:'💼',  route:'/work-days',        desc:'Count working days between two dates, excluding weekends and holidays.'                               },
  { id:'time-duration',    category:'dates',     name:'Time Duration',          icon:'⏱️',  route:'/time-duration',    desc:'Add or subtract time durations and calculate elapsed time precisely.'                                },
  { id:'countdown',        category:'dates',     name:'Countdown Timer',        icon:'⏳',  route:'/countdown',        desc:'Calculate how many days, hours, minutes until any future event or deadline.'                         },
  // Finance
  { id:'tax',              category:'finance',   name:'Income Tax Calculator',  icon:'🧾',  route:'/tax',              desc:'Estimate your income tax liability and effective tax rate (US federal).',       popular:true  },
  { id:'mortgage',         category:'finance',   name:'Mortgage Calculator',    icon:'🏠',  route:'/mortgage',         desc:'Calculate monthly mortgage payments, total interest, and total cost.'                                },
  { id:'loan',             category:'finance',   name:'Loan Calculator',        icon:'🏦',  route:'/loan',             desc:'Calculate monthly payments and total cost for any personal or auto loan.'                            },
  { id:'compound-interest',category:'finance',   name:'Compound Interest',      icon:'📈',  route:'/compound-interest',desc:'See how your savings grow over time with the power of compound interest.'                            },
  { id:'savings',          category:'finance',   name:'Savings Goal',           icon:'🏦',  route:'/savings',          desc:'Find out how long to reach your savings goal with regular contributions.'                            },
  { id:'retirement',       category:'finance',   name:'Retirement Calculator',  icon:'🌴',  route:'/retirement',       desc:'Project how much you will have saved by retirement and if it is enough.'                             },
  { id:'roi',              category:'finance',   name:'ROI Calculator',         icon:'💹',  route:'/roi',              desc:'Calculate the return on investment percentage for any financial decision.'                            },
  { id:'tip',              category:'finance',   name:'Tip Calculator',         icon:'🍽️', route:'/tip',              desc:'Calculate the tip amount and split the bill fairly among multiple people.'                           },
  { id:'discount',         category:'finance',   name:'Discount Calculator',    icon:'🏷️', route:'/discount',         desc:'Calculate the final price after any percentage or flat discount instantly.'                          },
  { id:'vat',              category:'finance',   name:'VAT / Tax Calculator',   icon:'🧮',  route:'/vat',              desc:'Add or remove VAT / sales tax from any price with a single click.'                                  },
  { id:'salary',           category:'finance',   name:'Salary Calculator',      icon:'💵',  route:'/salary',           desc:'Convert between hourly, weekly, monthly, and annual salary figures.'                                },
  { id:'currency',         category:'finance',   name:'Currency Converter',     icon:'💱',  route:'/currency',         desc:'Convert between 30 major world currencies with up-to-date rates.'                                   },
]
