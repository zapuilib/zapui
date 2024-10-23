
import { 
  Component, 
  Input, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  ViewEncapsulation
} from '@angular/core';

import { TableRowComponent } from './table-row.component';

@Component({
  selector: 'ngx-zen-table-body',
  template: `
    <tbody class="__zen__table__body">
      <ng-content></ng-content>
    </tbody>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableBodyComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selectable: boolean = false;
  @Input() width: string = '';
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;

  ngAfterContentInit() {
    if (this.rows) {
      this.rows.forEach(row => {
        row.size = this.size;
      });
    }
  }
}