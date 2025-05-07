import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-group',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-group.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownMenuGroup {
  @Input() zapClass = '';
}
