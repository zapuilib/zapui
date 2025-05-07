import { Component, Inject, Optional } from '@angular/core';

import { ACCORDION_ITEM_TOKEN, AccordionItemLike } from '../accordion.token';

@Component({
  imports: [],
  selector: 'zap-accordion-content',
  template: `<div
    class="__zap__accordion__content"
    [class.open]="isOpen"
    role="region"
    [id]="'accordion-content-' + accordionItem?.id"
    [attr.aria-hidden]="!isOpen">
    <ng-content></ng-content>
  </div>`,
  styleUrl: './accordion-content.component.scss',
})
export class ZapAccordionContent {
  constructor(@Optional() @Inject(ACCORDION_ITEM_TOKEN) public accordionItem: AccordionItemLike) {}
  get isOpen(): boolean {
    return this.accordionItem ? this.accordionItem.isOpen : false;
  }
}
