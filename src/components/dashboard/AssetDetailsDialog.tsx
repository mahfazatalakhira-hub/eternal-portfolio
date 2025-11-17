import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Asset } from "@/data/types";
import { getHadithById } from "@/data/hadithsData";
import { useUpsertAsset } from "@/hooks/useUserAssets";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Award, MapPin, Shield, Sparkles, Clock, TrendingUp, CheckCircle2, BookOpen, Info, Plus } from "lucide-react";
import VerbalInvestmentCounter from "./VerbalInvestmentCounter";
import AgriculturalCounter from "./AgriculturalCounter";

interface AssetDetailsDialogProps {
  asset: Asset | null;
  open: boolean;
  onClose: () => void;
}

const AssetDetailsDialog = ({ asset, open, onClose }: AssetDetailsDialogProps) => {
  const [value, setValue] = useState("1");
  const [behavioralAnswer, setBehavioralAnswer] = useState<string>("yes");
  const { mutate: upsertAsset, isPending } = useUpsertAsset();
  const { toast } = useToast();

  if (!asset) return null;

  const hadith = getHadithById(asset.hadithId);

  // تحديد نوع الواجهة حسب الأصل
  const getInputLabel = () => {
    // العقارات - الاستثمار المالي
    if (asset.id === 'masjid-building') {
      return '🕌 عدد المساجد التي بنيتها هذا الشهر';
    }
    if (asset.id === 'small-masjid-contribution') {
      return '🤝 عدد المساجد التي ساهمت بها اليوم';
    }
    
    // العقارات - الاستثمار السلوكي
    if (asset.id === 'house-rabadh') {
      return '🛡️ كم مرة تركت جدالاً اليوم؟';
    }
    if (asset.id === 'house-wasat') {
      return '✨ كم مرة تجنبت الكذب؟';
    }
    if (asset.id === 'house-aala') {
      return '💚 هل حسّنت خُلقك اليوم؟';
    }

    // الأصول الجارية
    if (asset.id === 'sadaqa-jariya') {
      return '💧 عدد الاستثمارات في الصدقات الجارية هذا الشهر';
    }
    if (asset.id === 'ilm-muntafa') {
      return '📚 عدد الأشخاص الذين استثمرت علمك فيهم';
    }
    if (asset.id === 'walad-salih') {
      return '👨‍👩‍👦 عدد الساعات التي استثمرت في تفقيه أولادك';
    }
    if (asset.id === 'digging-well') {
      return '💧 عدد الآبار التي ساهمت في بنائها هذا الشهر';
    }
    if (asset.id === 'warratha-mushaf') {
      return '📖 عدد المصاحف التي أهديتها هذا الشهر';
    }

    // رأس المال الاجتماعي
    if (asset.id === 'silat-rahm-asset') {
      return '🤝 عدد الأقارب الذين وصلتهم هذا الأسبوع';
    }
    if (asset.id === 'husn-khuluq-asset') {
      return '💚 عدد المرات التي أحسنت فيها خلقك اليوم';
    }
    if (asset.id === 'love-for-allah') {
      return '❤️ عدد الزيارات في الله هذا الشهر';
    }

    // الاستثمار المجتمعي
    if (asset.id === 'kafil-yateem-asset') {
      return '👶 عدد الأيتام الذين كفلتهم هذا الشهر';
    }
    if (asset.id === 'saaee-armala') {
      return '🤲 عدد الأرامل والمساكين الذين سعيت لهم';
    }
    if (asset.id === 'qadaa-haajat') {
      return '🌟 عدد الأشخاص الذين قضيت حاجاتهم اليوم';
    }

    // الافتراضي
    return 'العدد/القيمة';
  };

  const isVerbalInvestment = asset.type === 'لفظي' && asset.id === 'house-ikhlas';
  const isAgriculturalInvestment = asset.type === 'زراعي';
  const isBehavioralHouseAala = asset.id === 'house-aala';

  // تحديد نص الذكر للأصول الزراعية
  const getDhikrText = () => {
    if (asset.id === 'tree-subhan') return 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ';
    if (asset.id === 'tree-azeem') return 'سُبْحَانَ اللَّهِ الْعَظِيمِ';
    if (asset.id === 'baaqiyat-salihat') return 'الباقيات الصالحات';
    return '';
  };

  const handleAddAsset = () => {
    let finalValue = parseInt(value);
    
    // للاستثمار السلوكي في أعلى الجنة
    if (isBehavioralHouseAala) {
      finalValue = behavioralAnswer === "yes" ? 1 : 0;
    }

    if (finalValue <= 0) {
      toast({
        title: "تنبيه",
        description: "يرجى إدخال قيمة صحيحة",
        variant: "destructive",
      });
      return;
    }

    upsertAsset(
      {
        assetId: asset.id,
        assetType: asset.type,
        category: asset.category,
        value: finalValue,
      },
      {
        onSuccess: () => {
          const successMessages: Record<string, string> = {
            'masjid-building': `مبارك! ${value} بيت في الجنة من بناء المساجد! 🕌`,
            'small-masjid-contribution': `بارك الله فيك! ${value} بيت من المساهمات! 🤝`,
            'house-rabadh': `عظيم! ${value} بيت في ربض الجنة - النبي ﷺ ضامن! 🛡️`,
            'house-wasat': `ممتاز! ${value} بيت في وسط الجنة - النبي ﷺ ضامن! ✨`,
            'house-aala': `ما شاء الله! بيت في أعلى الجنة - النبي ﷺ ضامن! 👑`,
            'house-ikhlas': `سبحان الله! ${value} بيت من قراءة الإخلاص! 📖`,
          };

          toast({
            title: "تم التسجيل! 🎉",
            description: successMessages[asset.id] || `تم إضافة ${value} ${asset.label}`,
          });
          
          // إعادة تعيين
          setValue("1");
          setBehavioralAnswer("yes");
          onClose();
        },
        onError: (error: any) => {
          toast({
            title: "خطأ",
            description: error.message || "حدث خطأ أثناء الحفظ",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleVerbalComplete = (houses: number) => {
    upsertAsset(
      {
        assetId: asset.id,
        assetType: asset.type,
        category: asset.category,
        value: houses,
      },
      {
        onSuccess: () => {
          toast({
            title: "مبارك! 🎉",
            description: `تم إضافة ${houses} بيت في الجنة من قراءة الإخلاص!`,
          });
          onClose();
        },
        onError: (error: any) => {
          toast({
            title: "خطأ",
            description: error.message || "حدث خطأ أثناء الحفظ",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Header مع زر الرجوع */}
      <header className="sticky top-0 z-50 bg-gradient-hero shadow-lg">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-light/20"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Button>

          <div className="text-center flex-1">
            <h1 className="text-base sm:text-lg font-bold text-primary-foreground truncate px-2">
              {asset.label}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                {asset.type}
              </Badge>
              {asset.location && (
                <Badge variant="outline" className="text-[10px] sm:text-xs border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10">
                  📍 {asset.location}
                </Badge>
              )}
            </div>
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* المحتوى الرئيسي - Tabs */}
      <main className="overflow-y-auto h-[calc(100vh-80px)]">
        <Tabs defaultValue="action" className="w-full" dir="rtl">
          <div className="sticky top-0 z-40 bg-background border-b shadow-sm">
            <TabsList className="w-full h-auto grid grid-cols-3 rounded-none p-0 bg-transparent">
              <TabsTrigger value="action" className="flex items-center gap-1.5 py-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Plus className="h-3.5 w-3.5" />
                <span className="font-bold">تسجيل</span>
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center gap-1.5 py-3 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Info className="h-3.5 w-3.5" />
                <span>نظرة عامة</span>
              </TabsTrigger>
              <TabsTrigger value="hadith" className="flex items-center gap-1.5 py-3 text-xs sm:text-sm data-[state=active]:bg-success data-[state=active]:text-white">
                <BookOpen className="h-3.5 w-3.5" />
                <span>الدليل</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-3 sm:p-4 max-w-3xl mx-auto pb-20">
            
            {/* Tab 1: التسجيل - الافتراضي */}
            <TabsContent value="action" className="mt-0">
              {isVerbalInvestment ? (
                // واجهة خاصة للاستثمار اللفظي (قراءة الإخلاص)
                <VerbalInvestmentCounter
                  assetLabel={asset.label}
                  onComplete={handleVerbalComplete}
                  isPending={isPending}
                />
              ) : isAgriculturalInvestment ? (
                // واجهة خاصة للأصول الزراعية
                <AgriculturalCounter
                  assetId={asset.id}
                  assetLabel={asset.label}
                  dhikrText={getDhikrText()}
                  perItem={1} // كل ذكر = شجرة/نخلة
                  onComplete={handleVerbalComplete}
                  isPending={isPending}
                />
              ) : (
                // واجهة عادية للأصول الأخرى
                <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                  <h3 className="font-bold mb-4 text-center flex items-center justify-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>سجّل عملك الآن</span>
                  </h3>
              
                  <div className="space-y-4">
                    {/* للأصول السلوكية - أعلى الجنة: سؤال نعم/لا */}
                    {isBehavioralHouseAala ? (
                      <div className="space-y-3">
                        <div className="text-center py-2">
                          <Label className="text-lg font-bold text-foreground block mb-1">
                            💚 {getInputLabel()}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            اختر إجابتك بصدق - الله يعلم ما في القلوب
                          </p>
                        </div>

                        <RadioGroup value={behavioralAnswer} onValueChange={setBehavioralAnswer}>
                          <div className="space-y-2">
                            {/* خيار نعم */}
                            <label htmlFor="yes">
                              <Card 
                                className={`p-4 cursor-pointer transition-all ${
                                  behavioralAnswer === 'yes' 
                                    ? 'bg-gradient-to-br from-success/20 to-success/10 border-2 border-success shadow-md' 
                                    : 'hover:bg-success/5 border-2 border-transparent hover:border-success/30'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="yes" id="yes" className="w-5 h-5" />
                                  <div className="flex-1 text-right">
                                    <p className="text-base font-bold text-success">
                                      ✅ نعم، حسّنت خُلقي اليوم
                                    </p>
                                  </div>
                                  {behavioralAnswer === 'yes' && (
                                    <CheckCircle2 className="h-6 w-6 text-success" />
                                  )}
                                </div>
                              </Card>
                            </label>
                            
                            {/* خيار لا */}
                            <label htmlFor="no">
                              <Card 
                                className={`p-4 cursor-pointer transition-all ${
                                  behavioralAnswer === 'no' 
                                    ? 'bg-muted border-2 border-muted-foreground/30' 
                                    : 'hover:bg-muted/50 border-2 border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <RadioGroupItem value="no" id="no" className="w-5 h-5" />
                                  <div className="flex-1 text-right">
                                    <p className="font-semibold text-muted-foreground text-sm">
                                      لم أحسّن خلقي بعد - سأحاول اليوم إن شاء الله
                                    </p>
                                  </div>
                                </div>
                              </Card>
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    ) : (
                      // للأصول الأخرى: حقل عدد محسّن
                      <div className="space-y-3">
                        <div className="text-center">
                          <Label htmlFor="asset-value" className="text-base font-bold text-foreground block mb-3">
                            {getInputLabel()}
                          </Label>
                        </div>

                        <div className="relative">
                          <Input
                            id="asset-value"
                            type="number"
                            min="1"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="text-center text-4xl font-black h-20 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 focus:border-primary"
                            placeholder="0"
                          />
                          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
                            <Badge variant="secondary" className="px-3 py-1 text-xs">
                              {asset.id.includes('masjid') ? '🕌' : 
                               asset.id.includes('rabadh') || asset.id.includes('wasat') ? '🏠' : 
                               '📊'} العدد
                            </Badge>
                          </div>
                        </div>
                        
                        {/* نصائح محسّنة مع Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="tips" className="border rounded-lg px-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                            <AccordionTrigger className="hover:no-underline py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-base">💡</span>
                                <span className="font-semibold text-sm">نصائح وأمثلة</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-3">
                              <div className="text-sm">
                                {asset.id === 'masjid-building' && (
                                  <div className="space-y-2">
                                    <p className="font-medium text-center">💡 يشمل المساهمة في:</p>
                                    <div className="flex gap-2 justify-center flex-wrap">
                                      <Badge variant="outline" className="text-xs">🏗️ بناء</Badge>
                                      <Badge variant="outline" className="text-xs">🔨 ترميم</Badge>
                                      <Badge variant="outline" className="text-xs">📏 توسعة</Badge>
                                      <Badge variant="outline" className="text-xs">💰 تمويل</Badge>
                                    </div>
                                  </div>
                                )}
                                {asset.id === 'small-masjid-contribution' && (
                                  <p className="text-center">
                                    💎 عظيم فضل الله! <span className="text-success font-bold">المساهمة الصغيرة = بيت كامل!</span>
                                  </p>
                                )}
                                {(asset.id === 'house-rabadh' || asset.id === 'house-wasat') && (
                                  <p className="text-center">
                                    🎯 كل مرة تركت فيها هذا السلوك = <span className="text-success font-bold">بيت في الجنة</span>
                                  </p>
                                )}
                                {asset.id === 'sadaqa-jariya' && (
                                  <div className="space-y-2">
                                    <p className="font-medium text-center">💡 أمثلة:</p>
                                    <div className="flex gap-2 justify-center flex-wrap">
                                      <Badge variant="outline" className="text-xs">🕌 وقف</Badge>
                                      <Badge variant="outline" className="text-xs">💧 بئر</Badge>
                                      <Badge variant="outline" className="text-xs">🏥 مستشفى</Badge>
                                      <Badge variant="outline" className="text-xs">🏫 مدرسة</Badge>
                                    </div>
                                  </div>
                                )}
                                {asset.id === 'ilm-muntafa' && (
                                  <p className="text-center">
                                    📚 كل شخص علّمته = <span className="text-success font-bold">أجر جارٍ</span> طالما انتفع بالعلم
                                  </p>
                                )}
                                {asset.id === 'walad-salih' && (
                                  <p className="text-center">
                                    👨‍👩‍👦 استثمار في <span className="text-success font-bold">رأس المال البشري</span> - أهم استثمار!
                                  </p>
                                )}
                                {asset.id === 'kafil-yateem-asset' && (
                                  <p className="text-center">
                                    💫 <span className="text-rose-600 font-bold">القرب من النبي ﷺ</span> في الجنة - كهاتين ☝️✌️
                                  </p>
                                )}
                                {asset.id === 'saaee-armala' && (
                                  <div className="space-y-2">
                                    <p className="font-medium text-center">🔥 الرافعة الاستثمارية:</p>
                                    <div className="flex gap-2 justify-center flex-wrap">
                                      <Badge variant="outline" className="text-xs">⚔️ أجر المجاهد</Badge>
                                      <Badge variant="outline" className="text-xs">🌙 القائم الليل</Badge>
                                      <Badge variant="outline" className="text-xs">☀️ الصائم النهار</Badge>
                                    </div>
                                  </div>
                                )}
                                {asset.id === 'qadaa-haajat' && (
                                  <p className="text-center">
                                    🌟 <span className="text-amber-600 font-bold">أحب الأعمال إلى الله</span> - أفضل من اعتكاف شهر!
                                  </p>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all"
                      onClick={handleAddAsset}
                      disabled={isPending || (!isBehavioralHouseAala && (!value || parseInt(value) < 1))}
                    >
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>جاري الحفظ...</span>
                        </div>
                      ) : (
                        <>
                          {isBehavioralHouseAala ? (
                            behavioralAnswer === "yes" ? (
                              <div className="flex items-center gap-2 justify-center">
                                <span>أضف بيتك في أعلى الجنة!</span>
                                <span className="text-2xl">👑</span>
                              </div>
                            ) : (
                              <span>حسناً - حاول مرة أخرى</span>
                            )
                          ) : (
                            <div className="flex items-center gap-2 justify-center">
                              <span>أضف {value} إلى محفظتي</span>
                              <span className="text-xl">
                                {asset.id.includes('masjid') ? '🕌' : 
                                 asset.type === 'زراعي' ? '🌱' : 
                                 '🏠'}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Tab 2: نظرة عامة */}
            <TabsContent value="overview" className="mt-0 space-y-4">
              {/* العائد المضمون - أبرز عنصر */}
              <Card className="p-5 bg-gradient-to-br from-success/15 to-success/5 border-2 border-success/40 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-success mb-2">العائد المضمون</h3>
                    <p className="text-base font-bold text-success leading-snug">
                      {asset.reward}
                    </p>
                    {asset.multiplier && (
                      <Badge className="mt-2 bg-amber-500 hover:bg-amber-600 text-xs">
                        🔥 {asset.multiplier}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* الضامن النبوي - إن وجد */}
              {asset.guarantor && (
                <Card className="p-5 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-emerald-900 border-2 border-emerald-400 dark:border-emerald-700 shadow-md">
                  <div className="flex items-center gap-3">
                    <Shield className="h-10 w-10 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 mb-1.5">
                        ضمان نبوي ⭐
                      </h3>
                      <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                        {asset.guarantor}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* المتطلبات */}
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <div className="text-xl shrink-0">✅</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-blue-700 dark:text-blue-300 mb-1">المتطلبات</h3>
                      <p className="text-sm text-foreground leading-relaxed">
                        {asset.requirement}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* معلومات سريعة */}
                <div className="space-y-3">
                  {asset.speed && (
                    <Card className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-600 shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-muted-foreground">السرعة</div>
                          <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                            {asset.speed}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {asset.location && (
                    <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-purple-600 shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-muted-foreground">الموقع</div>
                          <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                            {asset.location}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {/* ملاحظات مهمة - مع Accordion للتقليل من scrolling */}
              {(asset.note || hadith?.explanation) && (
                <Accordion type="single" collapsible className="w-full">
                  {asset.note && (
                    <AccordionItem value="note" className="border rounded-lg px-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💡</span>
                          <span className="font-bold text-sm text-indigo-700 dark:text-indigo-300">
                            معلومات قيّمة
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-3">
                        <p className="text-sm text-foreground leading-relaxed">
                          {asset.note}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {hadith?.explanation && (
                    <AccordionItem value="explanation" className="border rounded-lg px-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 mt-2">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📝</span>
                          <span className="font-bold text-sm text-blue-700 dark:text-blue-300">
                            شرح الحديث
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-3">
                        <p className="text-sm text-foreground leading-relaxed">
                          {hadith.explanation}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              )}
            </TabsContent>

            {/* Tab 2: الدليل الشرعي */}
            <TabsContent value="hadith" className="mt-0 space-y-4">
              {/* الحديث النبوي - تصميم محسّن */}
              <Card className="p-5 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center">
                    <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                    <h3 className="font-bold text-lg text-accent">الحديث النبوي الشريف</h3>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg border border-accent/20">
                    <p className="text-base leading-relaxed text-foreground font-medium text-center">
                      {hadith?.text || asset.source}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center flex-wrap">
                    <Badge className="text-xs px-3 py-1 bg-accent">
                      {asset.hadithRef}
                    </Badge>
                    {hadith?.authenticity && (
                      <Badge
                        variant={hadith.authenticity === 'صحيح' ? 'default' : 'outline'}
                        className="text-xs px-3 py-1"
                      >
                        ✓ {hadith.authenticity}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* شرح الحديث إن وجد */}
              {hadith?.explanation && (
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">📝</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-2">شرح الحديث</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {hadith.explanation}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* المرجع الكامل */}
              {hadith?.reference && (
                <a
                  href={hadith.reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/30 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <p className="text-sm font-semibold text-primary mb-1">عرض المرجع الكامل</p>
                        <p className="text-xs text-muted-foreground">للتأكد والاستزادة من العلم</p>
                      </div>
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </Card>
                </a>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default AssetDetailsDialog;

