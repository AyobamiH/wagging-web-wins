import { useReviewDisplay } from "@/contexts/ReviewsContext";
import { Star } from "lucide-react";

interface ReviewDisplayProps {
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

export default function ReviewDisplay({ variant = "default", className = "" }: ReviewDisplayProps) {
  const { total, average, formattedAverage } = useReviewDisplay();

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1 ${className}`}>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(average) 
                  ? "fill-[hsl(var(--star-fill))] text-[hsl(var(--star-fill))]" 
                  : i < average 
                    ? "fill-[hsl(var(--star-fill)/0.5)] text-[hsl(var(--star-fill))]"
                    : "fill-[hsl(var(--star-empty))] text-[hsl(var(--star-empty))]"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {formattedAverage} ({total})
        </span>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(average) 
                    ? "fill-[hsl(var(--star-fill))] text-[hsl(var(--star-fill))]" 
                    : i < average 
                      ? "fill-[hsl(var(--star-fill)/0.5)] text-[hsl(var(--star-fill))]"
                      : "fill-[hsl(var(--star-empty))] text-[hsl(var(--star-empty))]"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{formattedAverage}</span>
          <span className="text-muted-foreground">({total} reviews)</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(average) 
                ? "fill-[hsl(var(--star-fill))] text-[hsl(var(--star-fill))]" 
                : i < average 
                  ? "fill-[hsl(var(--star-fill)/0.5)] text-[hsl(var(--star-fill))]"
                  : "fill-[hsl(var(--star-empty))] text-[hsl(var(--star-empty))]"
            }`}
          />
        ))}
      </div>
      <span className="font-medium">{formattedAverage}</span>
      <span className="text-muted-foreground">({total} reviews)</span>
    </div>
  );
}