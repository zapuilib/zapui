import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-cell',
  template: '<ng-content></ng-content>'
})
export class TableCellComponent {
  @Input() field: string;
}