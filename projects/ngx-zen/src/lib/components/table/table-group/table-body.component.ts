import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  SimpleChanges,
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
  encapsulation: ViewEncapsulation.None,
})
export class TableBodyComponent implements AfterContentInit {
  @ContentChildren(TableRowComponent) rows!: QueryList<TableRowComponent>;
  
  @Output() rowSelect = new EventEmitter<number>();

  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selectable: boolean = false;
  @Input() width: string = '';
  @Input() selectAllState: boolean = false;
  @Input() variant: 'outlined' | 'default' = 'default';

  ngAfterContentInit() {
    if (this.rows) {
      this.rows.forEach((row, index) => {
        row.size = this.size;
        row.selectable = this.selectable;
        row.index = index;

        row.select.subscribe((index) => {
          this.rowSelect.emit(index);
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectAllState'] && this.rows) {
      this.rows.forEach((row) => {
        row.selected = this.selectAllState;
      });
    }
  }
}
