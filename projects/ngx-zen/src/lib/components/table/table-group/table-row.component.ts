import { NgxZenConfig } from './../../../interfaces/config.interface';
import { 
  Component, 
  Input, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  ViewEncapsulation,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';

import { TableCellComponent } from './table-cell.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-zen-table-row',
  template: `
    <tr 
      class="__zen__table__row"
      [class.selected]="selected"
    >
      @if(selectable) {
        <td class="checkbox-column">
          <ngx-zen-checkbox 
            [formControl]="rowControl"
            (change)="onCheckboxChange()"
          ></ngx-zen-checkbox>
        </td>
      }
      <ng-content></ng-content>
    </tr>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableRowComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;
  @Input() index: number = -1;

  @Output() select = new EventEmitter<number>();
  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;

  rowControl = new FormControl(false);

  ngAfterContentInit() {
    if (this.cells) {
      this.cells.forEach(cell => {
        cell.size = this.size;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      this.rowControl.setValue(this.selected, { emitEvent: false });
    }
  }

  onCheckboxChange() {
    this.select.emit(this.index);
  }
}