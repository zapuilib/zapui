import { Component, ContentChild, Input, forwardRef } from '@angular/core';
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
  ZapLabelDirective,
} from '../public-api';

@Component({
  selector: 'zap-toggle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
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
export class ZapToggle<T> extends ControlValueAccessorDirective<T> {
  @Input() label: string = '';
  @Input() helpText: string = '';
  @Input() zapClass: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;

  handleToggle(): void {
    this.control.setValue(!this.control.value);
  }

  handleFocus(): void {
    this.control.markAsTouched();
  }

  ngAfterViewInit() {
    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-toggle-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize = 'var(--zap-toggle-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight = 'var(--zap-toggle-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight = 'var(--zap-toggle-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing = 'var(--zap-toggle-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color =
        'var(--zap-toggle-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize =
        'var(--zap-toggle-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight =
        'var(--zap-toggle-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight =
        'var(--zap-toggle-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-toggle-label-letter-spacing)';
    }
  }
}
