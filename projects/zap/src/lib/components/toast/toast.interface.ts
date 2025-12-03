import { TemplateRef } from '@angular/core';

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
  /**
   * Provide a custom Angular template reference to render instead of the default content.
   * When provided, it replaces the entire content area inside the toast component.
   */
  template?: TemplateRef<unknown>;
  /**
   * Optional context object passed to the provided template.
   */
  templateContext?: Record<string, unknown>;
}
