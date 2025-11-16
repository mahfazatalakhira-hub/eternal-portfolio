import { Sparkles, TrendingUp, Award, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TodayOpportunities = () => {
  const opportunities = [
    {
      title: "بناء بيت في الجنة",
      description: "صلِّ 12 ركعة سنة راتبة اليوم",
      reward: "بيت في الجنة",
      priority: "عالية",
      icon: Award,
      color: "text-destructive"
    },
    {
      title: "غرس 100 نخلة",
      description: "قل: سبحان الله وبحمده 100 مرة",
      reward: "100 نخلة في الجنة",
      priority: "عالية",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "مضاعفة الأجر",
      description: "الصلاة في جماعة تعدل 27 صلاة",
      reward: "أجر مضاعف 27×",
      priority: "متوسطة",
      icon: Sparkles,
      color: "text-primary"
    },
    {
      title: "منبر من نور",
      description: "تزاور في الله مع أخ لك",
      reward: "منبر من نور يوم القيامة",
      priority: "متوسطة",
      icon: Star,
      color: "text-secondary"
    },
  ];

  const priorityColors: Record<string, string> = {
    "عالية": "bg-destructive text-destructive-foreground",
    "متوسطة": "bg-accent text-accent-foreground",
    "منخفضة": "bg-muted text-muted-foreground"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-secondary" />
        <h3 className="font-bold text-lg text-foreground">فرص استثمارية عاجلة</h3>
      </div>

      {opportunities.map((opportunity, idx) => (
        <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300 border-r-4 border-r-primary">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <opportunity.icon className={`h-5 w-5 ${opportunity.color}`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-card-foreground">{opportunity.title}</h4>
                <Badge className={priorityColors[opportunity.priority]}>
                  {opportunity.priority}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <Award className="h-4 w-4" />
                  <span>{opportunity.reward}</span>
                </div>
                
                <Button size="sm" className="bg-primary hover:bg-primary-light">
                  سجّل الآن
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TodayOpportunities;
