import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TableColumnComponent } from './table-column.component';

@Component({
  selector: 'ngx-zen-table-header',
  template: '<ng-content></ng-content>'
})
export class TableHeaderComponent implements AfterContentInit {
  @ContentChildren(TableColumnComponent) columnComponents!: QueryList<TableColumnComponent>;
  columns: Map<string, TableColumnComponent> = new Map();

  ngAfterContentInit() {
    this.columnComponents.forEach(column => {
      this.columns.set(column.field, column);
    });
  }
}