import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ReviewCount } from '@/lib/repositories/types';
import { SupabaseSettingsRepository } from '@/lib/repositories/supabase-adapters';

interface ReviewsContextType {
  reviewCount: ReviewCount | null;
  isLoading: boolean;
  error: Error | null;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const settingsRepository = new SupabaseSettingsRepository();

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const { data: reviewCount, isLoading, error } = useQuery({
    queryKey: ['reviewCount'],
    queryFn: () => settingsRepository.getReviewCount(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });

  return (
    <ReviewsContext.Provider 
      value={{ 
        reviewCount: reviewCount || null, 
        isLoading, 
        error: error as Error | null 
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews(): ReviewsContextType {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}

// Hook for getting formatted review display
export function useReviewDisplay() {
  const { reviewCount } = useReviews();
  
  if (!reviewCount) {
    return {
      total: 312,
      average: 4.8,
      stars: '★★★★★',
      formattedAverage: '4.8',
      breakdown: { 5: 267, 4: 35, 3: 8, 2: 2, 1: 0 }
    };
  }

  const stars = '★'.repeat(Math.floor(reviewCount.average)) + 
                (reviewCount.average % 1 >= 0.5 ? '☆' : '');

  return {
    total: reviewCount.total,
    average: reviewCount.average,
    stars,
    formattedAverage: reviewCount.average.toFixed(1),
    breakdown: reviewCount.breakdown || {}
  };
}