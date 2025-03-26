import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-label',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-label.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownMenuLabel {
  @Input() zapClass = '';
}
