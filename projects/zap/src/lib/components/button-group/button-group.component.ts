import { AfterViewInit, Component, ContentChildren, input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupService } from './button-group.service';
import { ZapButton } from '../button/button.component';

@Component({
  selector: 'zap-button-group',
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
  providers: [ButtonGroupService],
})
export class ZapButtonGroup implements AfterViewInit {
  @ContentChildren(ZapButton, { descendants: true }) buttons!: QueryList<ZapButton>;
  orientation = input<'horizontal' | 'vertical'>('vertical');
  constructor(private buttonGroupService: ButtonGroupService) {}

  ngAfterViewInit(): void {
    this.buttonGroupService.reset();

    this.buttons.forEach((button) => {
      this.buttonGroupService.registerButton(button);
    });

    this.buttons.forEach((button) => {
      button.updateGroupConfig();
    });
  }
}
