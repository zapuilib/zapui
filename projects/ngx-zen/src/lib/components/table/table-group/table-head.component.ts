// projects/ngx-zen/src/lib/components/table/table-group/table-head.component.ts

import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-head',
  template: `
    <thead [ngStyle]="table?.getTableHeadStyle()">
      <tr>
        <ng-content select="ngx-zen-table-column"></ng-content>
      </tr>
    </thead>
  `
})
export class TableHeadComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}