# 🚀 نشر سريع على Netlify - محفظة الآخرة

## خطوات النشر (5 دقائق)

### 1️⃣ تحضير المشروع
```bash
# تثبيت التبعيات
npm install

# اختبار البناء محلياً
npm run build
```

### 2️⃣ Push على GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### 3️⃣ النشر على Netlify

#### أ. اذهب إلى Netlify
- [https://app.netlify.com](https://app.netlify.com)
- سجل دخول بحساب GitHub

#### ب. أضف موقع جديد
1. اضغط **"Add new site"**
2. اختر **"Import an existing project"**
3. اختر **GitHub**
4. ابحث عن **eternal-portfolio**

#### ج. إعدادات البناء
```
Branch: main
Build command: npm run build
Publish directory: dist
```

#### د. متغيرات البيئة
اضغط **"Advanced"** → **"New variable"**:
```
VITE_SUPABASE_URL = [your_supabase_url]
VITE_SUPABASE_ANON_KEY = [your_anon_key]
```

#### هـ. انشر!
- اضغط **"Deploy [site name]"**
- انتظر 2-3 دقائق ⏱️
- ✅ موقعك جاهز!

---

## 📋 Checklist

قبل النشر تأكد من:
- ✅ كل الملفات محفوظة
- ✅ `npm run build` يعمل بدون أخطاء
- ✅ الكود على GitHub
- ✅ لديك URL و Key من Supabase
- ✅ ملف `netlify.toml` موجود
- ✅ ملف `public/_redirects` موجود

---

## 🎯 بعد النشر

### تخصيص اسم الموقع
1. **Site settings** → **Site details** → **Change site name**
2. اختر اسم مثل: `mahfazat-al-akhira`
3. الموقع سيصبح: `https://mahfazat-al-akhira.netlify.app`

### ربط نطاق خاص (اختياري)
1. **Domain settings** → **Add custom domain**
2. أدخل نطاقك (مثل: `mahfazat-akhira.com`)
3. اتبع التعليمات لربط DNS

---

## 🔄 التحديثات التلقائية

من الآن فصاعداً:
- ✅ كل `git push` = نشر تلقائي جديد
- ✅ كل Pull Request = موقع معاينة خاص
- ✅ Rollback فوري عند أي مشكلة

---

## 🆘 مشاكل شائعة

### المشكلة: Build failed
```bash
# جرب محلياً أولاً
npm run build

# إذا نجح، تحقق من متغيرات البيئة في Netlify
```

### المشكلة: صفحة 404
```
الحل: ملف public/_redirects موجود ✅
```

### المشكلة: خطأ Supabase
```
الحل: تحقق من متغيرات البيئة في Netlify
```

---

## 📞 الدعم

- 📚 الدليل الكامل: `NETLIFY_DEPLOYMENT.md`
- 🔧 إعداد البيئة: `ENV_SETUP.md`
- 💬 Netlify Support: [https://answers.netlify.com](https://answers.netlify.com)

---

**🎉 بارك الله فيك! وفقك الله في نشر الخير!**

