-- Migration إصلاحية: حل مشكلة الـ trigger المكرر
-- هذا الملف يحذف الـ trigger القديم ويعيد إنشاءه

-- حذف الـ trigger القديم إن وجد
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- إعادة إنشاء الدالة (مع معالجة التكرار)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, age, gender)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, NULL),
    COALESCE(NEW.raw_user_meta_data->>'gender', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    age = COALESCE(EXCLUDED.age, user_profiles.age),
    gender = COALESCE(EXCLUDED.gender, user_profiles.gender),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- إنشاء الـ trigger الجديد
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- إضافة تعليق
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 'ينشئ ملف مستخدم تلقائياً عند التسجيل';

