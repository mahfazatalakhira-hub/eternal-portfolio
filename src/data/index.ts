/**
 * ملف التصدير المركزي لقاعدة البيانات
 * يسهل استيراد جميع البيانات من مكان واحد
 */

// تصدير الأنواع
export * from './types';

// تصدير قاعدة بيانات الأحاديث
export * from './hadithsData';

// تصدير قاعدة بيانات الأصول
export * from './assetsData';

// تصدير قاعدة بيانات الفرص اليومية
export * from './opportunitiesData';

// تصدير قاعدة بيانات المخاطر
export * from './risksData';

/**
 * مثال على الاستخدام:
 * 
 * import { 
 *   assetCategories, 
 *   hadiths, 
 *   dailyOpportunities, 
 *   risks,
 *   getAssetById,
 *   getHadithById
 * } from '@/data';
 */

