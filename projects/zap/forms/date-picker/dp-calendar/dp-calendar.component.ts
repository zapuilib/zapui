import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DPCalendarSelect } from '../dp-calendar-select/dp-calendar-select.component';

@Component({
  selector: 'dp-calendar',
  standalone: true,
  imports: [CommonModule, DPCalendarSelect],
  templateUrl: './dp-calendar.component.html',
  styleUrl: './dp-calendar.component.scss',
})
export class DPCalendar implements OnInit {
  @Output() previousMonth = new EventEmitter<number>();
  @Output() nextMonth = new EventEmitter<number>();
  @Output() changeMonthAndYear = new EventEmitter<{
    month: string;
    year: number;
  }>();
  @Output() selectDate = new EventEmitter<{
    startDate: Date | null;
    endDate: Date | null;
  }>();
  @Input() size: 'compact' | 'base' | 'wide' = 'base';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() weeks!: Date[][];
  @Input() currentMonth!: string;
  @Input() currentYear!: number;
  @Input() currentDate!: Date;
  @Input() range!: boolean;
  @Input() monthsPerView!: number;
  @Input() maxPerRow!: number;
  @Input() selected!: { startDate: Date | null; endDate: Date | null };
  @Input() dropdown: boolean = false;
  @Input() months!: string[];
  @Input() years!: string[];
  monthsAndYearRange: string[] = [];
  selectedMonthAndYearRange!: string;
  startDate: Date | null = null;
  endDate: Date | null = null;
  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  ngOnInit(): void {
    this.setDefaultValues();
    this.generateMonthsAndYearRange();
  }

  private setDefaultValues(): void {
    if (this.selected && this.selected.startDate) {
      this.startDate = this.selected.startDate;
      this.endDate = this.selected.endDate;
    }
  }

  private generateMonthsAndYearRange(): void {
    if (!this.range || this.monthsPerView <= 1) return;
    for (let year of this.years) {
      for (let i = 0; i < this.months.length; i++) {
        const startMonth = this.months[i];
        const endMonthIndex = (i + this.monthsPerView - 1) % this.months.length;
        const endMonth = this.months[endMonthIndex];
        const endYear = (i + this.monthsPerView - 1) >= this.months.length ? parseInt(year) + 1 : parseInt(year);

        this.monthsAndYearRange.push(`${startMonth} ${parseInt(year)} - ${endMonth} ${endYear}`);
      }
    }

    this.selectedMonthAndYearRange = `${this.currentMonth} ${this.currentYear} - ${this.months[
      (this.months.indexOf(this.currentMonth) + this.monthsPerView - 1) %
        this.months.length
    ]} ${this.currentYear}`;
  }

  getCalendarRows(): {
    month: string;
    year: number;
    monthIndex: number;
    weeks: Date[][];
    absoluteIndex: number;
  }[][] {
    const months = [];
    for (let i = 0; i < this.monthsPerView; i++) {
      const date = new Date(
        this.currentYear,
        this.currentDate.getMonth() + i,
        1
      );
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const weeks = this.generateWeeksForMonth(date);
      months.push({ month, year, monthIndex, weeks, absoluteIndex: i });
    }

    const rows = [];
    for (let i = 0; i < months.length; i += this.maxPerRow) {
      rows.push(months.slice(i, i + this.maxPerRow));
    }

    return rows;
  }

  generateWeeksForMonth(date: Date): Date[][] {
    const weeks: Date[][] = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let currentWeek: Date[] = [];

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const prevMonthDay = new Date(firstDayOfMonth);
      prevMonthDay.setDate(
        firstDayOfMonth.getDate() - (firstDayOfMonth.getDay() - i)
      );
      currentWeek.push(prevMonthDay);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      currentWeek.push(currentDay);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        const nextMonthDay = new Date(lastDayOfMonth);
        nextMonthDay.setDate(
          lastDayOfMonth.getDate() +
            (currentWeek.length - lastDayOfMonth.getDay())
        );
        currentWeek.push(nextMonthDay);
      }
      weeks.push(currentWeek);
    }

    while (weeks.length < 6) {
      const lastDay = weeks[weeks.length - 1][6];
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
    return (
      dateString === this.startDate?.toDateString() ||
      dateString === this.endDate?.toDateString()
    );
  }

  isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    if (this.startDate.toDateString() === this.endDate.toDateString())
      return false;
    return date >= this.startDate && date <= this.endDate;
  }

  isOnlyRangeInThisWeek(day: Date, week: Date[]): boolean {
    if (!this.startDate || !this.endDate) return false;
    const weekStart = week[0];
    return (
      day.toDateString() === weekStart.toDateString() &&
      weekStart.toDateString() === this.endDate.toDateString()
    );
  }

  select(date: Date): void {
    if (!this.range) {
      this.startDate = date;
      this.endDate = date;
      this.selectDate.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
      return;
    }

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (date > this.startDate) {
      this.endDate = date;
      this.selectDate.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    } else {
      this.endDate = this.startDate;
      this.startDate = date;
      this.selectDate.emit({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    }
  }

  goToPreviousMonth(): void {
    this.previousMonth.emit(this.monthsPerView);
    if (!this.range || this.monthsPerView <= 1) return;
    const currentIndex = this.monthsAndYearRange.indexOf(this.selectedMonthAndYearRange);
    if (currentIndex > 0) {
      this.selectedMonthAndYearRange = this.monthsAndYearRange[currentIndex - 1];
  
      const [start, end] = this.selectedMonthAndYearRange.split(' - ');
      const startMonth = start.split(' ')[0];
      const startYear = parseInt(start.split(' ')[1]);
  
      this.currentMonth = startMonth;
      this.currentYear = startYear;
  
      this.changeMonthAndYear.emit({
        month: this.currentMonth,
        year: this.currentYear,
      });
    }
  }

  goToNextMonth(): void {
    this.nextMonth.emit(this.monthsPerView);
    if (!this.range || this.monthsPerView <= 1) return;

    const currentIndex = this.monthsAndYearRange.indexOf(this.selectedMonthAndYearRange);
    if (currentIndex < this.monthsAndYearRange.length - 1) {
      this.selectedMonthAndYearRange = this.monthsAndYearRange[currentIndex + 1];
  
      const [start, end] = this.selectedMonthAndYearRange.split(' - ');
      const startMonth = start.split(' ')[0];
      const startYear = parseInt(start.split(' ')[1]);
  
      this.currentMonth = startMonth;
      this.currentYear = startYear;
  
      this.changeMonthAndYear.emit({
        month: this.currentMonth,
        year: this.currentYear,
      });
    }
  }

  handleMonthSelect(selected: any): void {
    this.currentMonth = selected;
    this.changeMonthAndYear.emit({
      month: this.currentMonth,
      year: this.currentYear,
    });
  }

  handleYearSelect(selected: any): void {
    this.currentYear = parseInt(selected);
    this.changeMonthAndYear.emit({
      month: this.currentMonth,
      year: this.currentYear,
    });
  }

  handleMonthAndYearRangeSelect(selected: any): void {
    const [start, end] = selected.split(' - ');
    const startMonth = start.split(' ')[0];
    const startYear = parseInt(start.split(' ')[1]);
    this.currentMonth = startMonth;
    this.currentYear = startYear;
    this.changeMonthAndYear.emit({
      month: this.currentMonth,
      year: this.currentYear,
    });
  }

  get classes(): string[] {
    return [this.shape, this.size];
  }
}
