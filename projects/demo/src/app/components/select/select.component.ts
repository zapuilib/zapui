import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapFormFieldHelpTextDirective, ZapFormFieldIconDirective, ZapSelect } from 'zap/forms';

@Component({
  selector: 'app-select',
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
  countryControl2 = new FormControl();
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
  updateCountries(query: string) {
    const countries = [
      { label: 'Australia', value: 'au' },
      { label: 'New Zealand', value: 'nz' },
      { label: 'Fiji', value: 'fj' },
      { label: 'Papua New Guinea', value: 'pg' },
      { label: 'Samoa', value: 'ws' },
      { label: 'Tonga', value: 'to' },
      { label: 'Solomon Islands', value: 'sb' },
      { label: 'Vanuatu', value: 'vu' },
      { label: 'Kiribati', value: 'ki' },
      { label: 'Tuvalu', value: 'tv' },
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

    setTimeout(() => {
      if (query === '') {
        this.countries = countries;
      } else {
        this.countries = countries.filter((country) =>
          country.label.toLowerCase().includes(query.toLowerCase()),
        );
      }
    }, 100);
    if (this.countries.length === 0) {
      this.countries = [{ label: 'No results found', value: '' }];
    }
  }
}
