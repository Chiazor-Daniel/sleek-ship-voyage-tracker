
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import ShipList from "@/components/ShipList";
import DashboardStats from "@/components/DashboardStats";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
            <h2 className="text-xl font-medium">Global Ship Map</h2>
            <Link to="/products">
              <Button variant="outline" size="sm" className="gap-1">
                Track Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="my-6">
            <MapView />
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
