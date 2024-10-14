import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'ngx-zen-accordion-group',
  template: `<ng-content></ng-content>`,
})
export class AccordionGroupComponent
  implements AfterContentInit, OnChanges
{
  @Input() multiple: boolean = true;
  @Input() activeIndex: number | null = null;
  @Input() fullBordered: boolean = false;

  @ContentChildren(AccordionComponent)
  childAccordions!: QueryList<AccordionComponent>;

  ngAfterContentInit(): void {
    this.updateActiveAccordion();
    this.assignPositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeIndex'] && changes['activeIndex'].currentValue !== null) {
      this.updateActiveAccordion();
    }
  }

  onAccordionToggle(openAccordion: AccordionComponent) {
    if (!this.multiple) {
      this.closeOthers(openAccordion);
    }
  }

  closeOthers(openAccordion: AccordionComponent) {
    this.childAccordions.forEach((accordion) => {
      if (accordion !== openAccordion) {
        accordion.isOpen = false;
      }
    });
  }

  private updateActiveAccordion() {
    if (!this.childAccordions || !this.childAccordions.length) {
      return;
    }

    if (this.activeIndex !== null && this.activeIndex < this.childAccordions.length) {
      const targetAccordion = this.childAccordions.toArray()[this.activeIndex];

      targetAccordion.isOpen = true;

      if (!this.multiple) {
        this.closeOthers(targetAccordion);
      }
      this.activeIndex = null;
    }
  }

  private assignPositions() {
    const accordionsArray = this.childAccordions.toArray();
    const totalAccordions = accordionsArray.length;

    accordionsArray.forEach((accordion, index) => {
      accordion.isFirst = index === 0;
      accordion.isLast = index === totalAccordions - 1;
      accordion.index = index;
    });
  }
}
