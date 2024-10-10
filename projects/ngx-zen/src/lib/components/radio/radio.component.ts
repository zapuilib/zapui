import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorDirective } from '../../directives/control-value-accessor.directive';

import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent<T> extends ControlValueAccessorDirective<T> {
  @ViewChild('radio') radio!: ElementRef;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() zenClass: string = '';
  @Input() labelPostion: 'left' | 'right' = 'right';
  @Input() shape: 'curve' | 'default' = 'default';
}
