import { useState } from "react";
import { assetCategories } from "@/data/assetsData";
import { Asset } from "@/data/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AssetDetailsDialog from "./AssetDetailsDialog";

interface AddActionFormProps {
  onSuccess: () => void;
}

const AddActionForm = ({ onSuccess }: AddActionFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // الحصول على الأصول في الفئة المختارة
  const availableAssets = selectedCategory
    ? assetCategories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  const handleAssetSelect = (assetId: string) => {
    const asset = availableAssets.find(a => a.id === assetId);
    if (asset) {
      setSelectedAsset(asset);
      setShowDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    onSuccess(); // إغلاق الحوار الرئيسي أيضاً
  };

  return (
    <>
      <div className="space-y-4">
        {/* اختيار الفئة */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-base font-semibold">
            اختر فئة الأصل
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="h-12">
              <SelectValue placeholder="اختر الفئة..." />
            </SelectTrigger>
            <SelectContent>
              {assetCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <span>{category.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* اختيار الأصل */}
        {selectedCategory && availableAssets.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              اختر العمل الصالح
            </Label>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {availableAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary"
                  onClick={() => handleAssetSelect(asset.id)}
                >
                  <div className="space-y-2 text-right">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{asset.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {asset.source}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {asset.type}
                      </Badge>
                    </div>
                    
                    {/* العائد */}
                    <div className="flex items-center gap-1 text-xs text-success">
                      <span>🎁</span>
                      <span className="font-medium">{asset.reward}</span>
                    </div>

                    {/* مميزات خاصة */}
                    <div className="flex gap-1.5 flex-wrap">
                      {asset.guarantor && (
                        <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success">
                          ✓ {asset.guarantor}
                        </Badge>
                      )}
                      {asset.speed && (
                        <Badge variant="outline" className="text-[10px] bg-amber-500/10">
                          ⚡ {asset.speed}
                        </Badge>
                      )}
                      {asset.location && asset.location !== 'غير محدد' && (
                        <Badge variant="outline" className="text-[10px]">
                          📍 {asset.location}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!selectedCategory && (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              👆 اختر الفئة أولاً لرؤية الأصول المتاحة
            </p>
          </Card>
        )}
      </div>

      {/* حوار التفاصيل الكامل */}
      {selectedAsset && (
        <AssetDetailsDialog
          asset={selectedAsset}
          open={showDetails}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default AddActionForm;

