
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Ship, Anchor, Globe, Shield } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - VoyageTrack</title>
        <meta name="description" content="Learn about VoyageTrack's ship tracking platform" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container px-4 pt-20 pb-6">
          <div className="my-6">
            <h1 className="text-2xl font-semibold">About VoyageTrack</h1>
            <p className="text-muted-foreground">The next generation in ship tracking technology</p>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-medium mb-4">Our Mission</h2>
              <p>
                VoyageTrack was founded in 2022 with a single mission: to provide unprecedented 
                visibility into global maritime logistics. In an increasingly connected world, 
                we believe that accurate, real-time information about vessel movements should 
                be accessible to businesses of all sizes.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5 text-primary" /> 
                    Global Coverage
                  </CardTitle>
                  <CardDescription>Tracking vessels across all major shipping routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform monitors over 150,000 vessels across all major global shipping routes. 
                    From container ships to tankers, we provide comprehensive tracking data updated in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Anchor className="h-5 w-5 text-primary" /> 
                    Advanced Technology
                  </CardTitle>
                  <CardDescription>Built on cutting-edge tracking infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We leverage satellite data, AIS receivers, and proprietary algorithms to provide 
                    the most accurate vessel positioning available. Our AI-driven prediction models help 
                    anticipate arrival times with unprecedented accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" /> 
                    Customer-Focused
                  </CardTitle>
                  <CardDescription>Supporting businesses worldwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    From small importers to global logistics companies, our platform serves thousands of 
                    clients across 120+ countries. We believe in building tools that adapt to your workflow, 
                    not the other way around.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> 
                    Data Security
                  </CardTitle>
                  <CardDescription>Your information is our priority</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    We implement enterprise-grade security protocols to protect your tracking data. 
                    With SOC 2 compliance and end-to-end encryption, you can trust that your 
                    sensitive logistics information remains private and secure.
                  </p>
                </CardContent>
              </Card>
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-medium mb-4">Our Vision</h2>
              <p>
                We envision a future where maritime logistics is fully transparent, efficient, and 
                accessible. By continuing to innovate in vessel tracking technology, we aim to eliminate 
                the uncertainty in global shipping and help build more resilient supply chains.
              </p>
            </section>
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

export default About;
