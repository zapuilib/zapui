import { Component } from '@angular/core';

interface TableData {
  name: string;
  email: string;
  status: string;
  [key: string]: string; // This is the index signature that allows string indexing
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-table
  title="Basic Table"
>
  <ngx-zen-table-head>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
    <ngx-zen-table-column>Status</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>John Doe</ngx-zen-table-cell>
      <ngx-zen-table-cell>john@example.com</ngx-zen-table-cell>
      <ngx-zen-table-cell>Active</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
      title: 'Basic Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table
  title="Table"
  subtitle="Table type 1"
>
  <ngx-zen-table-head>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>John Doe</ngx-zen-table-cell>
      <ngx-zen-table-cell>john@example.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
      title: 'Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table
  title="Non-interactive Table"
  [disabled]="true"
>
  <!-- table content -->
</ngx-zen-table>
\`\`\``,
      title: 'Non-interactive Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table title="Table with Components">
  <ngx-zen-table-head>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Status</ngx-zen-table-column>
    <ngx-zen-table-column>Actions</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>
        <ngx-zen-input value="John Doe"></ngx-zen-input>
      </ngx-zen-table-cell>
      <ngx-zen-table-cell>
        <ngx-zen-chip>Active</ngx-zen-chip>
      </ngx-zen-table-cell>
      <ngx-zen-table-cell>
        <ngx-zen-button>Edit</ngx-zen-button>
      </ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
      title: 'Table with Components',
    },
  ];

  tableData: TableData[] = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  onSort(event: { field: string; direction: 'asc' | 'desc' }) {
    this.tableData = [...this.tableData].sort((a: TableData, b: TableData) => {
      if (event.direction === 'asc') {
        return a[event.field] > b[event.field] ? 1 : -1;
      } else {
        return a[event.field] < b[event.field] ? 1 : -1;
      }
    });
  }
}
