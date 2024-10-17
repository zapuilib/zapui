import { Component, ContentChildren, QueryList } from '@angular/core';
import { TableRowComponent } from './table-row.component';

@Component({
  selector: 'ngx-zen-table-body',
  template: '<ng-content></ng-content>'
})
export class TableBodyComponent {
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;
}