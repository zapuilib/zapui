import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-item',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-item.component.scss',
})
export class ZapDropdownMenuItem {}
