/**
 * Ensures meta description stays within recommended length
 * @param text - The meta description text
 * @param maxLength - Maximum length (default 160)
 * @returns Clamped text with ellipsis if needed
 */
export const ensureMetaLength = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  
  // Find last complete word within limit
  const truncated = text.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.slice(0, lastSpace) + '…'
    : truncated + '…';
};
