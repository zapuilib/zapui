import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { DPCalendar } from './dp-calendar/dp-calendar.component';

@Component({
  selector: 'zap-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    DPCalendar,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class ZapDatePicker<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit
{
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = 'Select';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' | 'wide' = 'base';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() helpText: string = '';
  isCalendarOpen: boolean = false;
  weeks!: Date[][];
  currentDate!: Date;
  currentMonth!: string;
  currentYear!: number;

  override ngOnInit(): void {
    super.ngOnInit();
    this.setCurrentDate();
    this.updateCalendar();
  }

  private setCurrentDate(): void {
    this.currentDate = new Date();
  }

  updateCalendar(): void {
    this.weeks = this.generateCalendar(this.currentDate);
    this.currentMonth = this.currentDate.toLocaleString('default', {
      month: 'long',
    });
    this.currentYear = this.currentDate.getFullYear();
  }

  generateCalendar(date: Date): Date[][] {
    const weeks: Date[][] = [];
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startDay = startOfMonth.getDay();

    let day = 1 - startDay;
    for (let i = 0; i < 6; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        week.push(new Date(date.getFullYear(), date.getMonth(), day));
        day++;
      }
      weeks.push(week);
    }
    return weeks;
  }

  onPreviousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.updateCalendar();
  }

  onNextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.updateCalendar();
  }

  isCurrentMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() === month && date.getFullYear() === year;
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
  }
}
