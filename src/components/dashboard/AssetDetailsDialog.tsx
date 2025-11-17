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

    // الافتراضي
    return 'العدد/القيمة';
  };

  const isVerbalInvestment = asset.type === 'لفظي' && asset.id === 'house-ikhlas';
  const isBehavioralHouseAala = asset.id === 'house-aala';

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl flex items-center gap-2 justify-end">
            <span>{asset.label}</span>
            <Award className="h-5 w-5 text-primary" />
          </DialogTitle>
          <DialogDescription className="text-right">
            تفاصيل الأصل الاستثماري الأخروي
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-right">
          {/* الحديث النبوي */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <h3 className="font-bold mb-3 text-primary flex items-center gap-2 justify-end">
              <span>الحديث النبوي</span>
              <Sparkles className="h-4 w-4" />
            </h3>
            <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
              {hadith?.text || asset.source}
            </p>
            <div className="flex gap-2 justify-end flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {asset.hadithRef}
              </Badge>
              {hadith?.authenticity && (
                <Badge
                  variant={hadith.authenticity === 'صحيح' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {hadith.authenticity}
                </Badge>
              )}
            </div>
          </Card>

          {/* نوع الاستثمار */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <h4 className="font-bold text-xs mb-1 text-muted-foreground">نوع الاستثمار</h4>
              <Badge variant="outline" className="text-sm">{asset.type}</Badge>
            </Card>
            
            {asset.location && (
              <Card className="p-3">
                <h4 className="font-bold text-xs mb-1 text-muted-foreground">الموقع في الجنة</h4>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="text-sm font-medium">{asset.location}</span>
                </div>
              </Card>
            )}
          </div>

          {/* المتطلبات */}
          <Card className="p-4 bg-accent/5">
            <h3 className="font-bold mb-2 flex items-center gap-2 justify-end">
              <span>المتطلبات</span>
              <span>✅</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {asset.requirement}
            </p>
          </Card>

          {/* العائد */}
          <Card className="p-4 bg-success/5">
            <h3 className="font-bold mb-2 text-success flex items-center gap-2 justify-end">
              <span>العائد المضمون</span>
              <Award className="h-4 w-4" />
            </h3>
            <p className="text-sm font-semibold text-success">
              {asset.reward}
            </p>
            {asset.multiplier && (
              <p className="text-xs text-muted-foreground mt-2">
                🔥 {asset.multiplier}
              </p>
            )}
          </Card>

          {/* الضامن */}
          {asset.guarantor && (
            <Card className="p-3 bg-success/10 border-success">
              <h3 className="font-bold mb-1 text-success flex items-center gap-2 justify-end">
                <span>الضمان</span>
                <Shield className="h-4 w-4" />
              </h3>
              <p className="text-sm">{asset.guarantor}</p>
            </Card>
          )}

          {/* السرعة */}
          {asset.speed && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-end">
              <span>{asset.speed}</span>
              <Clock className="h-4 w-4" />
            </div>
          )}

          {/* ملاحظات إضافية */}
          {asset.note && (
            <Card className="p-4 bg-muted/30">
              <h3 className="font-bold mb-2 flex items-center gap-2 justify-end">
                <span>ملاحظات</span>
                <span>💡</span>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {asset.note}
              </p>
            </Card>
          )}

          {/* الشرح من الحديث */}
          {hadith?.explanation && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-xs text-blue-900 dark:text-blue-100 leading-relaxed">
                📝 {hadith.explanation}
              </p>
            </div>
          )}

          {/* قسم التسجيل */}
          {isVerbalInvestment ? (
            // واجهة خاصة للاستثمار اللفظي (قراءة الإخلاص)
            <VerbalInvestmentCounter
              assetLabel={asset.label}
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
                  <div className="space-y-3">
                    <Label className="text-right block text-base font-semibold">
                      💚 {getInputLabel()}
                    </Label>
                    <RadioGroup value={behavioralAnswer} onValueChange={setBehavioralAnswer}>
                      <div className="space-y-2">
                        <Card className="p-4 cursor-pointer hover:bg-success/5 transition-all border-2 hover:border-success">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes" className="flex-1 cursor-pointer text-right">
                              <div>
                                <p className="font-bold text-success">نعم، حسّنت خُلقي اليوم 💚</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  ابتسمت، صبرت، عفوت، أحسنت للناس
                                </p>
                              </div>
                            </Label>
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          </div>
                        </Card>
                        
                        <Card className="p-4 cursor-pointer hover:bg-muted transition-all">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no" className="flex-1 cursor-pointer text-right">
                              <p className="font-medium">لم أحسّن خلقي بعد</p>
                              <p className="text-xs text-muted-foreground mt-1">سأحاول اليوم</p>
                            </Label>
                          </div>
                        </Card>
                      </div>
                    </RadioGroup>
                  </div>
                ) : (
                  // للأصول الأخرى: حقل عدد
                  <div className="space-y-2">
                    <Label htmlFor="asset-value" className="text-right block text-base font-semibold">
                      {getInputLabel()}
                    </Label>
                    <Input
                      id="asset-value"
                      type="number"
                      min="1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="text-center text-2xl font-bold h-16"
                      placeholder="أدخل العدد"
                    />
                    
                    {/* نصائح حسب نوع الأصل */}
                    {asset.id === 'masjid-building' && (
                      <p className="text-xs text-muted-foreground text-center">
                        💡 يشمل المساهمة في بناء أو ترميم أو توسعة مسجد
                      </p>
                    )}
                    {asset.id === 'small-masjid-contribution' && (
                      <p className="text-xs text-muted-foreground text-center">
                        💡 حتى المساهمة الصغيرة تحصل على بيت كامل!
                      </p>
                    )}
                    {(asset.id === 'house-rabadh' || asset.id === 'house-wasat') && (
                      <p className="text-xs text-muted-foreground text-center">
                        💡 كل مرة تركت فيها هذا السلوك = بيت في الجنة
                      </p>
                    )}
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary-light py-6 text-lg"
                  onClick={handleAddAsset}
                  disabled={isPending || (!isBehavioralHouseAala && (!value || parseInt(value) < 1))}
                >
                  {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {isPending ? "جاري الحفظ..." : (
                    <>
                      {isBehavioralHouseAala ? (
                        behavioralAnswer === "yes" ? "أضف بيتك في أعلى الجنة! 👑" : "حسناً"
                      ) : (
                        `أضف ${value} إلى محفظتي 🏠`
                      )}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* المرجع */}
          {hadith?.reference && (
            <div className="text-center">
              <a
                href={hadith.reference}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>عرض المرجع الكامل</span>
                <TrendingUp className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailsDialog;

