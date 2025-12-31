interface SkipToContentProps {
  targetId?: string;
}

export default function SkipToContent({ targetId = "main-content" }: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                 bg-primary text-primary-foreground px-4 py-2 rounded-md 
                 font-medium text-sm transition-all duration-200 
                 focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      Skip to main content
    </a>
  );
}