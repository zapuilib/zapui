import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';

@Component({
  selector: 'ngx-zen-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() size: 'small' | 'wide' | 'wider' | 'default' = 'default';
  @Input() zenClass: string = '';
  @Input() style: 'classic' | 'noblur' = 'classic';

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  getStyle() {
    return {
      'background-color': this.colorUtility.hexToRgba(
        this.config.colors.quaternary,
        0.5
      ),
      'font-size': this.config.fontSize.md,
    };
  }

  getModalStyle() {
    return {
      'background-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
    };
  }
}
