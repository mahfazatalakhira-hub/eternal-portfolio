// أنواع البيانات المستخدمة في التطبيق

export type InvestmentType = 
  | 'مالي'           // استثمار مالي (بناء المساجد)
  | 'سلوكي'          // استثمار سلوكي (الأخلاق)
  | 'لفظي'           // استثمار لفظي (الذكر والقرآن)
  | 'زراعي'          // استثمار زراعي (الأذكار الغراس)
  | 'جاري'           // أصل جاري (صدقة جارية)
  | 'اجتماعي'        // استثمار اجتماعي (العلاقات)
  | 'معرفي';         // استثمار معرفي (العلم)

export type LocationInJannah = 
  | 'ربض الجنة'      // أطراف الجنة
  | 'وسط الجنة'      // مركز الجنة
  | 'أعلى الجنة'     // أعلى الجنة (Premium)
  | 'غير محدد'       // الموقع غير محدد
  | 'منابر من نور'; // منابر من نور (للمتحابين في الله)

export type PriorityLevel = 'عالية' | 'متوسطة' | 'منخفضة';

export type RiskLevel = 'عالية' | 'متوسطة' | 'منخفضة';

export type HadithAuthenticity = 
  | 'صحيح'           // حديث صحيح
  | 'حسن'            // حديث حسن
  | 'حسن لغيره'      // حسن لغيره (له شواهد)
  | 'ضعيف'          // حديث ضعيف
  | 'موضوع';         // حديث موضوع

// واجهة الحديث
export interface Hadith {
  id: string;
  text: string;                    // نص الحديث
  source: string;                  // المصدر (البخاري، مسلم، إلخ)
  authenticity: HadithAuthenticity; // درجة الحديث
  narrator?: string;               // الراوي
  explanation?: string;            // شرح مختصر
  reference?: string;              // المرجع الإلكتروني
}

// واجهة الأصل (Asset)
export interface Asset {
  id: string;
  label: string;                   // اسم الأصل
  type: InvestmentType;            // نوع الاستثمار
  value: number;                   // القيمة الحالية (عدد المرات)
  
  // تفاصيل الاستثمار
  requirement: string;             // المتطلبات
  reward: string;                  // العائد/المكافأة
  location?: LocationInJannah;     // الموقع في الجنة
  
  // معلومات الحديث
  hadithId: string;                // معرف الحديث المرتبط
  source: string;                  // نص الحديث المختصر
  hadithRef: string;               // المرجع (رواه...)
  
  // معلومات إضافية
  guarantor?: string;              // الضامن (مثل: النبي ﷺ ضامن)
  note?: string;                   // ملاحظات إضافية
  speed?: string;                  // سرعة العائد (سريع، فوري)
  multiplier?: string;             // مضاعف الأجر (إن وجد)
  
  // معلومات للتتبع
  lastUpdated?: Date;              // آخر تحديث
  category: AssetCategory;         // الفئة الرئيسية
}

// فئات الأصول الرئيسية
export type AssetCategory = 
  | 'real-estate-financial'        // الأصول العقارية - مالي
  | 'real-estate-behavioral'       // الأصول العقارية - سلوكي
  | 'real-estate-verbal'           // الأصول العقارية - لفظي
  | 'agricultural'                 // الأصول الزراعية
  | 'continuous-income'            // الأصول الجارية
  | 'social-capital'               // رأس المال الاجتماعي
  | 'community-investment';        // الاستثمار المجتمعي

// واجهة فئة الأصول
export interface AssetCategoryData {
  id: AssetCategory;
  title: string;
  icon: string;                    // اسم الأيقونة
  color: string;                   // لون التصنيف
  description: string;             // وصف الفئة
  items: Asset[];                  // الأصول في هذه الفئة
}

// واجهة الفرصة اليومية
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  reward: string;
  priority: PriorityLevel;
  type: InvestmentType;
  hadithRef: string;
  hadithId?: string;
  guarantor?: string;
  estimatedTime?: string;          // الوقت المتوقع للإنجاز
  icon: string;
  color: string;
}

// واجهة المخاطر
export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  impact: string;                  // التأثير على الأصول
  prevention: string;              // طرق الوقاية
  icon: string;
  color: string;
  hadithId?: string;
  examples?: string[];             // أمثلة من الأحاديث
}

// واجهة إحصائيات المستخدم
export interface UserStats {
  totalHouses: number;             // إجمالي البيوت
  totalTrees: number;              // إجمالي الأشجار
  totalContinuousAssets: number;   // إجمالي الأصول الجارية
  totalSocialCapital: number;      // رأس المال الاجتماعي
  lastActivity?: Date;
}

// واجهة سجل العمل
export interface ActionRecord {
  id: string;
  assetId: string;
  date: Date;
  notes?: string;
  verified?: boolean;
}

