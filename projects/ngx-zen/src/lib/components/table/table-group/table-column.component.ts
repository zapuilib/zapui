import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th 
      class="__zen__table__column"
      [ngClass]="{ 
        'sortable': sortable,
        'asc': sortDirection === 'asc',
        'desc': sortDirection === 'desc'
      }"
      (click)="onSort()"
    >
      <ng-content></ng-content>
      @if (sortable) {
        <span class="sort-icon">
          <i [class]="sortDirection === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </span>
      }
    </th>
  `,
  styleUrls: ['./table-component.style.scss']

})
export class TableColumnComponent {
  @Input() field: string = '';
  @Input() sortable: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() width: string = '';
  @Output() sort = new EventEmitter<{field: string, direction: 'asc' | 'desc'}>();

  index: number = 0;
  isHeader: boolean = false;
  sortDirection: 'asc' | 'desc' | null = null;

  onSort() {
    if (!this.sortable) return;

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sort.emit({
      field: this.field,
      direction: this.sortDirection
    });
  }
}