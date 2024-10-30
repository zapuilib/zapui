import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit, 
  ViewEncapsulation,
  TemplateRef 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableConfig, TableColumn, TableState } from '../../interfaces/table.interface';

@Component({
  selector: 'ngx-zen-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule]
})
export class CustomTableComponent implements OnInit {
  // Inputs
  @Input() data: any[] = [];
  @Input() config: TableConfig = { columns: [] };
  
  // Outputs
  @Output() rowSelect = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  // Internal state
  tableState: TableState = {
    selectedRows: [],
    sortColumn: undefined,
    sortDirection: undefined
  };

  // Getters for computed properties
  get visibleColumns(): TableColumn[] {
    return this.config.columns.filter(col => !col.hidden);
  }

  constructor() {}

  ngOnInit() {
    this.initializeTable();
  }

  private initializeTable(): void {
    // Initialize default configuration if not provided
    this.config = {
      ...{
        selectable: false,
        striped: false,
        hoverable: true,
        size: 'default',
        theme: 'light'
      },
      ...this.config
    };
  }

  // Row selection handler
  onRowSelect(row: any): void {
    if (!this.config.selectable) return;
    
    const index = this.tableState.selectedRows.indexOf(row);
    if (index > -1) {
      this.tableState.selectedRows.splice(index, 1);
    } else {
      this.tableState.selectedRows.push(row);
    }
    this.rowSelect.emit(this.tableState.selectedRows);
  }

  // Sort handler
  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.tableState.sortColumn === column.key) {
      this.tableState.sortDirection = this.tableState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.tableState.sortColumn = column.key;
      this.tableState.sortDirection = 'asc';
    }

    this.sortChange.emit({
      column: this.tableState.sortColumn,
      direction: this.tableState.sortDirection
    });
  }

  // Row click handler
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  // Utility method to check if row is selected
  isSelected(row: any): boolean {
    return this.tableState.selectedRows.includes(row);
  }
} 