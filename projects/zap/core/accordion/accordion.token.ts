import { InjectionToken } from '@angular/core';

export interface AccordionItemLike {
  isOpen: boolean;
  toggle: () => void;
  id: string;
}

export const ACCORDION_ITEM_TOKEN = new InjectionToken<AccordionItemLike>('ACCORDION_ITEM');
