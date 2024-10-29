import { Component } from '@angular/core';

interface TableData {
  name: string;
  email: string;
  status: string;
  [key: string]: string; // This is the index signature that allows string indexing
}

interface AdvancedTableData {
  invoice: string;
  address: string;
  date: string;
  orderNumber: string;
  name: string;
  status: string;
  dueDate: string;
  paid: string;
  [key: string]: string;
}

interface ProjectData {
  calculationName: string;
  building: string;
  project: string;
  createdBy: {
    email: string;
    date: string;
  };
  energySavings: {
    value: number;
    unit: string;
  };
  costSavings: {
    value: number;
    unit: string;
  };
  totalCost: number;
  paybackPeriod: {
    value: number;
    unit: string;
  };
  status?: 'Highest' | 'Best' | 'Cheapest';
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
    },
  ];

  tableData: TableData[] = [
    { name: 'John Doe', email: 'john@example.com Runte, Wiegand and Pagac', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  advancedTableData: AdvancedTableData[] = [
    { invoice: '33597', address: '5843 Schulis', date: 'Jun 03 2024', orderNumber: '82213', name: 'Runte, Wiegand', status: 'Paid', dueDate: 'Jun 03 2024', paid: 'June 04 2024' },
    { invoice: '25788', address: '03539 Lilyan ', date: 'Sep 24 2024', orderNumber: '3328', name: 'Deckow - Conroy', status: 'Paid', dueDate: 'Sep 24 2024', paid: 'Sep 24 2024' },
    { invoice: '64708', address: '91791 Max Summit  Max Summit Max Summit Max Summit', date: 'Jul 06 2024', orderNumber: '16279', name: 'Hane Inc', status: 'Paid', dueDate: 'Jul 06 2024', paid: 'Jul 06 2024' },
    { invoice: '95321', address: '4793 Palma Springs', date: 'Feb 13 2024', orderNumber: '42248', name: 'Heller - Turner', status: 'Outstanding', dueDate: 'Feb 13 2024', paid: 'Feb 13 2024' },
    { invoice: '60733', address: '504 Dina Neck', date: 'Aug 27 2024', orderNumber: '89214', name: 'Daugherty', status: 'Outstanding', dueDate: 'Aug 27 2024', paid: 'Aug 27 2024' },
    { invoice: '58591', address: '07428 Easton ', date: 'Jul 07 2024', orderNumber: '11769', name: 'Botsford, Adams', status: 'Partially paid', dueDate: 'Jul 07 2024', paid: 'Jul 07 2024' },
    { invoice: '72493', address: '9680 Kelley ', date: 'Jun 15 2024', orderNumber: '66846', name: 'Kreiger and Sons', status: 'Past Due', dueDate: 'Jun 15 2024', paid: 'Jun 15 2024' },
    { invoice: '75181', address: '26629 General Street', date: 'Aug 14 2024', orderNumber: '74396', name: 'Cummerata', status: 'Past Due', dueDate: 'Aug 14 2024', paid: 'Aug 14 2024' },
    { invoice: '95580', address: '3077 Kemmer Lodge', date: 'Oct 30 2024', orderNumber: '37397', name: 'Bergnaum - Reilly', status: 'Past Due', dueDate: 'Oct 30 2024', paid: 'Oct 30 2024' },
    { invoice: '59318', address: '01263 Stuart Port', date: 'Jul 27 2024', orderNumber: '93365', name: 'Veum, O\'Hara ', status: 'Past Due', dueDate: 'Jul 27 2024', paid: 'Jul 27 2024' },
    { invoice: '85111', address: '4652 Aurelie', date: 'Dec 31 2023', orderNumber: '48718', name: 'Langosh - Adams', status: 'Past Due', dueDate: 'Dec 31 2023', paid: 'Dec 31 2023' },
    { invoice: '31919', address: '195 Ledner St', date: 'Apr 29 2024', orderNumber: '24050', name: 'Connelly - Rogahn', status: 'Past Due', dueDate: 'Apr 29 2024', paid: 'Apr 29 2024' },
  ];

  projectData: ProjectData[] = [
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 6732,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 673,
        unit: 'yr'
      },
      totalCost: 7300,
      paybackPeriod: {
        value: 10.8,
        unit: 'yrs'
      },
      status: 'Highest'
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 6534,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 650,
        unit: 'yr'
      },
      totalCost: 8778,
      paybackPeriod: {
        value: 13.5,
        unit: 'yrs'
      }
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 5872,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 858,
        unit: 'yr'
      },
      totalCost: 6355,
      paybackPeriod: {
        value: 7.4,
        unit: 'yrs'
      },
      status: 'Highest'
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 2534,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 472,
        unit: 'yr'
      },
      totalCost: 1378,
      paybackPeriod: {
        value: 2.9,
        unit: 'yrs'
      },
      status: 'Best'
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 4054,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 400,
        unit: 'yr'
      },
      totalCost: 4778,
      paybackPeriod: {
        value: 11.9,
        unit: 'yrs'
      },
      status: 'Cheapest'
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am'
      },
      energySavings: {
        value: 5234,
        unit: 'kWh/yr'
      },
      costSavings: {
        value: 258,
        unit: 'yr'
      },
      totalCost: 5258,
      paybackPeriod: {
        value: 20.3,
        unit: 'yrs'
      }
    }
  ];

  
  basicTableSelectedIndexes = new Set<number>();
  advancedTableSelectedIndexes = new Set<number>();

  onSort(event: { field: string; direction: 'asc' | 'desc' }) {
    const isAdvancedTable = [
      'invoice',
      'address',
      'orderNumber',
      'dueDate',
      'date'
    ].includes(event.field);

    if (isAdvancedTable) {
      this.advancedTableData = [...this.advancedTableData].sort((a, b) => {
        if (event.direction === 'asc') {
          return a[event.field] > b[event.field] ? 1 : -1;
        } else {
          return a[event.field] < b[event.field] ? 1 : -1;
        }
      });
    } else {
      this.tableData = [...this.tableData].sort((a, b) => {
        if (event.direction === 'asc') {
          return a[event.field] > b[event.field] ? 1 : -1;
        } else {
          return a[event.field] < b[event.field] ? 1 : -1;
        }
      });
    }
  }

  onSelectAll(checked: boolean, isAdvancedTable: boolean = false) {
    console.log('Select All Event:', { checked, isAdvancedTable });
    
    const selectedSet = isAdvancedTable ? this.advancedTableSelectedIndexes : this.basicTableSelectedIndexes;
    const data = isAdvancedTable ? this.advancedTableData : this.tableData;

    if (checked) {
      data.forEach((_, index) => selectedSet.add(index));
    } else {
      selectedSet.clear();
    }

    console.log('After Select All:', {
      basicSelectedIndexes: Array.from(this.basicTableSelectedIndexes),
      advancedSelectedIndexes: Array.from(this.advancedTableSelectedIndexes)
    });
  }

  onRowSelect(event: number, isAdvancedTable: boolean = false) {
    console.log('Row Select Event:', { index: event, isAdvancedTable });
    
    const selectedSet = isAdvancedTable ? this.advancedTableSelectedIndexes : this.basicTableSelectedIndexes;

    if (selectedSet.has(event)) {
      selectedSet.delete(event);
    } else {
      selectedSet.add(event);
    }

    console.log('Selected Indexes:', {
      basicSelectedIndexes: Array.from(this.basicTableSelectedIndexes),
      advancedSelectedIndexes: Array.from(this.advancedTableSelectedIndexes)
    });
  }
}


