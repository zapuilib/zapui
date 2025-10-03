import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  OnDestroy,
  ViewChild,
  OnInit,
  input,
  model,
  effect,
  ChangeDetectorRef,
  Injector,
  Inject,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../public-api';
import { ZapFormFieldIconDirective } from '../directives/icon.directive';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';

@Component({
  selector: 'zap-checkbox',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    RequiredIndicatorComponent,
  ],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapCheckbox),
      multi: true,
    },
  ],
})
export class ZapCheckbox<T>
  extends ControlValueAccessorDirective<T>
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild('checkbox') checkbox!: ElementRef;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  label = input<string>('');
  id = input.required<string>();
  customErrorMessages = input<Record<string, string>>({});
  zapClass = input<string>('');
  shape = input<'curve' | 'flat'>();
  size = input<'compact' | 'base'>();
  labelPosition = input<'left' | 'right'>('right');
  checked = model<boolean>(false);
  indicator = input<boolean>(true);
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('left');

  constructor(@Inject(Injector) injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
    effect(() => {
      this.control.setValue(this.checked());
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDefaultValue();
  }

  ngAfterViewInit() {
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-checkbox-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-checkbox-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight =
        'var(--zap-checkbox-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight =
        'var(--zap-checkbox-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-checkbox-label-letter-spacing)';
      this.labelDirective.el.nativeElement.style.cursor = this.control.disabled
        ? 'not-allowed'
        : 'pointer';
      this.labelDirective.el.nativeElement.addEventListener('click', this.handleLabelClick);
    }

    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size() === 'compact' ? '14px' : 'var(--zap-checkbox-height)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-checkbox-text-checked-color)';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.left = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translate(-50%, -50%)';
      this.iconDirective.el.nativeElement.style.pointerEvents = 'none';
      this.iconDirective.el.nativeElement.style.display = this.control.value ? 'flex' : 'none';
      this.iconDirective.el.nativeElement.style.justifyContent = 'center';
      this.iconDirective.el.nativeElement.style.alignItems = 'center';
    }
  }

  private setDefaultValue() {
    this.control.setValue(this.checked());
  }

  private handleLabelClick = () => {
    if (this.control.disabled) return;
    this.checkbox.nativeElement.click();
  };

  get classes(): string[] {
    return [
      this.shape() ?? '',
      this.size() ?? '',
      this.labelPosition() ?? '',
      this.zapClass() ?? '',
      this.icon() || this.iconDirective ? 'has-icon' : '',
    ].filter((cls) => cls && cls !== 'default');
  }

  handleCheckboxChange(event: Event) {
    if (this.control.disabled) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.control.setValue(checked);
    this.checked.set(checked);

    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.display = checked ? 'flex' : 'none';
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.removeEventListener('click', this.handleLabelClick);
    }
  }
}
