import { Component, Inject, input } from '@angular/core';

import { SHAPE_TOKEN } from '../shape.token';

@Component({
  selector: 'zap-dropdown-menu',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapDropdownMenu {
  zapClass = input('');
  constructor(@Inject(SHAPE_TOKEN) public shape: 'pill' | 'curve' | 'flat') {}

  get classes(): string {
    return `${this.shape} ${this.zapClass()}`;
  }
}
