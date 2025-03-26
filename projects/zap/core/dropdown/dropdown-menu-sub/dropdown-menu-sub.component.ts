import { Component, Inject, Input } from '@angular/core';

import { SHAPE_TOKEN } from '../shape.token';

@Component({
  selector: 'zap-dropdown-menu-sub',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-sub.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapDropdownMenuSub {
  @Input() zapClass = '';
  constructor(@Inject(SHAPE_TOKEN) public shape: 'pill' | 'curve' | 'flat') {}

  get classes(): string {
    return `${this.shape} ${this.zapClass}`;
  }
}
