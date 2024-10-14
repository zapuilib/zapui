import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnDef } from 'projects/ngx-zen/src/lib/interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-table [columns]="basicColumns" [data]="basicData"></ngx-zen-table>
  \`\`\``,
      title: 'Basic table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [columns]="sortableColumns" [data]="sortableData" [sortable]="true"></ngx-zen-table>
  \`\`\``,
      title: 'Sortable table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [columns]="selectableColumns" [data]="selectableData" [selectable]="true"></ngx-zen-table>
  \`\`\``,
      title: 'Selectable table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [columns]="paginatedColumns" [data]="paginatedData" [pageSize]="5"></ngx-zen-table>
  \`\`\``,
      title: 'Paginated table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [columns]="customColumns" [data]="customData"></ngx-zen-table>
  \`\`\``,
      title: 'Table with custom column types',
    },
  ];

  basicColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  basicData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  sortableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
  ];

  sortableData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ];

  selectableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'department', header: 'Department' },
  ];

  selectableData = [
    { id: 1, name: 'John Doe', department: 'IT' },
    { id: 2, name: 'Jane Smith', department: 'HR' },
    { id: 3, name: 'Bob Johnson', department: 'Finance' },
  ];

  paginatedColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'city', header: 'City' },
  ];

  paginatedData = [
    { id: 1, name: 'John Doe', city: 'New York' },
    { id: 2, name: 'Jane Smith', city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', city: 'Chicago' },
    { id: 4, name: 'Alice Brown', city: 'Houston' },
    { id: 5, name: 'Charlie Davis', city: 'Phoenix' },
    { id: 6, name: 'Eva White', city: 'Philadelphia' },
  ];

  customColumns: ColumnDef[] = [
    { key: 'id', header: 'ID', type: 'number' },
    { key: 'name', header: 'Name', type: 'text' },
    {
      key: 'birthDate',
      header: 'Birth Date',
      type: 'date',
      format: 'MM/dd/yyyy',
    },
    {
      key: 'actions',
      header: 'Actions',
      type: 'custom',
      customComponent: 'ActionButtonsComponent',
    },
  ];

  customData = [
    { id: 1, name: 'John Doe', birthDate: new Date(1990, 0, 1) },
    { id: 2, name: 'Jane Smith', birthDate: new Date(1992, 5, 15) },
    { id: 3, name: 'Bob Johnson', birthDate: new Date(1988, 11, 31) },
  ];

  constructor(private route: ActivatedRoute) {}
}
