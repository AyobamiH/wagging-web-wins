import { useState, useEffect } from 'react';
import localTools from '@/data/tools.local.json';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  url: string;
  subdomain: string;
  status: 'live' | 'beta' | 'coming_soon' | 'internal';
  category: "Audits" | "Calculators" | "Automations" | "Bookings" | "Billing" | "Templates" | "Other";
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

// Remove old trackToolClick - now handled by consolidated trackToolOpen in analytics.ts