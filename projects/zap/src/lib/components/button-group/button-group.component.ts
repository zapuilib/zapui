import { AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { ButtonGroupService } from './button-group.service';
import { ZapButton } from '../button/button.component';

@Component({
  selector: 'zap-button-group',
  imports: [],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
  providers: [ButtonGroupService],
})
export class ZapButtonGroup implements AfterViewInit {
  @ContentChildren(ZapButton, { descendants: true }) buttons!: QueryList<ZapButton>;

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
