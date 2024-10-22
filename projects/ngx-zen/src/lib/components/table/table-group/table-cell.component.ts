import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-cell',
  template: `
    <td [ngStyle]="table?.getTableCellStyle()">
      <ng-content></ng-content>
    </td>
  `
})
export class TableCellComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}