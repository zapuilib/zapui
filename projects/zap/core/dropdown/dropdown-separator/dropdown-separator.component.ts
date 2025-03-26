import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-separator',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-separator.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownSeparator {
  @Input() zapClass = '';
}
