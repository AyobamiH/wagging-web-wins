import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'live' | 'beta' | 'coming_soon' | 'internal';
  className?: string;
}

const statusConfig = {
 
  beta: {
    label: 'Beta',
    variant: 'secondary' as const,
    className: 'text-foreground bg-[hsla(var(--accent-warn)/0.2)] border-[hsla(var(--accent-warn)/0.3)]'
  },
  coming_soon: {
    label: 'Coming Soon',
    variant: 'outline' as const,
    className: 'text-muted-foreground'
  },
  internal: {
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