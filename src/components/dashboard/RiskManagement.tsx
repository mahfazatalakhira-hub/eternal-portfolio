import { 
  AlertTriangle, ShieldAlert, Shield, Clock, Scale, 
  BookX, HandCoins, UserX, MessageCircleX, Frown 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { risks } from "@/data/risksData";

// تعيين الأيقونات
const iconMap: Record<string, any> = {
  'AlertTriangle': AlertTriangle,
  'ShieldAlert': ShieldAlert,
  'Shield': Shield,
  'Clock': Clock,
  'Scale': Scale,
  'BookX': BookX,
  'HandCoins': HandCoins,
  'UserX': UserX,
  'MessageCircleX': MessageCircleX,
  'Frown': Frown,
};

const RiskManagement = () => {
  // عرض أول 5 مخاطر
  const displayedRisks = risks.slice(0, 5);

  return (
    <div className="space-y-4">
      <Alert className="bg-success/10 border-success">
        <Shield className="h-4 w-4 text-success" />
        <AlertTitle className="text-success">حماية استثمارك الأخروي</AlertTitle>
        <AlertDescription className="text-success/80">
          احذر من الأعمال التي تبطل الحسنات أو تنقص من أجرها
        </AlertDescription>
      </Alert>

      {displayedRisks.map((risk, idx) => {
        const Icon = iconMap[risk.icon] || AlertTriangle;
        const borderColor = risk.severity === 'عالية' ? 'border-l-destructive' : 'border-l-amber-500';
        const bgColor = risk.severity === 'عالية' ? 'bg-destructive/10' : 'bg-amber-500/10';
        const iconColor = risk.severity === 'عالية' ? 'text-destructive' : 'text-amber-500';
        
        return (
          <Card key={idx} className={`p-4 border-l-4 ${borderColor}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              
              <div className="flex-1 text-right">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-card-foreground">{risk.title}</h4>
                  <Badge 
                    variant={risk.severity === 'عالية' ? 'destructive' : 'default'} 
                    className="whitespace-nowrap"
                  >
                    {risk.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 justify-end">
                    <span className="font-semibold text-destructive whitespace-nowrap">التأثير:</span>
                    <span className="text-muted-foreground">{risk.impact}</span>
                  </div>
                  <div className="flex items-start gap-2 justify-end">
                    <span className="font-semibold text-success whitespace-nowrap">الوقاية:</span>
                    <span className="text-muted-foreground">{risk.prevention}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      <Card className="p-4 bg-muted/50">
        <h4 className="font-bold text-sm mb-2 text-card-foreground text-right">نصائح للحفاظ على أصولك:</h4>
        <ul className="space-y-2 text-xs text-muted-foreground text-right list-none">
          <li className="flex items-start gap-2 justify-end">
            <span className="text-primary">•</span>
            <span>أخلص النية لله في كل عمل</span>
          </li>
          <li className="flex items-start gap-2 justify-end">
            <span className="text-primary">•</span>
            <span>أكثر من الاستغفار والتوبة</span>
          </li>
          <li className="flex items-start gap-2 justify-end">
            <span className="text-primary">•</span>
            <span>احفظ لسانك من الغيبة والنميمة</span>
          </li>
          <li className="flex items-start gap-2 justify-end">
            <span className="text-primary">•</span>
            <span>تجنب المن والأذى في الصدقة</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default RiskManagement;
