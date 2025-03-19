import { ChangeDetectorRef, Directive, Inject, Injector, OnInit, OnDestroy } from '@angular/core';
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
export class ControlValueAccessorDirective<T> implements OnInit, ControlValueAccessor, OnDestroy {
  control!: FormControl;
  isRequired = false;

  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;
  protected globalConfig: { shape: string } = {
    shape: '',
  };

  constructor(
    @Inject(Injector) private injector: Injector,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);
      const ngModel = formControl as NgModel;
      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        case NgModel:
          this.control = ngModel.control;
          ngModel.valueChanges
            ?.pipe(
              takeUntil(this._destroy$),
              distinctUntilChanged(),
              tap((val) => {
                this.writeValue(val);
              }),
            )
            .subscribe();
          break;
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
      }
    } catch {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
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
          fn(val);
          this.control?.updateValueAndValidity();
          this.onValueChange(val);
        }),
      )
      .subscribe();
  }

  onValueChange(value: T) {
    if (value === null || value === undefined || value === '') {
      this.reset();
    }
  }

  reset(): void {
    this.control.reset();
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
