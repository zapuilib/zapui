import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'zap-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div #content class="zap__tooltip__content" [ngClass]="classes">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./tooltip-content.component.scss'],
})
export class ZapTooltipContent {
  @ViewChild('content', { static: true }) contentElement!: ElementRef;
  @Input() zapClass = '';
  @Input() shape: 'curve' | 'pill' | 'flat' = 'flat';

  get classes(): string[] {
    return [this.shape, this.zapClass].filter((cls) => cls && cls !== 'default');
  }
}
