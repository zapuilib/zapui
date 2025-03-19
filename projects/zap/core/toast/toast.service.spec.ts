import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ZapToastService } from './toast.service';
import { ZapToastInterface } from './toast.interface';
import { DISMISS_THRESHOLD, TOAST_DURATION } from './toast.constant';

describe('ZapToastService', () => {
  let service: ZapToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZapToastService],
    });
    service = TestBed.inject(ZapToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show and dismiss toast', fakeAsync(() => {
    const config: ZapToastInterface = {
      title: 'Test Toast',
      text: 'Test Message',
      action: 'Close',
      shape: 'curve',
      type: 'default',
      duration: TOAST_DURATION,
    };

    service.show(config);
    expect(service['activeToastRef']()).toBeTruthy();

    service.dismiss();
    tick(TOAST_DURATION + DISMISS_THRESHOLD);
    expect(service['activeToastRef']()).toBeNull();
  }));
});
