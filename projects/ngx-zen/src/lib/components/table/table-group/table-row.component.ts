import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ContentChildren, 
  QueryList, 
  AfterContentInit 
} from '@angular/core';
import { TableCellComponent } from './table-cell.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: `
    <tr 
      class="__zen__table__row"
      [ngClass]="{ 
        'selected': selected,
        'selectable': selectable
      }"
      (click)="onRowClick()"
    >
      <ng-content></ng-content>
    </tr>
  `,
  styleUrls: ['./table-component.style.scss']
})
export class TableRowComponent implements AfterContentInit {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() selected: boolean = false;
  @Input() selectable: boolean = false;
  @Output() select = new EventEmitter<boolean>();

  @ContentChildren(TableCellComponent) cells!: QueryList<TableCellComponent>;

  ngAfterContentInit() {
    if (this.cells) {
      this.cells.forEach(cell => {
        cell.size = this.size;
      });
    }
  }

  onRowClick() {
    if (this.selectable) {
      this.selected = !this.selected;
      this.select.emit(this.selected);
    }
  }
}