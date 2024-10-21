import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-column',
  template: ''
})
export class TableColumnComponent {
  @Input() field: string = '';
  @Input() header: string = '';
  @Input() sortable: boolean = false;
}