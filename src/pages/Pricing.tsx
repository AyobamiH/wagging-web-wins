import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, CreditCard, Users, CheckCircle, Star } from "lucide-react";
import BuyPlanButton from "@/components/BuyPlanButton";
import { PACKAGES as packages } from "@/data/pricing";

export default function Pricing() {

  

  return (
    <>
      <Seo
        title="Buy Pet Website Packages | Transparent Pricing - Tail Wagging Websites"
        description="Purchase professional pet website packages starting from £750. Starter, Pro and Growth plans with instant checkout. Flexible payment options for pet care businesses."
        path="/pricing"
        keywords={[
          "pet website packages",
          "pet website pricing northampton",
          "pet web design packages",
          "dog walker website cost",
          "pet grooming website pricing",
          "pet business website quote",
          "pet care web design pricing"
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Pricing", item: "/pricing" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Transparent pricing for pet care websites.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          No hidden costs or surprise fees. Choose the package that fits your business size and growth plans. Payment plans available. 
          Not sure which plan? See our <Link to="/services" className="text-primary hover:underline">pet-care web design services</Link> for more details.
        </p>
        
        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[hsl(var(--accent-success))]" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[hsl(var(--accent-info))]" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[hsl(var(--accent))]" />
            <span>Secure Payments by Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span>Trusted by 500+ Pet Businesses</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-success))]" />
            <span>30-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[hsl(var(--accent-warn))]" />
            <span>4.9/5 Customer Rating</span>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article 
              key={pkg.id} 
              className={`rounded-lg border p-6 relative ${
                pkg.popular ? 'border-primary shadow-glow' : 'border-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{pkg.name}</h2>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground ml-1">one-time</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{pkg.desc}</p>
              
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <BuyPlanButton
                planName={pkg.name}
                planPrice={pkg.priceValue}
                onboardingFee={0}
                variant={pkg.popular ? "default" : "outline"}
              />
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Payment plans available. Non-profits/charities — ask for reduced rates.</p>
        
        {/* Additional Trust Section */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
          <div className="text-center">
            <h3 className="font-semibold mb-4">Why Choose Us?</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-8 w-8 text-[hsl(var(--accent-success))]" />
                <strong>Bank-Level Security</strong>
                <p className="text-muted-foreground">Your payment data is protected with industry-standard encryption</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="h-8 w-8 text-[hsl(var(--accent-info))]" />
                <strong>100% Satisfaction</strong>
                <p className="text-muted-foreground">30-day money-back guarantee on all packages</p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1">
                <Users className="h-8 w-8 text-[hsl(var(--primary))]" />
                <strong>Proven Results</strong>
                <p className="text-muted-foreground">Join 500+ successful pet care businesses</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
