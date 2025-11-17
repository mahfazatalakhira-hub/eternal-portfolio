import { Opportunity } from './types';

/**
 * قاعدة بيانات الفرص اليومية
 * أعمال يومية سريعة بعائد عالٍ
 */

export const dailyOpportunities: Opportunity[] = [
  // ============================================
  // فرص عالية الأولوية
  // ============================================
  {
    id: 'opp-100-trees',
    title: 'غرس 100 نخلة في 5 دقائق',
    description: 'قل: سبحان الله وبحمده (100 مرة)',
    reward: '100 نخلة في الجنة',
    priority: 'عالية',
    type: 'زراعي',
    hadithRef: 'رواه الترمذي (صحيح)',
    hadithId: 'subhan-allah-tree',
    estimatedTime: '5 دقائق',
    icon: 'Palmtree',
    color: 'text-success'
  },

  {
    id: 'opp-house-highest',
    title: 'بيت في أعلى الجنة',
    description: 'حسّن خلقك اليوم: ابتسم، تصدق، اعف عمّن أساء، احسن لمن حولك',
    reward: 'بيت في أعلى الجنة (Premium)',
    priority: 'عالية',
    type: 'سلوكي',
    hadithRef: 'رواه أبو داود (حسن)',
    hadithId: 'three-houses',
    guarantor: 'النبي ﷺ ضامن',
    icon: 'Heart',
    color: 'text-secondary'
  },

  {
    id: 'opp-house-ikhlas',
    title: 'بيت في الجنة في دقائق',
    description: 'اقرأ سورة الإخلاص 10 مرات',
    reward: 'بيت في الجنة',
    priority: 'عالية',
    type: 'لفظي',
    hadithRef: 'رواه أحمد (حسن لغيره)',
    hadithId: 'reading-ikhlas',
    estimatedTime: '2-3 دقائق',
    icon: 'BookOpen',
    color: 'text-accent'
  },

  {
    id: 'opp-jummah',
    title: 'مضاعفة الأجر 27 ضعفاً',
    description: 'الصلاة في جماعة - خاصة الفجر والعشاء',
    reward: 'أجر مضاعف 27 مرة',
    priority: 'عالية',
    type: 'سلوكي',
    hadithRef: 'متفق عليه (البخاري ومسلم)',
    estimatedTime: '15-20 دقيقة لكل صلاة',
    icon: 'Users',
    color: 'text-primary'
  },

  // ============================================
  // فرص متوسطة الأولوية
  // ============================================
  {
    id: 'opp-help-someone',
    title: 'أحب الأعمال إلى الله',
    description: 'ساعد شخصاً في حاجته - أدخل السرور على مسلم',
    reward: 'أحب الأعمال إلى الله - أفضل من اعتكاف شهر',
    priority: 'متوسطة',
    type: 'اجتماعي',
    hadithRef: 'رواه الطبراني (حسن)',
    hadithId: 'most-beloved-to-allah',
    estimatedTime: 'حسب الحاجة',
    icon: 'HandHeart',
    color: 'text-amber-500'
  },

  {
    id: 'opp-silat-rahm',
    title: 'وصل من الله',
    description: 'اتصل بقريب لم تتواصل معه مؤخراً - زر رحمك',
    reward: 'من وصلها وصلته الله',
    priority: 'متوسطة',
    type: 'اجتماعي',
    hadithRef: 'متفق عليه (البخاري ومسلم)',
    hadithId: 'silat-rahm',
    estimatedTime: '10-30 دقيقة',
    icon: 'Users',
    color: 'text-purple-500'
  },

  {
    id: 'opp-baaqiyat',
    title: 'عمّر أرضك في الجنة',
    description: 'أكثر من الباقيات الصالحات: سبحان الله، الحمد لله، لا إله إلا الله، الله أكبر',
    reward: 'غراس في الجنة - رسالة إبراهيم عليه السلام',
    priority: 'متوسطة',
    type: 'زراعي',
    hadithRef: 'رواه الترمذي (حسن)',
    hadithId: 'jannah-qeeaan',
    estimatedTime: 'مستمر طوال اليوم',
    icon: 'Sparkles',
    color: 'text-success'
  },

  {
    id: 'opp-avoid-argument',
    title: 'بيت في ربض الجنة',
    description: 'اترك الجدال اليوم حتى لو كنت محقاً',
    reward: 'بيت في ربض (أطراف) الجنة',
    priority: 'متوسطة',
    type: 'سلوكي',
    hadithRef: 'رواه أبو داود (حسن)',
    hadithId: 'three-houses',
    guarantor: 'النبي ﷺ ضامن',
    estimatedTime: 'طوال اليوم',
    icon: 'ShieldCheck',
    color: 'text-primary'
  },

  {
    id: 'opp-smile',
    title: 'صدقة بالابتسامة',
    description: 'ابتسم في وجه إخوانك - تبسمك في وجه أخيك صدقة',
    reward: 'أجر صدقة + تحسين للخلق',
    priority: 'متوسطة',
    type: 'سلوكي',
    hadithRef: 'رواه الترمذي (حسن)',
    estimatedTime: 'طوال اليوم - لا يكلف شيئاً',
    icon: 'Smile',
    color: 'text-secondary'
  },

  // ============================================
  // فرص خاصة بأوقات معينة
  // ============================================
  {
    id: 'opp-fajr-qablaha',
    title: 'ركعتا الفجر - خير من الدنيا',
    description: 'صلِّ ركعتي السنة قبل صلاة الفجر',
    reward: 'خير من الدنيا وما فيها',
    priority: 'عالية',
    type: 'سلوكي',
    hadithRef: 'رواه مسلم (صحيح)',
    estimatedTime: '5 دقائق',
    icon: 'Sunrise',
    color: 'text-amber-400'
  },

  {
    id: 'opp-duha',
    title: 'صدقة عن كل مفصل',
    description: 'صلِّ الضحى (2-4-8 ركعات)',
    reward: 'صدقة عن كل مفصل من مفاصلك (360)',
    priority: 'متوسطة',
    type: 'سلوكي',
    hadithRef: 'متفق عليه (البخاري ومسلم)',
    estimatedTime: '10-15 دقيقة',
    icon: 'Sun',
    color: 'text-yellow-500'
  },

  {
    id: 'opp-night-last-third',
    title: 'الثلث الأخير من الليل',
    description: 'استيقظ للدعاء والاستغفار في الثلث الأخير',
    reward: 'الله ينزل إلى السماء الدنيا ويستجيب الدعاء',
    priority: 'عالية',
    type: 'سلوكي',
    hadithRef: 'متفق عليه (البخاري ومسلم)',
    estimatedTime: '15-30 دقيقة',
    icon: 'Moon',
    color: 'text-blue-400'
  },

  // ============================================
  // فرص الاستثمار المجتمعي
  // ============================================
  {
    id: 'opp-help-widow',
    title: 'أجر المجاهد والقائم الصائم',
    description: 'ساعد أرملة أو مسكيناً - بالمال أو الوقت أو الجهد',
    reward: 'كالمجاهد في سبيل الله، أو كالقائم لا يفتر والصائم لا يفطر',
    priority: 'عالية',
    type: 'اجتماعي',
    hadithRef: 'متفق عليه (البخاري ومسلم)',
    hadithId: 'saaee-ala-armala',
    estimatedTime: 'حسب المساعدة',
    icon: 'HandHeart',
    color: 'text-amber-600'
  },

  {
    id: 'opp-visit-sick',
    title: 'في روضة من رياض الجنة',
    description: 'زر مريضاً',
    reward: 'في خرفة الجنة حتى تعود (روضة من رياض الجنة)',
    priority: 'متوسطة',
    type: 'اجتماعي',
    hadithRef: 'رواه مسلم (صحيح)',
    estimatedTime: '30-60 دقيقة',
    icon: 'Heart',
    color: 'text-red-500'
  },

  {
    id: 'opp-teach-good',
    title: 'علم ينتفع به بعد موتك',
    description: 'علّم شخصاً شيئاً نافعاً - شارك مقطعاً مفيداً',
    reward: 'أجر جاري بعد الموت طالما انتفع به',
    priority: 'متوسطة',
    type: 'معرفي',
    hadithRef: 'رواه مسلم (صحيح)',
    hadithId: 'three-continue',
    estimatedTime: '10-30 دقيقة',
    icon: 'GraduationCap',
    color: 'text-blue-600'
  }
];

// مساعدات للوصول إلى البيانات
export const getOpportunityById = (id: string): Opportunity | undefined => {
  return dailyOpportunities.find(opp => opp.id === id);
};

export const getOpportunitiesByPriority = (priority: string): Opportunity[] => {
  return dailyOpportunities.filter(opp => opp.priority === priority);
};

export const getHighPriorityOpportunities = (): Opportunity[] => {
  return getOpportunitiesByPriority('عالية');
};

export const getOpportunitiesByType = (type: string): Opportunity[] => {
  return dailyOpportunities.filter(opp => opp.type === type);
};

// فرص حسب الوقت المتاح
export const getQuickOpportunities = (): Opportunity[] => {
  return dailyOpportunities.filter(opp => 
    opp.estimatedTime && (
      opp.estimatedTime.includes('دقائق') || 
      opp.estimatedTime.includes('دقيقة')
    )
  );
};

