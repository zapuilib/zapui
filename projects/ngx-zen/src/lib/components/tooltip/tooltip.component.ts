import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() positionX: 'left' | 'x-center' | 'right' = 'right';
  @Input() positionY: 'top' | 'y-center' | 'bottom' = 'bottom';
  @Input() zenClass: string = '';
  triggerType: 'hover' | 'click' = 'hover';
  isActive: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.isActive) {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.content__wrapper') &&
        !target.closest('.icon__wrapper')
      ) {
        this.isActive = false;
      }
    }
  }

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  ngOnInit(): void {
    this.triggerType = window.innerWidth < 768 ? 'click' : 'hover';
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
