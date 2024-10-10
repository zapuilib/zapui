import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';

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
  @Input() primaryBtnTemplate: TemplateRef<any> | null = null;
  @Input() secondaryBtnTemplate: TemplateRef<any> | null = null;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getWrapperStyle(): Styles {
    return {
      backgroundColor: this.config.colors.primary,
    };
  }

  getHeaderStyle(): Styles {
    return {
      borderBottomColor: this.config.colors.tertiary,
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
      fontSize: this.config.fontSize.sm,
    };
  }

  getCancelButtonStyle(): any {
    return `border-[${this.config.colors.tertiary}]`;
  }
}
