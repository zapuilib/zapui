import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'zap-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div #content class="zap__tooltip__content" [ngClass]="[zapClass]">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./tooltip-content.component.scss'],
})
export class ZapTooltipContent {
  @ViewChild('content', { static: true }) contentElement!: ElementRef;
  @Input() zapClass = '';
}
