// /table/components/table-group/head.component.ts
import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';

import { TableColumnComponent } from './table-column.component';
import { FormControl } from '@angular/forms';

// table-head.component.ts
@Component({
  selector: 'ngx-zen-table-head',
  template: `
    <thead class="__zen__table__head">
      <tr class="__zen__table__row">
        @if(selectable) {
          <th class="checkbox-column">
            <ngx-zen-checkbox 
              [formControl]="masterControl"
              (change)="onMasterChange()"
            ></ngx-zen-checkbox>
          </th>
        }
        <ng-content></ng-content>
      </tr>
    </thead>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableHeadComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selectable: boolean = false;
  @Output() selectAll = new EventEmitter<boolean>();

  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;
  
  masterControl = new FormControl(false);

  ngAfterContentInit() {
    if (this.columns) {
      this.columns.forEach((column, index) => {
        column.size = this.size;
        column.index = index;
        column.isHeader = true;
      });
    }
  }

  onMasterChange() {
    // Ensure we're passing a boolean value
    this.selectAll.emit(this.masterControl.value ?? false);
  }
}