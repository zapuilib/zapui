import { Component, input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-label',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-label.component.scss',
  host: {
    '[class]': 'zapClass()',
  },
})
export class ZapDropdownMenuLabel {
  zapClass = input('');
}
