import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { ZapLabelDirective } from '../public-api';

@Component({
  selector: 'zap-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
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
export class ZapCheckbox<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Input() label: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() id: string = '';
  @Input() shape: 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' = 'base';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() checked: boolean = false; // Remov ethis because this should come from control and check other places
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  override ngOnInit(): void {
    super.ngOnInit();
    this.handleDefultValue();
  }

  ngAfterViewInit() {
    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-checkbox-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-checkbox-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-checkbox-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-checkbox-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing = 'var(--zap-checkbox-label-letter-spacing)';
    }
  }

  handleDefultValue(): void {
    this.control.setValue(this.checked);
  }

  get classes(): string[] {
    return [this.shape, this.size, this.labelPosition, this.zapClass].filter(
      (cls) => cls && cls !== 'default'
    );
  }
}
