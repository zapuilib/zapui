import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu.component.scss',
})
export class ZapDropdownMenu {}
