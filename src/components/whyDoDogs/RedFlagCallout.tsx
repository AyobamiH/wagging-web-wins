import { AlertTriangle } from "lucide-react";

export default function RedFlagCallout() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="rounded-2xl border p-5 bg-red-50 border-red-200 focus-within:ring-2"
           style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">Health & safety first</p>
            <p className="mt-1 text-sm text-red-900/90">
              This hub is general information for UK dog owners. If your dog has a sudden behaviour
              change, severe symptoms, or seems in pain, contact your vet or an emergency clinic immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
