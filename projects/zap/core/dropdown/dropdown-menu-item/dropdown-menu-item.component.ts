import { Component, input, HostBinding, Inject } from '@angular/core';

import { SHAPE_TOKEN } from '../shape.token';

@Component({
  selector: 'zap-dropdown-menu-item',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-item.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapDropdownMenuItem {
  zapClass = input('');
  disabled = input<boolean>(false);
  @HostBinding('class.disabled')
  @HostBinding('attr.disabled')
  get isDisabled(): boolean {
    return this.disabled();
  }

  get classes(): string {
    return `${this.shape} ${this.zapClass()}`;
  }

  constructor(@Inject(SHAPE_TOKEN) public shape: 'pill' | 'curve' | 'flat') {}
}
