import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationErrorComponent, DPCalendar],
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
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('inputDateSelectValueHolder')
  inputDateSelectValueHolder!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @Output() onChange: EventEmitter<T> = new EventEmitter<T>();
  @Input() label = '';
  @Input() id = '';
  @Input() placeholder = 'Select';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' | 'wide' = 'base';
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() helpText = '';
  @Input() breakpoints!: ZapDatePickerBreakpoints;
  @Input() zapClass = '';
  @Input() monthsPerView!: number;
  @Input() maxPerRow!: number;
  @Input() range = false;
  @Input() dateFormat = 'MMM dd, yyyy';
  @Input() locale = 'en-US';
  @Input() dropdown = true;
  @Input() months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  @Input() daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  @Input() years!: string[];
  @Input() disableWeekends = false;
  @Input() disableDates!: Date[];
  @Input() disableRanges!: { startDate: Date; endDate: Date }[];
  @Input() disableInactive = false;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() minYear!: number;
  @Input() maxYear!: number;

  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;

  isCalendarOpen = false;
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
    if (this.isCalendarOpen && event.key === 'Escape') {
      this.toggleCalendar();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.handleBreakpoints();
    this.handleCalendarPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.handleBreakpoints();
    this.handleCalendarPosition();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDefaultValue();
    this.setDefaultsCalendarView();
    this.setCurrentDate();
    this.updateCalendar();
    this.updateCurrentMonthAndYear();
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-date-picker-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left =
        this.iconPosition === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right =
        this.iconPosition === 'right' ? '0.75rem' : 'auto';
    }

    if (this.helpTextDirective) {
      this.helpTextDirective.el.nativeElement.style.color =
        'var(--zap-date-picker-help-text-color)';
      this.helpTextDirective.el.nativeElement.style.fontSize =
        'var(--zap-date-picker-help-text-font-size)';
      this.helpTextDirective.el.nativeElement.style.fontWeight =
        'var(--zap-date-picker-help-text-font-weight)';
      this.helpTextDirective.el.nativeElement.style.lineHeight =
        'var(--zap-date-picker-help-text-line-height)';
      this.helpTextDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-date-picker-help-text-letter-spacing)';
    }

    if (this.labelDirective) {
      this.labelDirective.el.nativeElement.style.color = 'var(--zap-date-picker-label-color)';
      this.labelDirective.el.nativeElement.style.fontSize =
        'var(--zap-date-picker-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight =
        'var(--zap-date-picker-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight =
        'var(--zap-date-picker-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing =
        'var(--zap-date-picker-label-letter-spacing)';
    }
  }

  private setDefaultValue(): void {
    if (this.control.value && !this.range) {
      this.selected = {
        startDate: new Date(this.control.value),
        endDate: new Date(this.control.value),
      };
    } else if (this.control.value && this.range) {
      this.selected = {
        startDate: new Date(this.control.value.startDate),
        endDate: new Date(this.control.value.endDate),
      };
    }
    this.setYears();
  }

  get selectedValue(): string {
    if (!this.range) {
      return formatDate(this.control.value, this.dateFormat, this.locale);
    } else {
      return `${formatDate(
        this.control.value.startDate,
        this.dateFormat,
        this.locale,
      )} - ${formatDate(this.control.value.endDate, this.dateFormat, this.locale)}`;
    }
  }

  private setYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = this.minYear ?? currentYear - 50;
    const endYear = this.maxYear ?? currentYear + 50;

    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
      (startYear + index).toString(),
    );

    this.years = years;
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

  private updateCurrentMonthAndYear(): void {
    if (this.control.value) {
      const date = this.range
        ? new Date(this.control.value.startDate)
        : new Date(this.control.value);
      this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.currentMonth = date.toLocaleString('default', { month: 'long' });
      this.currentYear = date.getFullYear();
    }
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
    if (this.breakpoints) return;
    this.breakpoints = {
      default: {
        monthsPerView: this.monthsPerView ? this.monthsPerView : this.range ? 2 : 1,
        maxPerRow: this.maxPerRow ? this.maxPerRow : this.range ? 2 : 1,
      },
      '1024': {
        monthsPerView: 1,
        maxPerRow: 1,
      },
    };
  }

  private handleBreakpoints(): void {
    if (!this.breakpoints) return;
    const width = window.innerWidth;
    let matchedBreakpoint = this.breakpoints.default;

    for (const breakpoint in this.breakpoints) {
      let breakPointWidth = breakpoint;

      const breakpointWidths: Record<string, number> = {
        sm: 640,
        md: 768,
        base: 1024,
        lg: 1280,
        xl: 1536,
        '2xl': 1920,
      };

      if (breakpoint in breakpointWidths) {
        breakPointWidth = breakpointWidths[breakpoint].toString();
      }

      if (width <= parseInt(breakPointWidth)) {
        matchedBreakpoint = this.breakpoints[breakpoint];
      }
    }
    this.monthsPerView = matchedBreakpoint?.monthsPerView ?? 1;
    this.maxPerRow = matchedBreakpoint?.maxPerRow ?? 1;
  }

  private handleCalendarPosition(): void {
    this.handleBreakpoints();
    this.cdr.detectChanges();

    if (this.calendar && typeof window !== 'undefined') {
      const calendarElement = this.calendar.nativeElement;
      const inputElement = this.inputDateSelectValueHolder.nativeElement;
      const inputRect = inputElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      if (!calendarElement.dataset.appendedToBody) {
        document.body.appendChild(calendarElement);
        calendarElement.dataset.appendedToBody = 'true';
      }

      calendarElement.style.position = 'fixed';
      calendarElement.style.left = `${inputRect.left}px`;
      calendarElement.style.width = this.size === 'wide' ? `${inputRect.width}px` : 'auto';

      calendarElement.style.visibility = 'hidden';
      calendarElement.style.display = 'block';
      const optionListHeight = calendarElement.scrollHeight;
      calendarElement.style.visibility = 'visible';

      if (this.position === 'auto') {
        if (spaceBelow < optionListHeight && spaceAbove > optionListHeight) {
          calendarElement.style.top = `${inputRect.top - optionListHeight - 5}px`;
        } else {
          calendarElement.style.top = `${inputRect.bottom}px`;
        }
      } else if (this.position === 'top') {
        calendarElement.style.top = `${inputRect.top - optionListHeight - 5}px`;
      } else {
        calendarElement.style.top = `${inputRect.bottom}px`;
      }

      calendarElement.style.zIndex = '999';
    }
  }

  private resetCalendar(): void {
    this.currentDate = new Date();
    this.updateCalendar();
  }

  onPreviousMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - offset,
      1,
    );
    this.updateCalendar();
  }

  onNextMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1,
    );
    this.updateCalendar();
  }

  onChangeMonthAndYear({ month, year }: { month: string; year: number }): void {
    this.currentDate = new Date(year, this.months.indexOf(month), 1);
    this.updateCalendar();
  }

  selectDate(dateRange: { startDate: Date | null; endDate: Date | null }): void {
    if (this.control.disabled) return;
    this.toggleCalendar();
    if (!this.range) {
      this.selected = {
        startDate: new Date(dateRange.startDate!),
        endDate: new Date(dateRange.startDate!),
      };
      this.control.setValue(dateRange.startDate);
    } else {
      this.selected = {
        startDate: new Date(dateRange.startDate!),
        endDate: new Date(dateRange.endDate!),
      };
      this.control.setValue({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
    }
    this.onChange.emit(this.control.value);
  }

  isCurrentMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() === month && date.getFullYear() === year;
  }

  toggleCalendar(): void {
    if (this.control.disabled) return;
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
    return this.generateClasses(
      [''],
      [
        'dpc',
        'select:',
        'select-selected:',
        'options:',
        'option:',
        'option-selected:',
        'option-hovered:',
      ],
    );
  }

  get calendarClasses(): string {
    const prefixes = [
      'dpc',
      'select:',
      'select-selected:',
      'options:',
      'option:',
      'option-selected:',
      'option-hovered:',
    ];
    return this.zapClass
      .split(' ')
      .filter((cls) => prefixes.some((prefix) => cls.startsWith(prefix)))
      .join(' ');
  }

  private generateClasses(prefixes: string[] = [''], exclude: string[] = ['']): string[] {
    return [
      this.shape,
      ...this.zapClass
        .split(' ')
        .filter(
          (cls) =>
            prefixes.some((prefix) => cls.startsWith(prefix)) &&
            !exclude.some((ex) => cls.startsWith(ex)),
        ),
      this.size,
      this.iconPosition,
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }

  override reset(): void {
    super.reset();
    this.selected = {
      startDate: null,
      endDate: null,
    };
    this.resetCalendar();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.calendar) {
      this.calendar.nativeElement.remove();
    }
  }
}
