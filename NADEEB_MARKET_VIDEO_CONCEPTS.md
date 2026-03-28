# نديب — مفاهيم الفيديو والصور والتحسينات البصرية
> ملف مرجعي لتوليد الأصول البصرية وتطوير الواجهات

---

## 🎬 الجزء الأول: أفري الفيديو — AI Video Generation Prompts

### 📌 تعليمات الاستخدام
استخدم هذه الأفري مع: **Runway Gen-3**, **Sora**, **Pika 2.0**, أو **Kling AI**
- المدة المثلى: **8–12 ثانية** للـ loop
- الجودة: **1920×1080** minimum, **4K** مفضل
- الأسلوب: cinematic, smooth camera movement, no text in video
- التصدير: MP4, H.264, حجم أقل من 8MB بعد الضغط

---

### 🕋 فيديو ١ — صفحة المناديب

**المشهد المطلوب:**
مندوب يمشي بثقة في ساحة المسجد الحرام أو المسجد النبوي — يحمل هاتفاً ذكياً، ملابس نظيفة رسمية، يوجّه حاجاً بشكل ودي. الكاميرا تتحرك ببطء من الخلف إلى الأمام (dolly forward). إضاءة ذهبية مائلة للغروب.

**English AI Prompt:**
```
Cinematic slow-motion footage of a professional Saudi guide in formal white thobe confidently walking through the marble courtyard of Masjid al-Haram, Mecca. He is looking at a smartphone app while gently directing a pilgrim family. Warm golden hour lighting, shallow depth of field. Camera slowly dollies forward. Ultra-realistic, 4K, no text overlay. Serene, professional atmosphere. Sacred environment.
```

**Arabic Reference Description:**
```
مشهد سينمائي بالحركة البطيئة — مندوب سعودي محترف بثوب أبيض يمشي بثقة في ساحة المسجد الحرام. يمسك هاتفاً ذكياً ويوجه حاجاً بأدب. إضاءة ذهبية دافئة لوقت الغروب. كاميرا تتقدم ببطء. لا نصوص في الفيديو.
```

**الانتقال والتحريك في Next.js:**
```
- الفيديو يعمل autoplay + muted + loop
- overlay: linear-gradient(to bottom, rgba(13,68,65,0.7) 0%, rgba(13,68,65,0.85) 100%)
- عند تحميل الصفحة: video يبدأ بـ opacity 0 → 1 خلال 1.5s (fade in)
- المحتوى فوق الفيديو: يظهر بتأخير 0.8s مع translateY(30px) → 0
- على الجوال: استبدل الفيديو بصورة ثابتة (poster attribute) لتوفير البيانات
```

---

### 🏢 فيديو ٢ — صفحة الشركات

**المشهد المطلوب:**
مشهد aerial لمكة المكرمة من الأعلى، يظهر فيه المسجد الحرام وأبراج البيت في الليل مع الأضواء. ثم cut سلس لمشهد داخلي لشخص أمام شاشة dashboard على حاسوب — بيانات، خرائط، مؤشرات.

**English AI Prompt (Scene 1 — Aerial):**
```
Stunning aerial drone footage of Mecca at night, the Grand Mosque illuminated with golden lights, Abraj Al-Bait towers glowing in the background. Slow smooth drone rotation. Cinematic color grading, deep blue sky, warm gold highlights. 4K ultra-realistic. No text.
```

**English AI Prompt (Scene 2 — Dashboard):**
```
Close-up shot of a professional's hands typing on a sleek laptop showing a modern Arabic operations dashboard with maps, charts and real-time data. Bokeh office background. Blue and green accent colors. Cinematic lighting. Professional B2B tech aesthetic.
```

**الانتقال والتحريك في Next.js:**
```
- Scene 1 → Scene 2 cross-dissolve بعد 6 ثوانٍ (2 فيديوهات متداخلة بـ CSS opacity transition)
- overlay على Scene 1: rgba(26,26,46,0.75)
- overlay على Scene 2: rgba(26,26,46,0.6)
- المحتوى: يظهر بـ stagger — Badge أولاً (0.3s)، العنوان (0.6s)، النص (0.9s)
- تأثير عند scroll: ParallaxY خفيف على الفيديو (-20px) للعمق
```

---

### 📈 فيديو ٣ — صفحة المستثمرين

**المشهد المطلوب:**
مشهد مميز: من الأعلى، حشد الطواف حول الكعبة المشرفة — حركة دائرية بطيئة جداً، مبهرة، تُشعر بضخامة السوق. الكاميرا تبتعد ببطء (zoom out).

**English AI Prompt:**
```
Breathtaking aerial timelapse of Tawaf around the Kaaba in Masjid al-Haram, Mecca. Thousands of pilgrims in white ihram circling the black cube. Ultra-slow zoom out movement. Golden and white lighting contrast. Sacred, awe-inspiring, cinematic. Deep dark background making the illuminated mosque glow. 4K. No text. Shot from directly above, slowly pulling back.
```

**الانتقال والتحريك في Next.js:**
```
- Parallax scroll: الفيديو يتحرك بـ 50% سرعة الـ scroll (backgroundAttachment: fixed effect)
- overlay: radial-gradient(ellipse at center, rgba(26,22,16,0.4) 0%, rgba(26,22,16,0.9) 100%)
- في منتصف الصفحة عند الـ scroll: الأرقام الكبيرة (٢٠ مليار) تظهر بتأثير count-up animation
- KenBurns effect: الفيديو يكبر ببطء من 100% → 110% خلال 12 ثانية
```

---

## 🖼️ الجزء الثاني: الصور الثابتة (Poster + Fallback)

### لكل صفحة: صورة Poster للجوال وعند عدم دعم الفيديو

**صورة المناديب:**
```
AI Image Prompt:
Professional Saudi male guide in white traditional thobe standing in the marble 
courtyard of Masjid al-Nabawi (Prophet's Mosque) in Medina. He looks confidently 
at camera, holding a smartphone. Soft warm morning light, green dome visible in 
background. Ultra-realistic photography style, 8K, shallow depth of field, 
professional portrait orientation.
```

**صورة الشركات:**
```
AI Image Prompt:
Aerial view of Mecca city and Masjid al-Haram complex at dusk, golden hour 
lighting. Modern architecture meets Islamic architecture. Wide cinematic shot. 
Deep blue sky, warm lights. Ultra-realistic, 8K, landscape orientation.
```

**صورة المستثمرين:**
```
AI Image Prompt:
Awe-inspiring top-down aerial view of pilgrims performing Tawaf around the Kaaba 
in Mecca. White ihram garments form circular patterns. Sacred and magnificent 
atmosphere. Golden lighting. Shot from 200m altitude directly above. 8K, 
cinematic color grading.
```

---

## ✨ الجزء الثالث: مقترحات تحسينات UI إضافية لنديب

### 1. 🎭 Hero Video Implementation (الأولوية القصوى)

**الملف المطلوب تعديله:** `components/sections/Hero.tsx`

```tsx
// Hero Component مع Video Background
<section className="relative min-h-[70vh] overflow-hidden">
  {/* Video Background */}
  <video
    autoPlay muted loop playsInline
    poster="/videos/delegates-poster.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/delegates-hero.mp4" type="video/mp4" />
  </video>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
  
  {/* Content */}
  <div className="relative z-10 ...">
    {/* Badge + Title + Subtitle */}
  </div>
  
  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-6 h-6 text-white/60" />
  </div>
</section>
```

---

### 2. 🃏 تحسين البطاقات — Card Enhancements

**بدلاً من بطاقات مستطيلة متكررة، استخدم:**

**أ. Bento Grid Layout (مستوحى من Apple):**
```
┌──────────────────┬──────────┐
│                  │          │
│  Feature Card    │  Stat    │
│  (Large - 2/3)   │  Card    │
│                  │  (1/3)   │
├────────┬─────────┴──────────┤
│ Small  │                    │
│ Card   │  Wide Feature Card │
│        │  (2/3 width)       │
└────────┴────────────────────┘
```

**ب. Icon Cards with Hover Depth:**
```css
/* بطاقة ترتفع عند hover مع ظل عميق */
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(21, 102, 97, 0.15);
}
```

**ج. Numbered Steps (للمناديب خاصة):**
```
01 → 02 → 03 → 04
سجّل  تلقَّ  أنجز  اكسب
```

---

### 3. 🌊 Scroll Animations — تحسينات التحريك

```tsx
// Staggered reveal للبطاقات
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
```

**تحريكات إضافية:**
- **Counter Animation:** الأرقام تعد من 0 للرقم الحقيقي عند الدخول للـ viewport
- **Underline Animation:** الخط الذهبي تحت العناوين يمتد من اليسار لليمين عند الـ scroll
- **Card Reveal:** البطاقات تظهر بزاوية خفيفة (rotateX: 10deg → 0)

---

### 4. 🎨 Visual Enhancements إضافية

**أ. Arabic Typography — تحسين الخطوط:**
```css
/* استخدام Cairo ExtraBold للعناوين */
.hero-title {
  font-family: 'Cairo', sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Gradient Text للأرقام الكبيرة */
.metric-number {
  background: linear-gradient(135deg, #c0973b, #f0c060);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**ب. Section Dividers — فواصل بصرية:**
```
بدلاً من سطر أفقي بسيط، استخدم:
- موجة SVG بين الأقسام (wave divider)
- زاوية مائلة (angled divider) بـ clip-path
- نقش إسلامي خفيف SVG (geometric border)
```

**ج. Form Enhancement — تحسين النماذج:**
```
✦ Progress indicator فوق النموذج (خطوة 1 من 1 أو progress bar)
✦ Floating labels (labels تطفو عند الكتابة)
✦ Input success state (أيقونة ✓ خضراء عند التحقق)
✦ Submit button: loading spinner أثناء الإرسال
✦ Ripple effect على الزر عند الضغط
```

**د. Trust Signals — عناصر الثقة:**
```
أضف تحت النموذج:
┌─────────────────────────────┐
│ 🔒 بياناتك محمية ومشفرة     │
│ ✅ لا رسائل مزعجة           │
│ ⚡ رد خلال 48 ساعة          │
└─────────────────────────────┘
```

---

### 5. 📱 Mobile-Specific Improvements

**أ. Sticky CTA على الجوال:**
```tsx
// زر عائم في الأسفل على الجوال فقط
<div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden z-50">
  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold">
    سجّل اهتمامك الآن ←
  </button>
</div>
```

**ب. Swipe Cards على الجوال:**
```
البطاقات على الجوال تصبح carousel قابل للـ swipe
بدلاً من stack عمودي طويل
```

**ج. Bottom Sheet للنموذج:**
```
على الجوال: النموذج يفتح كـ Bottom Sheet (يصعد من الأسفل)
بدلاً من scroll طويل للوصول إليه
```

---

### 6. 🌙 Dark Mode Support

```tsx
// إضافة dark mode بسيط
// أو إبقاء الصفحات بـ dark hero + light content (الوضع الحالي)
// الأفضل: إبقاء design موحد لصفحات تسويقية (no dark toggle)
```

---

### 7. 📊 Social Proof Section (بعد النموذج مباشرة)

**بدلاً من Stats قبل الفوتر، أضف قسم ثقة خفيف:**

```
"يثق بنا ..."
[Logo] [Logo] [Logo] [Logo]
شركات عمرة معتمدة

أو:

"ماذا يقول المناديب الأوائل؟"
Quote + اسم + مدينة
(Testimonial واحد فقط، بسيط، موثوق)
```

---

## 📁 هيكل الأصول المقترح

```
nadeeb-market/public/
├── videos/
│   ├── delegates-hero.mp4       ← فيديو صفحة المناديب (مضغوط < 8MB)
│   ├── delegates-poster.jpg     ← صورة ثابتة كـ fallback
│   ├── companies-hero.mp4       ← فيديو صفحة الشركات
│   ├── companies-poster.jpg
│   ├── investors-hero.mp4       ← فيديو صفحة المستثمرين
│   └── investors-poster.jpg
├── images/
│   ├── logo.png                 ← موجود ✅
│   ├── logo-white.png           ← نسخة بيضاء للـ hero الداكن
│   └── pattern-islamic.svg      ← نقش هندسي إسلامي للخلفيات
└── icons/
    └── favicon.ico
```

---

## 🛠️ خطوات التنفيذ بالترتيب

| الأولوية | المهمة | الوقت التقديري |
|----------|--------|----------------|
| 🔴 عالية | توليد / إيجاد الفيديوهات الثلاثة | خارجي |
| 🔴 عالية | تحديث Hero component لدعم video background | 1 ساعة |
| 🟡 متوسطة | Sticky CTA على الجوال | 30 دقيقة |
| 🟡 متوسطة | Counter animation للأرقام | 30 دقيقة |
| 🟡 متوسطة | Wave divider بين الأقسام | 20 دقيقة |
| 🟢 منخفضة | Testimonial section | 1 ساعة |
| 🟢 منخفضة | Bottom sheet form على الجوال | 2 ساعة |

---

## ⚙️ برومبت Claude Code لتطبيق الفيديو (بعد توفر الملفات)

```
عندما تكون الفيديوهات جاهزة في:
/home/abotrf/projects/programming/nadeeb-market/public/videos/

شغّل هذا الأمر لتطبيق التحديث:
ANTHROPIC_API_KEY="" claude --dangerously-skip-permissions -p "
Update Hero.tsx to support video backgrounds:
1. Add video prop to HeroProps interface: videoSrc?: string, posterSrc?: string
2. When videoSrc is provided, render <video autoPlay muted loop playsInline poster={posterSrc}> behind the content
3. Add gradient overlay on top of video: from-black/70 to-black/80
4. Add ChevronDown scroll indicator at bottom
5. Fallback to existing gradient when no video provided
6. Update delegates/page.tsx, companies/page.tsx, investors/page.tsx to pass videoSrc props
7. npm run build — must succeed
"
```
