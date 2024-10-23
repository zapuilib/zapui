// /table/components/table-group/head.component.ts
import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation
} from '@angular/core';

import { TableColumnComponent } from './table-column.component';

@Component({
  selector: 'ngx-zen-table-head',
  template: `
    <thead class="__zen__table__head">
      <tr class="__zen__table__row">
        <ng-content></ng-content>
      </tr>
    </thead>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableHeadComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;

  ngAfterContentInit() {
    if (this.columns) {
      this.columns.forEach((column, index) => {
        column.size = this.size;
        column.index = index;
        column.isHeader = true;
      });
    }
  }
}