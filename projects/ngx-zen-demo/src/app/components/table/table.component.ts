import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-table>
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Example Name</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>example&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Basic Table'
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [hoverable]="true">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Example Name</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>example&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Hoverable Table'
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [striped]="true">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row [index]="0">
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>First Row</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>first&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
    <ngx-zen-table-row [index]="1">
      <ngx-zen-table-cell>2</ngx-zen-table-cell>
      <ngx-zen-table-cell>Second Row</ngx-zen-table-cell>
      <ngx-zen-table-cell>32</ngx-zen-table-cell>
      <ngx-zen-table-cell>second&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Striped Table'
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table size="compact">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Compact Row</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>compact&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Compact Table'
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table shape="curve">
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column>Name</ngx-zen-table-column>
    <ngx-zen-table-column>Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Curved Table</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>curved&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Curved Table'
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table>
  <ngx-zen-table-head>
    <ngx-zen-table-column>ID</ngx-zen-table-column>
    <ngx-zen-table-column [sortable]="true" field="name">Name</ngx-zen-table-column>
    <ngx-zen-table-column [sortable]="true" field="age">Age</ngx-zen-table-column>
    <ngx-zen-table-column>Email</ngx-zen-table-column>
  </ngx-zen-table-head>
  <ngx-zen-table-body>
    <ngx-zen-table-row>
      <ngx-zen-table-cell>1</ngx-zen-table-cell>
      <ngx-zen-table-cell>Sortable Example</ngx-zen-table-cell>
      <ngx-zen-table-cell>28</ngx-zen-table-cell>
      <ngx-zen-table-cell>sortable&#64;mail.com</ngx-zen-table-cell>
    </ngx-zen-table-row>
  </ngx-zen-table-body>
</ngx-zen-table>\`\`\``,
      title: 'Sortable Columns'
    }
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