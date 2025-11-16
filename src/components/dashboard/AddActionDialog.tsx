import { BookOpen, Sparkles, Heart, HandHeart, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddActionDialog = ({ open, onOpenChange }: AddActionDialogProps) => {
  const actions = [
    {
      title: "تسجيل قراءة قرآن",
      icon: BookOpen,
      color: "bg-primary",
      description: "سور، آيات، أجزاء"
    },
    {
      title: "تسجيل ذِكر",
      icon: Sparkles,
      color: "bg-success",
      description: "تسبيح، تحميد، تهليل"
    },
    {
      title: "تسجيل صدقة",
      icon: HandHeart,
      color: "bg-accent",
      description: "مالية، عينية، جارية"
    },
    {
      title: "عمل اجتماعي",
      icon: Heart,
      color: "bg-secondary",
      description: "كفالة، قضاء حاجة"
    },
    {
      title: "ضبط نفس",
      icon: Shield,
      color: "bg-destructive",
      description: "ترك مراء، كظم غيظ"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">إضافة استثمار</DialogTitle>
          <DialogDescription className="text-center">
            اختر نوع العمل الصالح لتسجيله
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="h-auto py-4 px-4 justify-start hover:shadow-md transition-all"
              onClick={() => {
                // Handle action selection
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <p className="font-bold text-card-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddActionDialog;
