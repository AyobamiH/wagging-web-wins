import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Mail, Calendar } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Seo
        title="Payment Successful - Tail Wagging Web Design"
        description="Thank you for your purchase! Your payment has been processed successfully."
        path="/payment-success"
        keywords={["payment success", "purchase confirmation", "web design", "pet business"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {isLoading ? (
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Processing your payment...</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-600 mb-2">
                  Payment Successful!
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Thank you for choosing Tail Wagging Web Design
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {sessionId && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Transaction ID:</p>
                    <p className="font-mono text-xs break-all">{sessionId}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>A confirmation email has been sent to your email address</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>We'll contact you within 24 hours to get started</span>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 text-left">
                  <h3 className="font-semibold mb-3 text-center">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary mt-0.5">1.</span>
                      <span>You'll receive a detailed welcome email with next steps</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary mt-0.5">2.</span>
                      <span>Our team will schedule a consultation call to discuss your project</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary mt-0.5">3.</span>
                      <span>We'll begin crafting your professional pet care website</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline" className="flex items-center space-x-2">
                    <Link to="/">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Home</span>
                    </Link>
                  </Button>
                  
                  <Button asChild className="flex items-center space-x-2">
                    <Link to="/contact">
                      <Mail className="w-4 h-4" />
                      <span>Contact Us</span>
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Need immediate assistance? Email us at{" "}
                    <a href="mailto:support@tailwaggingwebdesign.com" className="text-primary hover:underline">
                      support@tailwaggingwebdesign.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;