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

// Blog and content interactions
export const trackBlogPostView = (postTitle: string, postSlug: string, pillar?: string, location?: string) => {
  trackEvent('blog_post_view', {
    post_title: postTitle,
    post_slug: postSlug,
    pillar: pillar || 'unknown',
    location: location || 'unknown',
  });
};

export const trackBlogPostRead = (postSlug: string, readingProgress: number, timeOnPage: number) => {
  trackEvent('blog_post_read', {
    post_slug: postSlug,
    reading_progress: readingProgress,
    time_on_page: timeOnPage,
  });
};

export const trackSearch = (query: string, location: string, resultsCount?: number) => {
  trackEvent('search', {
    query,
    location,
    results_count: resultsCount || 0,
  });
};

export const trackFilter = (filterType: string, filterValue: string, location: string, resultsCount?: number) => {
  trackEvent('filter_applied', {
    filter_type: filterType,
    filter_value: filterValue,
    location,
    results_count: resultsCount || 0,
  });
};

// Performance tracking
export const trackWebVitals = (name: string, value: number) => {
  trackEvent('web_vitals', {
    metric_name: name,
    value: Math.round(value),
  });
};

export const trackPageLoad = (path: string, loadTime: number) => {
  trackEvent('page_load', {
    path,
    load_time: Math.round(loadTime),
  });
};

// Lovable Content Hub tracking
export const trackLovableHubView = () => {
  trackEvent('lovable_hub_view', {
    location: 'lovable_hub',
  });
};

export const trackLovableCategoryView = (category: string) => {
  trackEvent('lovable_category_view', {
    category,
    location: 'lovable_category',
  });
};

export const trackRedditSnippetCopy = (slug: string) => {
  trackEvent('reddit_snippet_copy', {
    post_slug: slug,
    location: 'blog_post',
  });
};
