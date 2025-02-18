import {
  AfterViewInit,
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
  implements OnInit, AfterViewInit
{
  @ViewChild('inputDateSelectValueHolder')
  inputDateSelectValueHolder!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = 'Select';
  @Input() shape: 'pill' | 'curve' | 'flat' = 'flat';
  @Input() size: 'compact' | 'base' | 'wide' = 'base';
  @Input() position: 'top' | 'bottom' | 'auto' = 'auto';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() helpText: string = '';
  @Input() breakpoints!: ZapDatePickerBreakpoints;
  @Input() zapClass: string = ''; //TODO
  @Input() monthsPerView!: number;
  @Input() maxPerRow!: number;
  @Input() range: boolean = false;
  @Input() dateFormat: string = 'MMM dd, yyyy';
  @Input() locale: string = 'en-US';
  @Input() enableDropdown: boolean = true;

  //TODO: Optimise for size
  //TODO: min date and maximum date
  //TODO: disabled colors
  //TODO: disable weekends
  //TODO: disable specific dates
  //TODO: disable date ranges
  //TODO: disable dates before and after
  //TODO: calendar month select dropdown
  //TODO: calendar year select dropdown
  //TODO: format for the calendar title
  //TODO: on date select event emitter
  //TODO: on date range start event emitter
  //TODO: on date range end event emitter

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

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height =
        this.size === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color =
        'var(--zap-date-picker-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order =
        this.iconPosition === 'right' ? '1' : '0';
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
      this.labelDirective.el.nativeElement.style.fontSize = 'var(--zap-date-picker-label-font-size)';
      this.labelDirective.el.nativeElement.style.fontWeight = 'var(--zap-date-picker-label-font-weight)';
      this.labelDirective.el.nativeElement.style.lineHeight = 'var(--zap-date-picker-label-line-height)';
      this.labelDirective.el.nativeElement.style.letterSpacing = 'var(--zap-date-picker-label-letter-spacing)';
    }
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
    if(this.breakpoints) return;
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

  //TODO: manage size wide
  private handleCalendarPosition(): void {
    this.handleBreakpoints();
    this.cdr.detectChanges();
    //FIXME: if input element is insdie absolute element, it is not able to calculate the position of the input element properly such as inside modal, dialog, etc.

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
      calendarElement.style.width = `${inputRect.width}px`;

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
      this.iconPosition,
      this.control.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
