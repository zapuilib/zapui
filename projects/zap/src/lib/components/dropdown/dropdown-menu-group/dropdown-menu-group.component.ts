import { Component, input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-group',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-group.component.scss',
  host: {
    '[class]': 'zapClass()',
  },
})
export class ZapDropdownMenuGroup {
  zapClass = input('');
}
