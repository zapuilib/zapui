import { Component, Optional, Host, Input } from '@angular/core';
import { TableComponent } from '../table.component';

@Component({
  selector: 'ngx-zen-table-row',
  template: `
    <tr class="table-row"
        [ngClass]="{
          'hoverable': table?.hoverable, 
          'striped': table?.striped && index % 2 === 0
        }"
        (mouseenter)="hovering = true" 
        (mouseleave)="hovering = false"
        [ngStyle]="getRowStyle()">
      <ng-content select="ngx-zen-table-cell"></ng-content>
    </tr>
  `,
  styleUrls: ['./table-component.style.scss']
})
export class TableRowComponent {
  @Input() index: number = 0;
  @Input() selected: boolean = false;
  
  hovering: boolean = false;
  
  constructor(@Optional() @Host() public table: TableComponent | null) {}

  getRowStyle(): Record<string, string> {
    let style: Record<string, string> = {};
    
    if (this.hovering && this.table?.hoverable) {
      style = {...style, ...this.table.getHoverableRowStyle()};
    }
    
    if (this.table?.striped) {
      style = {...style, ...this.table.getStripedRowStyle(this.index)};
    }

    if (this.selected && this.table?.selectable) {
      style['background-color'] = this.table.config.colors.info + '1A';
    }
    
    return style;
  }
}