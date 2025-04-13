
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Truck, Ship, MapPin } from "lucide-react";
import MapView from "@/components/MapView";

// Dummy data for products
const dummyProducts = [
  {
    id: "PRD001",
    name: "Premium Coffee Beans",
    origin: "Colombia",
    destination: "New York",
    ship: "SS Maritime Explorer",
    status: "In Transit",
    eta: "April 20, 2025",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&auto=format",
    coordinates: { lat: 25.7617, lng: -80.1918 }
  },
  {
    id: "PRD002",
    name: "Scandinavian Furniture",
    origin: "Sweden",
    destination: "Los Angeles",
    ship: "MV Nordic Star",
    status: "Loading",
    eta: "April 25, 2025",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&auto=format",
    coordinates: { lat: 57.7089, lng: 11.9746 }
  },
  {
    id: "PRD003",
    name: "Organic Tea Collection",
    origin: "India",
    destination: "London",
    ship: "SS Ocean Voyager",
    status: "Departed",
    eta: "April 18, 2025",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format",
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
];

const ProductTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(dummyProducts[0]);

  const filteredProducts = dummyProducts.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Product Tracking - VoyageTrack</title>
        <meta name="description" content="Track your products as they ship across the globe" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container px-4 pt-20 pb-6">
          <div className="my-6">
            <h1 className="text-2xl font-semibold">Product Tracking</h1>
            <p className="text-muted-foreground">Monitor your products as they travel across the globe</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Products
                  </CardTitle>
                  <CardDescription>
                    Track individual products by ID or name
                  </CardDescription>
                  <div className="mt-4">
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow 
                          key={product.id} 
                          className={`cursor-pointer hover:bg-muted ${selectedProduct.id === product.id ? 'bg-muted' : ''}`}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{selectedProduct.name}</span>
                    <span className="text-base font-normal px-2 py-1 bg-primary/10 text-primary rounded-md">
                      {selectedProduct.status}
                    </span>
                  </CardTitle>
                  <CardDescription>ID: {selectedProduct.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Origin</p>
                            <p className="text-muted-foreground">{selectedProduct.origin}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Destination</p>
                            <p className="text-muted-foreground">{selectedProduct.destination}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Ship className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Vessel</p>
                            <p className="text-muted-foreground">{selectedProduct.ship}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64 bg-muted rounded-lg overflow-hidden">
                      <MapView />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-sm text-muted-foreground">Expected arrival: {selectedProduct.eta}</p>
                    <Button>View Detailed Report</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
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

export default ProductTracking;
