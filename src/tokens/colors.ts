export const colors = {
  background: {
    primary: '#0a0a0f',
    secondary: '#12121a',
    tertiary: '#1a1a24',
    elevated: '#1f1f2e',
  },

  surface: {
    base: '#151520',
    hover: '#1d1d2a',
    active: '#252535',
    disabled: '#0f0f15',
  },

  border: {
    default: '#2a2a3a',
    hover: '#3a3a4a',
    focus: '#00ffff',
    error: '#ff0066',
    success: '#00ff88',
  },

  text: {
    primary: '#e0e0e8',
    secondary: '#a0a0b0',
    tertiary: '#707080',
    disabled: '#404050',
    inverse: '#0a0a0f',
  },

  accent: {
    cyan: '#00ffff',
    magenta: '#ff00ff',
    yellow: '#ffff00',
    green: '#00ff88',
    pink: '#ff0066',
    blue: '#0066ff',
  },

  status: {
    success: '#00ff88',
    warning: '#ffaa00',
    error: '#ff0066',
    info: '#00aaff',
  },

  interactive: {
    primary: '#00ffff',
    primaryHover: '#00cccc',
    primaryActive: '#009999',
    secondary: '#ff00ff',
    secondaryHover: '#cc00cc',
    secondaryActive: '#990099',
  },
} as const;

export type ColorToken = typeof colors;
