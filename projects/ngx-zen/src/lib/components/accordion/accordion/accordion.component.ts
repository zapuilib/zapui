import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() zenClass: string = '';
  @Input() isOpen: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() transition: 'smooth' | 'snappy' | 'none' = 'smooth';
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() openIcon: string = 'fa-minus';
  @Input() closeIcon: string = 'fa-plus';

  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  get icon(): string {
    return this.isOpen ? this.openIcon : this.closeIcon;
  }

  toggleAccordion() {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    this.toggle.emit();
  }

  getIconStyle() {
    const color = this.disabled
      ? '#A0AEC0' // Gray or other disabled color
      : this.config.colors.tertiary ?? '#4a5568';

    const size =
      this.size === 'compact'
        ? this.config.fontSize.sm
        : this.size === 'large'
        ? this.config.fontSize.lg
        : this.config.fontSize.md;

    return {
      color,
      'font-size': size,
      'margin-right': this.iconPosition === 'left' ? '0.5rem' : '0',
      'margin-left': this.iconPosition === 'right' ? '0.5rem' : '0',
    };
  }

  getTitleStyle() {
    const color = this.disabled
      ? '#A0AEC0' // Gray or other disabled color
      : this.config.colors.secondary ?? '#000';

    const fontSize =
      this.size === 'compact'
        ? this.config.fontSize.sm
        : this.size === 'large'
        ? this.config.fontSize.lg
        : this.config.fontSize.md;

    return {
      color,
      'font-size': fontSize,
      'font-weight': 'bold',
    };
  }
}
