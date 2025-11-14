import { useState, useEffect } from 'react';

interface OnlineStatus {
  isOnline: boolean;
  wasOffline: boolean;
}

export const useOnline = (): OnlineStatus => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    // SSR-safe: default to true on server
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  });
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(true);
      // Reset wasOffline after a delay to hide reconnection message
      setTimeout(() => setWasOffline(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, wasOffline };
};
