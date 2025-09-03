// src/components/whyDoDogs/RedFlagCallout.tsx
import { AlertTriangle } from "lucide-react";

export default function RedFlagCallout() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div
        className="
          relative rounded-2xl border border-red-400/30 bg-red-500/10 p-5
          backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,.25)]
        "
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-red-300" />
          <div className="text-red-50">
            <p className="font-semibold text-white">Health &amp; safety first</p>
            <p className="mt-1 text-sm text-red-100/90">
              This hub is general information for UK dog owners. If your dog has a sudden behaviour
              change, severe symptoms, or seems in pain, contact your vet or an emergency clinic
              immediately.
            </p>
          </div>
        </div>

        {/* subtle inner highlight for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      </div>
    </div>
  );
}
