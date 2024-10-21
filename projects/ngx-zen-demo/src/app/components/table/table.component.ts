import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  data = [
    { id: 1, name: 'Example one', age: 30, email: 'email@example.com' },
    { id: 2, name: 'Example two', age: 25, email: 'email@example.com' },
    { id: 3, name: 'Example three', age: 35, email: 'email@example.com' },
  
  ];
  selectedRows: any[] = [];

  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Basic Table',
      config: {}
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data" shape="curve">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Curved Table',
      config: { shape: 'curve' }
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data" [hoverable]="true">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Hoverable Table',
      config: { hoverable: true }
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data" [striped]="true">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Striped Table',
      config: { striped: true }
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data" [borderless]="true" [selectable]="true">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Borderless Table',
      config: { borderless: true, selectable: true }
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="data" [searchable]="true" [sortable]="true">
  <ngx-zen-table-column field="id" header="ID"></ngx-zen-table-column>
  <ngx-zen-table-column field="name" header="Name"></ngx-zen-table-column>
  <ngx-zen-table-column field="age" header="Age"></ngx-zen-table-column>
  <ngx-zen-table-column field="email" header="Email"></ngx-zen-table-column>
</ngx-zen-table>
\`\`\``,
      title: 'Searchable Table (With search input and icon)',
      config: { searchable: true }
    }
  ];

  onSelectionChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
    console.log('Selected rows:', this.selectedRows);
  }
}