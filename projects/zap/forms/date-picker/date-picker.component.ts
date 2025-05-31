import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import {
  CustomErrorMessages,
  ValidationErrorComponent,
} from '../validation-error/validation-error.component';
import { DPCalendar } from './dp-calendar/dp-calendar.component';
import { ZapDatePickerBreakpoints } from './interface/date-picker.interface';
import { formatDate } from './utils';
import {
  ZapFormFieldHelpTextDirective,
  ZapFormFieldIconDirective,
  ZapLabelDirective,
} from '../public-api';
import { RequiredIndicatorComponent } from '../required-indicator/required-indicator.component';

@Component({
  selector: 'zap-date-picker',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    DPCalendar,
    A11yModule,
    RequiredIndicatorComponent,
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
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('calendarPanel') calendarPanel!: TemplateRef<any>;
  @ViewChild('inputDateSelectValueHolder')
  inputDateSelectValueHolder!: ElementRef;
  @ContentChild(ZapFormFieldIconDirective, { static: false })
  iconDirective!: ZapFormFieldIconDirective;
  @ContentChild(ZapFormFieldHelpTextDirective, { static: false })
  helpTextDirective!: ZapFormFieldHelpTextDirective;
  @ContentChild(ZapLabelDirective, { static: false })
  labelDirective!: ZapLabelDirective;
  onChange = output<T>();
  id = input.required<string>();
  label = input<string>();
  placeholder = input<string>('Select');
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'compact' | 'base' | 'wide'>();
  position = input<'top' | 'bottom' | 'auto'>('auto');
  customErrorMessages = input<CustomErrorMessages>({});
  icon = input<string>();
  iconPosition = input<'left' | 'right'>('right');
  helpText = input<string>('');
  breakpoints = model<ZapDatePickerBreakpoints>();
  zapClass = input<string>('');
  monthsPerView = model<number>(1);
  maxPerRow = model<number>(1);
  range = input<boolean>(false);
  dateFormat = input<string>('MMM dd, yyyy');
  locale = input<string>('en-US');
  dropdown = input<boolean>(true);
  months = input<string[]>([
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
  ]);
  daysOfWeek = input<string[]>(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
  years = model<string[]>([]);
  disableWeekends = input<boolean>(false);
  disableDates = input<Date[]>();
  disableRanges = input<{ startDate: Date; endDate: Date }[]>([]);
  disableInactive = input<boolean>(false);
  minDate = input<Date>();
  maxDate = input<Date>();
  minYear = input<number>();
  maxYear = input<number>();
  indicator = input<boolean>(true);
  private overlayRef!: OverlayRef;
  isCalendarOpen = false;
  weeks!: Date[][];
  currentDate!: Date;
  currentMonth!: string;
  currentYear!: number;
  selected!: { startDate: Date | null; endDate: Date | null };

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    if (this.isCalendarOpen && event.key === 'Escape') {
      this.toggleCalendar();
    }
  }

  constructor(
    @Inject(Injector) injector: Injector,
    cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private vcr: ViewContainerRef,
  ) {
    super(injector, cdr);
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
        this.size() === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize =
        this.size() === 'compact' ? '14px' : 'var(--zap-date-picker-icon-font-size)';
      this.iconDirective.el.nativeElement.style.color = 'var(--zap-date-picker-icon-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition() === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition() === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition() === 'right' ? '1' : '0';
      this.iconDirective.el.nativeElement.style.position = 'absolute';
      this.iconDirective.el.nativeElement.style.top = '50%';
      this.iconDirective.el.nativeElement.style.transform = 'translateY(-50%)';
      this.iconDirective.el.nativeElement.style.left =
        this.iconPosition() === 'left' ? '0.75rem' : 'auto';
      this.iconDirective.el.nativeElement.style.right =
        this.iconPosition() === 'right' ? '0.75rem' : 'auto';
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

  private buildPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positions: ConnectedPosition[] =
      this.position() === 'top'
        ? [
            {
              originX: 'start',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'bottom',
              offsetY: -8,
            },
          ]
        : this.position() === 'bottom'
          ? [
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 4,
              },
            ]
          : [
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: 4,
              },
              {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetY: -8,
              },
            ];

    const strategy = this.positionBuilder
      .flexibleConnectedTo(this.inputDateSelectValueHolder)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    return strategy;
  }

  private setDefaultValue(): void {
    if (this.control.value && !this.range()) {
      this.selected = {
        startDate: new Date(this.control.value),
        endDate: new Date(this.control.value),
      };
    } else if (this.control.value && this.range()) {
      this.selected = {
        startDate: new Date(this.control.value.startDate),
        endDate: new Date(this.control.value.endDate),
      };
    }
    this.setYears();
  }

  get selectedValue(): string {
    if (!this.range()) {
      return formatDate(this.control.value, this.dateFormat(), this.locale());
    } else {
      return `${formatDate(
        this.control.value.startDate,
        this.dateFormat(),
        this.locale(),
      )} - ${formatDate(this.control.value.endDate, this.dateFormat(), this.locale())}`;
    }
  }

  private setYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = this.minYear() ?? currentYear - 50;
    const endYear = this.maxYear() ?? currentYear + 50;

    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) =>
      (startYear + index).toString(),
    );

    this.years.set(years);
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
      const date = this.range()
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
    if (this.breakpoints()) return;
    this.breakpoints.set({
      default: {
        monthsPerView: this.monthsPerView() ? this.monthsPerView() : this.range() ? 2 : 1,
        maxPerRow: this.maxPerRow() ? this.maxPerRow() : this.range() ? 2 : 1,
      },
      '1024': {
        monthsPerView: 1,
        maxPerRow: 1,
      },
    });
  }

  private handleBreakpoints(): void {
    if (!this.breakpoints()) return;
    const width = window.innerWidth;
    let matchedBreakpoint = this.breakpoints()?.default;

    for (const breakpoint in this.breakpoints()) {
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
        matchedBreakpoint = this.breakpoints()?.[breakpoint];
      }
    }
    this.monthsPerView.set(matchedBreakpoint?.monthsPerView ?? 1);
    this.maxPerRow.set(matchedBreakpoint?.maxPerRow ?? 1);
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
    this.currentDate = new Date(year, this.months().indexOf(month), 1);
    this.updateCalendar();
  }

  selectDate(dateRange: { startDate: Date | null; endDate: Date | null }): void {
    if (this.control.disabled) return;
    this.toggleCalendar();
    if (!this.range()) {
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
    this.handleBreakpoints();
    this.cdr.detectChanges();
    this.isCalendarOpen = !this.isCalendarOpen;
    this.cdr.detectChanges();
    if (this.isCalendarOpen) {
      const inputWidth = this.inputDateSelectValueHolder.nativeElement.offsetWidth;
      const positionStrategy = this.buildPositionStrategy();

      this.overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        width: this.size() === 'wide' ? inputWidth : 'auto',
      });

      const portal = new TemplatePortal(this.calendarPanel, this.vcr);
      this.overlayRef.attach(portal);

      this.overlayRef.backdropClick().subscribe(() => this.toggleCalendar());
      this.overlayRef.detachments().subscribe(() => {
        this.isCalendarOpen = false;
      });
    } else {
      if (this.overlayRef) {
        this.overlayRef.detach();
      }
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
    return this.zapClass()
      .split(' ')
      .filter((cls) => prefixes.some((prefix) => cls.startsWith(prefix)))
      .join(' ');
  }

  private generateClasses(prefixes: string[] = [''], exclude: string[] = ['']): string[] {
    return [
      this.shape() ?? '',
      ...this.zapClass()
        .split(' ')
        .filter(
          (cls) =>
            prefixes.some((prefix) => cls.startsWith(prefix)) &&
            !exclude.some((ex) => cls.startsWith(ex)),
        ),
      this.size() ?? '',
      this.iconPosition(),
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
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
