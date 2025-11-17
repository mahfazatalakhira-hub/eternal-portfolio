import { useState, useEffect } from "react";
import { 
  Sparkles, Award, Star, Palmtree, Heart, HandHeart, 
  Users, BookOpen, Smile, Sunrise, Sun, Moon, GraduationCap,
  ShieldCheck, Clock, TrendingUp, CheckCircle2
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
  const [completedOpps, setCompletedOpps] = useState<Set<string>>(() => {
    // تحميل الفرص المكتملة اليوم من localStorage
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`eternal-opportunities-${today}`);
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // عرض الفرص عالية الأولوية فقط
  const opportunities = dailyOpportunities
    .filter(opp => opp.priority === 'عالية')
    .slice(0, 6); // أول 6 فرص

  const priorityColors: Record<string, string> = {
    "عالية": "bg-destructive text-destructive-foreground",
    "متوسطة": "bg-accent text-accent-foreground",
    "منخفضة": "bg-muted text-muted-foreground"
  };

  // حفظ الفرص المكتملة
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`eternal-opportunities-${today}`, JSON.stringify([...completedOpps]));
  }, [completedOpps]);

  // مسح الفرص المكتملة عند بداية يوم جديد
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString();
      const saved = localStorage.getItem(`eternal-opportunities-${today}`);
      if (!saved) {
        setCompletedOpps(new Set());
      }
    };
    
    // التحقق كل ساعة
    const interval = setInterval(checkNewDay, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleComplete = (oppId: string) => {
    setCompletedOpps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(oppId)) {
        newSet.delete(oppId);
      } else {
        newSet.add(oppId);
      }
      return newSet;
    });
  };

  const completedCount = completedOpps.size;
  const totalCount = opportunities.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      {/* Header مع إحصائيات */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
          <h3 className="font-bold text-lg text-foreground text-right">فرص استثمارية عاجلة</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {completedCount} / {totalCount}
          </Badge>
          {completionPercentage === 100 && (
            <CheckCircle2 className="h-5 w-5 text-success animate-bounce" />
          )}
        </div>
      </div>

      {/* شريط التقدم */}
      {completedCount > 0 && (
        <Card className="p-3 bg-gradient-to-r from-success/10 to-success/5 border-success/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-success">
              {completionPercentage === 100 ? 
                '🎉 مبارك! أكملت فرص اليوم!' : 
                `تقدم رائع! ${completionPercentage}%`
              }
            </span>
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-success-light transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </Card>
      )}

      {/* الفرص */}
      {opportunities.map((opportunity, idx) => {
        const Icon = iconMap[opportunity.icon] || Sparkles;
        const isCompleted = completedOpps.has(opportunity.id);
        
        return (
          <Card 
            key={idx} 
            className={`p-4 hover:shadow-lg transition-all duration-300 border-l-4 ${
              isCompleted 
                ? 'border-l-success bg-success/5 opacity-75' 
                : 'border-l-primary'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCompleted ? 'bg-success/20' : 'bg-primary/10'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Icon className={`h-5 w-5 ${opportunity.color}`} />
                )}
              </div>
              
              <div className="flex-1 text-right">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-bold ${isCompleted ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                    {opportunity.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[opportunity.priority]}>
                      {opportunity.priority}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                
                {opportunity.estimatedTime && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    <span>{opportunity.estimatedTime}</span>
                  </div>
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
                    variant={isCompleted ? "outline" : "default"}
                    className={isCompleted ? "" : "bg-primary hover:bg-primary-light"}
                    onClick={() => toggleComplete(opportunity.id)}
                  >
                    {isCompleted ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>مكتمل</span>
                      </span>
                    ) : (
                      'علّم كمكتمل ✓'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {/* رسالة تحفيزية */}
      {completionPercentage > 0 && completionPercentage < 100 && (
        <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
          <div className="text-center">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
              🔥 استمر! باقي {totalCount - completedCount} فرصة لتكمل يومك
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TodayOpportunities;
