import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { ZapScrollAreaDirective } from '../../directives/zap-scroll-area.directive';

@Component({
  selector: 'dp-calendar-select',
  standalone: true,
  imports: [CommonModule, ZapScrollAreaDirective],
  templateUrl: './dp-calendar-select.component.html',
  styleUrl: './dp-calendar-select.component.scss',
})
export class DPCalendarSelect {
  @ViewChild('select') elementRef!: ElementRef;
  @Output() selectOption: EventEmitter<string> = new EventEmitter<string>();
  @Input() options!: string[];
  @Input() selected!: string;
  @Input() scrollToSelected = false;
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  isOptionListOpen = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isOptionListOpen = false;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  scrollToSelectedOption(): void {
    const selectedOption = this.elementRef?.nativeElement.querySelector(
      '.__zap__form__control__selected',
    );
    if (selectedOption) {
      selectedOption.scrollIntoView({ block: 'center' });
    }
  }

  toggleOptionList(): void {
    this.isOptionListOpen = !this.isOptionListOpen;
    if (this.isOptionListOpen) {
      this.cdr.detectChanges();
    }
    if (this.scrollToSelected && this.isOptionListOpen) {
      this.scrollToSelectedOption();
    }
  }

  handleSelectOption(option: string): void {
    this.selected = option;
    this.selectOption.emit(option);
    this.toggleOptionList();
  }
}
