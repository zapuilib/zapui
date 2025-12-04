import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGINATION_SHAPE_TOKEN } from '../pagination-shape.token';

@Component({
  selector: 'zap-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers: [
    {
      provide: PAGINATION_SHAPE_TOKEN,
      useFactory: (component: ZapPagination) => component.shape(),
      deps: [ZapPagination],
    },
  ],
})
export class ZapPagination {
  shape = input<'pill' | 'curve' | 'flat'>();
  zapClass = input<string>('');

  get classes(): string[] {
    return [this.shape() ?? '', this.zapClass()].filter((cls) => cls);
  }
}
