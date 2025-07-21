export interface ZapToastInterface {
  title?: string;
  text?: string;
  action?: string;
  shape?: 'pill' | 'flat' | 'curve';
  zapClass?: string;
  type?: 'error' | 'default';
  duration?: number;
  actioned?: () => any;
  position?: 'top' | 'top-l' | 'top-r' | 'bottom' | 'bottom-l' | 'bottom-r';
}
