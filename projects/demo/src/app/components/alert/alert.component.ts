import { Component } from '@angular/core';
import { ZapAlert, ZapIconDirective } from 'zap/core';

@Component({
  selector: 'app-alert',
  imports: [ZapIconDirective, ZapAlert],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {}
