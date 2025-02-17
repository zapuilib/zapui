import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dp-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dp-calendar.component.html',
  styleUrl: './dp-calendar.component.scss'
})
export class DPCalendar {
  @Output() previousMonth = new EventEmitter<void>();
  @Output() nextMonth = new EventEmitter<void>();
  @Output() selectDate = new EventEmitter<{ startDate: Date | null, endDate: Date | null }>();
  @Input() size: 'compact' | 'base' | 'wide' = 'base';
  @Input() weeks!: Date[][];
  @Input() currentMonth!: string;
  @Input() currentYear!: number;
  @Input() currentDate!: Date;
  @Input() rangeSelection: boolean = true;
  @Input() monthsPerView: number = 1;

  startDate: Date | null = null;
  endDate: Date | null = null;

  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  getCalendarMonths(): { month: string, year: number, monthIndex: number, weeks: Date[][] }[] {
    const months = [];
    for (let i = 0; i < this.monthsPerView; i++) {
      const date = new Date(this.currentYear, this.currentDate.getMonth() + i, 1);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const weeks = this.generateWeeksForMonth(date);
      months.push({ month, year, monthIndex, weeks });
    }
    return months;
  }

  generateWeeksForMonth(date: Date): Date[][] {
    const weeks: Date[][] = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let currentWeek: Date[] = [];
  
    // Fill the first week with days from the previous month if necessary
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const prevMonthDay = new Date(firstDayOfMonth);
      prevMonthDay.setDate(firstDayOfMonth.getDate() - (firstDayOfMonth.getDay() - i));
      currentWeek.push(prevMonthDay);
    }
  
    // Fill the rest of the weeks
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      currentWeek.push(currentDay);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
  
    // Fill the last week with days from the next month if necessary
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        const nextMonthDay = new Date(lastDayOfMonth);
        nextMonthDay.setDate(lastDayOfMonth.getDate() + (currentWeek.length - lastDayOfMonth.getDay()));
        currentWeek.push(nextMonthDay);
      }
      weeks.push(currentWeek);
    }
    
    // Ensure there are always 6 weeks
    while (weeks.length < 6) {
      const lastDay = weeks[weeks.length - 1][6]; // Get the last day of the last week
      const nextWeek: Date[] = [];
      for (let i = 1; i <= 7; i++) {
        const nextDay = new Date(lastDay);
        nextDay.setDate(lastDay.getDate() + i);
        nextWeek.push(nextDay);
      }
      weeks.push(nextWeek);
    }
  
    return weeks;
  }

  isCurrentMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() === month && date.getFullYear() === year;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelected(date: Date): boolean {
    if (!this.startDate && !this.endDate) return false;
    const dateString = date.toDateString();
    return dateString === this.startDate?.toDateString() || dateString === this.endDate?.toDateString();
  }

  isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    return date >= this.startDate && date <= this.endDate;
  }

  select(date: Date): void {
    if (!this.rangeSelection) {
      this.startDate = date;
      this.endDate = date;
      this.selectDate.emit({ startDate: this.startDate, endDate: this.endDate });
      return;
    }

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (date > this.startDate) {
      this.endDate = date;
      this.selectDate.emit({ startDate: this.startDate, endDate: this.endDate });
    } else {
      this.endDate = this.startDate;
      this.startDate = date;
      this.selectDate.emit({ startDate: this.startDate, endDate: this.endDate });
    }
  }
}