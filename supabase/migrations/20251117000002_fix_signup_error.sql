-- Migration إصلاحية: حل مشكلة خطأ 500 عند التسجيل
-- الحل: إنشاء profile من Frontend بدلاً من trigger (لأن trigger على auth.users يحتاج صلاحيات خاصة)

-- 1. التأكد من وجود جدول user_profiles (استخدام user_profiles كاسم موحد)
-- إذا كان الجدول اسمه profiles، نعيد تسميته أو ننشئ user_profiles
DO $$
BEGIN
  -- إذا كان الجدول profiles موجود و user_profiles غير موجود، ننشئ user_profiles
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles')
     AND NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_profiles') THEN
    
    -- نسخ البيانات من profiles إلى user_profiles
    CREATE TABLE IF NOT EXISTS user_profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      age INTEGER,
      gender TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- نسخ البيانات إن وجدت
    INSERT INTO user_profiles (id, full_name, age, gender, created_at, updated_at)
    SELECT id, full_name, age, gender, created_at, updated_at
    FROM profiles
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  -- إذا لم يكن أي منهما موجوداً، ننشئ user_profiles
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_profiles') THEN
    CREATE TABLE user_profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      age INTEGER,
      gender TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- 2. التأكد من RLS policies لـ user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- حذف السياسات القديمة إن وجدت
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- إنشاء السياسات الجديدة لـ user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- سياسة INSERT تسمح للمستخدم بإنشاء profile لنفسه فقط
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 3. إضافة تعليقات
COMMENT ON TABLE user_profiles IS 'ملفات المستخدمين الشخصية - يتم إنشاؤها من Frontend بعد signup';

