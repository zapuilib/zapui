import { Component, ContentChild, ContentChildren, QueryList, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TableHeaderComponent } from './table-group/table-header.component';
import { TableBodyComponent } from './table-group/table-body.component';
import { TableFooterComponent } from './table-group/table-footer.component';
import { TableRowComponent } from './table-group/table-row.component';
import { TableColumnComponent } from './table-group/table-column.component';
import { TableCellComponent } from './table-group/table-cell.component';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ContentChild(TableHeaderComponent) header!: TableHeaderComponent;
  @ContentChild(TableBodyComponent) body!: TableBodyComponent;
  @ContentChild(TableFooterComponent) footer!: TableFooterComponent;
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;
  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;
  
  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();
  
  @Input() data: any[] = [];
  @Input() columnDefinitions: {field: string, header: string, sortable?: boolean}[] = [];
 
  @Input() zenClass: string = '';
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() sortable: boolean = true;
  @Input() pageable: boolean = true;
  @Input() pageSize: number = 10;
  @Input() selectable: boolean = false;
  
  
  currentPage: number = 1;
  selectedRows: any[] = [];
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  ngOnInit(): void {
    // Initialize component if needed
  }

  getHeaderStyle(): Record<string, string> {
    return {
      'background-color': this.config.colors.secondary,
      'color': this.config.colors.primary,
      'font-size': this.getFontSize(),
      'padding': this.getPadding()
    };
  }

  getCellStyle(): Record<string, string> {
    return {
      'font-size': this.getFontSize(),
      'padding': this.getPadding(),
      'border-bottom': `1px solid ${this.config.colors.quaternary}`
    };
  }

  getRowStyle(index: number): Record<string, string> {
    return {
      'background-color': index % 2 === 0 ? this.config.colors.primary : this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.1)
    };
  }

  onSort(column: string): void {
    if (this.sortable && this.columns.find(col => col.field === column)?.sortable !== false) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      this.sortChange.emit({ column, direction: this.sortDirection });
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  onRowSelect(row: any): void {
    if (this.selectable) {
      const index = this.selectedRows.indexOf(row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(row);
      }
      this.selectionChange.emit(this.selectedRows);
    }
  }

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  }

  private getFontSize(): string {
    switch(this.size) {
      case 'compact': return this.config.fontSize.sm;
      case 'large': return this.config.fontSize.lg;
      default: return this.config.fontSize.md;
    }
  }

  private getPadding(): string {
    switch(this.size) {
      case 'compact': return '0.5rem';
      case 'large': return '1rem';
      default: return '0.75rem';
    }
  }
}