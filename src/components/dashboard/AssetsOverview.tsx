import { Home, Palmtree, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

const AssetsOverview = () => {
  return (
    <Card className="p-6 bg-gradient-primary shadow-glow">
      <h2 className="text-lg font-bold text-primary-foreground mb-4">نظرة عامة على المحفظة</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Houses */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
            <Home className="h-7 w-7 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold text-primary-foreground">5</p>
          <p className="text-xs text-primary-foreground/80">بيت وقصر</p>
        </div>

        {/* Palm Trees */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
            <Palmtree className="h-7 w-7 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold text-primary-foreground">250</p>
          <p className="text-xs text-primary-foreground/80">نخلة وشجرة</p>
        </div>

        {/* Continuous Assets */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-2">
            <Droplets className="h-7 w-7 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold text-primary-foreground">3</p>
          <p className="text-xs text-primary-foreground/80">أصل جاري</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-primary-foreground/20">
        <div className="flex justify-between items-center text-primary-foreground/90">
          <span className="text-sm">إجمالي القيمة المقدرة</span>
          <span className="text-sm font-semibold">لا تُقدر بثمن 🤲</span>
        </div>
      </div>
    </Card>
  );
};

export default AssetsOverview;
