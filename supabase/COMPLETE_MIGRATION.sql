-- ==========================================
-- Migration كاملة: محفظتي الأخروية
-- يمكن تنفيذ هذا الملف مباشرة في Supabase SQL Editor
-- ==========================================

-- ==========================================
-- 1. إنشاء الجداول (Tables)
-- ==========================================

-- جدول ملف المستخدم الموسع
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  age INTEGER,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول أصول المستخدم (الأعمال المسجلة)
CREATE TABLE IF NOT EXISTS user_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  asset_id TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  category TEXT NOT NULL,
  value INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول سجل الأعمال (Action Log)
CREATE TABLE IF NOT EXISTS action_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  asset_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  value INTEGER DEFAULT 1,
  notes TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الأهداف اليومية
CREATE TABLE IF NOT EXISTS daily_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id TEXT NOT NULL,
  target_value INTEGER DEFAULT 1,
  current_value INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- جدول التذكيرات
CREATE TABLE IF NOT EXISTS reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  reminder_time TIME NOT NULL,
  days_of_week INTEGER[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإنجازات
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. إنشاء الفهارس (Indexes)
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_user_assets_user_id ON user_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_assets_asset_id ON user_assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_action_records_user_id ON action_records(user_id);
CREATE INDEX IF NOT EXISTS idx_action_records_date ON action_records(date);
CREATE INDEX IF NOT EXISTS idx_daily_goals_user_id ON daily_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_goals_date ON daily_goals(date);

-- ==========================================
-- 3. إنشاء الدوال (Functions)
-- ==========================================

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- دالة لحساب إجمالي أصول المستخدم
CREATE OR REPLACE FUNCTION get_user_total_assets(p_user_id UUID)
RETURNS TABLE (
  total_houses BIGINT,
  total_trees BIGINT,
  total_continuous BIGINT,
  total_social BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(CASE WHEN category LIKE 'real-estate%' THEN value ELSE 0 END), 0) AS total_houses,
    COALESCE(SUM(CASE WHEN category = 'agricultural' THEN value ELSE 0 END), 0) AS total_trees,
    COALESCE(SUM(CASE WHEN category = 'continuous-income' THEN value ELSE 0 END), 0) AS total_continuous,
    COALESCE(SUM(CASE WHEN category = 'social-capital' OR category = 'community-investment' THEN value ELSE 0 END), 0) AS total_social
  FROM user_assets
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- دالة لإنشاء ملف مستخدم عند التسجيل
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

-- ==========================================
-- 4. إنشاء الـ Triggers
-- ==========================================

-- Triggers لتحديث updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_assets_updated_at ON user_assets;
CREATE TRIGGER update_user_assets_updated_at
  BEFORE UPDATE ON user_assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger لإنشاء الملف تلقائياً عند التسجيل
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ==========================================
-- 5. تفعيل Row Level Security (RLS)
-- ==========================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 6. إنشاء سياسات الأمان (RLS Policies)
-- ==========================================

-- سياسات user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- سياسات user_assets
DROP POLICY IF EXISTS "Users can view own assets" ON user_assets;
CREATE POLICY "Users can view own assets" ON user_assets
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own assets" ON user_assets;
CREATE POLICY "Users can insert own assets" ON user_assets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own assets" ON user_assets;
CREATE POLICY "Users can update own assets" ON user_assets
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own assets" ON user_assets;
CREATE POLICY "Users can delete own assets" ON user_assets
  FOR DELETE USING (auth.uid() = user_id);

-- سياسات action_records
DROP POLICY IF EXISTS "Users can view own action records" ON action_records;
CREATE POLICY "Users can view own action records" ON action_records
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own action records" ON action_records;
CREATE POLICY "Users can insert own action records" ON action_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- سياسات daily_goals
DROP POLICY IF EXISTS "Users can view own daily goals" ON daily_goals;
CREATE POLICY "Users can view own daily goals" ON daily_goals
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own daily goals" ON daily_goals;
CREATE POLICY "Users can insert own daily goals" ON daily_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own daily goals" ON daily_goals;
CREATE POLICY "Users can update own daily goals" ON daily_goals
  FOR UPDATE USING (auth.uid() = user_id);

-- سياسات reminders
DROP POLICY IF EXISTS "Users can view own reminders" ON reminders;
CREATE POLICY "Users can view own reminders" ON reminders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reminders" ON reminders;
CREATE POLICY "Users can insert own reminders" ON reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reminders" ON reminders;
CREATE POLICY "Users can update own reminders" ON reminders
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reminders" ON reminders;
CREATE POLICY "Users can delete own reminders" ON reminders
  FOR DELETE USING (auth.uid() = user_id);

-- سياسات achievements
DROP POLICY IF EXISTS "Users can view own achievements" ON achievements;
CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own achievements" ON achievements;
CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 7. إضافة التعليقات (Comments)
-- ==========================================

COMMENT ON TABLE user_profiles IS 'ملفات المستخدمين الشخصية';
COMMENT ON TABLE user_assets IS 'جدول أصول المستخدم - يحفظ الأعمال الصالحة المسجلة';
COMMENT ON TABLE action_records IS 'سجل الأعمال اليومية - لتتبع النشاط';
COMMENT ON TABLE daily_goals IS 'الأهداف اليومية للمستخدم';
COMMENT ON TABLE reminders IS 'التذكيرات والمنبهات';
COMMENT ON TABLE achievements IS 'الإنجازات التي حققها المستخدم';
COMMENT ON FUNCTION get_user_total_assets IS 'دالة لحساب إجمالي الأصول بأنواعها';
COMMENT ON FUNCTION handle_new_user IS 'دالة تلقائية لإنشاء ملف المستخدم عند التسجيل';

-- ==========================================
-- 8. تم بنجاح! ✅
-- ==========================================

-- للتحقق من نجاح التنفيذ، شغّل هذا الاستعلام:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- يجب أن ترى 6 جداول:
-- 1. user_profiles
-- 2. user_assets
-- 3. action_records
-- 4. daily_goals
-- 5. reminders
-- 6. achievements

