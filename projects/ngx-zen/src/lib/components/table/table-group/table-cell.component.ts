// /table/components/table-group/cell.component.ts
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-cell',
  template: `
    <td class="__zen__table__cell" [ngClass]="[size]">
      <ng-content></ng-content>
    </td>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableCellComponent {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() width: string = '';
  @HostBinding('style.width') get getWidth() {
    return this.width;
  }
}
