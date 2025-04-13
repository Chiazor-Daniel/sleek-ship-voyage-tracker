
import { useEffect, useRef, useState } from "react";
import { Anchor, Compass, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Placeholder for actual map integration
const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simulate ships data
  const ships = [
    { id: 1, name: "Aurora", position: { x: 25, y: 65 }, type: "cargo" },
    { id: 2, name: "Oceanic", position: { x: 45, y: 40 }, type: "tanker" },
    { id: 3, name: "Voyager", position: { x: 70, y: 30 }, type: "passenger" },
    { id: 4, name: "Meridian", position: { x: 55, y: 75 }, type: "cargo" },
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 p-4' : 'w-full h-[500px] md:h-[600px]'}`}>
      <Card className={`w-full h-full overflow-hidden bg-ocean-light/10 border border-border/50 ${isFullscreen ? 'rounded-lg' : ''}`}>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-background/80 backdrop-blur-sm">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
            <Compass className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div ref={mapRef} className="w-full h-full bg-[#0A3D62] relative">
          {/* Ocean effect overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')] opacity-30 bg-cover"></div>
          
          {/* Map content - simulated ship markers */}
          {ships.map((ship) => (
            <div 
              key={ship.id}
              className="absolute w-3 h-3 rounded-full bg-primary animate-pulse-slow"
              style={{ 
                left: `${ship.position.x}%`, 
                top: `${ship.position.y}%`,
                boxShadow: '0 0 0 2px rgba(100, 255, 218, 0.3)'
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-background/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
                {ship.name}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute left-4 bottom-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
            <div className="text-xs font-medium mb-2">Legend</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-xs">Cargo Ship</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs">Passenger Ship</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
