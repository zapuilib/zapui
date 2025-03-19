import { AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ZapAccordionItem } from '../accordion-item/accordion-item.component';

@Component({
  standalone: true,
  imports: [],
  selector: 'zap-accordion-group',
  template: `<div class="__zap__accordion__group">
    <ng-content select="zap-accordion-item"></ng-content>
  </div>`,
  styleUrls: ['./accordion-group.component.scss'],
})
export class ZapAccordionGroup implements AfterViewInit {
  @ContentChildren(ZapAccordionItem) items!: QueryList<ZapAccordionItem>;
  @Input() multiple = false;

  ngAfterViewInit() {
    if (!this.multiple) {
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
