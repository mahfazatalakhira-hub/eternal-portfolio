import { Home, Palmtree, Droplets, Loader2, Sword, Heart, Sparkles, Book, HandHeart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTotalAssets, useDetailedStats } from "@/hooks/useUserAssets";

const AssetsOverview = () => {
  const { data: totals, isLoading: loadingTotals } = useTotalAssets();
  const { data: detailedStats, isLoading: loadingDetails } = useDetailedStats();

  const isLoading = loadingTotals || loadingDetails;

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-primary shadow-glow flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* البطاقة الرئيسية */}
      <Card className="p-6 bg-gradient-primary shadow-glow">
        <h2 className="text-lg font-bold text-primary-foreground mb-4 text-right">نظرة عامة على المحفظة</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Houses */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
              <Home className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">
              {totals?.total_houses || 0}
            </p>
            <p className="text-xs text-primary-foreground/80">بيت وقصر</p>
          </div>

          {/* Palm Trees */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
              <Palmtree className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">
              {totals?.total_trees || 0}
            </p>
            <p className="text-xs text-primary-foreground/80">نخلة وشجرة</p>
          </div>

          {/* Continuous Assets */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
              <Droplets className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-primary-foreground">
              {totals?.total_continuous || 0}
            </p>
            <p className="text-xs text-primary-foreground/80">أصل جاري</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-primary-foreground/20">
          <div className="flex justify-between items-center text-primary-foreground/90 text-right">
            <span className="text-sm">إجمالي القيمة المقدرة</span>
            <span className="text-sm font-semibold">لا تُقدر بثمن 🤲</span>
          </div>
        </div>
      </Card>

      {/* الإحصائيات المجتمعية المميزة */}
      {detailedStats && (detailedStats.jihad_equivalent > 0 || detailedStats.prophet_proximity > 0 || detailedStats.needs_fulfilled > 0 || detailedStats.continuous_charity > 0 || detailedStats.inherited_mushaf > 0) && (
        <Card className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-900 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
          <h3 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-100 mb-3 sm:mb-4 text-right flex items-center gap-2 justify-end">
            <span className="text-xs sm:text-base">إنجازاتك المجتمعية المميزة</span>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
          </h3>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* أجر الجهاد */}
            {detailedStats.jihad_equivalent > 0 && (
              <div className="p-2.5 sm:p-3 bg-white/80 dark:bg-background/50 rounded-lg border border-amber-200 dark:border-amber-700 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Sword className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{detailedStats.jihad_equivalent}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">أجر المجاهد</p>
                <Badge variant="outline" className="mt-1 text-[9px] sm:text-xs bg-red-50 dark:bg-red-950 px-1.5 py-0.5">
                  ⚔️ السعي
                </Badge>
              </div>
            )}

            {/* مرافقة النبي */}
            {detailedStats.prophet_proximity > 0 && (
              <div className="p-3 bg-white/80 dark:bg-background/50 rounded-lg border border-amber-200 dark:border-amber-700 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="h-5 w-5 text-rose-600" />
                </div>
                <p className="text-2xl font-bold text-rose-600">{detailedStats.prophet_proximity}</p>
                <p className="text-xs text-muted-foreground">قرب النبي ﷺ</p>
                <Badge variant="outline" className="mt-1 text-xs bg-rose-50 dark:bg-rose-950">
                  👶 كفالة اليتيم
                </Badge>
              </div>
            )}

            {/* قضاء الحاجات */}
            {detailedStats.needs_fulfilled > 0 && (
              <div className="p-3 bg-white/80 dark:bg-background/50 rounded-lg border border-amber-200 dark:border-amber-700 text-center">
                <div className="flex items-center justify-center mb-1">
                  <HandHeart className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-amber-600">{detailedStats.needs_fulfilled}</p>
                <p className="text-xs text-muted-foreground">حاجة مقضية</p>
                <Badge variant="outline" className="mt-1 text-xs bg-amber-50 dark:bg-amber-950">
                  🌟 أحب الأعمال
                </Badge>
              </div>
            )}

            {/* الصدقات الجارية */}
            {detailedStats.continuous_charity > 0 && (
              <div className="p-3 bg-white/80 dark:bg-background/50 rounded-lg border border-amber-200 dark:border-amber-700 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{detailedStats.continuous_charity}</p>
                <p className="text-xs text-muted-foreground">صدقة جارية</p>
                <Badge variant="outline" className="mt-1 text-xs bg-blue-50 dark:bg-blue-950">
                  💧 دخل أبدي
                </Badge>
              </div>
            )}

            {/* المصاحف الموروثة */}
            {detailedStats.inherited_mushaf > 0 && (
              <div className="p-3 bg-white/80 dark:bg-background/50 rounded-lg border border-amber-200 dark:border-amber-700 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Book className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{detailedStats.inherited_mushaf}</p>
                <p className="text-xs text-muted-foreground">مصحف موروث</p>
                <Badge variant="outline" className="mt-1 text-xs bg-green-50 dark:bg-green-950">
                  📖 علم جارٍ
                </Badge>
              </div>
            )}
          </div>

          <p className="text-xs text-center text-amber-700 dark:text-amber-300 mt-4 font-medium">
            ⭐ إنجازات عالية القيمة - استمر وبارك الله فيك
          </p>
        </Card>
      )}
    </div>
  );
};

export default AssetsOverview;
