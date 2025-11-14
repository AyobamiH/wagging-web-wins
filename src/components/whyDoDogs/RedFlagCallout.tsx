// src/components/whyDoDogs/RedFlagCallout.tsx
import { AlertTriangle } from "lucide-react";

export default function RedFlagCallout() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div
        className="
          relative rounded-2xl border border-destructive/30 bg-destructive/10 p-5
          backdrop-blur-md shadow-lg
        "
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
          <div>
            <p className="font-semibold text-foreground">Health &amp; safety first</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This hub is general information for UK dog owners. If your dog has a sudden behaviour
              change, severe symptoms, or seems in pain, contact your vet or an emergency clinic
              immediately.
            </p>
          </div>
        </div>

        {/* subtle inner highlight for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/20" />
      </div>
    </div>
  );
}
