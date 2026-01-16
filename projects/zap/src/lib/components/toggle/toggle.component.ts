import { Component, ContentChild, forwardRef, AfterViewInit, OnInit, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapHelpTextDirective, ZapLabelDirective } from '../../directives';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';
import { customErrorMessages } from '../validation-error/validation.interface';

@Component({
  selector: 'zap-toggle',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    RequiredIndicatorComponent,
  ],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapToggle),
      multi: true,
    },
  ],
})
export class ZapToggle<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit, AfterViewInit
{
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  @ContentChild(ZapHelpTextDirective, { static: false })
  helpTextDirective!: ZapHelpTextDirective;
  id = input.required<string>();
  label = input<string>();
  helpText = input<string>();
  zapClass = input<string>();
  customErrorMessages = input<customErrorMessages>({});
  indicator = input<boolean>(true);
  checked = input<boolean>(false);

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.control.value === null || this.control.value === undefined) {
      this.control.setValue(this.checked());
    }
  }

  handleToggle(): void {
    this.control.setValue(!this.control.value);
  }

  handleFocus(): void {
    this.control.markAsTouched();
  }

  ngAfterViewInit() {
    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-toggle-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize =
        'var(--zap-toggle-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight =
        'var(--zap-toggle-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight =
        'var(--zap-toggle-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-toggle-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-toggle-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-toggle-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-toggle-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-toggle-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-toggle-label-letter-spacing)';
    }
  }
}
