// /table/components/table-group/cell.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-cell',
  template: `
    <td 
      class="__zen__table__cell"
      [ngClass]="[size]"
    >
      <ng-content></ng-content>
    </td>
  `,
   styleUrls: ['./table-component.style.scss']
})
export class TableCellComponent {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
}