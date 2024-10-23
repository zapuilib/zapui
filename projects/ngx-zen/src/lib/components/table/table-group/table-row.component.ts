import { 
  Component, 
  Input, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  ViewEncapsulation
} from '@angular/core';

import { TableCellComponent } from './table-cell.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: `
    <tr 
      class="__zen__table__row"
    >
      <ng-content></ng-content>
    </tr>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableRowComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';

  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;

  ngAfterContentInit() {
    if (this.cells) {
      this.cells.forEach(cell => {
        cell.size = this.size;
      });
    }
  }
}