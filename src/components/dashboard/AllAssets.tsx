import { useState } from "react";
import { 
  Home, Palmtree, Droplets, Users, Heart, BookOpen, HandHeart,
  Search, Filter, TrendingUp, Award, Shield, Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assetCategories } from "@/data/assetsData";
import { Asset, InvestmentType } from "@/data/types";
import AssetDetailsDialog from "./AssetDetailsDialog";
import { useUserAssets } from "@/hooks/useUserAssets";

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

// أيقونات أنواع الاستثمار
const typeIcons: Record<InvestmentType, any> = {
  'مالي': TrendingUp,
  'سلوكي': Heart,
  'لفظي': BookOpen,
  'زراعي': Palmtree,
  'جاري': Droplets,
  'اجتماعي': Users,
  'معرفي': Award,
};

const AllAssets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  const { data: userAssets } = useUserAssets();

  // دالة للحصول على قيمة أصل
  const getAssetValue = (assetId: string): number => {
    if (!userAssets) return 0;
    const asset = userAssets.find(a => a.asset_id === assetId);
    return asset?.value || 0;
  };

  // دالة الفلترة
  const filterAssets = (assets: Asset[]) => {
    return assets.filter(asset => {
      const matchesSearch = searchQuery === "" || 
        asset.label.includes(searchQuery) ||
        asset.source.includes(searchQuery) ||
        asset.requirement.includes(searchQuery);
      
      const matchesType = selectedType === "all" || asset.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  };

  // دالة فتح التفاصيل
  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setDetailsDialogOpen(true);
  };

  // الحصول على جميع أنواع الاستثمار الفريدة
  const investmentTypes: InvestmentType[] = ['مالي', 'سلوكي', 'لفظي', 'زراعي', 'جاري', 'اجتماعي', 'معرفي'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">متجر الأصول الأخروية</h2>
            <p className="text-sm text-muted-foreground">اختر ما تشاء من الاستثمارات وابنِ آخرتك</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {assetCategories.reduce((sum, cat) => sum + cat.items.length, 0)}+ أصل
          </Badge>
        </div>

        {/* شريط البحث والفلترة */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن أصل معين..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">جميع الأنواع</option>
            {investmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 bg-primary/5">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">استثماراتك</p>
              <p className="text-xl font-bold text-primary">
                {userAssets?.length || 0}
              </p>
            </div>
          </Card>
          <Card className="p-3 bg-success/5">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">الفئات</p>
              <p className="text-xl font-bold text-success">
                {assetCategories.length}
              </p>
            </div>
          </Card>
          <Card className="p-3 bg-accent/5">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">متاحة</p>
              <p className="text-xl font-bold text-accent">
                {assetCategories.reduce((sum, cat) => sum + cat.items.length, 0)}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* تبويبات الفئات */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs">
            الكل
          </TabsTrigger>
          <TabsTrigger value="real-estate" className="text-xs">
            🏠 العقارات
          </TabsTrigger>
          <TabsTrigger value="agricultural" className="text-xs">
            🌱 الزراعية
          </TabsTrigger>
          <TabsTrigger value="others" className="text-xs">
            💫 أخرى
          </TabsTrigger>
        </TabsList>

        {/* تبويب الكل */}
        <TabsContent value="all" className="space-y-4 mt-4">
          {assetCategories.map((category) => {
            const Icon = iconMap[category.icon] || Home;
            const filteredItems = filterAssets(category.items);
            
            if (filteredItems.length === 0) return null;

            return (
              <Card key={category.id} className="p-4">
                {/* عنوان الفئة */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-lg text-card-foreground">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <Badge variant="secondary">
                    {filteredItems.length} أصل
                  </Badge>
                </div>

                {/* الأصول */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredItems.map((asset) => {
                    const TypeIcon = typeIcons[asset.type];
                    const userValue = getAssetValue(asset.id);

                    return (
                      <Card
                        key={asset.id}
                        className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                        onClick={() => handleAssetClick(asset)}
                      >
                        <div className="space-y-3">
                          {/* العنوان والقيمة */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 text-right">
                              <h4 className="font-bold text-sm text-card-foreground leading-tight">
                                {asset.label}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {asset.source}
                              </p>
                            </div>
                            <Badge 
                              variant={userValue > 0 ? "default" : "secondary"}
                              className="font-bold shrink-0"
                            >
                              {userValue}
                            </Badge>
                          </div>

                          {/* المعلومات الإضافية */}
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            {/* نوع الاستثمار */}
                            <Badge variant="outline" className="text-xs">
                              {TypeIcon && <TypeIcon className="h-3 w-3 ml-1" />}
                              {asset.type}
                            </Badge>

                            {/* الموقع */}
                            {asset.location && asset.location !== 'غير محدد' && (
                              <Badge variant="outline" className="text-xs bg-primary/5">
                                📍 {asset.location}
                              </Badge>
                            )}

                            {/* الضامن */}
                            {asset.guarantor && (
                              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success">
                                ✓ {asset.guarantor}
                              </Badge>
                            )}

                            {/* السرعة */}
                            {asset.speed && (
                              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600">
                                ⚡ {asset.speed}
                              </Badge>
                            )}
                          </div>

                          {/* العائد */}
                          <div className="pt-2 border-t border-border/50">
                            <div className="flex items-start gap-2 text-xs text-success">
                              <Award className="h-3 w-3 mt-0.5 shrink-0" />
                              <span className="font-medium">{asset.reward}</span>
                            </div>
                          </div>

                          {/* زر الإضافة */}
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssetClick(asset);
                            }}
                          >
                            <Info className="h-3 w-3 ml-1" />
                            عرض التفاصيل والإضافة
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* تبويب العقارات */}
        <TabsContent value="real-estate" className="space-y-4 mt-4">
          {assetCategories
            .filter(cat => cat.id.includes('real-estate'))
            .map((category) => {
              const Icon = iconMap[category.icon] || Home;
              const filteredItems = filterAssets(category.items);

              return (
                <Card key={category.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredItems.map((asset) => {
                      const userValue = getAssetValue(asset.id);
                      return (
                        <Card
                          key={asset.id}
                          className="p-3 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleAssetClick(asset)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 text-right">
                              <h4 className="font-bold text-sm">{asset.label}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{asset.reward}</p>
                              {asset.guarantor && (
                                <Badge variant="outline" className="mt-2 text-xs bg-success/10">
                                  ✓ {asset.guarantor}
                                </Badge>
                              )}
                            </div>
                            <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                              {userValue}
                            </Badge>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
        </TabsContent>

        {/* تبويب الزراعية */}
        <TabsContent value="agricultural" className="space-y-4 mt-4">
          {assetCategories
            .filter(cat => cat.id === 'agricultural')
            .map((category) => {
              const Icon = iconMap[category.icon] || Palmtree;
              const filteredItems = filterAssets(category.items);

              return (
                <Card key={category.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredItems.map((asset) => {
                      const userValue = getAssetValue(asset.id);
                      return (
                        <Card
                          key={asset.id}
                          className="p-3 hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-success/5 to-success/10"
                          onClick={() => handleAssetClick(asset)}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 text-right">
                                <h4 className="font-bold text-sm">{asset.label}</h4>
                                <p className="text-xs text-success font-medium mt-1">{asset.reward}</p>
                              </div>
                              <Badge variant="secondary" className="text-xl font-bold px-4 py-2">
                                {userValue}
                              </Badge>
                            </div>
                            {asset.speed && (
                              <Badge variant="outline" className="text-xs bg-amber-500/10">
                                ⚡ {asset.speed}
                              </Badge>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
        </TabsContent>

        {/* تبويب الأخرى */}
        <TabsContent value="others" className="space-y-4 mt-4">
          {assetCategories
            .filter(cat => !cat.id.includes('real-estate') && cat.id !== 'agricultural')
            .map((category) => {
              const Icon = iconMap[category.icon] || Home;
              const filteredItems = filterAssets(category.items);

              if (filteredItems.length === 0) return null;

              return (
                <Card key={category.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="font-bold text-lg">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {filteredItems.map((asset) => {
                      const userValue = getAssetValue(asset.id);
                      return (
                        <Card
                          key={asset.id}
                          className="p-3 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleAssetClick(asset)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 text-right">
                              <h4 className="font-bold text-sm">{asset.label}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {asset.requirement}
                              </p>
                              <div className="flex gap-2 mt-2 justify-end flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {asset.type}
                                </Badge>
                                {asset.multiplier && (
                                  <Badge variant="outline" className="text-xs bg-amber-500/10">
                                    🔥 {asset.multiplier}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Badge variant="secondary" className="font-bold px-3">
                              {userValue}
                            </Badge>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>

      {/* حوار التفاصيل */}
      <AssetDetailsDialog
        asset={selectedAsset}
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      />
    </div>
  );
};

export default AllAssets;

