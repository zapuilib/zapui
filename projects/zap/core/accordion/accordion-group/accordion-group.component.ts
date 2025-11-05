import { AfterViewInit, Component, ContentChildren, input, QueryList } from '@angular/core';
import { ZapAccordionItem } from '../accordion-item/accordion-item.component';

@Component({
  imports: [],
  selector: 'zap-accordion-group',
  template: `<div class="__zap__accordion__group">
    <ng-content select="zap-accordion-item"></ng-content>
  </div>`,
  styleUrls: ['./accordion-group.component.scss'],
})
export class ZapAccordionGroup implements AfterViewInit {
  @ContentChildren(ZapAccordionItem) items!: QueryList<ZapAccordionItem>;
  multiple = input<boolean>(false);

  ngAfterViewInit() {
    if (!this.multiple()) {
      const openItems = this.items.filter((item) => item.isOpen);
      if (openItems.length > 1) {
        openItems.slice(1).forEach((item) => {
          item.isOpen = false;
        });
      }

      this.items.forEach((item) => {
        item.toggle = () => {
          item.isOpen = !item.isOpen;
          this.items.forEach((i) => {
            if (i !== item) {
              i.isOpen = false;
            }
          });
        };
      });
    }
  }
}
