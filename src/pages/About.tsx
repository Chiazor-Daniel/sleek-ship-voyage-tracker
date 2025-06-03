import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Ship, Anchor, Globe, Shield, MessageCircle, Mail } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - VoyageTrack</title>
        <meta name="description" content="Learn about VoyageTrack's ship tracking platform" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container px-4 pt-20 pb-8">
          {/* Customer Support Banner - Mobile optimized */}
          <div className="bg-primary text-primary-foreground rounded-lg mb-8 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                  <h2 className="font-semibold text-base sm:text-lg">Need assistance? We're here to help!</h2>
                </div>
                <p className="text-sm sm:text-base text-primary-foreground/90">
                  Contact our customer support team via Telegram or Email
                </p>
              </div>
              
              {/* Mobile-first contact buttons */}
              <div className="space-y-3">
                <a 
                  href="https://t.me/voyagershippingcustomersupport" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary-foreground text-primary px-4 py-3 rounded-md font-medium hover:bg-primary-foreground/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="truncate">@voyagershippingcustomersupport</span>
                </a>
                <a 
                  href="mailto:Helpvogyagershipping@gmail.com" 
                  className="w-full bg-primary-foreground text-primary px-4 py-3 rounded-md font-medium hover:bg-primary-foreground/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Mail className="h-4 w-4" />
                  <span className="truncate">Helpvogyagershipping@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">About VoyageTrack</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              The next generation in ship tracking technology
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-10">
            <h2 className="text-xl font-medium mb-4 text-center sm:text-left">Our Mission</h2>
            <div className="bg-muted/30 p-4 sm:p-6 rounded-lg">
              <p className="text-sm sm:text-base leading-relaxed">
                VoyageTrack was founded in 2022 with a single mission: to provide unprecedented 
                visibility into global maritime logistics. In an increasingly connected world, 
                we believe that accurate, real-time information about vessel movements should 
                be accessible to businesses of all sizes.
              </p>
            </div>
          </section>

          {/* Feature Cards - Mobile optimized grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Ship className="h-5 w-5 text-primary flex-shrink-0" /> 
                  Global Coverage
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Tracking vessels across all major shipping routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Our platform monitors over 150,000 vessels across all major global shipping routes. 
                  From container ships to tankers, we provide comprehensive tracking data updated in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Anchor className="h-5 w-5 text-primary flex-shrink-0" /> 
                  Advanced Technology
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Built on cutting-edge tracking infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  We leverage satellite data, AIS receivers, and proprietary algorithms to provide 
                  the most accurate vessel positioning available. Our AI-driven prediction models help 
                  anticipate arrival times with unprecedented accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0" /> 
                  Customer-Focused
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Supporting businesses worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  From small importers to global logistics companies, our platform serves thousands of 
                  clients across 120+ countries. We believe in building tools that adapt to your workflow, 
                  not the other way around.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" /> 
                  Data Security
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your information is our priority
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  We implement enterprise-grade security protocols to protect your tracking data. 
                  With SOC 2 compliance and end-to-end encryption, you can trust that your 
                  sensitive logistics information remains private and secure.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vision Section */}
          <section className="mb-8">
            <h2 className="text-xl font-medium mb-4 text-center sm:text-left">Our Vision</h2>
            <div className="bg-muted/30 p-4 sm:p-6 rounded-lg">
              <p className="text-sm sm:text-base leading-relaxed">
                We envision a future where maritime logistics is fully transparent, efficient, and 
                accessible. By continuing to innovate in vessel tracking technology, we aim to eliminate 
                the uncertainty in global shipping and help build more resilient supply chains.
              </p>
            </div>
          </section>
        </main>

        {/* Mobile-optimized footer */}
        <footer className="border-t border-border/50 py-6">
          <div className="container px-4 text-xs sm:text-sm text-muted-foreground">
            <div className="text-center mb-4">
              VoyageTrack © {new Date().getFullYear()} - Real-time vessel tracking and monitoring
            </div>
            
            <div className="text-center">
              <div className="mb-3 font-medium">Need help? Contact us:</div>
              <div className="space-y-2">
                <div>
                  <a 
                    href="mailto:Helpvogyagershipping@gmail.com" 
                    className="inline-flex items-center gap-1 text-primary hover:underline break-all"
                  >
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs">Helpvogyagershipping@gmail.com</span>
                  </a>
                </div>
                <div>
                  <a 
                    href="https://t.me/voyagershippingcustomersupport" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <MessageCircle className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs">@voyagershippingcustomersupport</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;