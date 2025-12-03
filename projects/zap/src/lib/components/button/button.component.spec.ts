import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapButton } from './button.component';

describe('ZapButton', () => {
  let component: ZapButton;
  let fixture: ComponentFixture<ZapButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapButton],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default text as "Submit"', () => {
    expect(component.text()).toBe('Submit');
  });
});
