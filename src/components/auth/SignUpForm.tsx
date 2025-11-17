import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import OTPVerification from "./OTPVerification";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"ذكر" | "أنثى">("ذكر");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName || !age) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive",
      });
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عمر صحيح (13-120)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            age: ageNum,
            gender: gender,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "خطأ",
            description: "هذا البريد الإلكتروني مسجل بالفعل",
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

      setShowOTP(true);
      toast({
        title: "تم الإرسال!",
        description: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return <OTPVerification email={email} type="signup" onSuccess={onSuccess} />;
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">الاسم الثلاثي</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="أدخل اسمك الكامل"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          dir="ltr"
        />
        <p className="text-xs text-muted-foreground">6 أحرف على الأقل</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">العمر</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min={13}
            max={120}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">الجنس</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as "ذكر" | "أنثى")}>
            <SelectTrigger id="gender">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ذكر">ذكر</SelectItem>
              <SelectItem value="أنثى">أنثى</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary-light" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        إنشاء حساب
      </Button>
    </form>
  );
};

export default SignUpForm;
