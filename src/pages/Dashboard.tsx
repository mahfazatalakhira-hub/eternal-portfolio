import { useState } from "react";
import { Home, TrendingUp, Lightbulb, Book, Plus, Bell, User, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import AssetsOverview from "@/components/dashboard/AssetsOverview";
import AssetDetailCards from "@/components/dashboard/AssetDetailCards";
import TodayOpportunities from "@/components/dashboard/TodayOpportunities";
import RiskManagement from "@/components/dashboard/RiskManagement";
import AddActionDialog from "@/components/dashboard/AddActionDialog";

const Dashboard = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-hero shadow-md">
        <div className="flex items-center justify-between p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light/20">
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={signOut} className="text-destructive">
                <LogOut className="ml-2 h-4 w-4" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-primary-foreground">محفظتي الأخروية</h1>
            <p className="text-xs text-primary-foreground/80">استثمر في آخرتك</p>
          </div>
          
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-light/20 relative">
            <Bell className="h-6 w-6" />
            <Badge className="absolute -top-1 -left-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-secondary-foreground text-xs">
              3
            </Badge>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Assets Overview Card */}
        <div className="p-4 space-y-4">
          <AssetsOverview />

          {/* Inner Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ملخص الأصول
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                فرص اليوم
              </TabsTrigger>
              <TabsTrigger value="risks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                إدارة المخاطر
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <AssetDetailCards />
            </TabsContent>

            <TabsContent value="opportunities" className="mt-4">
              <TodayOpportunities />
            </TabsContent>

            <TabsContent value="risks" className="mt-4">
              <RiskManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary-light text-secondary-foreground"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30">
        <div className="flex items-center justify-around p-2">
          <Button variant="ghost" className="flex-col h-auto py-2 px-4 text-primary">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">الرئيسية</span>
          </Button>
          
          <Button variant="ghost" className="flex-col h-auto py-2 px-4 text-muted-foreground">
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs">الأصول</span>
          </Button>
          
          <Button variant="ghost" className="flex-col h-auto py-2 px-4 text-muted-foreground">
            <Lightbulb className="h-5 w-5 mb-1" />
            <span className="text-xs">الفرص</span>
          </Button>
          
          <Button variant="ghost" className="flex-col h-auto py-2 px-4 text-muted-foreground">
            <Book className="h-5 w-5 mb-1" />
            <span className="text-xs">المعرفة</span>
          </Button>
        </div>
      </nav>

      {/* Add Action Dialog */}
      <AddActionDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
};

export default Dashboard;
