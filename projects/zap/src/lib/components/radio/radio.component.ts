import { AfterViewInit, Component, ContentChild, forwardRef, input, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../../directives';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';
import { ZapCustomErrorMessages } from '../validation-error/validation.interface';

@Component({
  selector: 'zap-radio',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    RequiredIndicatorComponent,
  ],
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
export class ZapRadio<T> extends ControlValueAccessorDirective<T> implements OnInit, AfterViewInit {
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  id = input.required<string>();
  options = input<{ name: string; value: string }[]>([]);
  label = input<string>();
  customErrorMessages = input<ZapCustomErrorMessages>({});
  zapClass = input<string>('');
  variant = input<'vertical' | 'horizontal'>('vertical');
  indicator = input<boolean>(true);

  override ngOnInit(): void {
    super.ngOnInit();
  }

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
    return [this.variant(), this.zapClass()].filter((cls) => cls && cls !== 'default');
  }
}
