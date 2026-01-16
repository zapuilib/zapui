import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapHelpTextDirective, ZapIconDirective, ZapLabelDirective } from '../../directives';
import { ZapScrollAreaDirective } from '../../directives/zap-scroll-area.directive';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';
import { ZapCustomErrorMessages } from '../validation-error/validation.interface';

@Component({
  selector: 'zap-select',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    ZapScrollAreaDirective,
    RequiredIndicatorComponent,
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
  @ViewChild('optionsPanel') optionsPanel!: TemplateRef<any>;
  @ViewChild('inputSelectValueHolder') inputSelectValueHolder!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  @ContentChild(ZapHelpTextDirective, { static: false })
  helpTextDirective!: ZapHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  onChange = output<string[] | string>();
  onSearch = output<string>();
  onReset = output<void>();
  id = input.required<string>();
  label = input<string>('');
  placeholder = input<string>('Select');
  customErrorMessages = input<ZapCustomErrorMessages>({});
  zapClass = input<string>('');
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'compact' | 'base'>();
  icon = input<string | undefined>(undefined);
  iconPosition = input<'left' | 'right'>('left');
  searchable = input<boolean>(true);
  searchPlaceholder = input<string>('Search');
  notFound = input<string>('No options found');
  multiselect = input<boolean>(false);
  async = input<boolean>(false);
  optionTemplate = input<TemplateRef<any> | null>(null);
  selectedTemplate = input<TemplateRef<any> | null>(null);
  position = input<'top' | 'bottom' | 'auto'>('auto');
  helpText = input<string>('');
  options = model<{ label: string; value: any; [key: string]: any }[]>([]);
  indicator = input<boolean>(true);
  private overlayRef!: OverlayRef;
  isOptionListOpen = false;
  hoveredOption = '';
  selectedOptionValue: string[] = [];
  filteredOptions: { label: string; value: any }[] = [];
  private selectedOptionsCache = new Map<string, { label: string; value: any }>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    if (this.isOptionListOpen && event.key === 'Escape') {
      this.toggleOptionsList();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOptionListOpen && this.overlayRef) {
      const inputWidth = this.inputSelectValueHolder.nativeElement.offsetWidth;
      this.overlayRef.updateSize({ width: inputWidth });
      this.updatePosition();
    }
  }

  constructor(
    @Inject(Injector) injector: Injector,
    cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private vcr: ViewContainerRef,
  ) {
    super(injector, cdr);
    effect(() => {
      this.filteredOptions = this.options();
      if (this.control.value) {
        this.selectedOptionValue = Array.isArray(this.control.value)
          ? this.control.value
          : [this.control.value];
        this.selectedOptionValue.forEach((value) => {
          const option = this.options().find((opt) => opt.value === value);
          if (option) {
            this.selectedOptionsCache.set(value, option);
          }
        });
      } else {
        this.selectedOptionValue = [];
      }
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.handleDefaultValue();
    this.checkIfEmpty();
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size() === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size() === 'compact' ? '14px' : 'var(--zap-select-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-select-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition() === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition() === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition() === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left =
        this.iconPosition() === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right =
        this.iconPosition() === 'right' ? '2rem' : 'auto';
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

  private updatePosition(): void {
    if (this.overlayRef) {
      const positionStrategy = this.buildPositionStrategy();
      this.overlayRef.updatePositionStrategy(positionStrategy);
    }
  }

  private buildPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positions: ConnectedPosition[] =
      this.position() === 'top'
        ? [
            {
              originX: 'start',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'bottom',
              offsetY: -8,
            },
          ]
        : this.position() === 'bottom'
          ? [
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 4,
              },
            ]
          : [
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 4,
              },
              {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetY: -8,
              },
            ];

    const strategy = this.positionBuilder
      .flexibleConnectedTo(this.inputSelectValueHolder)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    return strategy;
  }

  private generateClasses(prefixes: string[] = ['']): string[] {
    return [
      this.shape() ?? '',
      ...this.zapClass()
        .split(' ')
        .filter((cls) => prefixes.some((prefix) => cls.startsWith(prefix))),
      this.size() ?? '',
      this.icon() || this.iconDirective ? this.iconPosition() : '',
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }

  handleDefaultValue(): void {
    if (this.control.value) {
      this.selectedOptionValue = [...this.selectedOptionValue, this.control.value];
    }
  }

  checkIfEmpty(): void {
    this.control.valueChanges.subscribe((value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        this.selectedOptionValue = [];
        this.selectedOptionsCache.clear();
        this.onReset.emit();
      }
    });
  }

  toggleOptionsList(): void {
    if (this.control.disabled) return;

    this.isOptionListOpen = !this.isOptionListOpen;

    if (this.isOptionListOpen) {
      const inputWidth = this.inputSelectValueHolder.nativeElement.offsetWidth;
      const positionStrategy = this.buildPositionStrategy();

      this.overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        width: inputWidth,
      });

      const portal = new TemplatePortal(this.optionsPanel, this.vcr);
      this.overlayRef.attach(portal);

      this.overlayRef.backdropClick().subscribe(() => this.toggleOptionsList());
      this.overlayRef.detachments().subscribe(() => {
        this.isOptionListOpen = false;
      });

      setTimeout(() => {
        if (this.search) this.search.nativeElement.focus();
      }, 0);
    } else {
      if (this.overlayRef) {
        this.overlayRef.detach();
      }
      this.control.markAsTouched();
    }

    this.hoveredOption = '';
    this.filteredOptions = this.options();
  }

  handleSearch(event: Event): void {
    if (this.control.disabled) return;
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.async()) {
      this.onSearch.emit(searchTerm);
    } else {
      this.filteredOptions = this.options().filter((option) =>
        option.label.toLowerCase().includes(searchTerm),
      );
    }
    this.cdr.detectChanges();
    this.updatePosition();
  }

  selectOption(option: { label: string; value: any }): void {
    if (this.control.disabled) return;
    if (this.multiselect()) {
      if (this.selectedOptionValue.includes(option.value)) {
        this.selectedOptionValue = this.selectedOptionValue.filter(
          (value) => value !== option.value,
        );
        this.selectedOptionsCache.delete(option.value);
      } else {
        this.selectedOptionValue = [...this.selectedOptionValue, option.value];
        this.selectedOptionsCache.set(option.value, option);
      }
      this.control.setValue(this.selectedOptionValue);
      this.onChange.emit(this.selectedOptionValue);
      this.cdr.detectChanges();
      this.updatePosition();
    } else {
      this.control.setValue(option.value);
      this.onChange.emit(option.value);
      this.selectedOptionValue = [option.value];
      this.selectedOptionsCache.clear();
      this.selectedOptionsCache.set(option.value, option);
      this.toggleOptionsList();
    }
  }

  cancelOption(event: any, value: any): void {
    event.stopPropagation();
    if (this.control.disabled) return;
    if (this.multiselect()) {
      this.selectedOptionValue = this.selectedOptionValue.filter((option) => option !== value);
      this.selectedOptionsCache.delete(value);
      this.control.setValue(this.selectedOptionValue);
      this.onChange.emit(this.selectedOptionValue);
    }
    this.cdr.detectChanges();
    this.updatePosition();
  }

  getSelected(value: string): string {
    const option = this.options().find((option) => option.value === value);
    if (option) {
      return option.label;
    }
    const cachedOption = this.selectedOptionsCache.get(value);
    return cachedOption ? cachedOption.label : '';
  }

  getSelectedOption(value: string): { label: string; value: any } {
    const option = this.options().find((option) => option.value === value);
    if (option) {
      return option;
    }
    const cachedOption = this.selectedOptionsCache.get(value);
    return cachedOption || { label: '', value: '' };
  }

  override reset(): void {
    super.reset();
    this.selectedOptionValue = [];
    this.selectedOptionsCache.clear();
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

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
