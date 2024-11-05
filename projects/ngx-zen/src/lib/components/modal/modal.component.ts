import { Component, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';

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
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }
  
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
      'background-color': this.config.colors.primary,
      'font-size': this.config.fontSize.md,
    };
  }

  getHandlerStyle() {
    return {
      color: this.config.colors.secondary,
      'font-size': this.config.fontSize.md,
    };
  }
}
