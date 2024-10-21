import { Component, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, Inject } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { TableHeaderComponent } from './table-group/table-header.component';
import { TableBodyComponent } from './table-group/table-body.component';
import { TableFooterComponent } from './table-group/table-footer.component';
import { TableRowComponent } from './table-group/table-row.component';
import { TableColumnComponent } from './table-group/table-column.component';
import { TableCellComponent } from './table-group/table-cell.component';
import { ColorUtility } from '../../utilities/color.utility';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() zenClass: string = '';
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() striped: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() borderless: boolean = false;
  @Input() searchable: boolean = false;
  @Input() sortable: boolean = false;
  @Input() searchTerm: string = '';
  @Input() selectable: boolean = false;
  @Output() sortChange = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();

  @ContentChild(TableHeaderComponent) header!: TableHeaderComponent;
  @ContentChild(TableBodyComponent) body!: TableBodyComponent;
  @ContentChild(TableFooterComponent) footer!: TableFooterComponent;
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;
  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;
  
  currentSortColumn: string | null = null;
  currentSortDirection: 'asc' | 'desc' = 'asc';
  selectedRows: any[] = [];
  filteredData: any[] = [];

  searchControl: FormControl = new FormControl('');

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}
  
  ngOnInit() {
    this.filteredData = this.data;
  }

  getTableClass(): string {
    return [
      this.zenClass,
      this.size,
      this.shape,
      this.striped ? 'striped' : '',
      this.hoverable ? 'hoverable' : '',
      this.borderless ? 'borderless' : ''
    ].filter(Boolean).join(' ');
  }

  getFontSize(): string {
    switch (this.size) {
      case 'compact': return this.config.fontSize.sm;
      case 'large': return this.config.fontSize.lg;
      default: return this.config.fontSize.md;
    }
  }

  getHeaderStyle(): Record<string, string> {
    return {
      backgroundColor: this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.1),
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }

  getRowStyle(isEven: boolean): Record<string, string> {
    if (this.striped && isEven) {
      return {
        backgroundColor: this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.05),
      };
    }
    return {};
  }

  getCellStyle(): Record<string, string> {
    return {};
  }

  onRowSelect(row: any) {
    const index = this.selectedRows.findIndex(r => r === row);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.selectionChange.emit(this.selectedRows);
  }

  isSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  onSelectAll() {
    if (this.selectedRows.length === this.data.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.data];
    }
    this.selectionChange.emit(this.selectedRows);
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredData = this.data;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredData = this.data.filter(item =>
        Object.values(item).some(val =>
          this.stringifyValue(val).toLowerCase().includes(searchTermLower)
        )
      );
    }
  }
  
  private stringifyValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    return '';
  }

  onSort(column: string) {
    if (this.sortable) {
      if (this.currentSortColumn === column) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.currentSortColumn = column;
        this.currentSortDirection = 'asc';
      }

      this.sortData();
      this.sortChange.emit({ column: this.currentSortColumn, direction: this.currentSortDirection });
    }
  }

  private sortData() {
    if (this.currentSortColumn) {
      this.filteredData.sort((a, b) => {
        const valueA = a[this.currentSortColumn!];
        const valueB = b[this.currentSortColumn!];
        
        if (valueA < valueB) return this.currentSortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.currentSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }
}