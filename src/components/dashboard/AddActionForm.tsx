import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assetCategories, getAssetById } from "@/data/assetsData";
import { useUpsertAsset } from "@/hooks/useUserAssets";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddActionFormProps {
  onSuccess: () => void;
}

const AddActionForm = ({ onSuccess }: AddActionFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [value, setValue] = useState("1");
  const [notes, setNotes] = useState("");

  const { mutate: upsertAsset, isPending } = useUpsertAsset();
  const { toast } = useToast();

  // الحصول على الأصول في الفئة المختارة
  const availableAssets = selectedCategory
    ? assetCategories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAssetId || !value) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    const asset = getAssetById(selectedAssetId);
    if (!asset) {
      toast({
        title: "خطأ",
        description: "الأصل غير موجود",
        variant: "destructive",
      });
      return;
    }

    upsertAsset(
      {
        assetId: selectedAssetId,
        assetType: asset.type,
        category: asset.category,
        value: parseInt(value),
        notes,
      },
      {
        onSuccess: () => {
          toast({
            title: "تم التسجيل! ✅",
            description: `تم إضافة ${value} ${asset.label}`,
          });
          onSuccess();
        },
        onError: (error: any) => {
          toast({
            title: "خطأ",
            description: error.message || "حدث خطأ أثناء الحفظ",
            variant: "destructive",
          });
        },
      }
    );
  };

  const selectedAsset = selectedAssetId ? getAssetById(selectedAssetId) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* اختيار الفئة */}
      <div className="space-y-2">
        <Label htmlFor="category">الفئة</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="اختر فئة الأصل" />
          </SelectTrigger>
          <SelectContent>
            {assetCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* اختيار الأصل */}
      {selectedCategory && (
        <div className="space-y-2">
          <Label htmlFor="asset">العمل الصالح</Label>
          <Select value={selectedAssetId} onValueChange={setSelectedAssetId}>
            <SelectTrigger id="asset">
              <SelectValue placeholder="اختر العمل" />
            </SelectTrigger>
            <SelectContent>
              {availableAssets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id}>
                  {asset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* تفاصيل الأصل المختار */}
      {selectedAsset && (
        <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-right">
          <div className="text-sm">
            <span className="font-semibold text-primary">المتطلبات: </span>
            <span className="text-muted-foreground">{selectedAsset.requirement}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-success">العائد: </span>
            <span className="text-muted-foreground">{selectedAsset.reward}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            📚 {selectedAsset.hadithRef}
          </div>
          {selectedAsset.guarantor && (
            <div className="text-xs text-success">
              ✓ {selectedAsset.guarantor}
            </div>
          )}
        </div>
      )}

      {/* القيمة/العدد */}
      {selectedAssetId && (
        <div className="space-y-2">
          <Label htmlFor="value">
            العدد/القيمة
            {selectedAsset?.type === 'زراعي' && " (عدد المرات)"}
            {selectedAsset?.type === 'لفظي' && " (عدد المرات)"}
          </Label>
          <Input
            id="value"
            type="number"
            min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="1"
          />
        </div>
      )}

      {/* ملاحظات */}
      {selectedAssetId && (
        <div className="space-y-2">
          <Label htmlFor="notes">ملاحظات (اختياري)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أضف ملاحظات أو تفاصيل إضافية..."
            rows={3}
          />
        </div>
      )}

      {/* زر الحفظ */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-light"
        disabled={isPending || !selectedAssetId}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "جاري الحفظ..." : "سجّل العمل"}
      </Button>
    </form>
  );
};

export default AddActionForm;

