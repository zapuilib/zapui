import { Component, Optional, Host, Input, Output, EventEmitter } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th 
      class="table-cell" 
      [ngClass]="[
        table?.size || '',
        sortable ? 'sortable' : '',
        currentSortDirection ? 'sorting-' + currentSortDirection : ''
      ]" 
      [ngStyle]="getColumnStyle()"
      (click)="onSort()"
    >
      <div class="column-content">
        <ng-content></ng-content>
        @if (sortable) {
          <span class="sort-icon">
            @if (currentSortDirection === 'asc') {
              ↑
            } @else if (currentSortDirection === 'desc') {
              ↓
            } @else {
              ⇅
            }
          </span>
        }
      </div>
    </th>
  `,
  styleUrls: ['./table-component.style.scss'],
  styles: [`
    .column-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .sort-icon {
      opacity: 0.5;
      font-size: 0.875rem;
    }
    .sorting-asc .sort-icon,
    .sorting-desc .sort-icon {
      opacity: 1;
    }
    .sortable:hover .sort-icon {
      opacity: 0.8;
    }
  `]
})
export class TableColumnComponent {
  @Input() width: string = 'auto';
  @Input() sortable: boolean = false;
  @Input() field: string = '';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  
  currentSortDirection: 'asc' | 'desc' | null = null;
  
  constructor(@Optional() @Host() public table: TableComponent) {}

  getColumnStyle(): Record<string, string> {
    return {
      ...this.table?.getTableCellStyle(),
      width: this.width,
      'text-align': this.align,
      cursor: this.sortable ? 'pointer' : 'default'
    };
  }

  onSort(): void {
    if (!this.sortable) return;

    if (!this.currentSortDirection) {
      this.currentSortDirection = 'asc';
    } else if (this.currentSortDirection === 'asc') {
      this.currentSortDirection = 'desc';
    } else {
      this.currentSortDirection = null;
    }

    if (this.table) {
      this.table.onSortChange({
        field: this.field,
        direction: this.currentSortDirection || 'asc'
      });
    }
  }
}