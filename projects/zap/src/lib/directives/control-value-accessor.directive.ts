import { Directive, Inject, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';

import { NGX_ZAP_CONFIG } from '../tokens/zap.tokens';
import { ZapConfig } from '../interfaces/config.interface';
import { ColorUtility } from '../utilities/color.utility';

@Directive({
  selector: '[libControlValueAccessor]',
})
export class ControlValueAccessorDirective<T>
  implements OnInit, ControlValueAccessor
{
  control!: FormControl;
  isRequired: boolean = false;
  colors: any = [];

  private _isDisabled: boolean = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(NGX_ZAP_CONFIG) public config: ZapConfig,
    public colorUtility: ColorUtility
  ) {}

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
    this.setStyle();
  }

  setStyle() {
    const placeholderColor = this.colorUtility.hexToRgba(
      this.config.colors.quaternary,
      0.5
    );
    const focusColor = this.config.colors.tertiary;
    document.documentElement.style.setProperty(
      '--placeholder-color',
      placeholderColor
    );
    document.documentElement.style.setProperty('--focus-color', focusColor);
    document.documentElement.style.setProperty(
      '--before-checked-color',
      this.config.colors.tertiary
    );
    document.documentElement.style.setProperty(
      '--after-checked-color',
      this.config.colors.primary
    );
  }

  getFieldStyle() {
    return {
      color: this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
    };
  }

  getStyle() {
    return {
      color: this.config.colors.secondary,
    };
  }

  getErrorColor() {
    return this.config.colors.error;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);
      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (error) {
      this.control = new FormControl();
    }
  }

  writeValue(value: any): void {
    if (this.control) {
      if (this.control.value !== value) {
        this.control.setValue(value, { emitEvent: false });
      }
    } else {
      this.control = new FormControl(value);
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => {
          fn(val), this.control?.updateValueAndValidity();
        })
      )
      .subscribe();
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
