import { AlertTriangle, ShieldAlert, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const RiskManagement = () => {
  const risks = [
    {
      title: "خطر إبطال العمل بالمنّ",
      description: "احذر من المن والأذى في الصدقة - يبطل الأجر كاملاً",
      severity: "عالية",
      impact: "إبطال كامل للأجر",
      prevention: "إخلاص النية وإخفاء الصدقة",
      icon: ShieldAlert,
      color: "destructive"
    },
    {
      title: "خطر الرياء في العبادة",
      description: "إظهار العبادة للناس يحبط الأجر",
      severity: "عالية",
      impact: "فقدان الأجر + إثم",
      prevention: "الإخلاص وتجنب التظاهر",
      icon: AlertTriangle,
      color: "destructive"
    },
    {
      title: "خطر الغيبة والنميمة",
      description: "تأكل الحسنات كما تأكل النار الحطب",
      severity: "متوسطة",
      impact: "فقدان حسنات متراكمة",
      prevention: "حفظ اللسان والتوبة",
      icon: AlertTriangle,
      color: "default"
    },
  ];

  return (
    <div className="space-y-4">
      <Alert className="bg-success/10 border-success">
        <Shield className="h-4 w-4 text-success" />
        <AlertTitle className="text-success">حماية استثمارك الأخروي</AlertTitle>
        <AlertDescription className="text-success/80">
          احذر من الأعمال التي تبطل الحسنات أو تنقص من أجرها
        </AlertDescription>
      </Alert>

      {risks.map((risk, idx) => (
        <Card key={idx} className="p-4 border-r-4 border-r-destructive">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <risk.icon className="h-5 w-5 text-destructive" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-card-foreground">{risk.title}</h4>
                <Badge variant={risk.color as any} className="whitespace-nowrap">
                  {risk.severity}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-destructive whitespace-nowrap">التأثير:</span>
                  <span className="text-muted-foreground">{risk.impact}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-success whitespace-nowrap">الوقاية:</span>
                  <span className="text-muted-foreground">{risk.prevention}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-muted/50">
        <h4 className="font-bold text-sm mb-2 text-card-foreground">نصائح للحفاظ على أصولك:</h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>أخلص النية لله في كل عمل</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>أكثر من الاستغفار والتوبة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>احفظ لسانك من الغيبة والنميمة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>تجنب المن والأذى في الصدقة</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default RiskManagement;
