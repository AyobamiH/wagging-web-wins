import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

const PaymentCancel = () => {
  return (
    <>
      <Seo
        title="Payment Cancelled - Tail Wagging Web Design"
        description="Your payment was cancelled. You can try again anytime."
        path="/cancel"
        noIndex={true}
        keywords={["payment cancelled", "checkout cancelled", "web design", "pet business"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <Card className="text-center shadow-lg">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                <XCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Payment Cancelled
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                No worries! Your payment was cancelled and no charges were made.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Ready to try again?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We're here to help you get the perfect website for your pet business. 
                  You can restart the checkout process anytime.
                </p>
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
                    <span>View Pricing</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Questions about our services? Contact us at{" "}
                  <a href="mailto:support@tailwaggingwebdesign.com" className="text-primary hover:underline">
                    support@tailwaggingwebdesign.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PaymentCancel;