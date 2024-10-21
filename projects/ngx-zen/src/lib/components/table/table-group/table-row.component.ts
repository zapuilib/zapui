import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { TableCellComponent } from './table-cell.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: '<ng-content></ng-content>'
})
export class TableRowComponent {
  @Input() item: any;
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;
}