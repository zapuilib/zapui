import { Component } from '@angular/core';
import { TableComponent as NgxZenTableComponent } from 'ngx-zen';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
}

type ColumnDefinitions = {
  field: keyof User;
  header: string;
  sortable: boolean;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, city: 'Chicago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 27, city: 'Houston' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, city: 'Phoenix' },
  ];

  columnDefinitions: ColumnDefinitions[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'age', header: 'Age', sortable: true },
    { field: 'city', header: 'City', sortable: true }
  ];

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  constructor() {
    console.log('Users Data:', this.users);
  }

  getUserProperty(user: User, field: keyof User): any {
    return user[field];
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.sortColumn = event.column;
    this.sortDirection = event.direction;
    console.log('Sorting:', this.sortColumn, this.sortDirection);
  }

  onRowClick(row: User) {
    console.log('Row clicked:', row);
  }

  onSelectionChange(selectedRows: User[]) {
    console.log('Selected rows:', selectedRows);
  }

  onPageChange(page: number) {
    console.log('Page changed:', page);
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  trackByColumn(index: number, col: ColumnDefinitions): string {
    return col.field;
  }

markdowns = [
  {
    markdown: `\`\`\`html
<ngx-zen-table [data]="users" [sortable]="true" [selectable]="true" [pageSize]="3"
             (sortChange)="onSort($event)" (rowClick)="onRowClick($event)"
             (selectionChange)="onSelectionChange($event)" (pageChange)="onPageChange($event)">
<ngx-zen-table-header>
  <ngx-zen-table-column header="Name" field="name" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="Email" field="email" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="Age" field="age" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="City" field="city" [sortable]="true"></ngx-zen-table-column>
</ngx-zen-table-header>
<ngx-zen-table-body>
  @for (let user of users) {
    <ngx-zen-table-row [rowData]="user">
      <ngx-zen-table-cell>{{ user.name }}</ngx-zen-table-cell>
      <ngx-zen-table-cell>{{ user.email }}</ngx-zen-table-cell>
      <ngx-zen-table-cell>{{ user.age }}</ngx-zen-table-cell>
      <ngx-zen-table-cell>{{ user.city }}</ngx-zen-table-cell>
    </ngx-zen-table-row>
  }
</ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
    title: 'Basic Table',
  },
  {
    markdown: `\`\`\`html
<ngx-zen-table [data]="users" [sortable]="true" [selectable]="true" [pageSize]="3"
             (sortChange)="onSort($event)" (rowClick)="onRowClick($event)"
             (selectionChange)="onSelectionChange($event)" (pageChange)="onPageChange($event)">
<ngx-zen-table-header>
  <ngx-zen-table-column header="Name" field="name" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="Email" field="email" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="Age" field="age" [sortable]="true"></ngx-zen-table-column>
  <ngx-zen-table-column header="City" field="city" [sortable]="true"></ngx-zen-table-column>
</ngx-zen-table-header>
<ngx-zen-table-body>
  @for (let user of users) {
    <ngx-zen-table-row [rowData]="user">
      <ngx-zen-table-cell>
        <strong>{{ user.name }}</strong>
      </ngx-zen-table-cell>
      <ngx-zen-table-cell>
        <a href="mailto:{{ user.email }}">{{ user.email }}</a>
      </ngx-zen-table-cell>
      <ngx-zen-table-cell>
        <span [ngStyle]="{ 'color': user.age < 30 ? 'green' : 'blue' }">{{ user.age }}</span>
      </ngx-zen-table-cell>
      <ngx-zen-table-cell>{{ user.city }}</ngx-zen-table-cell>
    </ngx-zen-table-row>
  }
</ngx-zen-table-body>
<ngx-zen-table-footer>
  <tr>
    <td colspan="4">Total users: {{ users.length }}</td>
  </tr>
</ngx-zen-table-footer>
</ngx-zen-table>

\`\`\``,
    title: 'Custom Styled Table',
  }
];
}