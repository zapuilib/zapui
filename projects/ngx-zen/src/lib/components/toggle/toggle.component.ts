import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() text: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() id: string = '';
  isToggleOn: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getLabelStyle(): any {
    return {
      'font-size': this.config.fontSize.md,
      color: this.config.colors.secondary,
    };
  }

  getTitleStyle(): any {
    return {
      'font-size': this.config.fontSize.md,
      color: this.config.colors.secondary,
    };
  }

  getTextStyle(): any {
    return {
      'font-size': this.config.fontSize.sm,
      color: this.config.colors.secondary,
    };
  }

  getToggleStyle(): any {
    return {
      'background-color': this.isToggleOn
        ? this.config.colors.tertiary
        : this.config.colors.quaternary,
      'border-color': this.config.colors.tertiary,
      'font-size': this.config.fontSize.md,
      color: this.config.colors.primary,
    };
  }

  getRollerStyle(): any {
    return {
      'background-color': this.config.colors.primary,
    };
  }

  handleToggle(): void {
    this.isToggleOn = !this.isToggleOn;
    this.onToggle.emit(this.isToggleOn);
  }
}
