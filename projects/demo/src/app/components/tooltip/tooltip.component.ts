import { Component } from '@angular/core';
import { ZapTooltip, ZapTooltipContent, ZapTooltipHandler } from 'zap/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [ZapTooltip, ZapTooltipHandler, ZapTooltipContent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {}
