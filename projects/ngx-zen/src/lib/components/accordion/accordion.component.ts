import { Component, Input, Inject, OnInit } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() title: string = '';
  @Input() zenClass: string = '';
  @Input() zenHeaderClass: string = '';
  @Input() zenContentClass: string = '';
  @Input() isOpen: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() transition: 'smooth' | 'snappy' | 'none' = 'smooth';
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() openIcon: string = 'fa-minus';
  @Input() closeIcon: string = 'fa-plus';

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  get icon(): string {
    return this.isOpen ? this.openIcon : this.closeIcon;
  }

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
  getStyle() {
    let styles = 'display: flex; flex-direction: column;';
    if (this.shape === 'curve') {
      styles += ' border-radius: 0.375rem;';
    }
    return styles;
  }

  getHeaderStyle() {
    if (this.zenHeaderClass) {
      return '';
    }
    const bgColor = this.config.colors.primary ?? '#e2e8f0';
    const textColor = this.config.colors.secondary ?? '#1a202c';
    return `background-color: ${bgColor} !important; color: ${textColor} !important;`;
  }

  getContentStyle() {
    console.log('content: ', this.zenContentClass);
    if (this.zenContentClass) {
      return '';
    }
    const bgColor = this.isOpen
      ? this.config.colors.quaternary ?? '#ffffff'
      : '';
    const textColor = this.config.colors.secondary ?? '#1a202c';
    let styles = '';
    if (bgColor) {
      styles += `background-color: ${bgColor} !important;`;
    }
    styles += ` color: ${textColor} !important;`;
    console.log(styles);
    return styles;
  }

  getIconStyle() {
    const color = this.config.colors.tertiary ?? '#4a5568';
    return `color: ${color} !important;`;
  }
}
