import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'dp-calendar-select',
  standalone: true,
  imports: [],
  templateUrl: './dp-calendar-select.component.html',
  styleUrl: './dp-calendar-select.component.scss'
})
export class DPCalendarSelect {
  @ViewChild('select') elementRef!: ElementRef;
  @Output() selectOption: EventEmitter<string> = new EventEmitter<string>();
  @Input() options!: string[];
  @Input() selected!: string;
  @Input() scrollToSelected: boolean = false;
  isOptionListOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isOptionListOpen = false;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  scrollToSelectedOption(): void {
    const selectedOption = this.elementRef?.nativeElement.querySelector('.__zap__form__control__selected');    
    if (selectedOption) {
      selectedOption.scrollIntoView({ block: 'center' });
    }
  }

  toggleOptionList(): void {
    this.isOptionListOpen = !this.isOptionListOpen;
    if(this.isOptionListOpen) {
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
