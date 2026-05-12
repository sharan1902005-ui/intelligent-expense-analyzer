const rules: [RegExp, string][] = [
  [/uber|lyft|taxi|transit|bus|train|fuel|gas station|shell|bp|chevron/i, 'Transport'],
  [/restaurant|cafe|coffee|starbucks|mcdonald|pizza|food|dining|grubhub|doordash|uber eats/i, 'Food & Dining'],
  [/amazon|walmart|target|costco|shop|store|market/i, 'Shopping'],
  [/netflix|spotify|hulu|disney|subscription|apple|google play/i, 'Subscriptions'],
  [/rent|mortgage|electric|water|internet|utility|comcast|at&t/i, 'Housing & Utilities'],
  [/hospital|pharmacy|doctor|medical|health|cvs|walgreens/i, 'Health'],
  [/gym|sport|fitness|yoga/i, 'Fitness'],
  [/hotel|airbnb|flight|airline|travel|booking/i, 'Travel'],
  [/insurance/i, 'Insurance'],
  [/salary|payroll|deposit|income/i, 'Income'],
]

export function categorize(description: string): string {
  for (const [pattern, category] of rules) {
    if (pattern.test(description)) return category
  }
  return 'Other'
}
