import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'zap-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapSelect),
      multi: true,
    },
  ],
})
export class ZapSelect<T> extends ControlValueAccessorDirective<T> {
  @ViewChild('inputSelectValueHolder') inputSelectValueHolder!: ElementRef;
  @ViewChild('optionList') optionList!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  @Output() change: EventEmitter<string[] | string> = new EventEmitter<
    string[] | string
  >();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onReset: EventEmitter<void> = new EventEmitter<void>();
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = 'Select';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' = 'base';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() searchable: boolean = true;
  @Input() searchPlaceholder: string = 'Search';
  @Input() notFound: string = 'No options found';
  @Input() multiselect: boolean = false;
  @Input() async: boolean = false;
  @Input() optionTemplate?: TemplateRef<any>;
  @Input() selectedTemplate?: TemplateRef<any>;
  private _options: { label: string; value: any; [key: string]: any }[] = [];
  isOptionListOpen: boolean = false;
  hoveredOption: string = '';
  selectedOptionValue: string[] = [];
  filteredOptions: any[] = [];

  // TODO: Implement an escape key handler to close the select dropdown when the escape key is pressed.
  // TODO: Close the select dropdown when the user clicks outside of the select component.
  // TODO: Add custom positioning logic for the options dropdown based on the select component's position in the viewport.
  // TODO: The dropdown should open either upwards or downwards depending on the available space in the viewport.
  // TODO: On searchable select, when you click it should focus on the search input, its not always working, to recreate try to click multiple times on the select input.
  //TODO: Support custom icon (not a font) via iconTemplate
  //DISCUSSION: Should we support directive for option template? and selected template? instead of templateRef smae with other component that has it??

  @Input()
  set options(newOptions: { label: string; value: any; [key: string]: any }[]) {
    this._options = newOptions || [];
    this.filteredOptions = [...this._options];
  }

  get options(): { label: string; value: any; [key: string]: any }[] {
    return this._options;
  }

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
    this.filteredOptions = [...this._options];
    this.handleDefaultValue();
    this.checkIfEmpty();
  }

  handleDefaultValue(): void {
    if (this.control.value) {
      this.selectedOptionValue = [
        ...this.selectedOptionValue,
        this.control.value,
      ];
    }
  }

  checkIfEmpty(): void {
    this.control.valueChanges.subscribe((value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        this.selectedOptionValue = [];
        this.onReset.emit();
      }
    });
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

  handleSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (this.async) {
      this.onSearch.emit(searchTerm);
    } else {
      this.filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm)
      );
    }
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

  getSelected(value: string): string {
    return this.options.find((option) => option.value === value)?.label || '';
  }

  getSelectedOption(value: string): { label: string; value: string } {
    return (
      this.options.find((option) => option.value === value) || {
        label: '',
        value: '',
      }
    );
  }

  reset(): void {
    this.control.reset();
    this.selectedOptionValue = [];
  }
}
