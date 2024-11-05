// table.component.ts
import {
  Component,
  Input,
  Inject,
  ContentChild,
  AfterContentInit,
  ElementRef,
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
  @Input() allowMultiline: boolean = false;
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() outlined: boolean = false;
  @ContentChild(TableHeadComponent) tableHead?: TableHeadComponent;
  @ContentChild(TableBodyComponent) tableBody?: TableBodyComponent;
  tableWidth: string = '';

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility,
    private elementRef: ElementRef
  ) {}

  ngAfterContentInit() {
    this.handleWidth();
  }

  handleWidth(): void {
    if (this.width) {
      const allColumns = this.tableHead?.columns;
      const allWidths = this.width.split('_').map((width) => parseInt(width));
      const specifiedWidthTotal = allWidths.reduce(
        (total, width) => total + width,
        0
      );
      const minimumWidthPerRemainingColumn = 15;

      if (allColumns) {
        const remainingColumnsCount = allColumns.length - allWidths.length;
        const remainingWidth = 100 - specifiedWidthTotal;
        const widthPerRemainingColumn =
          remainingColumnsCount > 0
            ? Math.max(
                remainingWidth / remainingColumnsCount,
                minimumWidthPerRemainingColumn
              )
            : 0;

        this.tableHead?.columns.forEach((column, index) => {
          if (index < allWidths.length) {
            column.width = allWidths[index] + '%';
          } else {
            column.width = `${widthPerRemainingColumn}%`;
          }
        });
        this.tableBody?.rows?.forEach((row) => {
          row.cells.forEach((cell, index) => {
            if (index < allWidths.length) {
              cell.width = allWidths[index] + '%';
            } else {
              cell.width = `${widthPerRemainingColumn}%`;
            }
          });
        });
        this.tableWidth = `${
          specifiedWidthTotal + remainingColumnsCount * widthPerRemainingColumn
        }%`;
      }
    }
  }

  getWidth() {
    return {
      width: this.tableWidth,
    };
  }

  getTableStyle(): Record<string, string> {
    const color = this.disabled
      ? this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5)
      : this.config.colors.secondary;

    return {
      color,
      fontSize: this.config.fontSize.md,
    };
  }

  getTableClass() {
    return {
      [this.zenClass]: true,
      outlined: this.outlined,
      disabled: this.disabled,
      hoverable: this.hoverable,
      striped: this.striped,
    };
  }
}
