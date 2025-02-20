import { ChangeDetectorRef, Directive, Inject, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
  NgModel,
} from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';

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
  protected globalConfig: { shape: string } = {
    shape: '',
  };

  constructor(@Inject(Injector) private injector: Injector, protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
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
        case NgModel:
          const ngModel = formControl as NgModel;
          this.control = ngModel.control;
          ngModel.valueChanges?.pipe(
            takeUntil(this._destroy$),
            distinctUntilChanged(),
            tap((val) => {
              this.writeValue(val);
            })
          ).subscribe();
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

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
  
  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}