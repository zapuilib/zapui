import { Component } from '@angular/core';
import { ZapBadge } from 'zap';

@Component({
  selector: 'demo-badge',
  standalone: true,
  imports: [ZapBadge],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class DemoBadgeComponent {}
