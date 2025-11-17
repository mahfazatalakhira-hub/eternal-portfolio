import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

interface VerbalInvestmentCounterProps {
  assetLabel: string;
  onComplete: (count: number) => void;
  isPending: boolean;
}

const VerbalInvestmentCounter = ({ assetLabel, onComplete, isPending }: VerbalInvestmentCounterProps) => {
  // مفتاح localStorage خاص لقراءة الإخلاص
  const storageKey = 'eternal-portfolio-counter-house-ikhlas';
  
  // تحميل الحالة المحفوظة من localStorage
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved) : 0;
  });
  const [houses, setHouses] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const READS_PER_HOUSE = 10;
  const progress = (count % READS_PER_HOUSE) / READS_PER_HOUSE * 100;

  // حفظ الحالة في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem(storageKey, count.toString());
  }, [count, storageKey]);

  useEffect(() => {
    // حساب عدد البيوت
    const newHouses = Math.floor(count / READS_PER_HOUSE);
    if (newHouses > houses) {
      setHouses(newHouses);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [count, houses]);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  const handleSave = () => {
    if (houses > 0) {
      onComplete(houses);
      // حذف الحالة المحفوظة بعد الحفظ في قاعدة البيانات
      localStorage.removeItem(storageKey);
      setCount(0);
      setHouses(0);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* العداد الرئيسي */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent animate-pulse" />
            <h3 className="font-bold text-base sm:text-lg">اضغط للقراءة</h3>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-accent animate-pulse" />
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground px-2">
            اقرأ سورة الإخلاص 10 مرات = بيت في الجنة
          </p>

          {/* زر القراءة الكبير */}
          <Button
            size="lg"
            onClick={handleClick}
            disabled={isPending}
            className={`w-full h-32 sm:h-40 text-xl sm:text-2xl font-bold bg-gradient-to-br from-accent to-accent-light hover:scale-105 active:scale-95 transition-all shadow-lg ${showCelebration ? 'animate-celebration' : ''}`}
          >
            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
              <Sparkles className={`h-10 w-10 sm:h-12 sm:w-12 ${count > 0 ? 'animate-spin' : ''}`} />
              <span className="text-sm sm:text-lg leading-tight">قُلْ هُوَ اللَّهُ أَحَدٌ</span>
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-5xl sm:text-7xl font-black animate-pulse">{count}</span>
                <span className="text-lg sm:text-xl text-accent-foreground/70">/ 10</span>
              </div>
            </div>
          </Button>

          {/* شريط التقدم */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>التقدم نحو البيت التالي</span>
              <span>{count % READS_PER_HOUSE} / {READS_PER_HOUSE}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </Card>

      {/* عداد البيوت */}
      {houses > 0 && (
        <Card className={`p-4 sm:p-6 bg-gradient-to-br from-success/10 to-success/5 border-2 border-success transition-all ${showCelebration ? 'scale-105 shadow-2xl' : ''}`}>
          <div className="text-center space-y-2 sm:space-y-3">
            {showCelebration && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-success animate-bounce flex-wrap">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-bold text-sm sm:text-lg">مبارك! بيت جديد في الجنة! 🎉</span>
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">بيوتك في الجنة</p>
                <p className="text-4xl sm:text-5xl font-black text-success">{houses}</p>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-success/20">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">إجمالي القراءات</p>
                  <Badge variant="outline" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                    {count}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">البيوت المكتملة</p>
                  <Badge className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 bg-success">
                    {houses}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* زر الحفظ */}
      {houses > 0 && (
        <Button
          className="w-full bg-primary hover:bg-primary-light py-5 sm:py-6 text-base sm:text-lg font-bold"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? "جاري الحفظ..." : (
            <span className="flex items-center gap-2 justify-center">
              <span>أضف {houses} بيت إلى محفظتي</span>
              <span className="text-xl sm:text-2xl">🏠</span>
            </span>
          )}
        </Button>
      )}

      {/* تحفيز */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-primary">💡 نصيحة</p>
          <p>كل 10 قراءات = بيت كامل في الجنة</p>
          <p className="text-xs">استمر في القراءة لبناء المزيد من البيوت!</p>
        </div>
      </Card>
    </div>
  );
};

export default VerbalInvestmentCounter;

