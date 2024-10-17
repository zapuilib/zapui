import { Component, Input, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-column',
  template: ''
})
export class TableColumnComponent {
  @Input() header: string = '';
  @Input() field: string = '';
  @Input() sortable: boolean = false;
  sortDirection: 'asc' | 'desc' | '' = '';

  @ContentChild(TemplateRef) customTemplate!: TemplateRef<any>;
}