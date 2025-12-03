import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownTrigger } from './dropdown-trigger.component';

describe('ZapDropdownTrigger', () => {
  let component: ZapDropdownTrigger;
  let fixture: ComponentFixture<ZapDropdownTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownTrigger],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
