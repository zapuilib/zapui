import { Component, Inject, Input } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() positionX: 'left' | 'x-center' | 'right' = 'right';
  @Input() positionY: 'top' | 'y-center' | 'bottom' = 'bottom';
  @Input() zenClass: string = '';
  isActive: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
