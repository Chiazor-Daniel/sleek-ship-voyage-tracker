
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Anchor, Navigation, Route, ShipIcon } from "lucide-react";

const StatsCard = ({ title, value, description, icon: Icon }) => {
  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard 
        title="Active Vessels" 
        value="248" 
        description="+12 since last week" 
        icon={ShipIcon} 
      />
      <StatsCard 
        title="In Port" 
        value="36" 
        description="8 departing today" 
        icon={Anchor} 
      />
      <StatsCard 
        title="En Route" 
        value="184" 
        description="23 arriving today" 
        icon={Navigation} 
      />
      <StatsCard 
        title="Total Routes" 
        value="42" 
        description="3 new routes added" 
        icon={Route} 
      />
    </div>
  );
};

export default DashboardStats;
