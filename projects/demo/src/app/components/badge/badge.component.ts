import { Component } from '@angular/core';
import { ZapBadge } from 'zap';

@Component({
  selector: 'app-badge',
  imports: [ZapBadge],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {}
