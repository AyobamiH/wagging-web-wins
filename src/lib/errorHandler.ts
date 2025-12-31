import { AppError, getUserFriendlyMessage } from './errors';
import { toast } from 'sonner';

/**
 * Centralized error handler for consistent UX
 */
export const handleError = (error: unknown, context?: string): void => {
  const message = getUserFriendlyMessage(error);
  const title = context || 'Error';

  if (import.meta.env.DEV) {
    console.error(`[${title}]`, error);
  }

  toast.error(title, {
    description: message,
  });
};

/**
 * Show success toast
 */
export const showSuccess = (message: string, description?: string): void => {
  toast.success(message, { description });
};
