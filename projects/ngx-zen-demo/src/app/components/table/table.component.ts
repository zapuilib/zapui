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
    {
      markdown: `\`\`\`html
  <ngx-zen-table [selectable]="true">
    <ngx-zen-table-head [selectable]="true">
      <ngx-zen-table-column>Name</ngx-zen-table-column>
      <ngx-zen-table-column>Email</ngx-zen-table-column>
      <ngx-zen-table-column>Status</ngx-zen-table-column>
    </ngx-zen-table-head>
    <ngx-zen-table-body [selectable]="true">
      <ngx-zen-table-row
        [selectable]="true"
        [selected]="selected"
        [index]="index"
      >
        <ngx-zen-table-cell>John Doe</ngx-zen-table-cell>
        <ngx-zen-table-cell>john@example.com</ngx-zen-table-cell>
        <ngx-zen-table-cell>
          <ngx-zen-chip [type]="'success'">Active</ngx-zen-chip>
        </ngx-zen-table-cell>
      </ngx-zen-table-row>
    </ngx-zen-table-body>
  </ngx-zen-table>
  \`\`\``,
      title: 'Table with Checkboxes',
    }
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
  
  selectedIndexes = new Set<number>();

  onSelectAll(checked: boolean) {
    console.log('Select All Event:', { checked });
    
    if (checked) {
      this.tableData.forEach((_, index) => this.selectedIndexes.add(index));
    } else {
      this.selectedIndexes.clear();
    }

    console.log('After Select All:', {
      selectedIndexes: Array.from(this.selectedIndexes),
      selectedRows: this.tableData.filter((_, index) => 
        this.selectedIndexes.has(index)
      )
    });
  }

  onRowSelect(index: number) {
    console.log('Row Select Event:', { index });
    
    if (this.selectedIndexes.has(index)) {
      this.selectedIndexes.delete(index);
    } else {
      this.selectedIndexes.add(index);
    }

    console.log('After Row Select:', {
      selectedIndexes: Array.from(this.selectedIndexes),
      selectedRow: this.tableData[index],
      allSelectedRows: this.tableData.filter((_, i) => 
        this.selectedIndexes.has(i)
      )
    });
  }
}
