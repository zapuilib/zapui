import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'zap-tooltip-content',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `<div #content class="zap__tooltip__content" [ngClass]="[zapClass]"><ng-content></ng-content></div>`,
  styleUrls: ['./tooltip-content.component.scss']
})
export class ZapTooltipContent {
  @ViewChild('content', { static: true }) content!: ElementRef;
  @Input() zapClass: string = ''; 

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
