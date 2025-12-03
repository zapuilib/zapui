export const TOAST_STYLES = {
  base: {
    position: 'fixed',
    zIndex: '9999',
    transition: 'all 0.3s ease-in-out',
  },
  positions: {
    top: { top: '20px', left: '50%', transform: 'translateX(-50%)', right: 'auto', bottom: 'auto' },
    'top-l': { top: '20px', left: '20px', right: 'auto', bottom: 'auto', transform: 'none' },
    'top-r': { top: '20px', right: '20px', left: 'auto', bottom: 'auto', transform: 'none' },
    bottom: {
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 'auto',
      right: 'auto',
    },
    'bottom-l': { bottom: '20px', left: '20px', right: 'auto', top: 'auto', transform: 'none' },
    'bottom-r': { bottom: '20px', right: '20px', left: 'auto', top: 'auto', transform: 'none' },
  },
} as const;

export const TOAST_DURATION = 5000;

export const DISMISS_THRESHOLD = 300;
