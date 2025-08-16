import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "£750",
      priceValue: 750,
      desc: "For new pet care businesses. One-page or simple multi-section site, basic SEO, contact form, GBP setup.",
      features: [
        "One-page responsive website",
        "Basic SEO optimization",
        "Contact form integration",
        "Google Business Profile setup",
        "Mobile-friendly design"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: "£1,950",
      priceValue: 1950,
      desc: "Multi-page site with services, pricing, reviews, blog, local SEO, simple automations.",
      features: [
        "Multi-page website",
        "Services & pricing pages",
        "Review system integration",
        "Blog functionality",
        "Local SEO optimization",
        "Simple automations"
      ],
      popular: true
    },
    {
      id: "growth",
      name: "Growth",
      price: "£3,500",
      priceValue: 3500,
      desc: "Everything in Pro plus advanced automations, content plan, and conversion experiments.",
      features: [
        "Everything in Pro",
        "Advanced automations",
        "Content marketing plan",
        "Conversion optimization",
        "A/B testing setup",
        "Priority support"
      ]
    }
  ];

  const handlePurchase = async (planId: string, planName: string, price: number) => {
    setLoadingPlan(planId);
    
    try {
      const response = await fetch('https://backend-c469.onrender.com/create-buy-plan-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          planName,
          price: price * 100, // Convert to cents
          currency: 'gbp'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      
      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Payment Error",
        description: "Unable to start checkout process. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <Seo
        title="Buy Pet Website Packages | Transparent Pricing - Tail Wagging Websites"
        description="Purchase professional pet website packages starting from £750. Starter, Pro and Growth plans with instant checkout. Flexible payment options for pet care businesses."
        path="/pricing"
        keywords={[
          "buy pet website package",
          "pet website pricing northampton",
          "purchase pet web design",
          "pet website packages online",
          "dog walker website price",
          "pet grooming website cost",
          "buy website for pet business",
          "pet care web design pricing"
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Pricing", item: "/pricing" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Transparent pricing for pet care websites.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          No hidden costs or surprise fees. Choose the package that fits your business size and growth plans. Payment plans available.
        </p>
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
              
              <Button 
                className="w-full"
                size="lg"
                onClick={() => handlePurchase(pkg.id, pkg.name, pkg.priceValue)}
                disabled={loadingPlan === pkg.id}
                variant={pkg.popular ? "default" : "outline"}
              >
                {loadingPlan === pkg.id ? "Processing..." : `Purchase ${pkg.name}`}
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Payment plans available. Non-profits/charities — ask for reduced rates.</p>
        <div className="mt-6">
          <Link to="/contact">
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
