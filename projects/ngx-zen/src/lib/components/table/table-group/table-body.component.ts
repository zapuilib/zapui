
import { 
  Component, 
  Input, 
  ContentChildren, 
  QueryList, 
  AfterContentInit 
} from '@angular/core';
import { TableRowComponent } from './table-row.component';

@Component({
  selector: 'ngx-zen-table-body',
  template: `
    <tbody class="__zen__table__body">
      <ng-content></ng-content>
    </tbody>
  `,
  styleUrls: ['./table-component.style.scss']
})
export class TableBodyComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selectable: boolean = false;
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;

  ngAfterContentInit() {
    if (this.rows) {
      this.rows.forEach(row => {
        row.size = this.size;
        row.selectable = this.selectable;
      });
    }
  }
}