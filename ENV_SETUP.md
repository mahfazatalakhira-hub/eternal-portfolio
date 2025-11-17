# إعداد متغيرات البيئة Environment Variables

## للتطوير المحلي

أنشئ ملف `.env` في جذر المشروع وأضف:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## للنشر على Netlify

أضف المتغيرات في:
**Site settings** → **Environment variables** → **Add a variable**

```
VITE_SUPABASE_URL = [your_supabase_url]
VITE_SUPABASE_ANON_KEY = [your_supabase_anon_key]
```

## الحصول على قيم Supabase

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى **Settings** → **API**
4. انسخ:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## ملاحظات مهمة

- ⚠️ **لا** تضع ملف `.env` في Git
- ✅ ملف `.env` مُستثنى تلقائياً في `.gitignore`
- 🔒 استخدم `anon key` فقط (ليس service_role)
- 🌍 نفس القيم تُستخدم في التطوير والإنتاج

