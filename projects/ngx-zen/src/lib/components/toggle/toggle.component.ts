import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';

import type { NgxZenConfig } from '../../interfaces/config.interface';
import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() text: string = '';
  @Input() zenClass: string = '';
  isToggleOn: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getLabelStyle(): Styles {
    return {
      fontSize: this.config.fontSize.md,
      color: this.config.colors.secondary,
    };
  }

  getTextStyle(): Styles {
    return {
      fontSize: this.config.fontSize.sm,
      color: this.config.colors.secondary,
    };
  }

  getToggleStyle(): Styles {
    return {
      backgroundColor: this.isToggleOn
        ? this.config.colors.tertiary
        : this.config.colors.quaternary,
      borderColor: this.config.colors.tertiary,
      fontSize: this.config.fontSize.md,
      color: this.config.colors.primary,
    };
  }

  getRollerStyle(): Styles {
    return {
      backgroundColor: this.config.colors.primary,
    };
  }

  handleToggle(): void {
    this.isToggleOn = !this.isToggleOn;
    this.toggle.emit(this.isToggleOn);
  }
}
