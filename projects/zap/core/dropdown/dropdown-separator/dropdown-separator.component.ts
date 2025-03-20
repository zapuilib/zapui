import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-separator',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-separator.component.scss',
})
export class ZapDropdownSeparator {}
