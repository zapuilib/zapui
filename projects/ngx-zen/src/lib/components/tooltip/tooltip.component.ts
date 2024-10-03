import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() positionX: 'left' | 'right' = 'right';
  @Input() positionY: 'top' | 'bottom' = 'bottom';
  @Input() triggerType: 'hover' | 'click' = 'hover';
  @Input() zenClass: string = '';
  isActive: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.triggerType === 'click' && this.isActive) {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.content__wrapper') &&
        !target.closest('.icon__wrapper')
      ) {
        this.isActive = false;
      }
    }
  }

  constructor() {}

  toggle() {
    this.isActive = !this.isActive;
  }
}
