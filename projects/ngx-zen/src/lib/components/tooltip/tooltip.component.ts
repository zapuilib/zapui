import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';

import type { NgxZenConfig } from '../../interfaces/config.interface';
import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() size: 'small' | 'default' = 'default';
  @Input() positionX: 'auto' | 'left' | 'x-center' | 'right' = 'auto';
  @Input() positionY: 'auto' | 'top' | 'y-center' | 'bottom' = 'auto';
  @Input() hidePointer: boolean = false;
  @Input() template: TemplateRef<any> | null = null;
  @Input() zenClass: string = '';
  @ViewChild('contentRef') contentElement!: ElementRef<HTMLDivElement>;
  private scrollListener: () => void | null = () => null;
  tooltipPosition: { top: number; left: number } = { top: 0, left: 0 };
  isActive: boolean = false;

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.positionX === 'auto' && this.positionY === 'auto') {
      this.scrollListener = this.repositionTooltip.bind(this);
      window.addEventListener('scroll', this.scrollListener, true);
    }
  }

  getIconStyle(): Styles {
    return {
      backgroundColor: this.config.colors.secondary,
      borderColor: this.config.colors.secondary,
      fontSize: this.config.fontSize.xxs,
      color: this.config.colors.primary,
    };
  }

  getContentStyle(): Styles {
    const baseStyles: Styles = {
      backgroundColor: this.config.colors.secondary,
      borderColor: this.config.colors.secondary,
      fontSize: this.config.fontSize.sm,
      color: this.config.colors.primary,
    };

    if (
      this.positionX === 'auto' &&
      this.positionY === 'auto' &&
      this.isActive
    ) {
      return {
        ...baseStyles,
        top: `${this.tooltipPosition.top}px`,
        left: `${this.tooltipPosition.left}px`,
        position: 'fixed',
      };
    }

    return baseStyles;
  }

  getPointerStyle(): Styles {
    return {
      backgroundColor: this.config.colors.secondary,
    };
  }

  showContent({ target }: MouseEvent): void {
    this.isActive = true;

    if (this.positionX === 'auto' && this.positionY === 'auto') {
      this.changeDetector.detectChanges();
      if (target) this.setTooltipPosition(target as HTMLElement);
    }
  }

  hideContent(): void {
    setTimeout(() => {
      if (!this.contentElement?.nativeElement.matches(':hover')) {
        this.isActive = false;
        this.tooltipPosition = { top: 0, left: 0 };
      }
    }, 200);
  }

  setTooltipPosition(target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const contentWidth = this.contentElement.nativeElement.offsetWidth;
    const contentHeight = this.contentElement.nativeElement.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX + rect.width / 2 - contentWidth / 2;

    if (left < 0) {
      left = 24;
    }

    if (left + contentWidth > screenWidth) {
      left = screenWidth - contentWidth - 24;
    }

    if (top + contentHeight > screenHeight + window.scrollY) {
      top = rect.top + window.scrollY - contentHeight - 10;
    }

    this.tooltipPosition = { top, left };
    this.changeDetector.detectChanges();
  }

  repositionTooltip(): void {
    if (this.isActive && this.contentElement) {
      const target = this.contentElement.nativeElement.previousElementSibling;
      if (target) this.setTooltipPosition(target as HTMLElement);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener, true);
  }
}
