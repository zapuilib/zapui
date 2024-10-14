import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColumnDef } from '../../interfaces/table.interface';


@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() sortable: boolean = false;
  @Input() selectable: boolean = false;
  @Input() pageSize: number = 0;
  @Input() zenClass: string = '';

  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getStyle() {
    return {
      'background-color': this.config.colors.secondary,
      color: this.config.colors.secondary,
      'border-color': this.config.colors.tertiary,
    };
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(column: string): void {
    // Implement sorting logic here
    this.sortChange.emit({ column, direction: 'asc' });
  }

  onSelectionChange(): void {
    // Implement selection logic here
    this.selectionChange.emit(this.data.filter(row => row.selected));
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}