import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './dropdown.component.scss',
})
export class ZapDropdown {}
