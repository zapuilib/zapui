// projects/ngx-zen/src/lib/components/table/table-group/table-row.component.ts

import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: `
    <tr [ngClass]="{'hover:bg-gray-100': table?.hoverable}">
      <ng-content select="ngx-zen-table-cell"></ng-content>
    </tr>
  `
})
export class TableRowComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}