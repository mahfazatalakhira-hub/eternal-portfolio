import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  type: "signin" | "signup";
  onSuccess: () => void;
}

const OTPVerification = ({ email, type, onSuccess }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رمز مكون من 6 أرقام",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: type === "signup" ? "signup" : "email",
      });

      if (error) {
        if (error.message.includes("expired")) {
          toast({
            title: "خطأ",
            description: "انتهت صلاحية الرمز، يرجى طلب رمز جديد",
            variant: "destructive",
          });
        } else if (error.message.includes("invalid")) {
          toast({
            title: "خطأ",
            description: "الرمز غير صحيح، يرجى المحاولة مرة أخرى",
            variant: "destructive",
          });
        } else {
          toast({
            title: "خطأ",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "تم التحقق!",
        description: type === "signup" ? "تم إنشاء حسابك بنجاح" : "تم تسجيل الدخول بنجاح",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء التحقق من الرمز",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          title: "خطأ",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم الإرسال!",
        description: "تم إرسال رمز جديد إلى بريدك الإلكتروني",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إعادة الإرسال",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold mb-2">تحقق من بريدك الإلكتروني</h3>
        <p className="text-sm text-muted-foreground">
          أدخل الرمز المكون من 6 أرقام المرسل إلى
        </p>
        <p className="text-sm font-medium text-foreground mt-1">{email}</p>
      </div>

      <form onSubmit={handleVerifyOTP} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">رمز التحقق</Label>
          <Input
            id="otp"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            required
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            dir="ltr"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary-light" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          تحقق من الرمز
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">لم تستلم الرمز؟</p>
        <Button
          type="button"
          variant="link"
          className="text-sm text-primary"
          onClick={handleResendOTP}
          disabled={loading}
        >
          إعادة إرسال الرمز
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;
