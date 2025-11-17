import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Palmtree, Sparkles, CheckCircle2, TrendingUp, Leaf, Loader2 } from "lucide-react";

interface AgriculturalCounterProps {
  assetId: string;
  assetLabel: string;
  dhikrText: string; // نص الذكر
  perItem?: number; // عدد المرات لكل شجرة (افتراضي: 1)
  onComplete: (count: number) => void;
  isPending: boolean;
}

const AgriculturalCounter = ({ 
  assetId, 
  assetLabel, 
  dhikrText, 
  perItem = 1,
  onComplete, 
  isPending 
}: AgriculturalCounterProps) => {
  // مفتاح localStorage خاص بكل أصل
  const storageKey = `eternal-portfolio-counter-${assetId}`;
  
  // تحميل الحالة المحفوظة من localStorage
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved) : 0;
  });
  const [trees, setTrees] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const progress = perItem > 1 ? ((count % perItem) / perItem * 100) : 0;

  // حفظ الحالة في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem(storageKey, count.toString());
  }, [count, storageKey]);

  useEffect(() => {
    // حساب عدد الأشجار/النخيل
    const newTrees = Math.floor(count / perItem);
    if (newTrees > trees) {
      setTrees(newTrees);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [count, trees, perItem]);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  const handleSave = () => {
    if (trees > 0) {
      onComplete(trees);
      // حذف الحالة المحفوظة بعد الحفظ في قاعدة البيانات
      localStorage.removeItem(storageKey);
      setCount(0);
      setTrees(0);
    }
  };

  // تحديد الأيقونة والألوان حسب نوع الأصل
  const getAssetConfig = () => {
    if (assetId === 'tree-subhan') {
      return {
        icon: Palmtree,
        emoji: '🌴',
        color: 'from-success to-success-light',
        bgColor: 'from-success/10 to-success/5',
        itemName: 'نخلة',
        celebration: 'نخلة جديدة'
      };
    }
    if (assetId === 'tree-azeem') {
      return {
        icon: Leaf,
        emoji: '🌳',
        color: 'from-green-600 to-green-400',
        bgColor: 'from-green-50 to-green-100 dark:from-green-950 dark:to-green-900',
        itemName: 'شجرة',
        celebration: 'شجرة جديدة'
      };
    }
    // الباقيات الصالحات
    return {
      icon: Sparkles,
      emoji: '✨',
      color: 'from-amber-500 to-amber-300',
      bgColor: 'from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
      itemName: 'غرسة',
      celebration: 'غرسة جديدة'
    };
  };

  const config = getAssetConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* العداد الرئيسي */}
      <Card className={`p-4 sm:p-6 bg-gradient-to-br ${config.bgColor} border-2 border-success/20 shadow-xl`}>
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-success animate-pulse" />
            <h3 className="font-bold text-base sm:text-xl">اضغط للذكر</h3>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-success animate-pulse" />
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground px-2">
            {perItem === 1 ? (
              <>كل ذِكر = {config.itemName} في الجنة {config.emoji}</>
            ) : (
              <>كل {perItem} ذِكر = {config.itemName} في الجنة {config.emoji}</>
            )}
          </p>

          {/* زر الذكر الكبير */}
          <Button
            size="lg"
            onClick={handleClick}
            disabled={isPending}
            className={`w-full h-36 sm:h-44 text-xl sm:text-2xl font-bold bg-gradient-to-br ${config.color} hover:scale-105 active:scale-95 transition-all shadow-2xl ${showCelebration ? 'animate-celebration' : ''}`}
          >
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <Icon className={`h-10 w-10 sm:h-14 sm:w-14 ${count > 0 ? 'animate-bounce' : ''}`} />
              <span className="text-base sm:text-lg leading-tight px-2 sm:px-4">{dhikrText}</span>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-6xl sm:text-8xl font-black animate-pulse">{count}</span>
                {perItem > 1 && (
                  <span className="text-xl sm:text-2xl text-white/70">/ {perItem}</span>
                )}
              </div>
            </div>
          </Button>

          {/* شريط التقدم (إذا كان perItem > 1) */}
          {perItem > 1 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>التقدم نحو {config.itemName} التالية</span>
                <span>{count % perItem} / {perItem}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}

          {/* أزرار سريعة */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(prev => prev + 10)}
              className="text-xs"
            >
              +10
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(prev => prev + 33)}
              className="text-xs"
            >
              +33
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(prev => prev + 100)}
              className="text-xs"
            >
              +100
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount(0)}
              className="text-xs"
            >
              إعادة
            </Button>
          </div>
        </div>
      </Card>

      {/* عداد الأشجار/النخيل */}
      {trees > 0 && (
        <Card className={`p-6 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success transition-all ${showCelebration ? 'scale-105 shadow-2xl' : 'shadow-lg'}`}>
          <div className="text-center space-y-4">
            {showCelebration && (
              <div className="flex items-center justify-center gap-2 text-success animate-bounce">
                <CheckCircle2 className="h-7 w-7" />
                <span className="font-bold text-xl">
                  مبارك! {config.celebration} في الجنة! {config.emoji}
                </span>
                <CheckCircle2 className="h-7 w-7" />
              </div>
            )}
            
            <div className="flex items-center justify-center gap-4">
              <Icon className="h-12 w-12 text-success animate-float" />
              <div>
                <p className="text-sm text-muted-foreground">غراسك في الجنة</p>
                <p className="text-6xl font-black text-success">{trees}</p>
                <p className="text-xs text-muted-foreground">{config.itemName}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-success/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">إجمالي الأذكار</p>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {count}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">الغراس المكتمل</p>
                  <Badge className="text-lg px-4 py-2 bg-success">
                    {trees}
                  </Badge>
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <Card className="p-3 bg-white/50 dark:bg-background/50">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="text-muted-foreground">المعدل</p>
                  <p className="font-bold text-success">{(trees / (count || 1) * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المتبقي</p>
                  <p className="font-bold text-primary">{perItem - (count % perItem)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">التالي</p>
                  <p className="font-bold text-amber-600">{trees + 1}</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      )}

      {/* زر الحفظ */}
      {trees > 0 && (
        <Button
          className="w-full bg-gradient-to-r from-success to-success-light hover:from-success-light hover:to-success py-8 text-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>جاري إضافة غراسك...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-center">
              <span>أضف {trees} {config.itemName} إلى محفظتي</span>
              <span className="text-3xl">{config.emoji}</span>
            </div>
          )}
        </Button>
      )}

      {/* تحفيز ونصائح */}
      <Card className="p-5 bg-gradient-to-r from-primary/5 to-success/5 border border-primary/30">
        <div className="text-center space-y-3">
          <p className="font-bold text-success text-lg flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span>نصيحة ذهبية</span>
            <Sparkles className="h-5 w-5" />
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            {assetId === 'tree-subhan' && (
              <>
                قُلها <span className="font-bold text-success">100 مرة</span> فقط = 
                <span className="font-bold text-success"> 100 نخلة</span> في الجنة! 
                <br />⏱️ الوقت: <span className="font-bold">5 دقائق</span> فقط
              </>
            )}
            {assetId === 'tree-azeem' && (
              <>
                <span className="font-bold text-success">سبحان الله العظيم</span> - 
                كلمة واحدة = شجرة كاملة!
              </>
            )}
            {assetId === 'baaqiyat-salihat' && (
              <>
                رسالة <span className="font-bold text-amber-600">إبراهيم عليه السلام</span> للأمة:
                <br />عمّر أرضك في الجنة بالباقيات الصالحات
              </>
            )}
          </p>
        </div>
      </Card>

      {/* إحصائيات تحفيزية */}
      {count >= 10 && (
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800">
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
              🔥 ما شاء الله! استمر
            </p>
            <div className="flex gap-4 justify-center text-xs">
              {count >= 33 && (
                <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900">
                  🎯 33+ ذكر
                </Badge>
              )}
              {count >= 100 && (
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                  🏆 100+ ذكر
                </Badge>
              )}
              {trees >= 10 && (
                <Badge className="bg-success">
                  ⭐ {trees} غراس!
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AgriculturalCounter;

