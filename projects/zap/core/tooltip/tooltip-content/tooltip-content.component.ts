import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'zap-tooltip-content',
  standalone: true,
  template: `<div #content class="zap__tooltip__content"><ng-content></ng-content></div>`,
  styleUrls: ['./tooltip-content.component.scss']
})
export class ZapTooltipContent {
  @ViewChild('content', { static: true }) content!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  show() {
    this.renderer.setStyle(this.content.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.content.nativeElement, 'visibility', 'visible');
  }

  hide() {
    this.renderer.setStyle(this.content.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.content.nativeElement, 'visibility', 'hidden');
  }
}
