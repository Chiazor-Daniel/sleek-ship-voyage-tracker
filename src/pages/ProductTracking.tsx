import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Package, Truck, Ship, MapPin, Navigation, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/services/supabase";

const ProductTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a Product ID");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const response = await fetchProducts();
      console.log("Fetched data from Supabase:", response);
      
      if (response.data && response.data.length > 0) {
        // Find the product that matches the search query (by ID)
        const foundProduct = response.data.find(
          product => product.id?.toLowerCase() === searchQuery.toLowerCase().trim()
        );
        
        if (foundProduct) {
          setSearchedProduct(foundProduct);
          setError(null);
        } else {
          setSearchedProduct(null);
          setError("Product not found. Please check your Product ID and try again.");
        }
      } else {
        setSearchedProduct(null);
        setError("No products found in database");
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError("Failed to search for product. Please try again later.");
      setSearchedProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchedProduct(null);
    setError(null);
    setHasSearched(false);
  };

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
            <p className="text-muted-foreground">Enter your Product ID to track your shipment</p>
          </div>

          {/* Search Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Track Your Product
              </CardTitle>
              <CardDescription>
                Enter your Product ID to view tracking information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Product ID (e.g., PROD001)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={loading}
                  className="min-w-[100px]"
                >
                  {loading ? "Searching..." : "Track"}
                </Button>
                {(hasSearched || searchedProduct) && (
                  <Button 
                    variant="outline" 
                    onClick={clearSearch}
                  >
                    Clear
                  </Button>
                )}
              </div>
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {hasSearched && (
            <div className="grid grid-cols-1 gap-6">
              {searchedProduct ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl">{searchedProduct.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">ID: {searchedProduct.id}</p>
                      </div>
                      <Badge variant={
                        searchedProduct.status === "In Transit" ? "default" :
                          searchedProduct.status === "Loading" ? "outline" :
                            "secondary"
                      }>
                        {searchedProduct.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={searchedProduct.image}
                          alt={searchedProduct.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/400/320";
                          }}
                        />

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Origin</p>
                              <p className="text-muted-foreground">{searchedProduct.origin}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Destination/Current Location</p>
                              <p className="text-muted-foreground">{searchedProduct.destination}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Ship className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Vessel</p>
                              <p className="text-muted-foreground">{searchedProduct.ship}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-muted p-6 rounded-lg h-full flex flex-col">
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Navigation className="h-5 w-5" />
                            Current Status
                          </h3>
                          
                          <div className="flex-1 flex flex-col justify-center items-center text-center">
                            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                              {searchedProduct.status}
                            </div>
                            
                            <p className="text-lg mb-4">
                              {searchedProduct.location || searchedProduct.destination || "Location information not available"}
                            </p>
                            
                            <div className="text-sm text-muted-foreground">
                              Last updated: {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Expected arrival: {searchedProduct.eta}
                      </p>
                      <Button>View Detailed Report</Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                !loading && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Product Not Found</h3>
                      <p className="text-muted-foreground mb-4">
                        We couldn't find a product with ID "{searchQuery}". 
                        Please check your Product ID and try again.
                      </p>
                      <Button variant="outline" onClick={clearSearch}>
                        Try Another Search
                      </Button>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          {/* Initial State - No Search Performed */}
          {!hasSearched && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Ready to Track</h3>
                <p className="text-muted-foreground">
                  Enter your Product ID above to get real-time tracking information for your shipment.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-medium mb-2">Searching...</h3>
                <p className="text-muted-foreground">
                  Looking for your product in our tracking system.
                </p>
              </CardContent>
            </Card>
          )}
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