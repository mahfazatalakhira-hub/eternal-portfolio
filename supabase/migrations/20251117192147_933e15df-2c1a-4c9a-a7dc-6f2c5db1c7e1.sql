-- إزالة الـ trigger المسبب لخطأ 500
-- السبب: الـ trigger على auth.users يحتاج صلاحيات superuser ويفشل عند التنفيذ
-- الحل: إنشاء profile من Frontend بعد verifyOtp (موجود بالفعل في OTPVerification.tsx)

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- إضافة تعليق توضيحي
COMMENT ON FUNCTION public.handle_new_user IS 'دالة محفوظة للاستخدام المستقبلي - حالياً يتم إنشاء profiles من Frontend';