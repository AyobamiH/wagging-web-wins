import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function SpeedUXAudits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const serviceJsonLd = [{
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Speed & UX Audits",
    description: "Plain-English report with quick wins for images, scripts, and layout shift.",
    areaServed: "United Kingdom",
    provider: { "@type": "Organization", name: "Tail Wagging Websites Factory Northampton" },
  }];

  return (
    <>
      <Seo
        title="Speed & UX Audits | Tail Wagging Websites"
        description="Fix what slows visitors (and Google) down. Clear report and optional implementation."
        path="/services/speed-ux-audits"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "Speed & UX Audits", item: "/services/speed-ux-audits" },
        ]}
        jsonLd={serviceJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Fix what slows visitors (and Google) down.</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border p-5">
            <h2 className="font-semibold">Deliverables</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              <li>Plain-English report: wins, impact, effort</li>
              <li>Quick fixes for images, scripts, and layout shift</li>
              <li>Optional implementation within a week</li>
            </ul>
          </article>
        </div>
        <div className="mt-6 flex gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Try Our UX Audit Tool</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Website UX Audit Tool</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="https://tools.tailwaggingwebdesign.com"
                  className="w-full h-full border-0 rounded-lg"
                  title="UX Audit Tool"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Link to="/contact">
            <Button variant="secondary" size="lg">Request Professional Audit</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
