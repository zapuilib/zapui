import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapFormFieldHelpTextDirective, ZapFormFieldIconDirective, ZapSelect } from 'zap/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ZapSelect,
    ZapFormFieldIconDirective,
    ZapFormFieldHelpTextDirective,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  countryControl = new FormControl({ value: '', disabled: false }, [Validators.required]);
  countries = [
    { label: 'US', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
    { label: 'Brazil', value: 'br' },
    { label: 'Colombia', value: 'co' },
    { label: 'Argentina', value: 'ar' },
    { label: 'Chile', value: 'cl' },
    { label: 'Uruguay', value: 'uy' },
    { label: 'Venezuela', value: 've' },
    { label: 'Peru', value: 'pe' },
    { label: 'Other', value: 'other' },
  ];
}
