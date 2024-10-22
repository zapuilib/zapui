import { Component, Optional, Host, Input } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-cell',
  template: `
   <td class="table-cell" 
       [ngClass]="[table?.size || '', align]" 
       [ngStyle]="getCellStyle()">
     <ng-content></ng-content>
   </td>
  `,
  styleUrls: ['./table-component.style.scss']
})
export class TableCellComponent {
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() width: string = 'auto';
  
  constructor(@Optional() @Host() public table: TableComponent) {}

  getCellStyle(): Record<string, string> {
    return {
      ...this.table?.getTableCellStyle(),
      'width': this.width,
      'text-align': this.align,
    };
  }
}