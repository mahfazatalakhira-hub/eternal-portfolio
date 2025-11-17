import { 
  Sparkles, Award, Star, Palmtree, Heart, HandHeart, 
  Users, BookOpen, Smile, Sunrise, Sun, Moon, GraduationCap,
  ShieldCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dailyOpportunities } from "@/data/opportunitiesData";

// تعيين الأيقونات
const iconMap: Record<string, any> = {
  'Palmtree': Palmtree,
  'Heart': Heart,
  'BookOpen': BookOpen,
  'Sparkles': Sparkles,
  'HandHeart': HandHeart,
  'Award': Award,
  'Star': Star,
  'Users': Users,
  'Smile': Smile,
  'Sunrise': Sunrise,
  'Sun': Sun,
  'Moon': Moon,
  'GraduationCap': GraduationCap,
  'ShieldCheck': ShieldCheck,
};

const TodayOpportunities = () => {
  // عرض الفرص عالية الأولوية فقط
  const opportunities = dailyOpportunities
    .filter(opp => opp.priority === 'عالية')
    .slice(0, 6); // أول 6 فرص

  const priorityColors: Record<string, string> = {
    "عالية": "bg-destructive text-destructive-foreground",
    "متوسطة": "bg-accent text-accent-foreground",
    "منخفضة": "bg-muted text-muted-foreground"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-secondary" />
        <h3 className="font-bold text-lg text-foreground text-right">فرص استثمارية عاجلة</h3>
      </div>

      {opportunities.map((opportunity, idx) => {
        const Icon = iconMap[opportunity.icon] || Sparkles;
        
        return (
          <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className={`h-5 w-5 ${opportunity.color}`} />
              </div>
              
              <div className="flex-1 text-right">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-card-foreground">{opportunity.title}</h4>
                  <Badge className={priorityColors[opportunity.priority]}>
                    {opportunity.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                
                {opportunity.estimatedTime && (
                  <p className="text-xs text-muted-foreground mb-2">
                    ⏱️ {opportunity.estimatedTime}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <Award className="h-4 w-4" />
                      <span>{opportunity.reward}</span>
                    </div>
                    {opportunity.guarantor && (
                      <span className="text-success text-xs">✓ {opportunity.guarantor}</span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary-light"
                    onClick={() => {
                      // يمكن إضافة modal لتسجيل الفرصة
                      // أو فتح AssetDetailsDialog مباشرة
                    }}
                  >
                    سجّل الآن
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TodayOpportunities;
