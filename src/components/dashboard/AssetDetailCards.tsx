import { Home, Palmtree, Droplets, Users, Heart, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AssetDetailCards = () => {
  const assetCategories = [
    {
      title: "الأصول العقارية",
      icon: Home,
      color: "bg-primary",
      items: [
        { label: "بيوت في ربض الجنة", value: 2, source: "بناء المساجد" },
        { label: "بيوت في وسط الجنة", value: 1, source: "ترك المراء" },
        { label: "بيوت من قراءة الإخلاص", value: 2, source: "القرآن الكريم" },
      ]
    },
    {
      title: "الأصول الزراعية",
      icon: Palmtree,
      color: "bg-success",
      items: [
        { label: "غراس التسبيح", value: 150, source: "سبحان الله وبحمده" },
        { label: "غراس الباقيات الصالحات", value: 100, source: "الأذكار اليومية" },
      ]
    },
    {
      title: "الأصول الجارية",
      icon: Droplets,
      color: "bg-accent",
      items: [
        { label: "كفالة اليتيم", value: 1, source: "صدقة جارية" },
        { label: "مشروع سقيا الماء", value: 1, source: "مساهمة في بئر" },
        { label: "علم ينتفع به", value: 1, source: "دورة تعليمية" },
      ]
    },
    {
      title: "رأس المال الاجتماعي",
      icon: Users,
      color: "bg-secondary",
      items: [
        { label: "السعي على الأرملة", value: 1, source: "أجر كالمجاهد" },
        { label: "قضاء حوائج الناس", value: 3, source: "أحب الأعمال" },
      ]
    },
    {
      title: "أصول مرافقة الأنبياء",
      icon: Heart,
      color: "bg-destructive",
      items: [
        { label: "مرافقة النبي ﷺ", value: 1, source: "كفالة اليتيم" },
        { label: "منابر من نور", value: 2, source: "الحب في الله" },
      ]
    },
  ];

  return (
    <div className="space-y-4">
      {assetCategories.map((category, idx) => (
        <Card key={idx} className="p-4 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                <category.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-card-foreground">{category.title}</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              عرض التفاصيل
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {category.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.source}</p>
                </div>
                <Badge variant="secondary" className="font-bold">
                  {item.value}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AssetDetailCards;
