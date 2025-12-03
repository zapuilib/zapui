import { Component } from '@angular/core';
import { ZapTooltip, ZapTooltipContent, ZapTooltipHandler } from 'zap';

@Component({
  selector: 'app-tooltip',
  imports: [ZapTooltip, ZapTooltipHandler, ZapTooltipContent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {}
