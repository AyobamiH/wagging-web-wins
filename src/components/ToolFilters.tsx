import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { Tool } from "@/lib/useToolsRegistry";
import { cn } from "@/lib/utils";

interface ToolFiltersProps {
  tools: Tool[];
  onFilteredToolsChange: (filteredTools: Tool[]) => void;
}

export const ToolFilters = ({ tools, onFilteredToolsChange }: ToolFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "a-z">("newest");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tools.map(tool => tool.category)));
    return cats.sort();
  }, [tools]);

  const statuses = useMemo(() => {
    const stats = Array.from(new Set(tools.map(tool => tool.status)));
    return stats.sort();
  }, [tools]);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      // Search filter
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(tool.category);

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(tool.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.launchedAt).getTime() - new Date(a.launchedAt).getTime());
        break;
      case "popular":
        // For now, sort by newest as we don't have popularity metrics
        filtered.sort((a, b) => new Date(b.launchedAt).getTime() - new Date(a.launchedAt).getTime());
        break;
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [tools, searchQuery, selectedCategories, selectedStatuses, sortBy]);

  // Notify parent of filtered tools changes
  useEffect(() => {
    onFilteredToolsChange(filteredAndSortedTools);
  }, [filteredAndSortedTools]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStatuses.length > 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools by name or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedCategories.includes(category) && "bg-primary text-primary-foreground"
                )}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-1">
            {statuses.map(status => (
              <Badge
                key={status}
                variant={selectedStatuses.includes(status) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors capitalize",
                  selectedStatuses.includes(status) && "bg-primary text-primary-foreground"
                )}
                onClick={() => toggleStatus(status)}
              >
                {status.replace('_', ' ')}
              </Badge>
            ))}
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="a-z">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedTools.length} of {tools.length} tools
      </div>
    </div>
  );
};