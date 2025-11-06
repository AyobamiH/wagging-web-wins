import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Mail, Calendar } from "lucide-react";
import { trackPurchaseSuccess, trackNavClick } from "@/lib/analytics";

interface SessionData {
  id: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  planName: string;
  onboardingFee: string;
  firstInstallment: string;
  questionnaireId?: string;
}

const PaymentSuccess = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;
      
      try {
        const response = await fetch(`https://backend-zd10.onrender.com/success/stripe/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setSessionData(data);
          
          // Track successful purchase
          trackPurchaseSuccess({
            transactionId: data.id,
            planName: data.planName,
            amount: data.amountTotal,
            currency: data.currency,
            paymentStatus: data.paymentStatus,
          });
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSessionData();
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <>
      <Seo
        title="Payment Successful - Tail Wagging Web Design"
        description="Thank you for your purchase! Your payment has been processed successfully."
        path={`/success/stripe/${sessionId}`}
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
                <p className="text-muted-foreground text-lg">
                  Your payment has been processed successfully and your order is confirmed.
                </p>
                {sessionData && (
                  <div className="bg-muted rounded-lg p-4 mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Plan:</span>
                      <span>{sessionData.planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Amount:</span>
                      <span>£{sessionData.amountTotal} {sessionData.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Payment Status:</span>
                      <span className="capitalize">{sessionData.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Transaction ID:</span>
                      <span className="font-mono text-primary">{sessionData.id}</span>
                    </div>
                  </div>
                )}

                {sessionId && !sessionData && (
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
                    <Link to="/" onClick={() => trackNavClick('Back to Home', '/', 'payment_success')}>
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Home</span>
                    </Link>
                  </Button>
                  
                  <Button asChild className="flex items-center space-x-2">
                    <Link to="/contact" onClick={() => trackNavClick('Contact Us', '/contact', 'payment_success')}>
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