import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapFormFieldIconDirective } from '../directives/icon.directive';
import { ZapFormFieldHelpTextDirective } from '../public-api';
import { ZapLabelDirective } from '../directives/label.directive';

type InputType = 'password' | 'text' | 'number' | 'email' | 'tel';

@Component({
  selector: 'zap-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
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
export class ZapInput<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {
  @Output() iconClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: InputType = 'text';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() size: 'compact' | 'base' = 'base';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() autoComplete: string = 'off';
  @Input() helpText: string = '';
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
 @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  ngAfterViewInit() {
    if (this.iconDirective) {      
      this.iconDirective.el.nativeElement.style.height = this.size === 'compact' ? '14px' : 'var(--zap-input-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize = this.size === 'compact' ? '14px' : 'var(--zap-input-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-input-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight = this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft = this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left = this.iconPosition === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right = this.iconPosition === 'right' ? '0.75rem' : 'auto';
    }

    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color = 'var(--zap-input-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize = 'var(--zap-input-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight = 'var(--zap-input-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight = 'var(--zap-input-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing = 'var(--zap-input-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-input-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-input-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-input-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-input-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing = 'var(--zap-input-label-letter-spacing)';
    }
  }

  handleIconClick(event: any): void {
    event.stopPropagation();
    this.iconClick.emit();
  }

  get classes(): string[] {
    return [
      this.shape,
      this.zapClass,
      this.size,
      this.icon || this.iconDirective ? this.iconPosition : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
