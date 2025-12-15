import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ZapButton, ZapInput } from 'zap';

@Component({
  selector: 'example-login',
  imports: [FormsModule, ReactiveFormsModule, ZapButton, ZapInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class ExampleLoginComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
