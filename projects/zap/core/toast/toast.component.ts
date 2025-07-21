import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, input, output } from '@angular/core';

import { DISMISS_THRESHOLD } from './toast.constant';

@Component({
  selector: 'zap-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ZapToast {
  dismiss = output();
  actioned = output();
  actionedFn = input<() => void>(() => {
    return;
  });
  title = input();
  text = input();
  action = input();
  shape = input<'pill' | 'flat' | 'curve'>();
  zapClass = input('');
  type = input<'error' | 'default'>('default');
  position = input<'top' | 'top-l' | 'top-r' | 'bottom' | 'bottom-l' | 'bottom-r'>('bottom');
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getEventX(event);
    this.startY = this.getEventY(event);
    this.el.nativeElement.style.transition = 'none';
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const pos = this.position();
    if (pos === 'top' || pos === 'bottom') {
      const y = this.getEventY(event);
      this.currentY = y - this.startY;
      if (pos === 'top' && this.currentY > 0) this.currentY = 0;
      if (pos === 'bottom' && this.currentY < 0) this.currentY = 0;
      this.el.nativeElement.style.transform = `translate(-50%, ${this.currentY}px)`;
    } else if (pos === 'top-l' || pos === 'bottom-l') {
      const x = this.getEventX(event);
      this.currentX = x - this.startX;
      if (this.currentX > 0) this.currentX = 0;
      this.el.nativeElement.style.transform = `translateX(${this.currentX}px)`;
    } else if (pos === 'top-r' || pos === 'bottom-r') {
      const x = this.getEventX(event);
      this.currentX = x - this.startX;
      if (this.currentX < 0) this.currentX = 0;
      this.el.nativeElement.style.transform = `translateX(${this.currentX}px)`;
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.el.nativeElement.style.transition = 'all 0.3s ease-in-out';
    const pos = this.position();
    let shouldDismiss = false;
    const threshold = pos === 'top' || pos === 'bottom' ? 20 : DISMISS_THRESHOLD;
    if (pos === 'top' && Math.abs(this.currentY) >= threshold && this.currentY < 0) {
      shouldDismiss = true;
    } else if (pos === 'bottom' && Math.abs(this.currentY) >= threshold && this.currentY > 0) {
      shouldDismiss = true;
    } else if (
      (pos === 'top-l' || pos === 'bottom-l') &&
      Math.abs(this.currentX) >= DISMISS_THRESHOLD &&
      this.currentX < 0
    ) {
      shouldDismiss = true;
    } else if (
      (pos === 'top-r' || pos === 'bottom-r') &&
      Math.abs(this.currentX) >= DISMISS_THRESHOLD &&
      this.currentX > 0
    ) {
      shouldDismiss = true;
    }
    if (shouldDismiss) {
      this.handleDismiss();
    } else {
      if (pos === 'top' || pos === 'bottom') {
        this.el.nativeElement.style.transform = 'translate(-50%, 0)';
      } else {
        this.el.nativeElement.style.transform = 'translateX(0)';
      }
    }
    this.currentX = 0;
    this.currentY = 0;
  }

  private getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }
  private getEventY(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
  }

  get classes(): string[] {
    return [this.shape() ?? '', this.type() ?? '', this.zapClass()].filter(
      (cls) => cls && cls !== 'default',
    );
  }

  handleDismiss() {
    this.dismiss.emit();
  }

  handleActionClick() {
    if (this.actioned instanceof EventEmitter) {
      this.actioned.emit();
    } else if (typeof this.actioned === 'function') {
      this.actionedFn()?.();
    }
  }
}
