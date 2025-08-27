import { useEffect } from 'react';
import { trackWebVitals } from '@/lib/analytics';

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export const useWebVitals = () => {
  useEffect(() => {
    // Core Web Vitals reporting
    const reportWebVitals = (metric: { name: string; value: number }) => {
      trackWebVitals(metric.name, metric.value);
    };

    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            const layoutEntry = entry as LayoutShiftEntry;
            if (!layoutEntry.hadRecentInput) {
              reportWebVitals({
                name: 'CLS',
                value: layoutEntry.value
              });
            }
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Ignore if not supported
      }
    }

    // First Contentful Paint (FCP)
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportWebVitals({
            name: 'FCP',
            value: entry.startTime
          });
        }
      }
    });

    try {
      perfObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Ignore if not supported
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Ignore if not supported
    }

    return () => {
      perfObserver?.disconnect();
      lcpObserver?.disconnect();
    };
  }, []);
};