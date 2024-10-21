import { Component, ContentChildren, QueryList } from '@angular/core';
import { TableColumnComponent } from './table-column.component';

@Component({
  selector: 'ngx-zen-table-header',
  template: `
    <thead>
      <tr>
        <ng-content></ng-content>
      </tr>
    </thead>
  `
})
export class TableHeaderComponent {
  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;
}