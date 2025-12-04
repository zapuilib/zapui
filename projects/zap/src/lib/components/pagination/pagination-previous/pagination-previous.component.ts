import { Component, Inject, input, output, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGINATION_SHAPE_TOKEN } from '../pagination-shape.token';

@Component({
  selector: 'zap-pagination-previous',
  imports: [CommonModule],
  templateUrl: './pagination-previous.component.html',
  styleUrl: './pagination-previous.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapPaginationPrevious {
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
