import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';

@Component({
  selector: 'ngx-zen-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' =
    'default';
  @Input() variant: 'classic' | 'default' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() icon: string = '';
  @Input() zenClass: string = '';

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  ngOnInit(): void {
    this.assignIcon();
  }

  private assignIcon(): void {
    if (this.icon) return;
    switch (this.type) {
      case 'success':
        this.icon = 'fa-circle-check';
        break;
      case 'warning':
        this.icon = 'fa-triangle-exclamation';
        break;
      case 'error':
        this.icon = 'fa-triangle-exclamation';
        break;
      case 'info':
        this.icon = 'fa-circle-info';
        break;
      default:
        break;
    }
  }
  getStyle() {
    const color =
      this.config.colors[this.type as keyof typeof this.config.colors] ||
      this.config.colors.quaternary;

    const opacity = this.variant === 'classic' ? 0.9 : 1;

    const rgbaColor = this.colorUtility.hexToRgba(color, opacity);

    return {
      'background-color': this.variant === 'classic' ? rgbaColor : color,
      'border-color': this.variant === 'classic' ? color : 'transparent',
      'font-size': this.config.fontSize.md,
    };
  }
}
