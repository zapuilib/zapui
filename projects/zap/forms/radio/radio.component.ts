import { AfterViewInit, Component, ContentChild, forwardRef, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../public-api';

@Component({
  selector: 'zap-radio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapRadio),
      multi: true,
    },
  ],
})
export class ZapRadio<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {
  @Input() options: { name: string; value: string }[] = [];
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass = '';
  @Input() variant: 'vertical' | 'horizontal' = 'vertical';
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  ngAfterViewInit() {
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-radio-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-radio-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-radio-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-radio-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-radio-label-letter-spacing)';
    }
  }

  get classes(): string[] {
    return [this.variant, this.zapClass].filter((cls) => cls && cls !== 'default');
  }
}
