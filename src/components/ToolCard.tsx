import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { ExternalLink, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Tool } from "@/lib/useToolsRegistry";
import { trackToolOpen, trackToolInfoView } from "@/lib/analytics";


interface ToolCardProps {
  tool: Tool;
  index: number;
}

export const ToolCard = ({ tool, index }: ToolCardProps) => {
  const handleOpenTool = () => {
    trackToolOpen({
      id: tool.id,
      name: tool.name,
      category: tool.category,
      status: tool.status,
      url: tool.url
    }, 'tool_card');
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleInfoClick = () => {
    trackToolInfoView(tool.name, tool.id);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <Card className="h-full flex flex-col hover:shadow-glow transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {tool.name}
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                {tool.tagline}
              </CardDescription>
            </div>
            <StatusBadge status={tool.status} />
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="secondary" className="text-xs">
              {tool.category}
            </Badge>
            {tool.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tool.tags.length - 2}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {tool.description}
          </p>
          

          <div className="flex gap-2">
            <Button 
              onClick={handleOpenTool}
              className="flex-1"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Open Tool
            </Button>
            
            {tool.description && (
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="px-3"
                onClick={handleInfoClick}
              >
                <Link to={`/tools/${tool.id}`}>
                  <Info className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};