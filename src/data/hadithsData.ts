import { Hadith } from './types';

/**
 * قاعدة بيانات الأحاديث النبوية
 * مرتبة حسب الأجزاء في الوثيقة الأصلية
 */

export const hadiths: Record<string, Hadith> = {
  // ============ مقدمة: الإطار الفكري ============
  
  'duniya-mazraa': {
    id: 'duniya-mazraa',
    text: 'الدنيا مزرعة الآخرة',
    source: 'أثر',
    authenticity: 'ضعيف',
    explanation: 'الدنيا ليست المقر بل الممر، وليست الغاية بل الوسيلة',
    reference: 'https://www.islamweb.net/ar/fatwa/105644'
  },
  
  'stranger-in-duniya': {
    id: 'stranger-in-duniya',
    text: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ، أَوْ عَابِرُ سَبِيلٍ',
    source: 'صحيح البخاري',
    authenticity: 'صحيح',
    narrator: 'عبد الله بن عمر رضي الله عنهما',
    explanation: 'تحديد هوية المستثمر الأخروي - الغريب لا يبني بقصد الاستيطان الدائم',
    reference: 'https://binbaz.org.sa/audios/2489'
  },
  
  'duniya-comparison': {
    id: 'duniya-comparison',
    text: 'وَاللَّهِ مَا الدُّنْيَا فِي الْآخِرَةِ إِلَّا مِثْلُ مَا يَجْعَلُ أَحَدُكُمْ إِصْبَعَهُ فِي الْيَمِّ، فَلْيَنْظُرْ بِمَ يَرْجِعُ',
    source: 'صحيح مسلم',
    authenticity: 'صحيح',
    explanation: 'تقييم اقتصادي لحجم السوقين - الدنيا كقطرة في بحر الآخرة',
    reference: 'https://dorar.net/hadith/sharh/85417'
  },
  
  'akhira-intention': {
    id: 'akhira-intention',
    text: 'مَنْ كَانَتِ الآخِرَةُ نِيَّتَهُ، جَمَعَ اللَّهُ لَهُ أَمْرَهُ، وَجَعَلَ غِنَاهُ فِي قَلْبِهِ، وَأَتَتْهُ الدُّنْيَا وَهِيَ رَاغِمَةٌ',
    source: 'سنن الترمذي',
    authenticity: 'حسن',
    narrator: 'زيد بن ثابت رضي الله عنه',
    explanation: 'استراتيجية الاستثمار الأسمى - جعل الآخرة هي النية يجلب خير الدارين',
    reference: 'https://dorar.net/hadith/sharh/76847'
  },

  // ============ الجزء الأول: محفظة العقارات ============
  
  'building-masjid': {
    id: 'building-masjid',
    text: 'مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ مِثْلَهُ فِي الْجَنَّةِ',
    source: 'صحيح البخاري ومسلم',
    authenticity: 'صحيح',
    explanation: 'الاستثمار العقاري الأضمن - بناء المساجد',
    reference: 'https://binbaz.org.sa/audios/355'
  },
  
  'building-small-masjid': {
    id: 'building-small-masjid',
    text: 'مَنْ بَنَى لِلَّهِ مَسْجِدًا وَلَوْ كَمَفْحَصِ قَطَاةٍ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ',
    source: 'سنن ابن ماجه',
    authenticity: 'حسن',
    explanation: 'الاستثمار التشاركي (Crowdfunding) - ولو بمساهمة صغيرة',
    reference: 'https://www.youtube.com/watch?v=P5NraF31jWk'
  },
  
  'three-houses': {
    id: 'three-houses',
    text: 'أَنَا زَعِيمٌ بِبَيْتٍ فِي رَبَضِ الْجَنَّةِ لِمَنْ تَرَكَ الْمِرَاءَ وَإِنْ كَانَ مُحِقًّا، وَبِبَيْتٍ فِي وَسَطِ الْجَنَّةِ لِمَنْ تَرَكَ الْكَذِبَ وَإِنْ كَانَ مَازِحًا، وَبِبَيْتٍ فِي أَعْلَى الْجَنَّةِ لِمَنْ حَسَّنَ خُلُقَهُ',
    source: 'سنن أبي داود',
    authenticity: 'حسن',
    explanation: 'الاستثمار السلوكي - النبي ﷺ ضامن لثلاثة بيوت بمواقع مختلفة',
    reference: 'https://binbaz.org.sa/audios/2538'
  },
  
  'reading-ikhlas': {
    id: 'reading-ikhlas',
    text: 'مَنْ قَرَأَ (قُلْ هُوَ اللَّهُ أَحَدٌ) عَشْرَ مَرَّاتٍ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ',
    source: 'مسند أحمد',
    authenticity: 'حسن لغيره',
    explanation: 'الاستثمار اللفظي - بناء البيوت بالذكر وتجديد العقيدة',
    reference: 'https://www.islamweb.net/ar/fatwa/229753'
  },
  
  'subhan-allah-tree': {
    id: 'subhan-allah-tree',
    text: 'مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، غُرِسَتْ لَهُ نَخْلَةٌ فِي الْجَنَّةِ',
    source: 'سنن الترمذي',
    authenticity: 'صحيح',
    explanation: 'الاستثمار الزراعي - غرس النخيل بالتسبيح',
    reference: 'https://binbaz.org.sa/audios/2753'
  },
  
  'subhan-allah-azeem': {
    id: 'subhan-allah-azeem',
    text: 'مَنْ قَالَ: سُبْحَانَ اللَّهِ الْعَظِيمِ، غُرِسَ لَهُ شَجَرَةٌ فِي الْجَنَّةِ',
    source: 'صحيح ابن حبان',
    authenticity: 'صحيح',
    explanation: 'غرس الأشجار بالتعظيم',
    reference: 'https://surahquran.com/Hadith-105541.html'
  },
  
  'jannah-qeeaan': {
    id: 'jannah-qeeaan',
    text: 'يَا مُحَمَّدُ، أَقْرِئْ أُمَّتَكَ مِنِّي السَّلامَ، وَأَخْبِرْهُمْ أَنَّ الْجَنَّةَ طَيِّبَةُ التُّرْبَةِ عَذْبَةُ الْمَاءِ، وَأَنَّهَا قِيعَانٌ، وَأَنَّ غِرَاسَهَا: سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلا إِلَهَ إِلا اللَّهُ، وَاللَّهُ أَكْبَرُ',
    source: 'سنن الترمذي',
    authenticity: 'حسن',
    narrator: 'رسالة إبراهيم عليه السلام',
    explanation: 'رؤية استثمارية - الجنة قيعان جاهزة للتطوير بالباقيات الصالحات',
    reference: 'https://hadeethenc.com/ar/browse/hadith/3791'
  },

  // ============ الجزء الثاني: الأصول الجارية ============
  
  'three-continue': {
    id: 'three-continue',
    text: 'إِذَا مَاتَ ابنُ آدم انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أو عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    source: 'صحيح مسلم',
    authenticity: 'صحيح',
    narrator: 'أبو هريرة رضي الله عنه',
    explanation: 'النموذج الثلاثي للاستثمار طويل الأجل - الدخل السلبي بعد الموت',
    reference: 'https://binbaz.org.sa/audios/79'
  },
  
  'seven-continue': {
    id: 'seven-continue',
    text: 'سَبْعٌ يَجْرِي لِلْعَبْدِ أَجْرُهُنَّ وَهُوَ فِي قَبْرِهِ بَعْدَ مَوْتِهِ: مَنْ عَلَّمَ عِلْمًا، أَوْ أَجْرَى نَهْرًا، أَوْ حَفَرَ بِئْرًا، أَوْ غَرَسَ نَخْلا، أَوْ بَنَى مَسْجِدًا، أَوْ وَرَّثَ مُصْحَفًا، أَوْ تَرَكَ وَلَدًا يَسْتَغْفِرُ لَهُ بَعْدَ مَوْتِهِ',
    source: 'مسند البزار',
    authenticity: 'حسن لغيره',
    narrator: 'أنس بن مالك رضي الله عنه',
    explanation: 'النموذج السباعي الموسع - محفظة متنوعة من الأصول الجارية',
    reference: 'https://saaid.org/aldawah/57.htm'
  },

  // ============ الجزء الثالث: رأس المال الاجتماعي ============
  
  'silat-rahm': {
    id: 'silat-rahm',
    text: 'قَالَ اللَّهُ: أَنَا الرَّحْمَنُ، وَهِيَ الرَّحِمُ، شَقَقْتُ لَهَا اسْمًا مِنِ اسْمِي، مَنْ وَصَلَهَا وَصَلْتُهُ، وَمَنْ قَطَعَهَا بَتَتُّهُ',
    source: 'صحيح البخاري ومسلم',
    authenticity: 'صحيح',
    explanation: 'عقد استثماري قدسي - صلة الرحم طريق إلى الرحمن',
    reference: 'https://ar.islamway.net/article/68722'
  },
  
  'husn-khuluq-weight': {
    id: 'husn-khuluq-weight',
    text: 'مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ حُسْنِ الْخُلُقِ',
    source: 'سنن الترمذي',
    authenticity: 'صحيح',
    explanation: 'الأصل الأثقل وزناً - حسن الخلق أثقل من العبادات البدنية',
    reference: 'https://binbaz.org.sa/audios/2537'
  },
  
  'mutahaboon-fi-jalali': {
    id: 'mutahaboon-fi-jalali',
    text: 'قَالَ اللَّهُ عَزَّ وَجَلَّ: الْمُتَحَابُّونَ فِي جَلالِي، لَهُمْ مَنَابِرُ مِنْ نُورٍ يَغْبِطُهُمُ النَّبِيُّونَ وَالشُّهَدَاءُ',
    source: 'سنن الترمذي',
    authenticity: 'صحيح',
    explanation: 'التحالفات الإيمانية - رأس مال اجتماعي يغبطه الأنبياء والشهداء',
    reference: 'https://hadeethenc.com/ar/browse/hadith/3508'
  },

  // ============ الجزء الرابع: الاستثمار المجتمعي ============
  
  'kafil-yateem': {
    id: 'kafil-yateem',
    text: 'أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا، وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى',
    source: 'صحيح البخاري',
    authenticity: 'صحيح',
    explanation: 'الاستثمار بالقرب - القرب من النبي ﷺ في الجنة',
    reference: 'https://binbaz.org.sa/audios/2249'
  },
  
  'saaee-ala-armala': {
    id: 'saaee-ala-armala',
    text: 'السَّاعِي عَلَى الأَرْمَلَةِ وَالْمِسْكِينِ، كَالْمُجَاهِدِ فِي سَبِيلِ اللَّهِ، أَوْ كَالَّذِي يَصُومُ النَّهَارَ وَيَقُومُ اللَّيْلَ',
    source: 'صحيح البخاري ومسلم',
    authenticity: 'صحيح',
    explanation: 'الرافعة الاستثمارية - أجر الجهاد والعبادة المستمرة بالسعي على الأرملة',
    reference: 'https://dorar.net/hadith/sharh/15142'
  },
  
  'most-beloved-to-allah': {
    id: 'most-beloved-to-allah',
    text: 'أَحَبُّ النَّاسِ إِلَى اللَّهِ تَعَالَى أَنْفَعُهُمْ لِلنَّاسِ، وَأَحَبُّ الأَعْمَالِ إِلَى اللَّهِ تَعَالَى سُرُورٌ تُدْخِلُهُ عَلَى مُسْلِمٍ، أَوْ تَكْشِفُ عَنْهُ كُرْبَةً... وَلأَنْ أَمْشِيَ مَعَ أَخٍ فِي حَاجَةٍ، أَحَبُّ إِلَيَّ مِنْ أَنْ أَعْتَكِفَ فِي هَذَا الْمَسْجِدِ شَهْرًا',
    source: 'المعجم الأوسط للطبراني',
    authenticity: 'حسن',
    explanation: 'الاستثمار الأحب - قضاء حوائج الناس أفضل من الاعتكاف شهراً',
    reference: 'https://www.islamweb.net/ar/fatwa/47636'
  },

  // ============ الجزء الخامس: إدارة المخاطر ============
  
  'first-three-fire': {
    id: 'first-three-fire',
    text: 'أَوَّلُ ثَلاثَةٍ تُسَعَّرُ بِهِمُ النَّارُ يَوْمَ الْقِيَامَةِ: عَالِمٌ، وَمُجَاهِدٌ، وَمُنْفِقٌ',
    source: 'صحيح مسلم',
    authenticity: 'صحيح',
    explanation: 'خطر الإفلاس - الرياء يحول الأصول إلى أصول سامة',
    reference: 'https://www.youtube.com/shorts/5a5NDQfbxYw'
  },
  
  'riyaa-punishment': {
    id: 'riyaa-punishment',
    text: 'مَنْ سَمَّعَ سَمَّعَ اللَّهُ بِهِ، وَمَنْ رَاءَى رَاءَى اللَّهُ بِهِ',
    source: 'صحيح البخاري ومسلم',
    authenticity: 'صحيح',
    explanation: 'عقوبة السمعة - من أراد السمعة فُضح يوم القيامة',
    reference: 'https://binbaz.org.sa/audios/2270'
  },
  
  'nullify-sadaqat': {
    id: 'nullify-sadaqat',
    text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لا تُبْطِلُوا صَدَقَاتِكُمْ بِالْمَنِّ وَالأَذَى',
    source: 'القرآن الكريم - سورة البقرة',
    authenticity: 'صحيح',
    explanation: 'خطر الإبطال - المن والأذى يمسحان الأجر بالكامل',
    reference: 'https://www.islamweb.net/ar/library/content/48/862'
  }
};

// مساعد للحصول على حديث بواسطة المعرف
export const getHadithById = (id: string): Hadith | undefined => {
  return hadiths[id];
};

// مساعد للحصول على أحاديث بواسطة نوع الاستثمار
export const getHadithsByType = (type: string): Hadith[] => {
  // يمكن توسيع هذه الدالة لاحقاً
  return Object.values(hadiths);
};

