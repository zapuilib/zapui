import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapAccordionItem } from '../accordion-item/accordion-item.component';
import { ZapIconDirective } from '../../public-api';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'zap-accordion-header',
  template: `<div
    class="__zap__accordion__header"
    role="button"
    tabindex="0"
    (click)="onToggle()"
    [ngClass]="variant"
  >
    <ng-content></ng-content>
    @if(iconDirective) {
    <ng-content select="[zapIcon]"></ng-content>
    } @else { @switch(icon) { @case('chevron') {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="14"
      height="14"
      class="chevron"
      [class.open]="isOpen"
    >
      <path
        d="M212.7 363.3c6.2 6.2 16.4 6.2 22.6 0l160-160c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 329.4 75.3 180.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l160 160z"
      />
    </svg>
    } @case('plus') {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="12"
      height="12"
      class="plus"
    >
      @if(!isOpen) {
      <path
        d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 176L32 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l176 0 0 176c0 8.8 7.2 16 16 16s16-7.2 16-16l0-176 176 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-176 0 0-176z"
      />
      } @else {
      <path
        d="M432 256c0 8.8-7.2 16-16 16L32 272c-8.8 0-16-7.2-16-16s7.2-16 16-16l384 0c8.8 0 16 7.2 16 16z"
      />
      }
    </svg>
    } } }
  </div>`,
  styleUrl: './accordion-header.component.scss',
})
export class ZapAccordionHeader implements AfterViewInit {
  @Input() variant: 'default' | 'nounderline' = 'default';
  @Input() icon: 'chevron' | 'plus' = 'chevron';
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;

  constructor(@Optional() @Host() private accordionItem: ZapAccordionItem) {}

  get isOpen(): boolean {
    return this.accordionItem ? this.accordionItem.isOpen : false;
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = '12px';
    }
  }

  onToggle() {
    this.toggle.emit();
  }
}
