import { Component, Inject, input, output, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGINATION_SHAPE_TOKEN } from '../pagination-shape.token';

@Component({
  selector: 'zap-pagination-link',
  imports: [CommonModule],
  templateUrl: './pagination-link.component.html',
  styleUrl: './pagination-link.component.scss',
  host: {
    '[class]': 'classes',
  },
})
export class ZapPaginationLink {
  page = input<number>(1);
  active = input<boolean>(false);
  disabled = input<boolean>(false);
  itemClick = output<number>();

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
      this.itemClick.emit(this.page());
    }
  }
}
