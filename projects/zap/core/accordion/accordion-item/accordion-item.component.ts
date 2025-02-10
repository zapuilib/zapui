import {
  AfterViewInit,
  Component,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapAccordionHeader } from '../accordion-header/accordion-header.component';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'zap-accordion-item',
  template: `<div class="__zap__accordion__item">
    <ng-content select="zap-accordion-header"></ng-content>
    <ng-content select="zap-accordion-content"></ng-content>
  </div>`,
  styleUrl: './accordion-item.component.scss',
})
export class ZapAccordionItem implements AfterViewInit {
  @ContentChild(ZapAccordionHeader) header!: ZapAccordionHeader;
  isOpen: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    if (this.header) {
      this.header.toggle.subscribe(() => {
        this.toggle();
      });
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
