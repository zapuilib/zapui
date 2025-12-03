import { AfterViewInit, Component, ContentChild, forwardRef, input, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapHelpTextDirective, ZapLabelDirective } from '../../directives';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';

@Component({
  selector: 'zap-textarea',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    RequiredIndicatorComponent,
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapTextarea),
      multi: true,
    },
  ],
})
export class ZapTextarea<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit, AfterViewInit
{
  @ContentChild(ZapHelpTextDirective, { static: false })
  helpTextDirective!: ZapHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  label = input<string>('');
  id = input.required<string>();
  rows = input<string>('');
  zapClass = input<string>('');
  shape = input<'curve' | 'flat' | 'pill'>();
  customErrorMessages = input<Record<string, string>>({});
  placeholder = input<string>('');
  resize = input<'none' | 'vertical' | 'horizontal' | 'auto'>('none');
  helpText = input<string>('');
  indicator = input<boolean>(true);

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-textarea-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize =
        'var(--zap-textarea-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight =
        'var(--zap-textarea-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight =
        'var(--zap-textarea-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-textarea-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-textarea-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-textarea-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight =
        'var(--zap-textarea-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight =
        'var(--zap-textarea-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-textarea-label-letter-spacing)';
    }
  }

  adjustRows(event: Event) {
    if (this.resize() === 'auto') {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.rows = parseInt(this.rows());
      const newRows = Math.ceil(textarea.scrollHeight / 24) - 1;
      textarea.rows = newRows > 10 ? 10 : newRows;
    }
  }

  get classes(): string[] {
    return [this.shape() ?? '', this.zapClass()].filter((cls) => cls && cls !== 'default');
  }
}
