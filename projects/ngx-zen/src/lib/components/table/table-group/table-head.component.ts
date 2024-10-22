import { Component, Optional, Host } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-head',
  template: `
    <thead class="table-head" [ngStyle]="table?.getTableHeadStyle()">
      <tr>
        <ng-content select="ngx-zen-table-column"></ng-content>
      </tr>
    </thead>
  `,
  styleUrls: ['./table-component.style.scss']
})
export class TableHeadComponent {
  constructor(@Optional() @Host() public table: TableComponent) {}
}