import { Component } from '@angular/core';
import { ZapAlert, ZapIconDirective } from 'zap/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ZapIconDirective, ZapAlert],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {}
