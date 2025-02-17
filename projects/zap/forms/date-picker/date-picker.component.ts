import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { DPCalendar } from './dp-calendar/dp-calendar.component';
import { ZapDatePickerBreakpoints } from './interface/date-picker.interface';

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
  @ViewChild('inputDateSelectValueHolder')
  inputDateSelectValueHolder!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = 'Select';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zapClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' | 'wide' = 'wide';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() helpText: string = '';
  @Input() breakpoints!: ZapDatePickerBreakpoints;
  @Input() monthsPerView!: number;
  @Input() maxPerRow!: number;
  @Input() rangeSelection: boolean = true;
  isCalendarOpen: boolean = false;
  weeks!: Date[][];
  currentDate!: Date;
  currentMonth!: string;
  currentYear!: number;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const inputElement = this.inputDateSelectValueHolder.nativeElement;
    if (
      this.calendar &&
      !this.calendar.nativeElement?.contains(clickedElement) &&
      !inputElement.contains(clickedElement)
    ) {
      this.toggleCalendar();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    if (this.isCalendarOpen) {
      this.toggleCalendar();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.handleBreakpoints();
    this.handleCalendarPosition();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDefaultsCalendarView();
    this.setCurrentDate();
    this.updateCalendar();
  }

  private setCurrentDate(): void {
    this.currentDate = new Date();
  }

  private updateCalendar(): void {
    this.weeks = this.generateCalendar(this.currentDate);
    this.currentMonth = this.currentDate.toLocaleString('default', {
      month: 'long',
    });
    this.currentYear = this.currentDate.getFullYear();
  }

  private generateCalendar(date: Date): Date[][] {
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

  private setDefaultsCalendarView(): void {
    this.breakpoints = {
      default: {
        monthsPerView: this.monthsPerView ? this.monthsPerView : this.rangeSelection ? 2 : 1,
        maxPerRow: this.maxPerRow ? this.maxPerRow : this.rangeSelection ? 2 : 1,
      },
      '1024': {
        monthsPerView: 1,
        maxPerRow: 1,
      },
    };
  }

  //TODO: Test this function by passing custom
  private handleBreakpoints(): void {
    if (!this.breakpoints) return;
    const width = window.innerWidth;
    let matchedBreakpoint = this.breakpoints.default;

    for (const breakpoint in this.breakpoints) {
      if (width <= parseInt(breakpoint)) {
        matchedBreakpoint = this.breakpoints[breakpoint];
      }
    }
    this.monthsPerView = matchedBreakpoint?.monthsPerView ?? 1;
    this.maxPerRow = matchedBreakpoint?.maxPerRow ?? 1;
  }

  //TODO: manage size wide
  private handleCalendarPosition(): void {
    this.handleBreakpoints();
    if (this.calendar && typeof window !== 'undefined') {
      const calendarElement = this.calendar.nativeElement;
      const inputElement = this.inputDateSelectValueHolder.nativeElement;
      const inputRect = inputElement.getBoundingClientRect();
      const calendarRect = calendarElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      const scrollY = window.scrollY;

      const inputAbsoluteTop = inputRect.top + scrollY;
      const inputAbsoluteLeft = inputRect.left;

      calendarElement.style.position = 'absolute';
      calendarElement.style.left = `${inputAbsoluteLeft}px`;

      const dynamicHeight = calendarRect.height;

      if (this.position === 'auto') {
        if (spaceBelow < dynamicHeight && spaceAbove > dynamicHeight) {
          calendarElement.style.top = `${
            inputAbsoluteTop - dynamicHeight - 5
          }px`;
          calendarElement.style.bottom = 'auto';
        } else {
          calendarElement.style.top = `${
            inputAbsoluteTop + inputRect.height
          }px`;
          calendarElement.style.bottom = 'auto';
        }
      } else if (this.position === 'top') {
        calendarElement.style.top = `${inputAbsoluteTop - dynamicHeight - 5}px`;
        calendarElement.style.bottom = 'auto';
      } else {
        calendarElement.style.top = `${inputAbsoluteTop + inputRect.height}px`;
        calendarElement.style.bottom = 'auto';
      }
    }
  }

  onPreviousMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - offset,
      1
    );
    this.updateCalendar();
  }

  onNextMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.updateCalendar();
  }

  isCurrentMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() === month && date.getFullYear() === year;
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
    this.cdr.detectChanges();
    if (this.isCalendarOpen) {
      this.handleCalendarPosition();
    }
  }
}
