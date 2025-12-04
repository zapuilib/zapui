import { Component, Inject, input, Optional, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGINATION_SHAPE_TOKEN } from '../pagination-shape.token';

@Component({
  selector: 'zap-pagination-next',
  imports: [CommonModule],
  templateUrl: './pagination-next.component.html',
  styleUrl: './pagination-next.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapPaginationNext {
  disabled = input<boolean>(false);
  itemClick = output<void>();

  constructor(
    @Inject(PAGINATION_SHAPE_TOKEN) @Optional() public shape: 'pill' | 'curve' | 'flat' | null,
  ) {}

  get classes(): string {
    return this.shape ? this.shape : '';
  }

  onClick(event: Event): void {
    if (!this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      this.itemClick.emit();
    }
  }
}
