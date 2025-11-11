//
// Ocean Professional theme tokens and helpers
//

// PUBLIC_INTERFACE
export const themeTokens = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#22C55E',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.08)',
    lg: '0 10px 15px rgba(0,0,0,0.12)',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },
};

// PUBLIC_INTERFACE
export function applyTheme() {
  const root = document.documentElement;
  const c = themeTokens.colors;
  root.style.setProperty('--ocn-primary', c.primary);
  root.style.setProperty('--ocn-secondary', c.secondary);
  root.style.setProperty('--ocn-success', c.success);
  root.style.setProperty('--ocn-error', c.error);
  root.style.setProperty('--ocn-bg', c.background);
  root.style.setProperty('--ocn-surface', c.surface);
  root.style.setProperty('--ocn-text', c.text);
  root.style.setProperty('--ocn-muted', c.muted);
  root.style.setProperty('--ocn-border', c.border);
  root.style.setProperty('--ocn-shadow-sm', themeTokens.shadows.sm);
  root.style.setProperty('--ocn-shadow-md', themeTokens.shadows.md);
  root.style.setProperty('--ocn-shadow-lg', themeTokens.shadows.lg);
  root.style.setProperty('--ocn-radius-sm', `${themeTokens.radius.sm}px`);
  root.style.setProperty('--ocn-radius-md', `${themeTokens.radius.md}px`);
  root.style.setProperty('--ocn-radius-lg', `${themeTokens.radius.lg}px`);
}

// PUBLIC_INTERFACE
export function cls(...names) {
  return names.filter(Boolean).join(' ');
}
