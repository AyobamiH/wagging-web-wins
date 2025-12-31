import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, RefreshCw, Mail } from "lucide-react";

const PaymentFailed = () => {
  return (
    <>
      <Seo
        title="Payment Failed - Tail Wagging Web Design"
        description="Your payment could not be processed. Please try again or contact support."
        path="/payment-failed"
        noIndex={true}
        keywords={["payment failed", "payment error", "web design", "pet business"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <Card className="text-center shadow-lg">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600 mb-2">
                Payment Failed
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                We couldn't process your payment. No charges were made to your account.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-3 text-red-800">Common reasons for payment failure:</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold mt-0.5">•</span>
                    <span>Insufficient funds in your account</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold mt-0.5">•</span>
                    <span>Incorrect card details entered</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold mt-0.5">•</span>
                    <span>Card declined by your bank</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold mt-0.5">•</span>
                    <span>Expired card or security code issues</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">What you can do:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-primary mt-0.5">1.</span>
                    <span>Check your card details and try again</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-primary mt-0.5">2.</span>
                    <span>Contact your bank to ensure the payment isn't blocked</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-primary mt-0.5">3.</span>
                    <span>Try using a different payment method</span>
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
                  <Link to="/pricing">
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Still having trouble? We're here to help!
                </p>
                <Button asChild variant="outline" size="sm" className="flex items-center space-x-2 mx-auto">
                  <a href="mailto:support@tailwaggingwebdesign.com">
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;