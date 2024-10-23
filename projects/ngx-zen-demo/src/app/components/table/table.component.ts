import { Component } from '@angular/core';

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

  // Example data for dynamic tables
  tableData = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    {
      name: 'Jane Smith',
      email:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      status: 'Inactive',
    },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];
}
