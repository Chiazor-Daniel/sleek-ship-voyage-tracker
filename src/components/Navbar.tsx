import { useState } from "react";
import { Bell, Menu, Search, Ship, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full border-b border-border/50 backdrop-blur-sm bg-background/80 fixed top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center gap-2">
            <Ship className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">VoyageTrack</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </a>
          <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
        </div>

        <div className="hidden md:flex items-center relative max-w-sm w-full">
          <Search className="h-4 w-4 absolute left-2.5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search vessels..." 
            className="pl-9 w-full"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {}}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant={isLiveTracking ? "default" : "outline"}
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => setIsLiveTracking(!isLiveTracking)}
          >
            {isLiveTracking ? (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Live Tracking (On)
              </>
            ) : (
              <>
                <Ship className="h-4 w-4 mr-2" />
                Live Tracking (Off)
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex">
          <div className="bg-background w-64 h-full p-6">
            <Button
              variant="ghost" 
              size="icon" 
              className="mb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col gap-4">
              <a href="/" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
              <a href="/products" onClick={() => setMobileMenuOpen(false)}>Products</a>
              <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;