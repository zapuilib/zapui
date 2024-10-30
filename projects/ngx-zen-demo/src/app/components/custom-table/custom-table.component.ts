import { Component } from '@angular/core';
import { TableConfig } from 'ngx-zen';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  // Sample data
  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2024-03-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', date: '2024-03-19' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', date: '2024-03-18' },
  ];

  // Basic table configuration
  basicConfig: TableConfig = {
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email' },
      { key: 'status', header: 'Status' },
      { key: 'date', header: 'Date', type: 'date' }
    ]
  };

  // Advanced table configuration with selection and custom styling
  advancedConfig: TableConfig = {
    columns: [
      { key: 'name', header: 'Name', sortable: true, width: '30%' },
      { key: 'email', header: 'Email', sortable: true, width: '30%' },
      { key: 'status', header: 'Status', width: '20%' },
      { key: 'date', header: 'Date', type: 'date', width: '20%' }
    ],
    selectable: true,
    striped: true,
    hoverable: true,
    size: 'default',
    theme: 'light'
  };

  // Event handlers
  onRowSelect(rows: any[]): void {
    console.log('Selected rows:', rows);
  }

  onRowClick(row: any): void {
    console.log('Clicked row:', row);
  }

  onSortChange(event: {column: string, direction: 'asc' | 'desc'}): void {
    console.log('Sort changed:', event);
  }

  // Example markdowns for documentation
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-custom-table
  [data]="tableData"
  [config]="basicConfig"
></ngx-zen-custom-table>
      \`\`\``,
      title: 'Basic Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-custom-table
  [data]="tableData"
  [config]="advancedConfig"
  (rowSelect)="onRowSelect($event)"
  (rowClick)="onRowClick($event)"
  (sortChange)="onSortChange($event)"
></ngx-zen-custom-table>
      \`\`\``,
      title: 'Advanced Table with Events',
    }
  ];
} 