// Google Analytics tracking utilities
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Safe wrapper for analytics events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Ensure parameters have default values and clean data
    const cleanParams = {
      location: 'unknown',
      ...parameters,
    };
    window.gtag('event', eventName, cleanParams);
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

// Consolidated tool tracking - replaces both tool_click and tool_open
export const trackToolOpen = (tool: { id: string; name: string; category: string; status: string; url?: string }, location?: string) => {
  trackEvent('tool_open', {
    tool_id: tool.id,
    tool_name: tool.name,
    tool_category: tool.category,
    tool_status: tool.status,
    tool_url: tool.url || 'unknown',
    location: location || 'unknown',
  });
};

// Purchase completion tracking
export const trackPurchaseSuccess = (purchaseData: {
  transactionId: string;
  planName: string;
  amount: number;
  currency: string;
  paymentStatus: string;
}) => {
  trackEvent('purchase', {
    transaction_id: purchaseData.transactionId,
    value: purchaseData.amount,
    currency: purchaseData.currency,
    plan_name: purchaseData.planName,
    payment_status: purchaseData.paymentStatus,
  });
};

// Site interaction tracking
export const trackNavClick = (linkText: string, destination: string, location?: string) => {
  trackEvent('nav_click', {
    link_text: linkText,
    destination,
    location: location || 'unknown',
  });
};

export const trackFAQToggle = (question: string, category: string, action: 'open' | 'close') => {
  trackEvent('faq_toggle', {
    question_text: question.substring(0, 100), // Limit length for cleaner data
    category,
    action,
  });
};

export const trackContactSubmit = (formType: string, location?: string) => {
  trackEvent('contact_submit', {
    form_type: formType,
    location: location || 'unknown',
  });
};

export const trackToolInfoView = (toolName: string, toolId: string) => {
  trackEvent('tool_info_view', {
    tool_id: toolId,
    tool_name: toolName,
  });
};