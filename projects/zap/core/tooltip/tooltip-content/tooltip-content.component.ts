import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
  selector: 'zap-tooltip-content',
  imports: [CommonModule],
  template: `<div #content class="zap__tooltip__content" [ngClass]="classes">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./tooltip-content.component.scss'],
})
export class ZapTooltipContent {
  @ViewChild('content', { static: true }) contentElement!: ElementRef;
  zapClass = input('');
  shape = input<'curve' | 'pill' | 'flat'>();

  get classes(): string[] {
    return [this.shape() ?? '', this.zapClass()].filter((cls) => cls && cls !== 'default');
  }
}
