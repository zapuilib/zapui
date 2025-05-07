import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-shortcut',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-shortcut.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownMenuShortcut {
  @Input() zapClass = '';
}
