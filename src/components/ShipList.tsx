
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, RefreshCw, Ship } from "lucide-react";

const ShipList = () => {
  // Sample ship data
  const ships = [
    {
      id: "SH-2938",
      name: "Aurora Vessel",
      type: "Cargo",
      status: "Active",
      location: "North Atlantic",
      lastUpdate: "2 min ago"
    },
    {
      id: "SH-2356",
      name: "Oceanic Explorer",
      type: "Tanker",
      status: "In Port",
      location: "Rotterdam",
      lastUpdate: "15 min ago"
    },
    {
      id: "SH-1092",
      name: "Northern Voyager",
      type: "Passenger",
      status: "Active",
      location: "Mediterranean",
      lastUpdate: "8 min ago"
    },
    {
      id: "SH-4508",
      name: "Pacific Star",
      type: "Container",
      status: "Active",
      location: "Pacific Ocean",
      lastUpdate: "5 min ago"
    },
    {
      id: "SH-7123",
      name: "Atlantic Meridian",
      type: "Cargo",
      status: "Anchored",
      location: "Singapore Strait",
      lastUpdate: "23 min ago"
    },
  ];

  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Ship className="h-5 w-5 text-primary" />
          <span>Active Vessels</span>
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-6 bg-muted/50 py-2 px-4 text-sm font-medium">
            <div>ID</div>
            <div className="col-span-2">Vessel</div>
            <div>Type</div>
            <div>Status</div>
            <div>Last Update</div>
          </div>
          <div className="divide-y">
            {ships.map((ship) => (
              <div key={ship.id} className="grid grid-cols-6 py-3 px-4 items-center text-sm hover:bg-muted/50 transition-colors">
                <div className="font-mono">{ship.id}</div>
                <div className="col-span-2">
                  <div className="font-medium">{ship.name}</div>
                  <div className="text-xs text-muted-foreground">{ship.location}</div>
                </div>
                <div>{ship.type}</div>
                <div>
                  <Badge variant={ship.status === "Active" ? "default" : ship.status === "In Port" ? "outline" : "secondary"}>
                    {ship.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground">{ship.lastUpdate}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipList;
