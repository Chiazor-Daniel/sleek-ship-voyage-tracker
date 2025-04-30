import { useRef, useState, useEffect } from "react";

// Define pulse animation
const pulseAnimation = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
    }
  }

  .pulse-animation {
    animation: pulse 1.5s infinite;
  }
`;
import { Compass, Maximize2, Minimize2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import * as L from "leaflet";

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

interface ProductLocation {
  id: string;
  name: string;
  origin: string;
  destination: string;
  ship: string;
  coordinates: { lat: number; lng: number };
}

interface ShipMarker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  type: "cargo" | "tanker" | "passenger";
}

const MapView = ({ selectedProduct, isLiveTracking = false }: { selectedProduct?: ProductLocation; isLiveTracking?: boolean }) => {
  console.log(selectedProduct)
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

  // Calculate vessel position between origin and destination
  const getVesselPosition = (product: ProductLocation) => {
    // For now, we'll use the product's coordinates as the vessel position
    // In a real implementation, this would be calculated based on ETA and current time
    return product.coordinates;
  };

  // Get origin and destination coordinates
  const getCoordinates = (location: string) => {
    const locations = {
      "Colombia": { lat: 4.5709, lng: -74.2973 },
      "New York": { lat: 40.7128, lng: -74.0060 },
      "Sweden": { lat: 59.3293, lng: 18.0686 },
      "Los Angeles": { lat: 34.0522, lng: -118.2437 },
      "India": { lat: 20.5937, lng: 78.9629 },
      "London": { lat: 51.5074, lng: -0.1278 }
    };
    return locations[location] || { lat: 25.0, lng: -40.0 };
  };

  // Update map center and zoom when product is selected
  useEffect(() => {
    if (selectedProduct && mapRef.current) {
      const originCoords = getCoordinates(selectedProduct.origin);
      const destCoords = getCoordinates(selectedProduct.destination);
      const vesselCoords = getVesselPosition(selectedProduct);
      
      // Calculate bounds that include all three points
      const bounds = L.latLngBounds(
        [Math.min(originCoords.lat, destCoords.lat, vesselCoords.lat), 
         Math.min(originCoords.lng, destCoords.lng, vesselCoords.lng)],
        [Math.max(originCoords.lat, destCoords.lat, vesselCoords.lat), 
         Math.max(originCoords.lng, destCoords.lng, vesselCoords.lng)]
      );

      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedProduct]);

  // Handle live tracking updates
  useEffect(() => {
    if (isLiveTracking && mapRef.current) {
      // Simulate real-time updates every 15 seconds
      const interval = setInterval(() => {
        if (selectedProduct) {
          // Update vessel position (in real app, this would come from an API)
          const newCoords = {
            lat: selectedProduct.coordinates.lat + (Math.random() - 0.5) * 0.01, // Small random movement
            lng: selectedProduct.coordinates.lng + (Math.random() - 0.5) * 0.01
          };
          
          // Update the map to show the new position
          mapRef.current?.setView(newCoords, mapRef.current.getZoom());
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isLiveTracking, selectedProduct]);

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
            style={{ 
              width: "100%", 
              height: "100%", 
              borderRadius: "inherit"
            }}
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

            {/* Product locations */}
            {selectedProduct && (
              <>
                {/* Journey line */}
                <Polyline
                  pathOptions={{ color: '#38bdf8', weight: 2, dashArray: '5, 10' }}
                  positions={[
                    [getCoordinates(selectedProduct.origin).lat, getCoordinates(selectedProduct.origin).lng],
                    [getCoordinates(selectedProduct.destination).lat, getCoordinates(selectedProduct.destination).lng]
                  ]}
                />

                {/* Progress indicator */}
                <Polyline
                  pathOptions={{ color: '#4ade80', weight: 2 }}
                  positions={[
                    [getCoordinates(selectedProduct.origin).lat, getCoordinates(selectedProduct.origin).lng],
                    [selectedProduct.coordinates.lat, selectedProduct.coordinates.lng]
                  ]}
                />

                {/* Origin marker */}
                <Marker
                  position={[getCoordinates(selectedProduct.origin).lat, getCoordinates(selectedProduct.origin).lng]}
                  icon={L.divIcon({
                    className: "custom-div-icon origin-marker",
                    html: `
                      <div style="background-color: #4ade80; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>
                      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; color: white; font-weight: bold;">O</div>
                    `,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6],
                  })}
                >
                  <Popup>
                    <div className="p-2 bg-background border border-border rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                        <span className="text-sm font-medium">Origin</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{selectedProduct.origin}</p>
                        <p className="mt-1">Departure Point</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {/* Destination marker */}
                <Marker
                  position={[getCoordinates(selectedProduct.destination).lat, getCoordinates(selectedProduct.destination).lng]}
                  icon={L.divIcon({
                    className: "custom-div-icon destination-marker",
                    html: `
                      <div style="background-color: #fb923c; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>
                      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; color: white; font-weight: bold;">D</div>
                    `,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6],
                  })}
                >
                  <Popup>
                    <div className="p-2 bg-background border border-border rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#fb923c]" />
                        <span className="text-sm font-medium">Destination</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{selectedProduct.destination}</p>
                        <p className="mt-1">Arrival Point</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {/* Vessel marker */}
                <Marker
                  position={[selectedProduct.coordinates.lat, selectedProduct.coordinates.lng]}
                  icon={L.divIcon({
                    className: `custom-div-icon vessel-marker ${isLiveTracking ? 'live-tracking' : ''}`,
                    html: `
                      <div style="
                        background-color: ${isLiveTracking ? '#f59e0b' : '#38bdf8'};
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: ${isLiveTracking ? '0 0 0 10px rgba(245, 158, 11, 0.4)' : 'none'};
                        animation: ${isLiveTracking ? 'pulse 1.5s infinite' : 'none'};
                      ">
                        <div style="
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          font-size: 10px;
                          color: white;
                          font-weight: bold;
                          pointer-events: none;
                        ">V</div>
                      </div>
                    `,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6],
                  })}
                >
                  <Popup>
                    <div className="p-2 bg-background border border-border rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                        <span className="text-sm font-medium">Current Position</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{selectedProduct.ship}</p>
                        <p className="mt-1">Vessel Name</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {/* Progress indicator */}
                <Circle
                  center={[selectedProduct.coordinates.lat, selectedProduct.coordinates.lng]}
                  radius={10000}
                  pathOptions={{
                    color: '#38bdf8',
                    fillColor: '#38bdf8',
                    fillOpacity: 0.1
                  }}
                />
              </>
            )}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="absolute left-4 top-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50 z-[9999] shadow-lg">
          <div className="text-xs font-medium mb-2">Legend</div>
          
          {/* Live Tracking Status */}
          {isLiveTracking && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></div>
              <span className="text-xs text-[#f59e0b]">Live Tracking Enabled</span>
            </div>
          )}
          
          {/* Product Journey Markers */}
          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-3 h-3">
              <div className="w-3 h-3 rounded-full bg-[#4ade80] border-2 border-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium">O</div>
            </div>
            <span className="text-xs">Origin (Departure Point)</span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-3 h-3">
              <div className="w-3 h-3 rounded-full bg-[#fb923c] border-2 border-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium">D</div>
            </div>
            <span className="text-xs">Destination (Arrival Point)</span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-3 h-3">
              <div className="w-3 h-3 rounded-full bg-[#38bdf8] border-2 border-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium">V</div>
            </div>
            <span className="text-xs">Current Position (Vessel)</span>
          </div>

          {/* Journey Lines */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-1 bg-[#38bdf8] rounded-full"></div>
            <span className="text-xs">Complete Journey Path</span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-1 bg-[#4ade80] rounded-full"></div>
            <span className="text-xs">Progress Made</span>
          </div>

          {/* Ship Types
          <div className="text-xs font-medium mt-2 mb-1">Ship Types</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#38bdf8] border-2 border-white"></div>
            <span className="text-xs">Cargo Ship</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#fb923c] border-2 border-white"></div>
            <span className="text-xs">Tanker</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] border-2 border-white"></div>
            <span className="text-xs">Passenger Ship</span>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default MapView;
