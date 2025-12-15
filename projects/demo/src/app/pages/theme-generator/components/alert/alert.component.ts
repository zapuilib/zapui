import { Component } from '@angular/core';
import { ZapAlert, ZapIconDirective } from 'zap';

@Component({
  selector: 'demo-alert',
  standalone: true,
  imports: [ZapIconDirective, ZapAlert],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class DemoAlertComponent {}
