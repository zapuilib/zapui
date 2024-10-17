import { Component, Input } from '@angular/core';
import { TableColumnComponent } from './table-column.component';

@Component({
  selector: 'ngx-zen-table-cell',
  template: '<ng-content></ng-content>'
})
export class TableCellComponent {
  @Input() column!: TableColumnComponent;
}