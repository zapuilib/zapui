import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
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
  @Output() change: EventEmitter<string[] | string> = new EventEmitter<string[] | string>();
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
  @Input() multiselect: boolean = false;
  isOptionListOpen: boolean = false;
  hoveredOption: string = '';
  selectedOptionValue: string[] = [];
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
    this.handleDefaultValue();
  }
  
  getOptionListStyle(): { [key: string]: string } {
    return {
      color: this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      'background-color': this.config.colors.primary,
    };
  }

  handleDefaultValue(): void {
    if (this.control.value) {
      this.selectedOptionValue = [...this.selectedOptionValue, this.control.value]
    }
  }

  toggleOptionsList(): void {
    this.isOptionListOpen = !this.isOptionListOpen;
    if (this.isOptionListOpen) {
      setTimeout(() => {
        this.search?.nativeElement?.focus();
      });
    } else {
      this.control.markAsTouched();
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
    if (this.multiselect) {
      if (this.selectedOptionValue.includes(option.value)) {
        this.selectedOptionValue = this.selectedOptionValue.filter(
          (value) => value !== option.value
        );
      } else {
        this.selectedOptionValue = [...this.selectedOptionValue, option.value];
      }
      this.control.setValue(this.selectedOptionValue);
      this.change.emit(this.selectedOptionValue);
    } else {
      this.control.setValue(option.value);
      this.change.emit(option.value);
      this.selectedOptionValue = [option.value];
      this.toggleOptionsList();
    }
  }

  cancelOption(event: any, value: string): void {
    event.stopPropagation();
    if (this.multiselect) {
      this.selectedOptionValue = this.selectedOptionValue.filter(
        (option) => option !== value
      );
      this.control.setValue(this.selectedOptionValue);
      this.change.emit(this.selectedOptionValue);
    }
  }

  getOptionStyle(value: string): any {
    const isSelected = this.selectedOptionValue.includes(value);
    const isHovered = this.hoveredOption === value;
    const isMultiselect = this.multiselect;

    return {
      color:
        isSelected && !isMultiselect
          ? this.config.colors.tertiary
          : this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      'background-color':
        isHovered && !isMultiselect
          ? this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.1)
          : isSelected && !isMultiselect
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

  getChipStyle(): any {
    return {
      color: this.config.colors.primary,
      'background-color': this.config.colors.tertiary,
      'font-size': this.config.fontSize.md,
    };
  }

  getCheckboxStyle(value: string): any {
    return {
      'background-color': this.selectedOptionValue.includes(value)
        ? this.config.colors.tertiary
        : 'transparent',
      'border-color': this.selectedOptionValue.includes(value)
        ? this.config.colors.tertiary
        : this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
      color: this.config.colors.primary,
    };
  }

  getSelected(value: string): string {
    return this.options.find((option) => option.value === value)?.label || '';
  }

  getPlaceholderStyle(): any {
    return {
      color: this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.5),
      'font-size': this.config.fontSize.md,
    };
  }
}
