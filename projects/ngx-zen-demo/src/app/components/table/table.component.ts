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
    },
    {
      markdown: `\`\`\`html
  <ngx-zen-table  class="advanced-table" title="Advanced Table (Sortable & Selectable)" [selectable]="true">
            <ngx-zen-table-head [selectable]="true" (selectAll)="onSelectAll($event)">
              <ngx-zen-table-column 
                [sortable]="true" 
                field="name"
                (sort)="onSort($event)">Name</ngx-zen-table-column>
              <ngx-zen-table-column 
                [sortable]="true" 
                field="email"
                (sort)="onSort($event)">Email</ngx-zen-table-column>
              <ngx-zen-table-column 
                [sortable]="true" 
                field="status"
                (sort)="onSort($event)">Status</ngx-zen-table-column>
            </ngx-zen-table-head>
            
            <ngx-zen-table-body [selectable]="true" (rowSelect)="onRowSelect($event)">
              @for (row of tableData; track row; let i = $index) {
                <ngx-zen-table-row 
                  [selectable]="true"
                  [selected]="selectedIndexes.has(i)"
                  [index]="i"
                >
                  <ngx-zen-table-cell>{{row.name}}</ngx-zen-table-cell>
                  <ngx-zen-table-cell>{{row.email}}</ngx-zen-table-cell>
                  <ngx-zen-table-cell>
                    <ngx-zen-chip [text]="row.status"></ngx-zen-chip>
                  </ngx-zen-table-cell>
                </ngx-zen-table-row>
              }
            </ngx-zen-table-body>
          </ngx-zen-table>
  \`\`\``,
      title: 'Advance Table',
    }
  ];

  tableData: TableData[] = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  advancedTableData = [
    { invoice: '33597', address: '5843 Schulis', date: 'Jun 03 2024', orderNumber: '82213', name: 'Runte, Wiegand and Pagac', status: 'Paid', dueDate: 'Jun 03 2024' },
    { invoice: '25788', address: '03539 Lilyan ', date: 'Sep 24 2024', orderNumber: '3328', name: 'Deckow - Conroy', status: 'Paid', dueDate: 'Sep 24 2024' },
    { invoice: '64708', address: '91791 Max Summit', date: 'Jul 06 2024', orderNumber: '16279', name: 'Hane Inc', status: 'Paid', dueDate: 'Jul 06 2024' },
    { invoice: '95321', address: '4793 Palma Springs', date: 'Feb 13 2024', orderNumber: '42248', name: 'Heller - Turner', status: 'Outstanding', dueDate: 'Feb 13 2024' },
    { invoice: '60733', address: '504 Dina Neck', date: 'Aug 27 2024', orderNumber: '89214', name: 'Daugherty', status: 'Outstanding', dueDate: 'Aug 27 2024' },
    { invoice: '58591', address: '07428 Easton ', date: 'Jul 07 2024', orderNumber: '11769', name: 'Botsford, Adams', status: 'Partially paid', dueDate: 'Jul 07 2024' },
    { invoice: '72493', address: '9680 Kelley ', date: 'Jun 15 2024', orderNumber: '66846', name: 'Kreiger and Sons', status: 'Past Due', dueDate: 'Jun 15 2024' },
    { invoice: '75181', address: '26629 General Street', date: 'Aug 14 2024', orderNumber: '74396', name: 'Cummerata', status: 'Past Due', dueDate: 'Aug 14 2024' },
    { invoice: '95580', address: '3077 Kemmer Lodge', date: 'Oct 30 2024', orderNumber: '37397', name: 'Bergnaum - Reilly', status: 'Past Due', dueDate: 'Oct 30 2024' },
    { invoice: '59318', address: '01263 Stuart Port', date: 'Jul 27 2024', orderNumber: '93365', name: 'Veum, O\'Hara ', status: 'Past Due', dueDate: 'Jul 27 2024' },
    { invoice: '85111', address: '4652 Aurelie', date: 'Dec 31 2023', orderNumber: '48718', name: 'Langosh - Adams', status: 'Past Due', dueDate: 'Dec 31 2023' },
    { invoice: '31919', address: '195 Ledner St', date: 'Apr 29 2024', orderNumber: '24050', name: 'Connelly - Rogahn', status: 'Past Due', dueDate: 'Apr 29 2024' },
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
      this.tableData && this.advancedTableData.forEach((_, index) => this.selectedIndexes.add(index));
    } else {
      this.selectedIndexes.clear();
    }

    console.log('After Select All:', {
      selectedIndexes: Array.from(this.selectedIndexes),
      selectedRows: (this.tableData && this.advancedTableData).filter((_, index) => 
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

    console.log(this.selectedIndexes);

  }
}
