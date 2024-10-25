// table.component.ts
import {
  Component,
  Input,
  Inject,
  ContentChild,
  AfterContentInit,
  EventEmitter,
  Output,
} from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';
import { TableHeadComponent } from './table-group/table-head.component';
import { TableBodyComponent } from './table-group/table-body.component';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterContentInit {
  @Input() hoverable: boolean = false;
  @Input() striped: boolean = false;
  @Input() zenClass: string = '';
  @Input() disabled: boolean = false;
  @Input() width: string = '';
  @Input() title: string = '';
  @Input() selectable: boolean = false;
  @ContentChild(TableHeadComponent) tableHead?: TableHeadComponent;
  @ContentChild(TableBodyComponent) tableBody?: TableBodyComponent;

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  ngAfterContentInit() {
    if (this.tableHead && this.tableHead.columns.length > 0) {
      this.handleWidth();
    }
  }

  handleWidth(): void {
    if (this.width && this.tableHead && this.tableHead.columns.length > 0) {
      const columnWidths = this.width.split('_');
      this.tableHead.columns.forEach((column, index) => {
        const width = columnWidths[index] ? `${columnWidths[index]}%` : 'auto';
        column.width = width;
      });
    }

    if (this.width && this.tableBody && this.tableBody.rows.length > 0) {
      const columnWidths = this.width.split('_');
      this.tableBody.rows.forEach((row, index) => {
        row.cells.forEach((cell, cellIndex) => {
          const width = columnWidths[cellIndex]
            ? `${columnWidths[cellIndex]}%`
            : 'auto';
          cell.width = width;
        });
      });
    }
  }

  getTableStyle(): Record<string, string> {
    const color = this.disabled
      ? this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5)
      : this.config.colors.secondary;
  
    return {
      color,
      'fontSize': this.config.fontSize.md, 
    };
  }
  
}
