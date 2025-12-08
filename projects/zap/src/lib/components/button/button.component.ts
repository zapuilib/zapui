import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { ZapIconDirective } from '../../directives/icon.directive';
import { ButtonGroupConfig } from '../button-group/button-group.interface';
import { ButtonGroupService } from '../button-group/button-group.service';

@Component({
  selector: 'zap-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButton implements OnInit, AfterViewInit {
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  private readonly buttonGroupService = inject(ButtonGroupService, { optional: true });
  groupConfig = signal<ButtonGroupConfig | null>(null);
  text = input<string>('Submit');
  zapClass = input<string>('');
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'compact' | 'wide' | 'tight' | 'base'>();
  type = input<'info' | 'success' | 'warning' | 'error' | 'default'>('default');
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('left');
  img = input<string | undefined>(undefined);
  imgPosition = input<'left' | 'right'>('left');
  variant = input<'outlined' | 'default' | 'link'>('default');
  disabled = input<boolean>(false);
  icononly = input<boolean>(false);

  @HostListener('click', ['$event'])
  onHostClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  ngOnInit(): void {
    if (this.buttonGroupService) {
      const config = this.buttonGroupService.registerButton(this);
      this.groupConfig.set(config);
    }
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fill = 'var(--zap-button-text-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition() === 'left' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition() === 'right' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition() === 'right' ? '1' : '0';
    }
  }

  updateGroupConfig(): void {
    if (this.buttonGroupService) {
      const config = this.buttonGroupService.getConfigForButton(this);
      if (config) {
        this.groupConfig.set(config);
      }
    }
  }

  get classes(): string[] {
    const config = this.groupConfig();
    return [
      this.icononly() ? 'icononly' : '',
      this.type(),
      this.shape() ?? '',
      this.size() ?? '',
      this.variant(),
      this.zapClass(),
      config ? 'group__item' : '',
      config?.isFirst ? 'group__item__first' : '',
      config?.isLast ? 'group__item__last' : '',
      config ? `group__item__index-${config.index}` : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
