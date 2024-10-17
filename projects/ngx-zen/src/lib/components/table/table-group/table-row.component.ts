import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import { TableCellComponent } from './table-cell.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: '<ng-content></ng-content>'
})
export class TableRowComponent {
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;
  @Input() rowData: any;
}