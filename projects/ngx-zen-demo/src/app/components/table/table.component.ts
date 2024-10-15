import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-table [data]="tableData" [columns]="tableColumns"></ngx-zen-table>
\`\`\``,
      title: 'Basic Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" 
  [striped]="true">
</ngx-zen-table>
\`\`\``,
      title: 'Striped Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" 
  [hover]="true">
</ngx-zen-table>
\`\`\``,
      title: 'Hoverable Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" >
</ngx-zen-table>
\`\`\``,
      title: 'Bordered Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" 
  size="small">
</ngx-zen-table>
\`\`\``,
      title: 'Small Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" 
  size="large">
</ngx-zen-table>
\`\`\``,
      title: 'Large Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table 
  [data]="tableData" 
  [columns]="tableColumns" 
  (rowClick)="onRowClick($event)">
</ngx-zen-table>
\`\`\``,
      title: 'Table with Row Click',
    },
  ];

  tableData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
    { id: 4, name: 'Alice Brown', age: 28, city: 'Houston' },
    { id: 5, name: 'Mike Davis', age: 40, city: 'Philadelphia' },
  ];

  tableColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    { key: 'city', header: 'City' },
    { key: 'actions', header: 'Actions' },
  ];

  constructor(private route: ActivatedRoute) {}

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }
}