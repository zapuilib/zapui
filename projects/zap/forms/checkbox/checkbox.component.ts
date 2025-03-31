import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../public-api';

@Component({
  selector: 'zap-checkbox',
  standalone: true,
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
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass = '';
  @Input() id!: string;
  @Input() shape!: 'curve' | 'flat';
  @Input() size!: 'compact' | 'base';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() checked = false;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDefaultValue();
    if (!this.id) {
      console.warn(
        '[ZapCheckbox] No id provided. This may cause accessibility issues. Please provide a unique id for the checkbox.',
      );
    }
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
    if (this.checked) {
      this.control.setValue(this.checked);
    }
  }

  private handleLabelClick = () => {
    if (this.control.disabled) return;
    this.checkbox.nativeElement.click();
  };

  get classes(): string[] {
    return [this.shape, this.size, this.labelPosition, this.zapClass].filter(
      (cls) => cls && cls !== 'default',
    );
  }

  handleCheckboxChange(event: Event) {
    if (this.control.disabled) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.removeEventListener('click', this.handleLabelClick);
    }
  }
}
