# SYSP0 — ساختار سایت و اسکلت پروژه (فاز ۱)

> منبع‌ها: `SYSP0-project-context.md` و دو طرح تأییدشده روی canvas (`WebHome` و `WebSysMe`).
> sysp0.com از اینجا در دسترس نبود (دامنه resolve نشد) و در جست‌وجوی وب هم نتیجه‌ای نداشت؛ پس سایت زنده‌ای برای کراول وجود ندارد و «دیتای واقعی» همان چیزی است که در سند زمینه و طرح‌ها آمده.
> محتوای استخراج‌شده در `content/` است. هرجا محتوای واقعی هنوز نیست، با `TODO` یا `placeholder: true` علامت خورده.

---

## ۱. نقشه‌ی سایت (Sitemap)

```
sysp0.com/                 Home: «Start at P0. Build the system.»
├── /me                    Human identity (گرم، انسانی)
├── /sys/me                Engineering identity
│     #p0 Backend · #p1 Infrastructure · #p2 Data & AI · #p3 ?
├── /lab                   Experiments (لیست)
│     └── /lab/[slug]      یک آزمایش
├── /log                   Notes & observations (لیست، بر اساس تاریخ)
│     └── /log/[slug]      یک یادداشت
└── 404                    `cd: no such file or directory`

سیستمی: /rss.xml (برای /log)، /sitemap.xml، /robots.txt، /og/[...] (تصویر OG خودکار)
```

اصل URL: مسیرها «مفهوم» هستند، نه پوشه. از `/about`، `/blog` و `/projects` استفاده نمی‌شود. اصطلاح‌های `#p0..#p2` لنگرهای داخل `/sys/me` هستند (`/sys/me#p1`).

---

## ۲. صفحه‌به‌صفحه

اجزای مشترک همه‌ی صفحه‌ها:
- **Header** (ارتفاع 88، خط پایین Line): لوگو + wordmark چپ؛ منوی مسیرها راست: `/me /sys/me /lab /log` (مسیر فعال نارنجی با زیرخط).
- **PathBar**: مسیر صفحه بالای تیتر به‌صورت `sysp0.com/sys/me` (sys کاربنی، me نارنجی)، با افکت تایپ ترمینالی.
- **Footer** کاربنی: لوگوی معکوس، «There is always another P0.»، مسیرها، کپی‌رایت.

### Home `/`
| # | بخش | محتوا (از `site.json → home`) |
|---|---|---|
| 1 | Hero | PathBar `sysp0.com/`، تیتر «Start at **P0**. Build the system.»، معرفی کوتاه، دکمه‌های `cd /sys/me` (نارنجی) و `cd /me`؛ سمت راست کاشی کاربنی 420px با نماد Root Node |
| 2 | The map | «This site is a system.» + درخت سایت (ریشه‌ی نارنجی `sysp0.com/` و چهار کارت `/me /sys/me /lab /log`)؛ کارت `/sys/me` تگ‌های p0..p2 را دارد |
| 3 | Layers strip (کاربنی) | `P0 → P1 → P2`، سه کارت با «what changed» هر لایه + کارت خط‌چین `#p3 ?` |
| 4 | Lab + Log preview | دو کارت کنار هم: ۳ آزمایش آخر (با status) و ۳ یادداشت آخر (با تاریخ) |
| 5 | Footer | |

### `/sys/me`
| # | بخش | محتوا (از `sys-me.json`) |
|---|---|---|
| 1 | Header | PathBar، تیتر «Engineering identity»، جمله‌ی «Not a résumé…» |
| 2 | Timeline | سه LayerCard روی تایم‌لاین عمودی؛ گره p0 نارنجی، بقیه کاربنی. هر کارت: tag + نام · stack + learned at · **what changed** (بزرگ‌ترین متن، خط نارنجی کنارش). p2 بج «AI: currently exploring» دارد. تایم‌لاین با اسکرول روشن می‌شود |
| 3 | Ghost | کارت خط‌چین `#p3`: «There is always another P0. Follow it in /lab.» |

### `/me`  (هنوز طراحی نشده)
پیشنهاد اولیه، تا محتوا و لحن مشخص شود: PathBar + تیتر انسانی، متن معرفی کوتاه و گرم، بخش «outside the terminal» (علاقه‌ها)، و لینک‌های تماس (ایمیل، GitHub، LinkedIn، Telegram، Instagram). همه‌ی محتوایش `TODO` است.

### `/lab` و `/lab/[slug]`
- لیست: تیتر `/lab`، زیرتیتر «where things become possible»، ردیف‌ها با `title` (mono)، `summary` و بج `status` (`prototype` · `alive` · `weird idea` · …). فیلتر بر اساس status.
- جزئیات: PathBar `sysp0.com/lab/<slug>`، status، tags، تاریخ، بدنه‌ی MDX، لینک repo/demo اختیاری.

### `/log` و `/log/[slug]`
- لیست: «the journey, recorded»، ردیف‌ها با تاریخ (mono) و عنوان، مرتب نزولی، گروه‌بندی بر اساس سال.
- جزئیات: بدنه‌ی MDX با code highlighting، زمان مطالعه، tags، یادداشت قبلی/بعدی.

### 404
صفحه‌ی ترمینالی: `$ cd /whatever` ← `cd: no such file or directory` و دکمه‌ی `cd /`.

---

## ۳. مدل محتوا

| مجموعه | فرمت | فیلدها |
|---|---|---|
| `site` | `content/site.json` | brand، nav، home، me، footer، notFound |
| `sysMe` | `content/sys-me.json` | pathLabel، title، intro، `layers[]` {id, tag, name, stack[], learnedAt, whatChanged, learned[], badge}، ghost |
| `lab` | `content/lab/*.mdx` | frontmatter: title, summary, status, date, tags[], repo?, demo?, placeholder? + بدنه |
| `log` | `content/log/*.mdx` | frontmatter: title, date, tags[], summary?, placeholder? + بدنه |
| `brand` | `content/brand.json` | رنگ‌ها، فونت‌ها، radii، SVG لوگو |

همه‌ی فایل‌ها با Zod اعتبارسنجی می‌شوند تا محتوای ناقص در build خطا بدهد. ورودی‌های `placeholder: true` در production نمایش داده نمی‌شوند (قابل تنظیم).

---

## ۴. استک پیشنهادی

| لایه | انتخاب | چرا |
|---|---|---|
| فریم‌ورک | **Next.js 15 (App Router) + TypeScript**، خروجی static (`output: 'export'`) | سایت کاملاً محتوایی است؛ static یعنی سریع و ارزان |
| استایل | **Tailwind CSS v4** با توکن‌های `brand.json` | |
| محتوا | **MDX** با `next-mdx-remote` یا Velite + Zod | آزمایش‌ها و یادداشت‌ها فقط فایل‌اند، بدون CMS |
| فونت | `next/font/google`: JetBrains Mono، Space Grotesk، Inter | |
| انیمیشن | CSS + `IntersectionObserver` (بدون کتابخانه‌ی سنگین) | تایپ مسیر و روشن شدن تایم‌لاین |
| کد | Shiki برای highlighting در `/log` | |
| SEO | metadata API، `sitemap.ts`، `robots.ts`، RSS، OG image با `@vercel/og` | |
| کیفیت | ESLint، Prettier، Playwright (smoke test صفحه‌ها) | |
| انتشار | **Vercel** (یا Cloudflare Pages؛ چون static است هر دو جواب می‌دهد) | |

زبان: سایت **انگلیسی** ساخته می‌شود (طبق سند زمینه، محتوای سایت انگلیسی است). ساختار طوری است که بعداً بشود نسخه‌ی فارسی RTL با Vazirmatn زیر `/fa` اضافه کرد. Astro هم گزینه‌ی خوبی بود؛ Next.js را انتخاب کردم چون پیش‌فرض پروژه است و برای اضافه کردن بخش‌های پویا در آینده دست‌باز‌تر است.

---

## ۵. اسکلت پروژه

```
sysp0/
├── CLAUDE.md                     راهنمای Claude Code برای همین پروژه
├── package.json
├── next.config.ts                output: 'export'
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   ├── favicon.ico, favicon.svg, apple-touch-icon.png, site.webmanifest   ← از brand kit
│   └── brand/  symbol.svg, symbol-reverse.svg, wordmark.svg
├── content/                      ← همین پوشه‌ی content/ این تحویل
│   ├── site.json
│   ├── sys-me.json
│   ├── brand.json
│   ├── lab/*.mdx
│   └── log/*.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx            فونت‌ها، Header، Footer، metadata
│   │   ├── globals.css           Tailwind + @theme توکن‌ها
│   │   ├── page.tsx              Home
│   │   ├── me/page.tsx
│   │   ├── sys/me/page.tsx
│   │   ├── lab/page.tsx
│   │   ├── lab/[slug]/page.tsx
│   │   ├── log/page.tsx
│   │   ├── log/[slug]/page.tsx
│   │   ├── not-found.tsx
│   │   ├── rss.xml/route.ts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── brand/   Symbol.tsx, Wordmark.tsx, Logo.tsx
│   │   ├── layout/  Header.tsx, NavPaths.tsx, Footer.tsx, PathBar.tsx (typing)
│   │   ├── ui/      CdButton.tsx, Chip.tsx, StatusBadge.tsx, Card.tsx, Eyebrow.tsx
│   │   └── sections/
│   │       ├── home/  Hero.tsx, SiteMapTree.tsx, LayersStrip.tsx, LabLogPreview.tsx
│   │       ├── sys/   Timeline.tsx, LayerCard.tsx, GhostLayer.tsx
│   │       ├── lab/   LabList.tsx, LabRow.tsx
│   │       └── log/   LogList.tsx, LogRow.tsx
│   ├── lib/
│   │   ├── content.ts            خواندن JSON/MDX
│   │   ├── schema.ts             Zod schemas
│   │   └── mdx.tsx               MDX components + Shiki
│   └── hooks/
│       ├── useTypewriter.ts
│       └── useInView.ts
└── tests/
    └── smoke.spec.ts             هر مسیر 200 برگرداند و تیترش درست باشد
```

---

## ۶. ترتیب ساخت (فاز ۲)

1. راه‌اندازی Next.js + Tailwind + توکن‌ها + فونت‌ها؛ Header/Footer/PathBar.
2. Home مطابق طرح canvas (دسکتاپ، بعد موبایل).
3. `/sys/me` با تایم‌لاین.
4. لایه‌ی محتوا (Zod + MDX)، `/lab` و `/log` و صفحه‌های جزئیات.
5. `/me` (با placeholder تا محتوای واقعی برسد) و 404.
6. جزئیات زنده: تایپ مسیر، تایم‌لاین اسکرولی.
7. SEO، RSS، OG، favicon از brand kit، تست smoke، انتشار.

---

## ۷. چیزهایی که از تو لازم است

**برای شروع ساخت لازم نیست؛ placeholder می‌گذارم:**
- نام واقعی Company A / B / C (یا اینکه نمایش داده نشوند).
- محتوای `/me` و لحنش، و لینک‌های تماس.
- آزمایش‌ها و یادداشت‌های واقعی (الان سه‌تا نمونه‌ی هرکدام از طرح canvas است).
- فایل `SYSP0-brand-kit.zip` (برای favicon و SVGها) در پوشه‌ی پروژه.

**تصمیم‌های باز:**
- فقط انگلیسی یا دوزبانه؟ (پیش‌فرض: انگلیسی، آماده برای `/fa`)
- Wordmark نهایی A یا B؟ (پیش‌فرض: B با JetBrains Mono، چون با فونت ساخته می‌شود)
- Vercel یا Cloudflare Pages؟ (پیش‌فرض: Vercel)
