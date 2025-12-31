import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackRedditSnippetCopy } from "@/lib/analytics";
import { toast } from "@/hooks/use-toast";

interface RedditSnippetProps {
  snippet: string;
  slug: string;
}

export function RedditSnippet({ snippet, slug }: RedditSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      trackRedditSnippetCopy(slug);
      toast({
        title: "Copied!",
        description: "Reddit snippet copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50">
        <span className="text-sm font-medium text-muted-foreground">
          📋 Copy-paste Reddit snippet
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap overflow-x-auto font-mono text-muted-foreground">
        {snippet}
      </pre>
    </div>
  );
}
