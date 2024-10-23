import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th class="__zen__table__column" (click)="onSort()">
      <ng-content></ng-content>
      @if (sortable) {
      <span class="sort-icon">
        <i
          [class]="
            sortDirection === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'
          "
        ></i>
      </span>
      }
    </th>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableColumnComponent {
  @Output() sort = new EventEmitter<{
    field: string;
    direction: 'asc' | 'desc';
  }>();
  @Input() field: string = '';
  @Input() sortable: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() width: string = '';
  @HostBinding('style.width') get getWidth() {
    return this.width;
  }
  index: number = 0;
  isHeader: boolean = false;
  sortDirection: 'asc' | 'desc' | null = null;

  onSort() {
    if (!this.sortable) return;

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sort.emit({
      field: this.field,
      direction: this.sortDirection,
    });
  }
}
