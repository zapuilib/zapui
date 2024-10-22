import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th [ngStyle]="table?.getTableCellStyle()">
      <ng-content></ng-content>
    </th>
  `
})
export class TableColumnComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}