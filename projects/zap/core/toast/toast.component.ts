import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { DISMISS_THRESHOLD } from './toast.constant';

@Component({
  selector: 'zap-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ZapToast {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Output() actioned?: any = new EventEmitter<void>();
  @Input() title!: string;
  @Input() text!: string;
  @Input() action!: string;
  @Input() shape!: 'pill' | 'flat' | 'curve';
  @Input() zapClass!: string;
  @Input() type: 'error' | 'default' = 'default';
  private isDragging = false;
  private startX = 0;
  private currentX = 0;
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getEventX(event);
    this.el.nativeElement.style.transition = 'none';
  }
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const x = this.getEventX(event);
    this.currentX = x - this.startX;

    if (this.currentX < 0) this.currentX = 0;

    if (this.el.nativeElement.parentElement === document.body) {
      this.el.nativeElement.style.transform = `translateX(${this.currentX}px)`;
    }
  }
  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.el.nativeElement.style.transition = 'all 0.3s ease-in-out';

    if (this.currentX >= DISMISS_THRESHOLD) {
      this.handleDismiss();
    } else {
      this.el.nativeElement.style.transform = 'translateX(0)';
    }
  }

  constructor(private el: ElementRef) {}

  private getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  get classes(): string[] {
    return [this.shape, this.type, this.zapClass].filter((cls) => cls && cls !== 'default');
  }

  handleDismiss() {
    this.dismiss.emit();
  }

  handleActionClick() {
    if (this.actioned instanceof EventEmitter) {
      this.actioned.emit();
    } else if (typeof this.actioned === 'function') {
      this.actioned();
    }
  }
}
