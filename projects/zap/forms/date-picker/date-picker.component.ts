import {
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { DPCalendar } from './dp-calendar/dp-calendar.component';
import { ZapDatePickerBreakpoints } from './interface/date-picker.interface';
import { formatDate } from './utils';
import {
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapLabelDirective,
} from '../public-api';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZapDatePicker),
      multi: true,
    },
  ],
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
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' | 'wide' = 'wide';
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() icon!: string; //TODO
  @Input() iconPosition: 'left' | 'right' = 'left'; //TODO
  @Input() helpText: string = ''; //TODO
  @Input() breakpoints!: ZapDatePickerBreakpoints; //TODO
  @Input() zapClass: string = ''; //TODO
  @Input() monthsPerView!: number;
  @Input() maxPerRow!: number;
  @Input() range: boolean = false;
  @Input() dateFormat: string = 'MMM dd, yyyy';
  @Input() locale: string = 'en-US';

  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  isCalendarOpen: boolean = false;
  weeks!: Date[][];
  currentDate!: Date;
  currentMonth!: string;
  currentYear!: number;
  selected!: { startDate: Date | null; endDate: Date | null };

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
    this.setDefaultValue();
    this.setDefaultsCalendarView();
    this.setCurrentDate();
    this.updateCalendar();
  }

  private setDefaultValue(): void {
    if (this.control.value && !this.range) {
      this.selected = {
        startDate: new Date(this.control.value),
        endDate: new Date(this.control.value),
      };
      this.control.setValue(
        formatDate(this.control.value, this.dateFormat, this.locale)
      );
    } else if (this.control.value && this.range) {
      this.selected = {
        startDate: new Date(this.control.value.startDate),
        endDate: new Date(this.control.value.endDate),
      };
      this.control.setValue(
        `${formatDate(
          this.control.value.startDate,
          this.dateFormat,
          this.locale
        )} - ${formatDate(
          this.control.value.endDate,
          this.dateFormat,
          this.locale
        )}`
      );
    }
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
        monthsPerView: this.monthsPerView
          ? this.monthsPerView
          : this.range
          ? 2
          : 1,
        maxPerRow: this.maxPerRow ? this.maxPerRow : this.range ? 2 : 1,
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
    this.cdr.detectChanges();
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

  selectDate(dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  }): void {
    if (this.control.disabled) return;
    this.toggleCalendar();
    if (!this.range) {
      this.selected = {
        startDate: new Date(dateRange.startDate!),
        endDate: new Date(dateRange.startDate!),
      };
      this.control.setValue(
        formatDate(dateRange.startDate!, this.dateFormat, this.locale)
      );
    } else {
      this.selected = {
        startDate: new Date(dateRange.startDate!),
        endDate: new Date(dateRange.endDate!),
      };
      this.control.setValue(
        `${formatDate(
          dateRange.startDate!,
          this.dateFormat,
          this.locale
        )} - ${formatDate(dateRange.endDate!, this.dateFormat, this.locale)}`
      );
    }
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

    if (!this.isCalendarOpen) {
      this.control.markAsTouched();
    }
  }

  get classes(): string[] {
    return [
      this.shape,
      this.size,
      this.zapClass,
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
