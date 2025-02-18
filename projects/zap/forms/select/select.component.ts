import {
  Component,
  ContentChild,
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
import {
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapLabelDirective,
} from '../public-api';

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
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() helpText: string = '';
  private _options: { label: string; value: any; [key: string]: any }[] = [];
  isOptionListOpen: boolean = false;
  hoveredOption: string = '';
  selectedOptionValue: string[] = [];
  filteredOptions: any[] = [];
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  //FIXME: The selct was emitting value multiple times when the value was changed.

  @HostListener('window:resize')
  onWindowResize(): void {
    this.handleSelectOptionPosition();
  }
  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color =
        'var(--zap-select-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order =
        this.iconPosition === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left =
        this.iconPosition === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right =
        this.iconPosition === 'right' ? '2rem' : 'auto';
    }

    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color =
        'var(--zap-select-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize =
        'var(--zap-select-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight =
        'var(--zap-select-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight =
        'var(--zap-select-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-select-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-select-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-select-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-select-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-select-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing = 'var(--zap-select-label-letter-spacing)';
    }
  }

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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    if (this.isOptionListOpen) {
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

  handleSelectOptionPosition(): void {
    if (this.optionList && typeof window !== 'undefined') {
      const optionListElement = this.optionList.nativeElement;
      const inputElement = this.inputSelectValueHolder.nativeElement;
      const inputRect = inputElement.getBoundingClientRect();
      const optionListRect = optionListElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
  
      optionListElement.style.position = 'absolute';
      optionListElement.style.left = `${inputRect.left + window.scrollX}px`;
      optionListElement.style.width = `${inputRect.width}px`; 
      if (this.position === 'auto') {
        if (spaceBelow < optionListRect.height && spaceAbove > optionListRect.height) {
          optionListElement.style.top = `${inputRect.top + window.scrollY - optionListRect.height - 5}px`;
        } else {
          optionListElement.style.top = `${inputRect.bottom + window.scrollY}px`;
        }
      } else if (this.position === 'top') {
        optionListElement.style.top = `${inputRect.top + window.scrollY - optionListRect.height -5}px`;
      } else {
        optionListElement.style.top = `${inputRect.bottom + window.scrollY}px`;
      }
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
    if (this.control.disabled) return;
    this.isOptionListOpen = !this.isOptionListOpen;
    this.cdr.detectChanges();
    if (this.isOptionListOpen) {
      if (this.search) {
        this.search.nativeElement.focus();
      }
    } else {
      this.control.markAsTouched();
    }
    this.hoveredOption = '';
    this.filteredOptions = this.options;
    this.handleSelectOptionPosition();
  }

  handleSearch(event: Event): void {
    if (this.control.disabled) return;
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
    this.cdr.detectChanges();
    this.handleSelectOptionPosition();
  }

  selectOption(option: { label: string; value: any }): void {
    if (this.control.disabled) return;
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
      this.cdr.detectChanges();
      this.handleSelectOptionPosition();
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
    this.cdr.detectChanges();
    this.handleSelectOptionPosition();
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

  get classes(): string[] {
    return [
      this.shape,
      this.zapClass,
      this.size,
      this.icon || this.iconDirective ? this.iconPosition : '',
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
