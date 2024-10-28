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
    if (!this.width) {
      if (this.tableHead && this.tableHead.columns.length > 0) {
        const equalWidth = `${100 / this.tableHead.columns.length}%`;
        this.tableHead.columns.forEach(column => {
          column.width = equalWidth;
        });
      }
  
      if (this.tableBody && this.tableBody.rows.length > 0) {
        const equalWidth = `${100 / this.tableHead!.columns.length}%`;
        this.tableBody.rows.forEach(row => {
          row.cells.forEach(cell => {
            cell.width = equalWidth;
          });
        });
      }
      return;
    }
  
    if (this.tableHead && this.tableHead.columns.length > 0) {
      const columnWidths = this.width.split('_');
      const totalColumns = this.tableHead.columns.length;
      const totalSpecifiedWidth = columnWidths.reduce((sum, width) => sum + (parseInt(width) || 0), 0);

      const remainingColumns = totalColumns - columnWidths.length;
      const remainingWidthPerColumn = remainingColumns > 0 
        ? (100 - totalSpecifiedWidth) / remainingColumns 
        : 0;
  
      this.tableHead.columns.forEach((column, index) => {
        if (index < columnWidths.length) {
          column.width = `${columnWidths[index]}%`;
        } else {
          column.width = `${remainingWidthPerColumn}%`;
        }
      });

      if (this.tableBody) {
        this.tableBody.rows.forEach(row => {
          row.cells.forEach((cell, cellIndex) => {
            if (cellIndex < columnWidths.length) {
              cell.width = `${columnWidths[cellIndex]}%`;
            } else {
              cell.width = `${remainingWidthPerColumn}%`;
            }
          });
        });
      }
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
