import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/auth/SignUpForm";
import SignInForm from "@/components/auth/SignInForm";
import { Sparkles } from "lucide-react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-glow">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">محفظة الآخرة</h1>
          <p className="text-sm text-muted-foreground">ابدأ رحلتك الاستثمارية للآخرة</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signin" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SignInForm />
          </TabsContent>

          <TabsContent value="signup">
            <SignUpForm onSuccess={() => setActiveTab("signin")} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
