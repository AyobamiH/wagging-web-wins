// Google Analytics tracking utilities
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-VBQBZ0ZDWQ', {
      page_path: path,
    });
  }
};

// CTA tracking events
export const trackCTAClick = (ctaType: string, location?: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    location: location || 'unknown',
  });
};

export const trackCalendlyOpen = (location?: string) => {
  trackEvent('calendly_open', {
    location: location || 'unknown',
  });
};

export const trackToolOpen = (toolName: string, toolUrl?: string) => {
  trackEvent('tool_open', {
    tool_name: toolName,
    tool_url: toolUrl || 'unknown',
  });
};