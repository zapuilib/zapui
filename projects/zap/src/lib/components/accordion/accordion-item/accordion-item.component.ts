import { AfterViewInit, Component, ContentChild, forwardRef, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapAccordionHeader } from '../accordion-header/accordion-header.component';
import { ACCORDION_ITEM_TOKEN } from '../accordion.token';

@Component({
  imports: [CommonModule],
  selector: 'zap-accordion-item',
  template: `<div
    class="__zap__accordion__item"
    role="region"
    [attr.aria-labelledby]="'accordion-header-' + id">
    <ng-content select="zap-accordion-header"></ng-content>
    <ng-content select="zap-accordion-content"></ng-content>
  </div>`,
  styleUrl: './accordion-item.component.scss',
  providers: [
    {
      provide: ACCORDION_ITEM_TOKEN,
      useExisting: forwardRef(() => ZapAccordionItem),
    },
  ],
})
export class ZapAccordionItem implements OnInit, AfterViewInit {
  @ContentChild(ZapAccordionHeader) header!: ZapAccordionHeader;
  open = input<boolean>(false);
  isOpen = false;
  id = `accordion-${Math.random().toString(36).substr(2, 9)}`;

  ngOnInit() {
    this.isOpen = this.open();
  }

  ngAfterViewInit() {
    if (this.header) {
      this.header.open.subscribe(() => this.toggle());
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
