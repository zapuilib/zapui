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
<ngx-zen-table [hoverable]="true" [striped]="true" size="default">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Alice</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>alice@example.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>2</ngx-zen-table-cell>
      <ngx-zen-table-cell>Bob</ngx-zen-table-cell>
      <ngx-zen-table-cell>35</ngx-zen-table-cell>
      <ngx-zen-table-cell>bob@example.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
      title: 'Hoverable and Striped Table',
      config: {
        hoverable: true,
        striped: true,
        size: 'default',
      },
      rows: [
        { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 35, email: 'bob@example.com' },
      ],
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [borderless]="true" size="compact">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Alice</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>alice@example.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>
\`\`\``,
      title: 'Borderless Compact Table',
      config: {
        borderless: true,
        size: 'compact',
      },
      rows: [
        { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
      ],
    },
  ];

  onSelectionChange(selectedRows: any[]) {
    console.log('Selected rows:', selectedRows);
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }) {
    console.log('Sort change event:', event);
  }

  getConfigFromMarkdown(markdown: any) {
    return markdown.config || {};
  }
}
