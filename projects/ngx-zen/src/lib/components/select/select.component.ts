import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

@Component({
  selector: 'ngx-zen-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> extends ControlValueAccessorDirective<T> {
  @ViewChild('inputSelectValueHolder') inputSelectValueHolder!: ElementRef;
  @ViewChild('optionList') optionList!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'default' = 'default';
  @Input() size: 'compact' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() options: { label: string; value: any }[] = [];
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = 'Search';
  @Input() notFound: string = 'No options found';
  isOptionListOpen: boolean = false;
  hoveredOption: string = '';
  selectedOptionValue: any = '';
  filteredOptions: any[] = [];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const inputElement = this.inputSelectValueHolder.nativeElement;
    if (
      this.optionList &&
      !this.optionList.nativeElement.contains(clickedElement) &&
      !inputElement.contains(clickedElement)
    ) {
      this.toggleOptionsList();
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.filteredOptions = this.options;
  }

  getOptionListStyle(): { [key: string]: string } {
    return {
      color: this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      'background-color': this.config.colors.primary,
    };
  }

  toggleOptionsList(): void {
    this.isOptionListOpen = !this.isOptionListOpen;
    if (this.isOptionListOpen) {
      setTimeout(() => {
        this.search.nativeElement.focus();
      });
    }
    this.hoveredOption = '';
    this.filteredOptions = this.options;
  }

  filterOptions(event: any): void {
    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  selectOption(option: { label: string; value: any }): void {
    this.control.setValue(option.value);
    this.inputSelectValueHolder.nativeElement.value = option.label;
    this.selectedOptionValue = option.value;
    this.toggleOptionsList();
  }

  getOptionStyle(value: string): any {
    return {
      color:
        this.selectedOptionValue === value && this.hoveredOption !== value
          ? this.config.colors.tertiary
          : this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      'background-color':
        this.hoveredOption === value
          ? this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.1)
          : this.selectedOptionValue === value
          ? this.colorUtility.hexToRgba(this.config.colors.tertiary, 0.1)
          : this.config.colors.primary,
    };
  }

  getSearchFieldStyle(): any {
    return {
      color: this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
    };
  }
}
