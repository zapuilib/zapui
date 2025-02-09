import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

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
  @ViewChild('content', { static: true }) content!: ElementRef;
  @Input() zapClass: string = '';
  //TODO: Support custom positioning, e.g. top, bottom, left, right default to auto with dynamic positioning based on available space, also the position should not be relative to the parent element, but to the viewport

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
