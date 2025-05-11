import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ShipList from "@/components/ShipList";
import DashboardStats from "@/components/DashboardStats";
import { Button } from "@/components/ui/button";
import { ArrowRight, Anchor, Ship, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// New component to replace MapView
const ShipStatusOverview = () => {
  const shipStatuses = [
    {
      id: 1,
      name: "SS Maritime Explorer",
      location: "Atlantic Ocean, 200 miles east of Miami",
      status: "In Transit",
      origin: "Colombia",
      destination: "New York",
      progress: 65
    },
    {
      id: 2,
      name: "MV Nordic Star",
      location: "Port of Gothenburg, Sweden",
      status: "Loading",
      origin: "Sweden",
      destination: "Los Angeles",
      progress: 10
    },
    {
      id: 3,
      name: "SS Ocean Voyager",
      location: "Arabian Sea, approaching the Gulf of Aden",
      status: "Departed",
      origin: "India",
      destination: "London",
      progress: 40
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {shipStatuses.map((ship) => (
        <Card key={ship.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className={`h-2 w-full ${getStatusColor(ship.status)}`}>
              <div 
                className="h-full bg-primary" 
                style={{ width: `${ship.progress}%` }}
              ></div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-lg">{ship.name}</h3>
                <span className="bg-muted px-2 py-1 rounded-md text-xs">
                  {ship.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-start gap-2">
                  <Navigation className="h-4 w-4 mt-1 shrink-0" />
                  <span>{ship.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Anchor className="h-4 w-4 shrink-0" />
                  <span>{ship.origin} → {ship.destination}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span>{ship.progress}% complete</span>
                <Button variant="ghost" size="sm" className="h-7 gap-1">
                  Details <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to determine status color
const getStatusColor = (status) => {
  switch (status) {
    case "In Transit":
      return "bg-primary/20";
    case "Loading":
      return "bg-yellow-500/20";
    case "Departed":
      return "bg-green-500/20";
    default:
      return "bg-muted";
  }
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VoyageTrack - Ship Tracking Dashboard</title>
        <meta name="description" content="Modern ship tracking platform for real-time vessel monitoring" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container px-4 pt-20 pb-6">
          <div className="my-6">
            <h1 className="text-2xl font-semibold">Ship Tracking Dashboard</h1>
            <p className="text-muted-foreground">Monitor and track vessels in real-time across the globe</p>
          </div>

          <DashboardStats />

          <div className="my-6 flex justify-between items-center">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Active Ship Status
            </h2>
            <Link to="/products">
              <Button variant="outline" size="sm" className="gap-1">
                Track Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="my-6">
            <ShipStatusOverview />
          </div>

          <div className="my-6">
            <ShipList />
          </div>
        </main>

        <footer className="border-t border-border/50 py-4">
          <div className="container px-4 text-center text-sm text-muted-foreground">
            VoyageTrack © {new Date().getFullYear()} - Real-time vessel tracking and monitoring
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;