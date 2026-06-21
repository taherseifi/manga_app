# 🗾 MangaVerse

دروازه دیجیتالی دنیای مانگا — پروژه فینال دوره‌های فرانت‌اند

## ✨ ویژگی‌ها

- **ماژول ۱** — Home / Search / Detail با pagination کامل
- **ماژول ۲** — Responsive کامل (320px تا 2560px) + React Router Data Mode
- **ماژول ۳** — ترجمه خلاصه مانگا به فارسی با Claude AI
- **ماژول ۴** — جستجوی هوشمند با AI (Killer Feature)
- 🌙 Dark Mode / ☀️ Light Mode با حافظه‌ی localStorage
- Tailwind CSS

## 📁 ساختار پروژه

```
manga-app/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── src/
    ├── main.jsx              ← Entry point + Router
    ├── App.jsx               ← Root layout
    ├── index.css             ← Tailwind + global styles
    ├── context/
    │   └── ThemeContext.jsx  ← Dark/Light mode context
    ├── pages/
    │   ├── HomePage.jsx      ← / (برترین مانگاها)
    │   ├── SearchPage.jsx    ← /search?q=...
    │   ├── DetailPage.jsx    ← /manga/:id
    │   └── NotFoundPage.jsx  ← 404
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   └── ui/
    │       ├── MangaCard.jsx
    │       ├── MangaCardSkeleton.jsx
    │       ├── MangaGrid.jsx
    │       ├── Pagination.jsx
    │       ├── AIModal.jsx
    │       ├── Spinner.jsx
    │       └── ErrorMessage.jsx
    ├── services/
    │   ├── api.js            ← Axios + Jikan API calls
    │   ├── aiService.js      ← Anthropic Claude API
    │   └── loaders.js        ← React Router Data loaders
    ├── hooks/
    │   ├── useAI.js          ← useTranslation + useAIRecommendations
    │   └── usePagination.js
    └── utils/
        └── format.js         ← formatNumber, statusFa, ...
```

## 🚀 راه‌اندازی

```bash
# ۱. Clone / دانلود
git clone <repo-url>
cd manga-app

# ۲. نصب dependencies
npm install

# ۳. تنظیم env
cp .env.example .env
# کلید Anthropic خودت رو در VITE_ANTHROPIC_API_KEY بذار

# ۴. اجرا
npm run dev
```

## 🔑 متغیرهای محیطی

```env
VITE_API_BASE_URL=https://api.jikan.moe/v4
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

## 🛠 تکنولوژی‌ها

| ابزار | نسخه | کاربرد |
|-------|-------|---------|
| React | 18 | UI |
| React Router | 6 (Data Mode) | Routing + Loaders |
| Axios | 1.7 | HTTP client |
| Tailwind CSS | 3.4 | Styling |
| Vite | 5 | Build tool |
| Jikan API v4 | — | داده مانگا (رایگان) |
| Claude AI | claude-sonnet-4-6 | ترجمه + پیشنهاد |

---

## 🤖 راه‌اندازی هوش مصنوعی (ابرآروان)

### گام ۱ — ساخت حساب
به [console.arvancloud.ir](https://console.arvancloud.ir) برو و ثبت‌نام کن.

### گام ۲ — ساخت Endpoint
1. از منوی سمت چپ روی **هوش مصنوعی** کلیک کن
2. دکمه **Endpoint جدید** رو بزن
3. یه مدل انتخاب کن (مثلاً `Llama-3.3-70B-Instruct`)
4. اسم بذار و **ایجاد** کن

### گام ۳ — دریافت کلید API
1. وارد Endpoint شو
2. از بخش **کلیدهای API** → **کلید جدید**
3. کلید رو کپی کن (یه بار نشون داده میشه!)
4. آدرس Endpoint (Base URL) رو هم برداشت کن

### گام ۴ — تنظیم پروژه
```bash
cp .env.example .env
```
فایل `.env` رو باز کن و مقادیر رو پر کن:
```env
VITE_ARVAN_API_KEY=كليد_شما_اينجا
VITE_ARVAN_BASE_URL=https://...your-endpoint.../v1
VITE_ARVAN_MODEL=Llama-3.3-70B-Instruct
```
