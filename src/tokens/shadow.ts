export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 255, 255, 0.1)',
  base: '0 2px 4px rgba(0, 255, 255, 0.15), 0 0 8px rgba(0, 255, 255, 0.05)',
  md: '0 4px 8px rgba(0, 255, 255, 0.2), 0 0 16px rgba(0, 255, 255, 0.1)',
  lg: '0 8px 16px rgba(0, 255, 255, 0.25), 0 0 24px rgba(0, 255, 255, 0.15)',
  xl: '0 16px 32px rgba(0, 255, 255, 0.3), 0 0 48px rgba(0, 255, 255, 0.2)',
  
  cyan: '0 4px 12px rgba(0, 255, 255, 0.4), 0 0 20px rgba(0, 255, 255, 0.2)',
  magenta: '0 4px 12px rgba(255, 0, 255, 0.4), 0 0 20px rgba(255, 0, 255, 0.2)',
  pink: '0 4px 12px rgba(255, 0, 102, 0.4), 0 0 20px rgba(255, 0, 102, 0.2)',
  green: '0 4px 12px rgba(0, 255, 136, 0.4), 0 0 20px rgba(0, 255, 136, 0.2)',
} as const;

export type ShadowToken = typeof shadows;
