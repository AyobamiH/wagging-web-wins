import { Card } from "@/components/ui/card";

interface FPatternDiagramProps {
  sections: string[];
}

export default function FPatternDiagram({ sections }: FPatternDiagramProps) {
  const fPatternSections = [
    { id: 1, name: "Hero Section", description: "Left-aligned heading, right support image", area: "top-horizontal" },
    { id: 2, name: "Service Cards", description: "3–6 cards, one-line outcomes", area: "left-vertical" },
    { id: 3, name: "Social Proof", description: "Top review + logos", area: "horizontal-break" },
    { id: 4, name: "Process", description: "3 steps: Enquire → Confirm → Care", area: "left-vertical" },
    { id: 5, name: "Pricing Preview", description: "From-prices + link to full pricing", area: "right-supplement" },
    { id: 6, name: "Credibility Row", description: "Safety & standards, insurance, training", area: "horizontal-break" },
    { id: 7, name: "FAQ", description: "3–5 top objections", area: "left-vertical" },
    { id: 8, name: "Final CTA", description: "Sticky on mobile", area: "bottom-cta" }
  ];

  const getZoneStyle = (area: string, index: number) => {
    const baseClasses = "f-zone relative";
    const gridArea = {
      "top-horizontal": "col-span-3",
      "left-vertical": "col-span-2",
      "horizontal-break": "col-span-3",
      "right-supplement": "col-span-1",
      "bottom-cta": "col-span-3"
    }[area] || "col-span-1";

    return `${baseClasses} ${gridArea}`;
  };

  return (
    <div className="layout-diagram">
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-3 text-center">F-Pattern Layout Structure</h4>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Users scan in an F-shape: top horizontal, left vertical, occasional right glances
        </p>
      </div>
      
      <div className="f-pattern-visual">
        {fPatternSections.map((section, index) => (
          <div 
            key={section.id} 
            className={getZoneStyle(section.area, index)}
            data-section={`Zone ${section.id}`}
          >
            <div className="f-zone-number">{section.id}</div>
            <div className="font-semibold text-sm mb-1">{section.name}</div>
            <div className="text-xs text-muted-foreground">{section.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h5 className="font-semibold text-primary mb-2">🎯 Top Horizontal</h5>
          <p className="text-sm text-muted-foreground">
            Hero captures full attention. Value prop, location, primary CTA.
          </p>
        </Card>
        <Card className="p-4 bg-accent/5 border-accent/20">
          <h5 className="font-semibold text-accent mb-2">👁️ Left Vertical</h5>
          <p className="text-sm text-muted-foreground">
            Services, process, FAQ. Start strong headings here.
          </p>
        </Card>
        <Card className="p-4 bg-secondary/50 border-border">
          <h5 className="font-semibold mb-2">➡️ Right Support</h5>
          <p className="text-sm text-muted-foreground">
            Supplementary info, pricing, testimonials.
          </p>
        </Card>
      </div>
    </div>
  );
}