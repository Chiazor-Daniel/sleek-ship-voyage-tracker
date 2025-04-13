
import { useRef, useState } from "react";
import { Compass, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useToast } from "@/hooks/use-toast";

// Default center position (middle of the ocean)
const defaultCenter = {
  lat: 25.0,
  lng: -40.0
};

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit'
};

// Map component options
const options = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#e9e9e9" },
        { lightness: 17 }
      ]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { color: "#f5f5f5" },
        { lightness: 20 }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { visibility: "off" }
      ]
    },
  ]
};

interface ShipMarker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  type: "cargo" | "tanker" | "passenger";
}

const MapView = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedShip, setSelectedShip] = useState<ShipMarker | null>(null);
  const { toast } = useToast();
  
  // Using the provided API key directly
  const googleMapsApiKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";
  
  // Simulate ships data
  const ships: ShipMarker[] = [
    { id: 1, name: "Aurora", position: { lat: 25.7617, lng: -80.1918 }, type: "cargo" },
    { id: 2, name: "Oceanic", position: { lat: 13.4443, lng: -85.6729 }, type: "tanker" },
    { id: 3, name: "Voyager", position: { lat: 32.3078, lng: -64.7505 }, type: "passenger" },
    { id: 4, name: "Meridian", position: { lat: 40.4168, lng: -73.7781 }, type: "cargo" },
  ];

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ["places"]
  });

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || 3) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || 3) - 1);
    }
  };

  // Reset map to center
  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setCenter(defaultCenter);
      mapRef.current.setZoom(3);
      toast({
        title: "Map Reset",
        description: "Map view has been reset to default",
      });
    }
  };
  
  // Set map reference when the map loads
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };
  
  // Handle marker click
  const handleMarkerClick = (ship: ShipMarker) => {
    setSelectedShip(ship);
  };
  
  // Show loading state or error
  if (loadError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-lg">
        <div className="text-center p-6">
          <p className="text-lg font-medium text-red-500">Error loading Google Maps</p>
          <p className="mt-2 text-sm text-muted-foreground">There was a problem loading the map</p>
        </div>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-lg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

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
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={3}
            options={options}
            onLoad={onMapLoad}
          >
            {/* Ship markers */}
            {ships.map((ship) => (
              <Marker
                key={ship.id}
                position={ship.position}
                icon={{
                  path: "M -1,-1 1,-1 1,1 -1,1 z",
                  fillColor: ship.type === "cargo" ? "#38bdf8" : ship.type === "tanker" ? "#fb923c" : "#4ade80",
                  fillOpacity: 1,
                  scale: 4,
                  strokeWeight: 1,
                  strokeColor: "#ffffff"
                }}
                onClick={() => handleMarkerClick(ship)}
              />
            ))}
            
            {/* Info window for selected ship */}
            {selectedShip && (
              <InfoWindow
                position={selectedShip.position}
                onCloseClick={() => setSelectedShip(null)}
              >
                <div className="p-1">
                  <p className="font-medium text-gray-900">{selectedShip.name}</p>
                  <p className="text-xs text-gray-600">Type: {selectedShip.type}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
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
