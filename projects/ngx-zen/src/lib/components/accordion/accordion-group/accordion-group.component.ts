import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
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
    this.setupAccordions();
    this.updateActiveIndex();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeIndex'] && !changes['activeIndex'].firstChange) {
      this.updateActiveIndex();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private setupAccordions() {
    this.sub.unsubscribe();

    this.childAccordions.forEach((accordion, index) => {
      const subscription = accordion.toggle.subscribe(() => {
        if (!this.multiple) {
          this.closeOthers(accordion);
        }
      });
      this.sub.add(subscription);
    });
  }

  private closeOthers(openAccordion: AccordionComponent) {
    this.childAccordions.forEach((accordion) => {
      if (accordion !== openAccordion) {
        accordion.isOpen = false;
      }
    });
  }

  private updateActiveIndex() {
    if (
      this.activeIndex === null ||
      this.activeIndex >= this.childAccordions.length
    )
      return;

    this.childAccordions.forEach((accordion, index) => {
      accordion.isOpen = index === this.activeIndex;
    });

    if (!this.multiple) {
      const activeAccordion = this.childAccordions.toArray()[this.activeIndex];
      if (activeAccordion) {
        this.closeOthers(activeAccordion);
      }
    }
  }
}
