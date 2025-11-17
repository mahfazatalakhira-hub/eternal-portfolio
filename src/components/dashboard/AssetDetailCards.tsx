import { useState } from "react";
import { Home, Palmtree, Droplets, Users, Heart, ChevronRight, BookOpen, HandHeart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { assetCategories } from "@/data/assetsData";
import { useUserAssets } from "@/hooks/useUserAssets";
import { Asset } from "@/data/types";
import AssetDetailsDialog from "./AssetDetailsDialog";

// تعيين الأيقونات
const iconMap: Record<string, any> = {
  'Home': Home,
  'Heart': Heart,
  'BookOpen': BookOpen,
  'Palmtree': Palmtree,
  'Droplets': Droplets,
  'Users': Users,
  'HandHeart': HandHeart,
};

const AssetDetailCards = () => {
  const { data: userAssets, isLoading } = useUserAssets();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // دالة للحصول على قيمة أصل من بيانات المستخدم
  const getAssetValue = (assetId: string): number => {
    if (!userAssets) return 0;
    const asset = userAssets.find(a => a.asset_id === assetId);
    return asset?.value || 0;
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {assetCategories.map((category, idx) => {
        const Icon = iconMap[category.icon] || Home;
        
        return (
          <Card key={idx} className="p-4 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-card-foreground">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {category.items.map((item, itemIdx) => {
                const userValue = getAssetValue(item.id);
                
                return (
                  <div 
                    key={itemIdx} 
                    className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 transition-colors px-2 -mx-2 rounded"
                    onClick={() => handleAssetClick(item)}
                  >
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.source}</p>
                      {item.guarantor && (
                        <Badge variant="outline" className="mt-1 text-xs bg-success/10 text-success border-success">
                          ✓ {item.guarantor}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="font-bold mr-2">
                      {userValue}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      {/* حوار التفاصيل */}
      <AssetDetailsDialog
        asset={selectedAsset}
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      />
    </div>
  );
};

export default AssetDetailCards;
