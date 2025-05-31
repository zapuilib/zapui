import {
  AfterViewInit,
  Component,
  ContentChild,
  forwardRef,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import {
  CustomErrorMessages,
  ValidationErrorComponent,
} from '../validation-error/validation-error.component';
import { ZapFormFieldIconDirective } from '../directives/icon.directive';
import { ZapFormFieldHelpTextDirective } from '../directives/help-text.directive';
import { ZapLabelDirective } from '../directives/label.directive';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';

type InputType = 'password' | 'text' | 'number' | 'email' | 'tel';

@Component({
  selector: 'zap-input',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    RequiredIndicatorComponent,
  ],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapInput),
      multi: true,
    },
  ],
})
export class ZapInput<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit, OnDestroy, AfterViewInit
{
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  iconClick = output<void>();
  id = input.required<string>();
  type = input<InputType>('text');
  label = input<string>('');
  placeholder = input<string>('');
  customErrorMessages = input<CustomErrorMessages>({});
  zapClass = input<string>('');
  size = input<'compact' | 'base'>();
  shape = input<'pill' | 'curve' | 'flat'>();
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('left');
  autoComplete = input<string>('off');
  helpText = input<string>('');
  indicator = input<boolean>(true);
  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size() === 'compact' ? '14px' : 'var(--zap-input-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size() === 'compact' ? '14px' : 'var(--zap-input-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-input-icon-color)';
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
        this.iconPosition() === 'right' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.addEventListener('click', (event: Event) => {
        this.handleIconClick(event);
      });
    }

    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-input-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize =
        'var(--zap-input-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight =
        'var(--zap-input-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight =
        'var(--zap-input-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-input-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-input-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-input-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-input-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-input-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-input-label-letter-spacing)';
    }
  }

  handleIconClick(event: Event): void {
    event.stopPropagation();
    this.iconClick.emit();
  }

  get classes(): string[] {
    return [
      this.shape() ?? '',
      this.zapClass() ?? '',
      this.size() ?? '',
      this.icon() || this.iconDirective ? this.iconPosition() : '',
    ].filter((cls) => cls && cls !== 'default');
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.removeEventListener('click', (event: Event) => {
        this.handleIconClick(event);
      });
    }
  }
}
