// ─────────────────────────────────────────────────────────────────────────────
// AI Service — OpenRouter
//
// دریافت کلید رایگان (۲ دقیقه):
//   ۱. openrouter.ai رو باز کن
//   ۲. Sign up با گوگل (نیازی به کارت نیست)
//   ۳. منوی بالا → Keys → Create Key
//   ۴. در فایل .env بذار: VITE_OPENROUTER_API_KEY=sk-or-v1-...
// ─────────────────────────────────────────────────────────────────────────────

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

// openrouter/free = OpenRouter خودش بهترین مدل رایگان موجود رو انتخاب می‌کنه
// اگه اون نبود، مدل‌های بعدی امتحان میشن
const MODELS = [
  'openrouter/free',
  'deepseek/deepseek-r1:free',
  'meta-llama/llama-4-maverick:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'google/gemma-3-27b-it:free',
]

async function tryModel(model, messages, apiKey) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer':  'http://localhost:5173',
      'X-Title':       'MangaVerse',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens:  1500,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const e = new Error(err?.error?.message ?? `HTTP ${res.status}`)
    e.status = res.status
    throw e
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('empty response')
  return text
}

async function callAI(messages) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!apiKey || apiKey.includes('your_key') || apiKey.length < 10) {
    throw new Error(
      'کلید OpenRouter تنظیم نشده.\n\n' +
      'مراحل دریافت کلید رایگان:\n' +
      '۱. openrouter.ai رو باز کن\n' +
      '۲. Sign up (رایگان، بدون کارت)\n' +
      '۳. Keys → Create Key\n' +
      '۴. فایل .env:\n' +
      '   VITE_OPENROUTER_API_KEY=sk-or-v1-...\n' +
      '۵. npm run dev رو restart کن'
    )
  }

  let lastError = null
  for (const model of MODELS) {
    try {
      const result = await tryModel(model, messages, apiKey)
      return result
    } catch (e) {
      lastError = e
      // خطای 401 = کلید اشتباه، ادامه نده
      if (e.status === 401 || e.status === 403) break
      // بقیه خطاها = مدل نبود، مدل بعدی رو امتحان کن
    }
  }

  if (lastError?.status === 401 || lastError?.status === 403) {
    throw new Error('کلید API نامعتبر است.\nکلید OpenRouter را در فایل .env چک کن.')
  }
  if (lastError?.status === 429) {
    throw new Error('سقف روزانه تموم شد (50 درخواست).\nفردا دوباره امتحان کن یا $10 شارژ کن.')
  }
  throw new Error('سرویس AI موقتاً در دسترس نیست.\nچند دقیقه صبر کن و دوباره تلاش کن.')
}

// ── Module 3: ترجمه خلاصه مانگا ──────────────────────────────────────────────
export async function translateToFarsi(text) {
  return callAI([
    {
      role: 'system',
      content:
        'You are a professional Persian (Farsi) translator. ' +
        'Translate the given English text to natural, fluent Persian. ' +
        'Output ONLY the Persian translation. No explanation, no extra text.',
    },
    { role: 'user', content: text },
  ])
}

// ── Module 4: پیشنهاد هوشمند مانگا ───────────────────────────────────────────
export async function getAIRecommendations(userInput) {
  const raw = await callAI([
    {
      role: 'system',
      content: `You are an expert manga recommender.
The user describes what manga they want in Persian/Farsi.
Suggest exactly 5 manga titles matching their description.
Reply ONLY with valid JSON (no markdown, no code fences):
{"summary":"یک جمله فارسی","recommendations":[{"title":"English title","titleFa":"فارسی یا خالی","reason":"دلیل به فارسی","searchQuery":"english keyword"}]}`,
    },
    { role: 'user', content: userInput },
  ])

  try {
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  } catch {
    return { summary: 'خطا در پردازش پاسخ', recommendations: [] }
  }
}
