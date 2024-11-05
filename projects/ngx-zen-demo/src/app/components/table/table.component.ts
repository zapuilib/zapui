import { Component } from '@angular/core';

interface TableData {
  name: string;
  email: string;
  status: string;
  [key: string]: string;
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
<ngx-zen-table [outlined]="true" [hoverable]="true">
          <ngx-zen-table-head>
            <ngx-zen-table-column>Name</ngx-zen-table-column>
            <ngx-zen-table-column>Email</ngx-zen-table-column>
            <ngx-zen-table-column>Status</ngx-zen-table-column>
          </ngx-zen-table-head>
          <ngx-zen-table-body>
            @for(item of tableData; track item; let i = $index) {
            <ngx-zen-table-row>
              <ngx-zen-table-cell>{{ item.name }}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{ item.email }}</ngx-zen-table-cell>
              <ngx-zen-table-cell><ngx-zen-chip [text]="item.status"></ngx-zen-chip></ngx-zen-table-cell>
            </ngx-zen-table-row>
            }
          </ngx-zen-table-body>
        </ngx-zen-table>
\`\`\``,
      title: 'Basic Table',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-table>
          <ngx-zen-table-head>
            <ngx-zen-table-column field="name" (sort)="onSort($event)">Name</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="email" (sort)="onSort($event)">Email</ngx-zen-table-column>
            <ngx-zen-table-column field="status" (sort)="onSort($event)">Status</ngx-zen-table-column>
          </ngx-zen-table-head>
          <ngx-zen-table-body>
            @for(item of tableData; track item; let i = $index) {
            <ngx-zen-table-row>
              <ngx-zen-table-cell>{{ item.name }}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{ item.email }}</ngx-zen-table-cell>
              <ngx-zen-table-cell>
                <ngx-zen-chip [text]="item.status"></ngx-zen-chip>
              </ngx-zen-table-cell>
            </ngx-zen-table-row>
            }
          </ngx-zen-table-body>
        </ngx-zen-table>
\`\`\``,
      title: 'Sortable Table',
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
  <ngx-zen-table class="selectable-table" [selectable]="true">
            <ngx-zen-table-head [selectable]="true" (selectAll)="onSelectAll($event, false)">
              <ngx-zen-table-column>Name</ngx-zen-table-column>
              <ngx-zen-table-column>Email</ngx-zen-table-column>
              <ngx-zen-table-column>Status</ngx-zen-table-column>
            </ngx-zen-table-head>
          
            <ngx-zen-table-body [selectable]="true" (rowSelect)="onRowSelect($event, false)">
              @for (row of tableData; track row; let i = $index) {
              <ngx-zen-table-row [selectable]="true" [selected]="basicTableSelectedIndexes.has(i)" [index]="i">
                <ngx-zen-table-cell>{{row.name}}</ngx-zen-table-cell>
                <ngx-zen-table-cell class="truncate">{{row.email}}</ngx-zen-table-cell>
                <ngx-zen-table-cell>
                  <ngx-zen-chip [text]="row.status" [size]="'small'"></ngx-zen-chip>
                </ngx-zen-table-cell>
              </ngx-zen-table-row>
              }
            </ngx-zen-table-body>
          </ngx-zen-table>
  \`\`\``,
      title: 'Table with Checkboxes',
    },
    {
      markdown: `\`\`\`html
  <ngx-zen-table [selectable]="true" width="10_20_10_10_20_10_10_10_10">
          <ngx-zen-table-head [selectable]="true" (selectAll)="onSelectAll($event, true)">
            <ngx-zen-table-column [sortable]="true" field="invoice" (sort)="onSort($event)">Invoice
              #</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="address" (sort)="onSort($event)">Customer
              address</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="date" (sort)="onSort($event)">Date</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="orderNumber" (sort)="onSort($event)">Order
              number</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="name" (sort)="onSort($event)">Customer
              name</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="status" (sort)="onSort($event)">Status</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="dueDate" (sort)="onSort($event)">Due
              date</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="paid" (sort)="onSort($event)">Paid</ngx-zen-table-column>
            <ngx-zen-table-column [sortable]="true" field="dueDate" (sort)="onSort($event)">Due
              date</ngx-zen-table-column>
          </ngx-zen-table-head>

          <ngx-zen-table-body [selectable]="true" (rowSelect)="onRowSelect($event, true)">
            @for (row of advancedTableData; track row; let i = $index) {
            <ngx-zen-table-row [selectable]="true" [selected]="advancedTableSelectedIndexes.has(i)" [index]="i">
              <ngx-zen-table-cell>{{row.invoice}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.address}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.date}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.orderNumber}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.name}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>
                <ngx-zen-chip [text]="row.status"></ngx-zen-chip>
              </ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.dueDate}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.paid}}</ngx-zen-table-cell>
              <ngx-zen-table-cell>{{row.dueDate}}</ngx-zen-table-cell>
            </ngx-zen-table-row>
            }
          </ngx-zen-table-body>
        </ngx-zen-table>
  \`\`\``,
      title: 'Advance Table',
    },
    {
      markdown: `\`\`\`html
  <ngx-zen-table class="project-table" [outlined]="true">
            <ngx-zen-table-head>
              <ngx-zen-table-column [sortable]="true" field="calculationName">Calculation</ngx-zen-table-column>
              <ngx-zen-table-column>Created by</ngx-zen-table-column>
              <ngx-zen-table-column [sortable]="true" field="energySavings">Energy savings</ngx-zen-table-column>
              <ngx-zen-table-column [sortable]="true" field="costSavings">Cost savings</ngx-zen-table-column>
              <ngx-zen-table-column [sortable]="true" field="totalCost">Total cost</ngx-zen-table-column>
              <ngx-zen-table-column [sortable]="true" field="paybackPeriod">Payback period</ngx-zen-table-column>
            </ngx-zen-table-head>
  
            <ngx-zen-table-body>
              @for(item of projectData; track item) {
                <ngx-zen-table-row>
                  <ngx-zen-table-cell>
                    <div class="flex flex-col">
                      <div class="title">{{item.calculationName}}</div>
                      <div class="info">
                        <div>Building: {{item.building}}</div>
                        <div>Project: {{item.project}}</div>
                      </div>
                    </div>
                  </ngx-zen-table-cell>
  
                  <ngx-zen-table-cell>
                    <div class="date">{{item.createdBy.date}}</div>
                  </ngx-zen-table-cell>
  
                  <ngx-zen-table-cell>
                    <div class="flex items-center flex-col">
                      <span>{{item.energySavings.value}} {{item.energySavings.unit}}</span>
                      @if(item.status === 'Highest') {
                        <ngx-zen-chip text="Highest" size="small"></ngx-zen-chip>
                      }
                    </div>
                  </ngx-zen-table-cell>
  
                  <ngx-zen-table-cell>
                    <div class="flex items-center">
                      <span>$ {{item.costSavings.value}}/{{item.costSavings.unit}}</span>
                    </div>
                  </ngx-zen-table-cell>
  
                  <ngx-zen-table-cell>
                    <div class="flex items-center">
                      <span>$ {{item.totalCost}}</span>
                    </div>
                  </ngx-zen-table-cell>
  
                  <ngx-zen-table-cell>
                    <div class="flex flex-col items-center justify-between">
                      <span>{{item.paybackPeriod.value}} {{item.paybackPeriod.unit}}</span>
                      @if(item.status === 'Best') {
                        <ngx-zen-chip text="Best" size="small"></ngx-zen-chip>
                      }
                      @if(item.status === 'Cheapest') {
                        <ngx-zen-chip text="Cheapest" size="small"></ngx-zen-chip>
                      }
                    </div>
                  </ngx-zen-table-cell>
                </ngx-zen-table-row>
              }
            </ngx-zen-table-body>
          </ngx-zen-table>
  \`\`\``,
      title: 'ProjectTable',
    },
  ];

  tableData: TableData[] = [
    {
      name: 'John Doe',
      email: 'john@example.com Runte, Wiegand and Pagac',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      email:
        'jane@example.com Wiegand and PagacWiegand and PagacWiegand and PagacWiegand and PagacWiegand and Pagac',
      status: 'Inactive',
    },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  ];

  advancedTableData: AdvancedTableData[] = [
    {
      invoice: '33597',
      address: '5843 Schulis',
      date: 'Jun 03 2024',
      orderNumber: '82213',
      name: 'Runte, Wiegand',
      status: 'Paid',
      dueDate: 'Jun 03 2024',
      paid: 'June 04 2024',
    },
    {
      invoice: '25788',
      address: '03539 Lilyan ',
      date: 'Sep 24 2024',
      orderNumber: '3328',
      name: 'Deckow - Conroy',
      status: 'Paid',
      dueDate: 'Sep 24 2024',
      paid: 'Sep 24 2024',
    },
    {
      invoice: '64708',
      address: '91791 Max Summit  Max Summit Max Summit Max Summit',
      date: 'Jul 06 2024',
      orderNumber: '16279',
      name: 'Hane Inc',
      status: 'Paid',
      dueDate: 'Jul 06 2024',
      paid: 'Jul 06 2024',
    },
    {
      invoice: '95321',
      address: '4793 Palma Springs',
      date: 'Feb 13 2024',
      orderNumber: '42248',
      name: 'Heller - Turner',
      status: 'Outstanding',
      dueDate: 'Feb 13 2024',
      paid: 'Feb 13 2024',
    },
    {
      invoice: '60733',
      address: '504 Dina Neck',
      date: 'Aug 27 2024',
      orderNumber: '89214',
      name: 'Daugherty',
      status: 'Outstanding',
      dueDate: 'Aug 27 2024',
      paid: 'Aug 27 2024',
    },
    {
      invoice: '58591',
      address: '07428 Easton ',
      date: 'Jul 07 2024',
      orderNumber: '11769',
      name: 'Botsford, Adams',
      status: 'Partially paid',
      dueDate: 'Jul 07 2024',
      paid: 'Jul 07 2024',
    },
    {
      invoice: '72493',
      address: '9680 Kelley ',
      date: 'Jun 15 2024',
      orderNumber: '66846',
      name: 'Kreiger and Sons',
      status: 'Past Due',
      dueDate: 'Jun 15 2024',
      paid: 'Jun 15 2024',
    },
    {
      invoice: '75181',
      address: '26629 General Street',
      date: 'Aug 14 2024',
      orderNumber: '74396',
      name: 'Cummerata',
      status: 'Past Due',
      dueDate: 'Aug 14 2024',
      paid: 'Aug 14 2024',
    },
    {
      invoice: '95580',
      address: '3077 Kemmer Lodge',
      date: 'Oct 30 2024',
      orderNumber: '37397',
      name: 'Bergnaum - Reilly',
      status: 'Past Due',
      dueDate: 'Oct 30 2024',
      paid: 'Oct 30 2024',
    },
    {
      invoice: '59318',
      address: '01263 Stuart Port',
      date: 'Jul 27 2024',
      orderNumber: '93365',
      name: "Veum, O'Hara ",
      status: 'Past Due',
      dueDate: 'Jul 27 2024',
      paid: 'Jul 27 2024',
    },
    {
      invoice: '85111',
      address: '4652 Aurelie',
      date: 'Dec 31 2023',
      orderNumber: '48718',
      name: 'Langosh - Adams',
      status: 'Past Due',
      dueDate: 'Dec 31 2023',
      paid: 'Dec 31 2023',
    },
    {
      invoice: '31919',
      address: '195 Ledner St',
      date: 'Apr 29 2024',
      orderNumber: '24050',
      name: 'Connelly - Rogahn',
      status: 'Past Due',
      dueDate: 'Apr 29 2024',
      paid: 'Apr 29 2024',
    },
  ];

  projectData: ProjectData[] = [
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 6732,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 673,
        unit: 'yr',
      },
      totalCost: 7300,
      paybackPeriod: {
        value: 10.8,
        unit: 'yrs',
      },
      status: 'Highest',
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 6534,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 650,
        unit: 'yr',
      },
      totalCost: 8778,
      paybackPeriod: {
        value: 13.5,
        unit: 'yrs',
      },
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 5872,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 858,
        unit: 'yr',
      },
      totalCost: 6355,
      paybackPeriod: {
        value: 7.4,
        unit: 'yrs',
      },
      status: 'Highest',
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 2534,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 472,
        unit: 'yr',
      },
      totalCost: 1378,
      paybackPeriod: {
        value: 2.9,
        unit: 'yrs',
      },
      status: 'Best',
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 4054,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 400,
        unit: 'yr',
      },
      totalCost: 4778,
      paybackPeriod: {
        value: 11.9,
        unit: 'yrs',
      },
      status: 'Cheapest',
    },
    {
      calculationName: 'Calculation name with a long name truncat...',
      building: 'Building A',
      project: 'Pump motor VFD installation for Hot water plant',
      createdBy: {
        email: 'mail@gmail.com',
        date: '10/01/24 10:00 am',
      },
      energySavings: {
        value: 5234,
        unit: 'kWh/yr',
      },
      costSavings: {
        value: 258,
        unit: 'yr',
      },
      totalCost: 5258,
      paybackPeriod: {
        value: 20.3,
        unit: 'yrs',
      },
    },
  ];

  basicTableSelectedIndexes = new Set<number>();
  advancedTableSelectedIndexes = new Set<number>();

  onSort(event: { field: string; direction: 'asc' | 'desc' }) {
    const isAdvancedTable = [
      'invoice',
      'address',
      'orderNumber',
      'dueDate',
      'date',
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

    const selectedSet = isAdvancedTable
      ? this.advancedTableSelectedIndexes
      : this.basicTableSelectedIndexes;
    const data = isAdvancedTable ? this.advancedTableData : this.tableData;

    if (checked) {
      data.forEach((_, index) => selectedSet.add(index));
    } else {
      selectedSet.clear();
    }

    console.log('After Select All:', {
      basicSelectedIndexes: Array.from(this.basicTableSelectedIndexes),
      advancedSelectedIndexes: Array.from(this.advancedTableSelectedIndexes),
    });
  }

  onRowSelect(event: number, isAdvancedTable: boolean = false) {
    console.log('Row Select Event:', { index: event, isAdvancedTable });

    const selectedSet = isAdvancedTable
      ? this.advancedTableSelectedIndexes
      : this.basicTableSelectedIndexes;

    if (selectedSet.has(event)) {
      selectedSet.delete(event);
    } else {
      selectedSet.add(event);
    }

    console.log('Selected Indexes:', {
      basicSelectedIndexes: Array.from(this.basicTableSelectedIndexes),
      advancedSelectedIndexes: Array.from(this.advancedTableSelectedIndexes),
    });
  }
}
