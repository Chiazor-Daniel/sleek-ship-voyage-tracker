
import { Bell, Menu, Search, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="w-full border-b border-border/50 backdrop-blur-sm bg-background/80 fixed top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center gap-2">
            <Ship className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">VoyageTrack</span>
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            Live Tracking
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
