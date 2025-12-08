import { Injectable } from '@angular/core';

import { ButtonGroupConfig } from './button-group.interface';

@Injectable()
export class ButtonGroupService {
  private buttons: any[] = [];

  registerButton(button: any): ButtonGroupConfig {
    const index = this.buttons.length;
    this.buttons.push(button);

    return {
      index,
      isFirst: index === 0,
      isLast: false,
      totalCount: this.buttons.length,
    };
  }

  getConfigForButton(button: any): ButtonGroupConfig | null {
    const index = this.buttons.indexOf(button);
    if (index === -1) return null;

    return {
      index,
      isFirst: index === 0,
      isLast: index === this.buttons.length - 1,
      totalCount: this.buttons.length,
    };
  }

  reset(): void {
    this.buttons = [];
  }
}
