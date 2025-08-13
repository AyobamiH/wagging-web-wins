import { useState, useEffect } from 'react';
import localTools from '@/data/tools.local.json';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  url: string;
  subdomain: string;
  status: 'live' | 'beta' | 'coming_soon' | 'internal';
  category: 'Audits' | 'Bookings' | 'Automations' | 'Templates' | 'Website';
  tags: string[];
  icon?: string;
  thumbnail?: string;
  launchedAt: string;
  description: string;
  seo: {
    keywords: string[];
    jsonLdType: string;
  };
  visibility: 'public' | 'hidden';
}

export const useToolsRegistry = () => {
  const [tools, setTools] = useState<Tool[]>(localTools as Tool[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from the remote manifest with 2s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch('/tools-manifest.json', {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const remoteTools = await response.json();
          setTools(remoteTools);
        } else {
          throw new Error('Failed to fetch remote manifest');
        }
      } catch (err) {
        // Fall back to local tools on any error
        console.log('Using local tools registry as fallback');
        setTools(localTools as Tool[]);
        setError(err instanceof Error ? err.message : 'Failed to fetch tools');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const publicTools = tools.filter(tool => tool.visibility === 'public');

  return {
    tools: publicTools,
    allTools: tools,
    loading,
    error,
  };
};

// Analytics tracking
export const trackToolClick = (tool: Tool) => {
  // Track tool click analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'tool_click', {
      custom_parameter_1: tool.id,
      custom_parameter_2: tool.name,
      custom_parameter_3: tool.category,
      custom_parameter_4: tool.status,
      custom_parameter_5: tool.subdomain,
    });
  }
  
  // Also track with custom analytics if available
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track('tool_click', {
      id: tool.id,
      name: tool.name,
      category: tool.category,
      status: tool.status,
      subdomain: tool.subdomain,
    });
  }
};