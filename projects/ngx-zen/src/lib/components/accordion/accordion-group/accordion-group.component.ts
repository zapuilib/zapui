import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'ngx-zen-accordion-group',
  template: `<ng-content></ng-content>`,
})
export class AccordionGroupComponent
  implements AfterContentInit, OnDestroy, OnChanges
{
  @Input() multiple: boolean = true;
  @Input() activeIndex: number | null = null;

  @ContentChildren(AccordionComponent)
  childAccordions!: QueryList<AccordionComponent>;

  private sub: Subscription = new Subscription();

  ngAfterContentInit() {
    this.initializeAccordions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['activeIndex'] &&
      changes['activeIndex'].currentValue !== null
    ) {
      this.updateActiveAccordion();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private initializeAccordions() {
    this.sub.unsubscribe();
    this.sub = new Subscription();

    this.childAccordions.forEach((accordion, index) => {
      const subscription = accordion.toggle.subscribe(() => {
        if (!this.multiple) {
          this.closeOthers(accordion);
        }
      });
      this.sub.add(subscription);
    });

    this.updateActiveAccordion();
  }

  private closeOthers(openAccordion: AccordionComponent) {
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

    if (
      this.activeIndex !== null &&
      this.activeIndex < this.childAccordions.length
    ) {
      const targetAccordion = this.childAccordions.toArray()[this.activeIndex];
      targetAccordion.isOpen = true;
      if (!this.multiple) {
        this.closeOthers(targetAccordion);
      }
      this.activeIndex = null;
    }
  }
}
