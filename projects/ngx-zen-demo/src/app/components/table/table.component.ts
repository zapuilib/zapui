import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: Array<{ label: string, key: string, class?: string }> = [];
  @Input() data: Array<any> = [];
  @Input() zenClass: string = '';
}
