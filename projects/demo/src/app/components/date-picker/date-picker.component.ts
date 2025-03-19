import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZapDatePicker, ZapDatePickerBreakpoints } from 'zap/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ZapDatePicker],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  datePickerControl = new FormControl(
    {
      value: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      disabled: false,
    },
    [],
  );
  datePickerControl2 = new FormControl(
    {
      value: '',
      disabled: false,
    },
    [],
  );
  datePickerControl3 = new FormControl(
    {
      value: '',
      disabled: false,
    },
    [],
  );
  datePickerControl4 = new FormControl(
    {
      value: '',
      disabled: false,
    },
    [],
  );
  breakpoints: ZapDatePickerBreakpoints = {
    default: {
      maxPerRow: 1,
      monthsPerView: 1,
    },
  };
  breakpoints2: ZapDatePickerBreakpoints = {
    default: {
      maxPerRow: 2,
      monthsPerView: 2,
    },
    lg: {
      maxPerRow: 1,
      monthsPerView: 1,
    },
  };
  disableDates: Date[] = (() => {
    const dates: Date[] = [];
    const today = new Date();
    const lastWeek = new Date(today.setDate(today.getDate() - 7));
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(lastWeek.setDate(lastWeek.getDate() + 1)));
    }
    return dates;
  })();
  disableRanges: { startDate: Date; endDate: Date }[] = [
    {
      startDate: new Date('2025-04-08'),
      endDate: new Date('2025-04-16'),
    },
    {
      startDate: new Date('2025-05-26'),
      endDate: new Date('2025-05-26'),
    },
  ];
  minDate = new Date('2025-02-02');
  maxDate = new Date('2025-05-31');
  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  reset() {
    this.datePickerControl.reset();
    this.datePickerControl2.reset();
    this.datePickerControl3.reset();
    this.datePickerControl4.reset();
  }

  onChange(event: any) {
    console.log(event);
  }
}
