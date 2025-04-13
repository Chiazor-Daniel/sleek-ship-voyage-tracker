
import { useRef, useState } from "react";
import { Compass, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
// This is needed because Leaflet's default markers rely on image files that aren't properly bundled
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons for different ship types
const shipIcons = {
  cargo: L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: #38bdf8; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  }),
  tanker: L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: #fb923c; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  }),
  passenger: L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: #4ade80; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  }),
};

// Default center position (middle of the ocean)
const defaultCenter = {
  lat: 25.0,
  lng: -40.0
};

interface ShipMarker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  type: "cargo" | "tanker" | "passenger";
}

const MapView = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  
  // Simulate ships data
  const ships: ShipMarker[] = [
    { id: 1, name: "Aurora", position: { lat: 25.7617, lng: -80.1918 }, type: "cargo" },
    { id: 2, name: "Oceanic", position: { lat: 13.4443, lng: -85.6729 }, type: "tanker" },
    { id: 3, name: "Voyager", position: { lat: 32.3078, lng: -64.7505 }, type: "passenger" },
    { id: 4, name: "Meridian", position: { lat: 40.4168, lng: -73.7781 }, type: "cargo" },
  ];

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // We need to invalidate the map size when toggling fullscreen
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  // Reset map to center
  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView(defaultCenter, 3);
      toast({
        title: "Map Reset",
        description: "Map view has been reset to default",
      });
    }
  };
  
  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 p-4' : 'w-full h-[500px] md:h-[600px]'}`}>
      <Card className={`w-full h-full overflow-hidden ${isFullscreen ? 'rounded-lg' : ''}`}>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-background/80 backdrop-blur-sm">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={handleResetView}>
            <Compass className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={handleZoomIn}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm" onClick={handleZoomOut}>
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-full h-full">
          <MapContainer 
            center={defaultCenter} 
            zoom={3} 
            style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
            zoomControl={false}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Ship markers */}
            {ships.map((ship) => (
              <Marker
                key={ship.id}
                position={[ship.position.lat, ship.position.lng]}
                icon={shipIcons[ship.type]}
              >
                <Popup>
                  <div className="p-1">
                    <p className="font-medium text-gray-900">{ship.name}</p>
                    <p className="text-xs text-gray-600">Type: {ship.type}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="absolute left-4 bottom-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <div className="text-xs font-medium mb-2">Legend</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div>
            <span className="text-xs">Cargo Ship</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#fb923c]"></div>
            <span className="text-xs">Tanker</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ade80]"></div>
            <span className="text-xs">Passenger Ship</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
