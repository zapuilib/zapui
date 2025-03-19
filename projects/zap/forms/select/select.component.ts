import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import {
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapLabelDirective,
} from '../public-api';
import { ZapScrollAreaDirective } from '../directives/zap-scroll-area.directive';

@Component({
  selector: 'zap-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    ZapScrollAreaDirective,
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
export class ZapSelect<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('inputSelectValueHolder') inputSelectValueHolder!: ElementRef;
  @ViewChild('optionList') optionList!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  @Output() onChange: EventEmitter<string[] | string> = new EventEmitter<string[] | string>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onReset: EventEmitter<void> = new EventEmitter<void>();
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = 'Select';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass = '';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size!: 'compact' | 'base';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() searchable = true;
  @Input() searchPlaceholder = 'Search';
  @Input() notFound = 'No options found';
  @Input() multiselect = false;
  @Input() async = false;
  @Input() optionTemplate?: TemplateRef<any>;
  @Input() selectedTemplate?: TemplateRef<any>;
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() helpText = '';
  private _options: { label: string; value: any; [key: string]: any }[] = [];
  isOptionListOpen = false;
  hoveredOption = '';
  selectedOptionValue: string[] = [];
  filteredOptions: { label: string; value: any; [key: string]: any }[] = [];
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  @HostListener('window:resize')
  onWindowResize(): void {
    this.handleSelectOptionPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.handleSelectOptionPosition();
  }
  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-select-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left =
        this.iconPosition === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right =
        this.iconPosition === 'right' ? '2rem' : 'auto';
    }

    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-select-help-text-color)';
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
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-select-label-letter-spacing)';
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
    if (this.isOptionListOpen && event.key === 'Escape') {
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
      this.selectedOptionValue = [...this.selectedOptionValue, this.control.value];
    }
  }

  handleSelectOptionPosition(): void {
    if (this.optionList && typeof window !== 'undefined') {
      const optionListElement = this.optionList.nativeElement;
      const inputElement = this.inputSelectValueHolder.nativeElement;
      const inputRect = inputElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (!optionListElement.dataset.appendedToBody) {
        document.body.appendChild(optionListElement);
        optionListElement.dataset.appendedToBody = 'true';
      }

      optionListElement.style.position = 'fixed';
      optionListElement.style.left = `${inputRect.left}px`;
      optionListElement.style.width = `${inputRect.width}px`;

      optionListElement.style.visibility = 'hidden';
      optionListElement.style.display = 'block';
      const optionListHeight = optionListElement.scrollHeight;
      optionListElement.style.visibility = 'visible';

      if (this.position === 'auto') {
        if (spaceBelow < optionListHeight && spaceAbove > optionListHeight) {
          optionListElement.style.top = `${inputRect.top - optionListHeight - 5}px`;
        } else {
          optionListElement.style.top = `${inputRect.bottom}px`;
        }
      } else if (this.position === 'top') {
        optionListElement.style.top = `${inputRect.top - optionListHeight - 5}px`;
      } else {
        optionListElement.style.top = `${inputRect.bottom}px`;
      }

      optionListElement.style.zIndex = '999';
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
        setTimeout(() => {
          this.search.nativeElement.focus();
        }, 0);
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
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.async) {
      this.onSearch.emit(searchTerm);
    } else {
      this.filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm),
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
          (value) => value !== option.value,
        );
      } else {
        this.selectedOptionValue = [...this.selectedOptionValue, option.value];
      }
      this.control.setValue(this.selectedOptionValue);
      this.onChange.emit(this.selectedOptionValue);
      this.cdr.detectChanges();
      this.handleSelectOptionPosition();
    } else {
      this.control.setValue(option.value);
      this.onChange.emit(option.value);
      this.selectedOptionValue = [option.value];
      this.toggleOptionsList();
    }
  }

  cancelOption(event: any, value: any): void {
    event.stopPropagation();
    if (this.multiselect) {
      this.selectedOptionValue = this.selectedOptionValue.filter((option) => option !== value);
      this.control.setValue(this.selectedOptionValue);
      this.onChange.emit(this.selectedOptionValue);
    }
    this.cdr.detectChanges();
    this.handleSelectOptionPosition();
  }

  getSelected(value: string): string {
    return this.options.find((option) => option.value === value)?.label || '';
  }

  getSelectedOption(value: string): { label: string; value: any } {
    return (
      this.options.find((option) => option.value === value) || {
        label: '',
        value: '',
      }
    );
  }

  override reset(): void {
    super.reset();
    this.selectedOptionValue = [];
  }

  get classes(): string[] {
    return this.generateClasses();
  }

  get selectClasses(): string[] {
    return this.generateClasses([
      'select:',
      'select-placeholder:',
      'select-dropdown:',
      'select-icon:',
      'select-selected:',
    ]);
  }

  get optionsClasses(): string[] {
    return this.generateClasses([
      'options:',
      'option:',
      'search:',
      'search-icon:',
      'option-checkbox:',
      'option-checked:',
      'option-selected:',
      'option-hovered:',
    ]);
  }

  private generateClasses(prefixes: string[] = ['']): string[] {
    return [
      this.shape,
      ...this.zapClass
        .split(' ')
        .filter((cls) => prefixes.some((prefix) => cls.startsWith(prefix))),
      this.size,
      this.icon || this.iconDirective ? this.iconPosition : '',
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this.optionList) {
      this.optionList.nativeElement.remove();
    }
  }
}
