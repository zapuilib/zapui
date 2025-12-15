import { Component } from '@angular/core';
import { ZapButton, ZapToast, ZapToastService } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-toast',
  imports: [SpacerComponent, TitleComponent, PreviewCodeComponent, ZapButton, ZapToast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  shape: 'curve' | 'pill' | 'flat' = 'flat';
  type: 'error' | 'default' = 'default';
  basicToastMarkdown: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `import {  ZapToast, ZapToastService } from 'zap/core';

export class ToastComponent {
  constructor(private readonly zapToastService: ZapToastService) {}

  handleClick(): void {
    this.zapToastService.show({
      title: 'Something has happened',
      text: 'You can show some message here',
      action: 'Action',
    });
  }
}`,
    language: 'typescript',
  };
  textOnlyToastMarkdown: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `import {  ZapToast, ZapToastService } from 'zap/core';

export class ToastComponent {
  constructor(private readonly zapToastService: ZapToastService) {}

  handleClick(): void {
    this.zapToastService.show({
      text: 'Feel free to use this toast for any type of notification.',
    });
  }
}`,
    language: 'typescript',
  };
  withTitleToastMarkdown: {
    title: string;
    markdown: string;
    language: string;
  } = {
    title: 'html',
    markdown: `import {  ZapToast, ZapToastService } from 'zap/core';

export class ToastComponent {
  constructor(private readonly zapToastService: ZapToastService) {}

  handleClick(): void {
    this.zapToastService.show({
      title: 'Appointment confirmed',
      text: 'February 25, 2023 at 10:00 AM',
    });
  }
}`,
    language: 'typescript',
  };
  withActionToastMarkdown: {
    title: string;
    markdown: string;
    language: string;
  } = {
    title: 'html',
    markdown: `import {  ZapToast, ZapToastService } from 'zap/core';

export class ToastComponent {
  constructor(private readonly zapToastService: ZapToastService) {}

  handleClick(): void {
    this.zapToastService.show({
      title: 'Appointment confirmed',
      text: 'February 25, 2023 at 10:00 AM',
      action: 'View details',
      actioned: () => {
        window.alert('Here are the details');
        this.zapToastService.dismiss();
      },
    });
  }
}`,
    language: 'typescript',
  };
  errorToastMarkdown: {
    title: string;
    markdown: string;
    language: string;
  } = {
    title: 'html',
    markdown: `import {  ZapToast, ZapToastService } from 'zap/core';

export class ToastComponent {
  constructor(private readonly zapToastService: ZapToastService) {}

  showToast(): void {
    this.zapToastService.show({
      title: 'Appointment confirmed',
      text: 'February 25, 2023 at 10:00 AM',
      action: 'View details',
      actioned: () => {
        window.alert('Here are the details');
        this.zapToastService.dismiss();
      },
    });
  }

  handleClick(): void {
    this.zapToastService.show({
      title: 'Uh oh! Something went wrong',
      text: 'Error occurred while processing your request.',
      action: 'Try again',
      type: 'error',
      actioned: () => {
        this.showToast();
      },
    });
  }
}`,
    language: 'typescript',
  };
  toastMarkdown: {
    title: string;
    markdown: string;
    language: string;
  } = {
    title: 'html',
    markdown: `<zap-toast
    title="Toast title here"
    text="Toast sub title here"
    action="Action"
></zap-toast>`,
    language: 'typescript',
  };
  customToastMarkdown: {
    title: string;
    markdown: string;
    language: string;
  } = {
    title: 'html',
    markdown: ` <zap-toast>
    <div class="max-w-[25rem]">
      <p>Custom content</p>
      <p class="leading-[1.5] text-zinc-400 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <a href="" class="text-xs underline text-zinc-400 hover:text-white">View details</a>
      </p>
    </div>
  </zap-toast>`,
    language: 'typescript',
  };

  constructor(private readonly zapToastService: ZapToastService) {}

  private updateDefaultMarkown(): void {
    this.basicToastMarkdown = {
      title: 'html',
      markdown: `import {  ZapToast, ZapToastService } from 'zap/core';
  
  export class ToastComponent {
    constructor(private readonly zapToastService: ZapToastService) {}
  
    handleClick(): void {
      this.zapToastService.show({
        title: 'Something has happened',
        text: 'You can show some message here',
        action: 'Action',
        shape: '${this.shape}',
        type: '${this.type}',
      });
    }
  }`,
      language: 'typescript',
    };
  }

  showToast(type: string): void {
    switch (type) {
      case 'default':
        this.zapToastService.show({
          title: 'Something has happened',
          text: 'You can show some message here',
          action: 'Action',
          shape: this.shape,
          type: this.type,
        });
        break;
      case 'text':
        this.zapToastService.show({
          text: 'Feel free to use this toast for any type of notification.',
        });
        break;
      case 'title':
        this.zapToastService.show({
          title: 'Appointment confirmed',
          text: 'February 25, 2023 at 10:00 AM',
        });
        break;
      case 'action':
        this.zapToastService.show({
          title: 'Appointment confirmed',
          text: 'February 25, 2023 at 10:00 AM',
          action: 'View details',
          actioned: () => {
            window.alert('Here are the details');
            this.zapToastService.dismiss();
          },
        });
        break;
      case 'error':
        this.zapToastService.show({
          title: 'Uh oh! Something went wrong',
          text: 'Error occurred while processing your request.',
          action: 'Try again',
          type: 'error',
          actioned: () => {
            this.showToast('action');
          },
        });
        break;
    }
  }

  updateShape(shape: 'curve' | 'pill' | 'flat'): void {
    this.shape = shape;
    this.zapToastService.dismiss();
    setTimeout(() => {
      this.showToast('default');
    }, 300);
    this.updateDefaultMarkown();
  }

  updateType(type: 'error' | 'default'): void {
    this.type = type;
    this.zapToastService.dismiss();
    setTimeout(() => {
      this.showToast('default');
    }, 300);
    this.updateDefaultMarkown();
  }
}
