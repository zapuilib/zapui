import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  // encapsulation: ViewEncapsulation.None, // need this to be able to style projected content
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() zenClass: string = ''; // Applied to the root element
  @Input() isOpen: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() transition: 'smooth' | 'snappy' | 'none' = 'smooth';
  @Input() iconPosition: 'left' | 'right' = 'right';

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  getHeaderStyle() {
    return {
      'background-color': this.config.colors.quaternary,
      color: this.config.colors.primary,
      'border-color': this.config.colors.secondary,
      'font-size':
        this.size === 'compact'
          ? this.config.fontSize.sm
          : this.config.fontSize.md,
    };
  }

  getContentStyle() {
    return {
      'background-color': this.config.colors.secondary,
      color: this.config.colors.primary,
      'font-size':
        this.size === 'large'
          ? this.config.fontSize.lg
          : this.config.fontSize.md,
    };
  }

  getIconStyle() {
    return {
      color: this.config.colors.tertiary,
    };
  }
}
