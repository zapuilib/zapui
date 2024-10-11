import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { ColorUtility } from '../../utilities/color.utility';

import type { NgxZenConfig } from '../../interfaces/config.interface';
import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() zenClass: string = '';
  @Input() shape: 'curve' | 'pill' | 'default' = 'default';
  @Input() position: 'top' | 'default' = 'default';
  @Input() primaryBtnTemplate: TemplateRef<any> | null = null;
  @Input() secondaryBtnTemplate: TemplateRef<any> | null = null;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.cancel.emit();
  }

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  getWrapperStyle(): Styles {
    return {
      backgroundColor: this.colorUtility.hexToRgba(
        this.config.colors.quaternary,
        0.5
      ),
    };
  }

  getInnerStyle(): Styles {
    return {
      backgroundColor: this.config.colors.primary,
    };
  }

  getIconStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }

  getHeaderStyle(): Styles {
    return {
      borderBottomColor: this.colorUtility.hexToRgba(
        this.config.colors.quaternary,
        0.1
      ),
    };
  }

  getTitleStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.xl,
    };
  }

  getTextStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }

  getPrimaryBtnStyle(): Styles {
    return {
      borderColor: this.config.colors.error,
      backgroundColor: this.config.colors.error,
      color: this.config.colors.primary,
      fontSize: this.config.fontSize.md,
    };
  }

  getSecondaryBtnStyle(): Styles {
    return {
      borderColor: this.colorUtility.hexToRgba(
        this.config.colors.quaternary,
        0.5
      ),
      backgroundColor: 'transparent',
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }
}
