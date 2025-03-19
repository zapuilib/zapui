import { Component, Host, Optional } from '@angular/core';

import { ZapAccordionItem } from '../accordion-item/accordion-item.component';

@Component({
  standalone: true,
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
  constructor(@Optional() @Host() public accordionItem: ZapAccordionItem) {}

  get isOpen(): boolean {
    return this.accordionItem ? this.accordionItem.isOpen : false;
  }
}
