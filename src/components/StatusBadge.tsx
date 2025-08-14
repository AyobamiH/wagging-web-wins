import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'live' | 'beta' | 'coming_soon' | 'internal';
  className?: string;
}

const statusConfig = {
  coming_soon: {
    label: 'Live',
    variant: 'default' as const,
    className: 'text-white bg-[linear-gradient(90deg,hsl(var(--accent-success)),hsl(var(--accent-success)))]'
  },
  coming_soon: {
    label: 'Beta',
    variant: 'secondary' as const,
    className: 'text-foreground bg-[hsla(var(--accent-warn)/0.2)] border-[hsla(var(--accent-warn)/0.3)]'
  },
  coming_soon: {
    label: 'Coming Soon',
    variant: 'outline' as const,
    className: 'text-muted-foreground'
  },
  coming_soon: {
    label: 'Internal',
    variant: 'outline' as const,
    className: 'text-muted-foreground opacity-50'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};