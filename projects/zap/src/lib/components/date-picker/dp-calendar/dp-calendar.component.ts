import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { DPCalendarSelect } from '../dp-calendar-select/dp-calendar-select.component';

@Component({
  selector: 'dp-calendar',
  imports: [CommonModule, DPCalendarSelect, A11yModule],
  templateUrl: './dp-calendar.component.html',
  styleUrl: './dp-calendar.component.scss',
})
export class DPCalendar implements OnInit {
  previousMonth = output<number>();
  nextMonth = output<number>();
  changeMonthAndYear = output<{
    month: string;
    year: number;
  }>();
  selectDate = output<{
    startDate: Date | null;
    endDate: Date | null;
  }>();
  id = input.required<string>();
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'compact' | 'base' | 'wide'>();
  weeks = input<Date[][]>();
  currentMonth = input.required<string>();
  currentYear = input.required<number>();
  currentDate = input.required<Date>();
  range = input<boolean>();
  monthsPerView = input.required<number>();
  maxPerRow = input.required<number>();
  selected = input<{ startDate: Date | null; endDate: Date | null }>();
  dropdown = input<boolean>(false);
  months = input.required<string[]>();
  years = input.required<string[]>();
  zapClass = input<string>();
  disableWeekends = input<boolean>(false);
  disableDates = input<Date[] | undefined>();
  disableRanges = input<{ startDate: Date; endDate: Date }[]>();
  disableInactive = input<boolean>(false);
  minDate = input<Date | undefined>();
  maxDate = input<Date | undefined>();
  daysOfWeek = input<string[]>();
  monthsAndYearRange: string[] = [];
  selectedMonthAndYearRange!: string;
  startDate: Date | null = null;
  endDate: Date | null = null;

  ngOnInit(): void {
    this.setDefaultValues();
    this.generateMonthsAndYearRange();
  }

  private setDefaultValues(): void {
    const selected = this.selected();
    if (selected && selected.startDate) {
      this.startDate = selected.startDate;
      this.endDate = selected.endDate;
    }
  }

  private generateMonthsAndYearRange(): void {
    if (!this.range() || this.monthsPerView() <= 1) return;
    const months = this.months();
    const years = this.years();

    for (const year of years) {
      for (let i = 0; i < months.length; i++) {
        const startMonth = months[i];
        const endMonthIndex = (i + this.monthsPerView() - 1) % months.length;
        const endMonth = months[endMonthIndex];
        const endYear =
          i + this.monthsPerView() - 1 >= months.length ? parseInt(year) + 1 : parseInt(year);

        this.monthsAndYearRange.push(`${startMonth} ${parseInt(year)} - ${endMonth} ${endYear}`);
      }
    }

    const currentMonth = this.currentMonth();
    const currentYear = this.currentYear();
    this.selectedMonthAndYearRange = `${currentMonth} ${currentYear} - ${
      months[(months.indexOf(currentMonth) + this.monthsPerView() - 1) % months.length]
    } ${currentYear}`;
  }

  getCalendarRows(): {
    month: string;
    year: number;
    monthIndex: number;
    weeks: Date[][];
    absoluteIndex: number;
  }[][] {
    const months = [];
    const currentYear = this.currentYear();
    const currentDateMonth = this.currentDate().getMonth();

    for (let i = 0; i < this.monthsPerView(); i++) {
      const date = new Date(currentYear, currentDateMonth + i, 1);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const weeks = this.generateWeeksForMonth(date);
      months.push({ month, year, monthIndex, weeks, absoluteIndex: i });
    }

    const rows = [];
    for (let i = 0; i < months.length; i += this.maxPerRow()) {
      rows.push(months.slice(i, i + this.maxPerRow()));
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
      prevMonthDay.setDate(firstDayOfMonth.getDate() - (firstDayOfMonth.getDay() - i));
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
          lastDayOfMonth.getDate() + (currentWeek.length - lastDayOfMonth.getDay()),
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
      dateString === this.startDate?.toDateString() || dateString === this.endDate?.toDateString()
    );
  }

  isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    if (this.startDate.toDateString() === this.endDate.toDateString()) return false;
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

  handleSelectDate(date: Date): void {
    if (this.isDisabled(date)) return;
    if (!this.range()) {
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
    this.previousMonth.emit(this.monthsPerView());
    if (!this.range() || this.monthsPerView() <= 1) return;
    const currentIndex = this.monthsAndYearRange.indexOf(this.selectedMonthAndYearRange);
    if (currentIndex > 0) {
      this.selectedMonthAndYearRange = this.monthsAndYearRange[currentIndex - 1];

      const [start] = this.selectedMonthAndYearRange.split(' - ');
      const startMonth = start.split(' ')[0];
      const startYear = parseInt(start.split(' ')[1]);

      this.changeMonthAndYear.emit({
        month: startMonth,
        year: startYear,
      });
    }
  }

  goToNextMonth(): void {
    this.nextMonth.emit(this.monthsPerView());
    if (!this.range() || this.monthsPerView() <= 1) return;

    const currentIndex = this.monthsAndYearRange.indexOf(this.selectedMonthAndYearRange);
    if (currentIndex < this.monthsAndYearRange.length - 1) {
      this.selectedMonthAndYearRange = this.monthsAndYearRange[currentIndex + 1];

      const [start] = this.selectedMonthAndYearRange.split(' - ');
      const startMonth = start.split(' ')[0];
      const startYear = parseInt(start.split(' ')[1]);

      this.changeMonthAndYear.emit({
        month: startMonth,
        year: startYear,
      });
    }
  }

  handleMonthSelect(selected: string): void {
    this.changeMonthAndYear.emit({
      month: selected,
      year: this.currentYear(),
    });
  }

  handleYearSelect(selected: string): void {
    this.changeMonthAndYear.emit({
      month: this.currentMonth(),
      year: parseInt(selected),
    });
  }

  handleMonthAndYearRangeSelect(selected: string): void {
    const [start] = selected.split(' - ');
    const startMonth = start.split(' ')[0];
    const startYear = parseInt(start.split(' ')[1]);
    this.changeMonthAndYear.emit({
      month: startMonth,
      year: startYear,
    });
  }

  isDisabled(day: Date): boolean {
    const minDate = this.minDate();
    if (minDate && day < minDate) {
      return true;
    }

    const maxDate = this.maxDate();
    if (maxDate && day > maxDate) {
      return true;
    }

    if (
      this.disableInactive() &&
      !this.isCurrentMonth(day, this.currentDate().getMonth(), this.currentDate().getFullYear())
    ) {
      return true;
    }

    if (this.disableWeekends() && (day.getDay() === 0 || day.getDay() === 6)) {
      return true;
    }

    const disableDates = this.disableDates();
    if (
      disableDates &&
      disableDates.length > 0 &&
      disableDates.some((date) => date.toDateString() === day.toDateString())
    ) {
      return true;
    }

    const disableRanges = this.disableRanges();
    if (disableRanges && disableRanges.length > 0) {
      return disableRanges.some((range) => {
        return (
          (day >= range.startDate && day <= range.endDate) ||
          day.toDateString() === range.startDate.toDateString()
        );
      });
    }

    return false;
  }

  isRangeBefore(date: Date): boolean {
    return (
      this.startDate !== null &&
      this.endDate !== null &&
      date.toDateString() === this.endDate.toDateString()
    );
  }

  isRangeAfter(date: Date): boolean {
    return (
      this.startDate !== null &&
      this.endDate !== null &&
      date.toDateString() === this.startDate.toDateString()
    );
  }

  get classes(): string[] {
    return [this.shape() ?? '', this.size() ?? '', this.zapClass() ?? ''].filter(
      (cls) => cls && cls !== 'default',
    );
  }
}
