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
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../public-api';

@Component({
  selector: 'zap-checkbox',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorComponent],
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
  label = input<string>('');
  id = input.required<string>();
  customErrorMessages = input<Record<string, string>>({});
  zapClass = input<string>('');
  shape = input<'curve' | 'flat'>();
  size = input<'compact' | 'base'>();
  labelPosition = input<'left' | 'right'>('right');
  checked = model<boolean>(false);

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
    ];
  }

  handleCheckboxChange(event: Event) {
    if (this.control.disabled) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.control.setValue(checked);
    this.checked.set(checked);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.removeEventListener('click', this.handleLabelClick);
    }
  }
}
