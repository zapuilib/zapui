import { NgxZenConfig } from './../../../interfaces/config.interface';
import { Component, HostBinding, Inject, Input, ViewEncapsulation } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../../tokens/ngx-zen.tokens';
import { Styles } from '../../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-table-cell',
  template: `
    <td class="__zen__table__cell" [ngClass]="[size]" [ngStyle]="getCellStyle()">
      <ng-content></ng-content>
    </td>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableCellComponent {
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() width: string = '';
  @HostBinding('style.width') get getWidth() {
    return this.width;
  }

  constructor(
    @Inject(NGX_ZEN_CONFIG) public config: NgxZenConfig
  ) {}


  getCellStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      borderColor: this.config.colors.secondary,
    };
  }
  
}
