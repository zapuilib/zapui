import {
  Component,
  Input,
  Inject,
  Output,
  EventEmitter,
  Optional,
} from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../../interfaces/config.interface';
import { ColorUtility } from '../../../utilities/color.utility';
import { AccordionGroupComponent } from '../accordion-group/accordion-group.component';

@Component({
  selector: 'ngx-zen-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() zenClass: string = '';
  @Input() isOpen: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() transition: 'smooth' | 'snappy' | 'none' = 'smooth';
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() openIcon: string = 'fa-minus';
  @Input() closeIcon: string = 'fa-plus';
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Input() index: number = 0;
  @Input() isSingle: boolean = false;

  disabledColor: string = '';

  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility,
    @Optional() public group: AccordionGroupComponent
  ) {}

  ngOnInit() {
    this.checkIfSingle();
  }

  checkIfSingle() {
    if (!this.group) {
      this.isSingle = true;
    }
  }

  get icon(): string {
    return this.isOpen ? this.openIcon : this.closeIcon;
  }

  toggleAccordion() {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    this.toggle.emit();

    if (this.group) {
      this.group.onAccordionToggle(this);
    }
  }

  getDisabledColor() {
    return this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5);
  }

  getIconStyle() {
    const color = this.disabled
      ? this.getDisabledColor()
      : this.config.colors.secondary;

    const size =
      this.size === 'compact'
        ? this.config.fontSize.sm
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
      ? this.getDisabledColor()
      : this.config.colors.secondary;

    const fontSize =
      this.size === 'compact'
        ? this.config.fontSize.sm
        : this.config.fontSize.lg;

    return {
      color,
      'font-size': fontSize,
    };
  }

  getBorderStyle() {
    const borderColor = this.colorUtility.hexToRgba(
      this.config.colors.quaternary,
      0.1
    );

    if (this.isSingle) {
      return {
        'border-top': 'none',
        'border-bottom': `1px solid ${borderColor}`,
      };
    }

    return {
      'border-top': this.isFirst ? 'none' : `1px solid ${borderColor}`,
      'border-bottom': this.isLast ? `1px solid ${borderColor}` : 'none',
    };
  }

  getSubtitleStyle() {
    const fontSize =
      this.size === 'compact'
        ? this.config.fontSize.xs
        : this.config.fontSize.sm;

    const mutedColor = this.colorUtility.hexToRgba(
      this.config.colors.quaternary,
      0.5
    );

    return {
      'font-size': fontSize,
      color: mutedColor,
      'margin-top': '0.25rem',
    };
  }

  getContentStyle() {
    const size =
      this.size === 'compact'
        ? this.config.fontSize.sm
        : this.config.fontSize.md;

    return {
      'margin-left':
        this.iconPosition === 'left' ? `calc(${size} + 0.4rem)` : '0', // Offset content based on icon size
    };
  }
}
