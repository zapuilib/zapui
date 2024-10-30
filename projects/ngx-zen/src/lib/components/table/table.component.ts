// table.component.ts
import {
  Component,
  Input,
  Inject,
  ContentChild,
  AfterContentInit,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
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

    // if (this.tableHead?.columns) {
    //   this.tableHead.columns.changes.subscribe(() => {
    //     this.handleWidth();
    //   });
    // }

    // if (this.tableBody?.rows) {
    //   this.tableBody.rows.changes.subscribe(() => {
    //     this.handleWidth();
    //   });
    // }
  }

  handleWidth(): void {
    if (this.width) {
      const allColumns = this.tableHead?.columns;
      const allWidths = this.width.split('_').map(width => parseInt(width)); // Convert widths to numbers
      const specifiedWidthTotal = allWidths.reduce((total, width) => total + width, 0); // Sum of specified widths
      const minimumWidthPerRemainingColumn = 15; // Set minimum width to 15%
  
      if (allColumns) {
        const remainingColumnsCount = allColumns.length - allWidths.length;
        const remainingWidth = 100 - specifiedWidthTotal;
        const widthPerRemainingColumn = remainingColumnsCount > 0 ? Math.max(remainingWidth / remainingColumnsCount, minimumWidthPerRemainingColumn) : 0;
  
        // Set widths for table head columns
        this.tableHead?.columns.forEach((column, index) => {
          if (index < allWidths.length) {
            column.width = allWidths[index] + '%';
          } else {
            column.width = `${widthPerRemainingColumn}%`;
          }
        });
  
        // Set widths for table body cells in each row
        this.tableBody?.rows?.forEach((row) => {
          row.cells.forEach((cell, index) => {
            if (index < allWidths.length) {
              cell.width = allWidths[index] + '%';
            } else {
              cell.width = `${widthPerRemainingColumn}%`;
            }
          });
        });
  
        // Calculate total table width
        this.tableWidth = `${specifiedWidthTotal + (remainingColumnsCount * widthPerRemainingColumn)}%`;
      }
    }
  }
  

  getWidth() {
    return {
      width: this.tableWidth,
    };
  }

  // private handleEqualWidths(): void {
  //   if (this.tableHead?.columns) {
  //     const equalWidth = `${100 / this.tableHead.columns.length}%`;
  //     this.tableHead.columns.forEach((column) => {
  //       column.width = equalWidth;
  //     });

  //     if (this.tableBody?.rows) {
  //       this.tableBody.rows.forEach((row) => {
  //         row.cells.forEach((cell) => {
  //           cell.width = equalWidth;
  //         });
  //       });
  //     }
  //   }
  // }

  // private handleCustomWidths(): void {
  //   if (this.tableHead?.columns) {
  //     const totalColumns =
  //       this.tableHead.columns.length + (this.selectable ? 1 : 0);
  //     let columnWidths = this.width ? this.width.split('_') : [];

  //     const totalSpecifiedWidth = columnWidths.reduce(
  //       (sum, width) => sum + (parseInt(width) || 0),
  //       0
  //     );

  //     const specifiedColumns = columnWidths.length;
  //     const remainingColumns = totalColumns - specifiedColumns;

  //     if (remainingColumns > 0) {
  //       const remainingWidth = Math.floor(
  //         (100 - totalSpecifiedWidth) / remainingColumns
  //       );

  //       columnWidths = [
  //         ...columnWidths,
  //         ...Array(remainingColumns).fill(remainingWidth.toString()),
  //       ];
  //     }

  //     let columnIndex = 1;

  //     if (this.selectable) {
  //       const checkboxColumn =
  //         this.elementRef.nativeElement.querySelector('.checkbox-column');
  //       if (checkboxColumn) {
  //         checkboxColumn.style.width = `${columnWidths[columnIndex]}%`;
  //         columnIndex++;
  //       }
  //     }

  //     this.tableHead.columns.forEach((column) => {
  //       column.width = `${columnWidths[columnIndex]}%`;
  //       columnIndex++;
  //     });

  //     if (this.tableBody?.rows) {
  //       this.tableBody.rows.forEach((row) => {
  //         columnIndex = 1;

  //         if (this.selectable) {
  //           columnIndex++;
  //         }

  //         row.cells.forEach((cell) => {
  //           cell.width = `${columnWidths[columnIndex]}%`;
  //           columnIndex++;
  //         });
  //       });
  //     }
  //   }
  // }

  getTableStyle(): Record<string, string> {
    const color = this.disabled
      ? this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5)
      : this.config.colors.secondary;

    return {
      color,
      fontSize: this.config.fontSize.md,
    };
  }
}
