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
import { Asset } from "@/data/types";
import { getHadithById } from "@/data/hadithsData";
import { useUpsertAsset } from "@/hooks/useUserAssets";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Award, MapPin, Shield, Sparkles, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
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
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header مع زر الرجوع */}
      <header className="sticky top-0 z-50 bg-gradient-hero shadow-lg">
        <div className="flex items-center justify-between p-4">
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
            <h1 className="text-lg font-bold text-primary-foreground">تفاصيل الأصل</h1>
            <p className="text-xs text-primary-foreground/80">{asset.type}</p>
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="overflow-y-auto pb-24 sm:pb-28" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="max-w-3xl mx-auto p-3 sm:p-4 space-y-4 sm:space-y-6 text-right">
          {/* بطاقة العنوان الكبيرة */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <Award className="h-7 w-7 sm:h-10 sm:w-10 text-primary" />
              </div>
              <div className="flex-1 text-right">
                <h2 className="text-lg sm:text-2xl font-black text-foreground mb-1 sm:mb-2 leading-tight">
                  {asset.label}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {asset.description || asset.source}
                </p>
              </div>
            </div>
          </Card>

          {/* الحديث النبوي - كارت مميز */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 shadow-lg">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 justify-end">
                <h3 className="font-bold text-base sm:text-xl text-accent">الحديث النبوي الشريف</h3>
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent animate-pulse" />
              </div>
              
              <div className="p-3 sm:p-4 bg-background/50 rounded-lg border border-accent/20">
                <p className="text-sm sm:text-base leading-relaxed text-foreground font-medium">
                  {hadith?.text || asset.source}
                </p>
              </div>

              <div className="flex gap-1.5 sm:gap-2 justify-end flex-wrap">
                <Badge className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 bg-accent">
                  {asset.hadithRef}
                </Badge>
                {hadith?.authenticity && (
                  <Badge
                    variant={hadith.authenticity === 'صحيح' ? 'default' : 'outline'}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                  >
                    ✓ {hadith.authenticity}
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* معلومات سريعة - بطاقات كبيرة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-2 font-semibold">نوع الاستثمار</div>
                <Badge variant="default" className="text-lg px-4 py-2 bg-blue-600">
                  {asset.type}
                </Badge>
              </div>
            </Card>
            
            {asset.location && (
              <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-2 border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-2 font-semibold">الموقع في الجنة</div>
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span className="text-lg font-bold text-purple-600">{asset.location}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* المتطلبات - كارت كبير */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-2 border-yellow-200 dark:border-yellow-800 shadow-md">
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-end">
                <h3 className="font-bold text-xl text-yellow-700 dark:text-yellow-300">المتطلبات</h3>
                <div className="w-10 h-10 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <p className="text-base leading-relaxed text-foreground font-medium">
                {asset.requirement}
              </p>
            </div>
          </Card>

          {/* العائد المضمون - كارت مميز */}
          <Card className="p-6 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-success-light to-success animate-gradient" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-end">
                <h3 className="font-bold text-xl text-success">العائد المضمون</h3>
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-success" />
                </div>
              </div>
              
              <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                <p className="text-lg font-bold text-success leading-relaxed">
                  {asset.reward}
                </p>
              </div>

              {asset.multiplier && (
                <div className="flex items-center gap-2 justify-end text-amber-600 dark:text-amber-400">
                  <span className="text-sm font-semibold">🔥 {asset.multiplier}</span>
                </div>
              )}
            </div>
          </Card>

          {/* الضامن - كارت خاص مميز */}
          {asset.guarantor && (
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-emerald-900 border-2 border-emerald-300 dark:border-emerald-700 shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-200 dark:bg-emerald-800 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-300 dark:bg-emerald-700 rounded-full opacity-10" />
              
              <div className="relative space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 justify-end">
                  <h3 className="font-bold text-lg sm:text-2xl text-emerald-700 dark:text-emerald-300">ضمان نبوي</h3>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-white/80 dark:bg-emerald-950/50 rounded-lg sm:rounded-xl border-2 border-emerald-300 dark:border-emerald-700">
                  <p className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-300 text-center leading-tight">
                    {asset.guarantor}
                  </p>
                </div>

                <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 text-center font-medium">
                  ⭐ أعلى شهادة ضمان يمكن أن تحصل عليها
                </p>
              </div>
            </Card>
          )}

          {/* السرعة والمميزات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {asset.speed && (
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-2 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 justify-end">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">السرعة</div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">{asset.speed}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </Card>
            )}

            {asset.multiplier && (
              <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 justify-end">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">المضاعف</div>
                    <p className="text-sm font-bold text-red-700 dark:text-red-300">{asset.multiplier}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
              </Card>
            )}
          </div>

          {/* ملاحظات إضافية - كارت كبير */}
          {asset.note && (
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-2 border-indigo-200 dark:border-indigo-800">
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-end">
                  <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">معلومات قيّمة</h3>
                  <span className="text-3xl">💡</span>
                </div>
                <p className="text-base text-foreground leading-relaxed font-medium">
                  {asset.note}
                </p>
              </div>
            </Card>
          )}

          {/* الشرح من الحديث */}
          {hadith?.explanation && (
            <Card className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">📝</span>
                <p className="text-sm text-foreground leading-relaxed">
                  {hadith.explanation}
                </p>
              </div>
            </Card>
          )}

          {/* قسم التسجيل */}
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
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10">
              <h3 className="font-bold mb-3 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>سجّل عملك الآن</span>
              </h3>
              
              <div className="space-y-4">
                {/* للأصول السلوكية - أعلى الجنة: سؤال نعم/لا */}
                {isBehavioralHouseAala ? (
                  <div className="space-y-4">
                    <div className="text-center py-3">
                      <Label className="text-2xl font-black text-foreground block mb-2">
                        💚 {getInputLabel()}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        اختر إجابتك بصدق - الله يعلم ما في القلوب
                      </p>
                    </div>

                    <RadioGroup value={behavioralAnswer} onValueChange={setBehavioralAnswer}>
                      <div className="space-y-3">
                        {/* خيار نعم - تصميم مميز */}
                        <label htmlFor="yes">
                          <Card 
                            className={`p-6 cursor-pointer transition-all duration-300 ${
                              behavioralAnswer === 'yes' 
                                ? 'bg-gradient-to-br from-success/20 to-success/10 border-2 border-success shadow-lg scale-105' 
                                : 'hover:bg-success/5 border-2 border-transparent hover:border-success/30'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <RadioGroupItem value="yes" id="yes" className="w-6 h-6" />
                              <div className="flex-1 text-right">
                                <p className="text-xl font-bold text-success mb-2">
                                  ✅ نعم، حسّنت خُلقي اليوم
                                </p>
                                <div className="flex gap-2 flex-wrap justify-end text-xs text-muted-foreground">
                                  <Badge variant="outline" className="bg-success/10">😊 ابتسمت</Badge>
                                  <Badge variant="outline" className="bg-success/10">🙏 صبرت</Badge>
                                  <Badge variant="outline" className="bg-success/10">💚 عفوت</Badge>
                                  <Badge variant="outline" className="bg-success/10">🤝 أحسنت</Badge>
                                </div>
                              </div>
                              {behavioralAnswer === 'yes' && (
                                <CheckCircle2 className="h-8 w-8 text-success animate-pulse" />
                              )}
                            </div>
                          </Card>
                        </label>
                        
                        {/* خيار لا */}
                        <label htmlFor="no">
                          <Card 
                            className={`p-5 cursor-pointer transition-all ${
                              behavioralAnswer === 'no' 
                                ? 'bg-muted border-2 border-muted-foreground/30' 
                                : 'hover:bg-muted/50 border-2 border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <RadioGroupItem value="no" id="no" className="w-6 h-6" />
                              <div className="flex-1 text-right">
                                <p className="font-semibold text-muted-foreground">لم أحسّن خلقي بعد</p>
                                <p className="text-xs text-muted-foreground mt-1">سأحاول اليوم إن شاء الله</p>
                              </div>
                            </div>
                          </Card>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                ) : (
                  // للأصول الأخرى: حقل عدد محسّن
                  <div className="space-y-4">
                    <div className="text-center py-2">
                      <Label htmlFor="asset-value" className="text-xl font-bold text-foreground block mb-2">
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
                        className="text-center text-4xl sm:text-5xl font-black h-20 sm:h-24 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 focus:border-primary"
                        placeholder="0"
                      />
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 sm:-bottom-3">
                        <Badge variant="secondary" className="px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm">
                          {asset.id.includes('masjid') ? '🕌' : 
                           asset.id.includes('rabadh') || asset.id.includes('wasat') ? '🏠' : 
                           '📊'} العدد
                        </Badge>
                      </div>
                    </div>
                    
                    {/* نصائح محسّنة حسب نوع الأصل */}
                    <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
                      {asset.id === 'masjid-building' && (
                        <div className="text-center space-y-2">
                          <p className="text-sm font-semibold text-foreground">
                            💡 يشمل المساهمة في:
                          </p>
                          <div className="flex gap-2 justify-center flex-wrap">
                            <Badge variant="outline" className="text-xs">🏗️ بناء</Badge>
                            <Badge variant="outline" className="text-xs">🔨 ترميم</Badge>
                            <Badge variant="outline" className="text-xs">📏 توسعة</Badge>
                            <Badge variant="outline" className="text-xs">💰 تمويل</Badge>
                          </div>
                        </div>
                      )}
                      {asset.id === 'small-masjid-contribution' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          💎 عظيم فضل الله! <span className="text-success font-bold">المساهمة الصغيرة = بيت كامل!</span>
                        </p>
                      )}
                      {(asset.id === 'house-rabadh' || asset.id === 'house-wasat') && (
                        <p className="text-sm text-center font-medium text-foreground">
                          🎯 كل مرة تركت فيها هذا السلوك = <span className="text-success font-bold">بيت في الجنة</span>
                        </p>
                      )}
                      {asset.type === 'زراعي' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          🌱 كل تسبيحة = <span className="text-success font-bold">شجرة أو نخلة</span> في الجنة
                        </p>
                      )}
                      {asset.id === 'sadaqa-jariya' && (
                        <div className="text-center space-y-2">
                          <p className="text-sm font-semibold text-foreground">💡 أمثلة:</p>
                          <div className="flex gap-2 justify-center flex-wrap">
                            <Badge variant="outline" className="text-xs">🕌 وقف</Badge>
                            <Badge variant="outline" className="text-xs">💧 بئر</Badge>
                            <Badge variant="outline" className="text-xs">🏥 مستشفى</Badge>
                            <Badge variant="outline" className="text-xs">🏫 مدرسة</Badge>
                          </div>
                        </div>
                      )}
                      {asset.id === 'ilm-muntafa' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          📚 كل شخص علّمته = <span className="text-success font-bold">أجر جارٍ</span> طالما انتفع بالعلم
                        </p>
                      )}
                      {asset.id === 'walad-salih' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          👨‍👩‍👦 استثمار في <span className="text-success font-bold">رأس المال البشري</span> - أهم استثمار!
                        </p>
                      )}
                      {asset.id === 'kafil-yateem-asset' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          💫 <span className="text-rose-600 font-bold">القرب من النبي ﷺ</span> في الجنة - كهاتين ☝️✌️
                        </p>
                      )}
                      {asset.id === 'saaee-armala' && (
                        <div className="text-center space-y-2">
                          <p className="text-sm font-semibold text-foreground">🔥 الرافعة الاستثمارية:</p>
                          <div className="flex gap-2 justify-center flex-wrap">
                            <Badge variant="outline" className="text-xs bg-red-50">⚔️ أجر المجاهد</Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50">🌙 القائم الليل</Badge>
                            <Badge variant="outline" className="text-xs bg-amber-50">☀️ الصائم النهار</Badge>
                          </div>
                        </div>
                      )}
                      {asset.id === 'qadaa-haajat' && (
                        <p className="text-sm text-center font-medium text-foreground">
                          🌟 <span className="text-amber-600 font-bold">أحب الأعمال إلى الله</span> - أفضل من اعتكاف شهر!
                        </p>
                      )}
                    </Card>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary py-6 sm:py-8 text-base sm:text-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                  onClick={handleAddAsset}
                  disabled={isPending || (!isBehavioralHouseAala && (!value || parseInt(value) < 1))}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                      <span className="text-sm sm:text-base">جاري الحفظ...</span>
                    </div>
                  ) : (
                    <>
                      {isBehavioralHouseAala ? (
                        behavioralAnswer === "yes" ? (
                          <div className="flex items-center gap-2 justify-center">
                            <span className="text-sm sm:text-base">أضف بيتك في أعلى الجنة!</span>
                            <span className="text-2xl sm:text-3xl">👑</span>
                          </div>
                        ) : (
                          <span className="text-sm sm:text-base">حسناً - حاول مرة أخرى</span>
                        )
                      ) : (
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-sm sm:text-base">أضف {value} إلى محفظتي</span>
                          <span className="text-xl sm:text-2xl">
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

          {/* المرجع - زر كبير */}
          {hadith?.reference && (
            <a
              href={hadith.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/30 hover:shadow-lg transition-all cursor-pointer">
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
        </div>

        {/* زر الرجوع الثابت في الأسفل (للراحة) */}
        <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
          <Button
            variant="outline"
            className="w-full max-w-3xl mx-auto pointer-events-auto shadow-lg"
            onClick={onClose}
          >
            العودة للأصول
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AssetDetailsDialog;

