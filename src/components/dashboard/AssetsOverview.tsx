import { Home, Palmtree, Droplets, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTotalAssets } from "@/hooks/useUserAssets";

const AssetsOverview = () => {
  const { data: totals, isLoading } = useTotalAssets();

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-primary shadow-glow flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
      </Card>
    );
  }

  return (
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
  );
};

export default AssetsOverview;
