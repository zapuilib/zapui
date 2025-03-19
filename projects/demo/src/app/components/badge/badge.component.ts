import { Component } from '@angular/core';
import { ZapBadge } from 'zap/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [ZapBadge],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {}
