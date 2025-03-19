export const TOAST_STYLES = {
  base: {
    position: 'fixed',
    zIndex: '9999',
    transition: 'all 0.3s ease-in-out',
  },
  positions: {
    top: {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: 'auto',
    },
    bottom: {
      top: 'auto',
      left: 'auto',
      bottom: '20px',
      right: '20px',
    },
  },
} as const;

export const TOAST_DURATION = 5000;

export const DISMISS_THRESHOLD = 300;
