// projects/ngx-zen/src/lib/components/table/table-group/table-body.component.ts

import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-body',
  template: `
    <tbody>
      <ng-content select="ngx-zen-table-row"></ng-content>
    </tbody>
  `
})
export class TableBodyComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}