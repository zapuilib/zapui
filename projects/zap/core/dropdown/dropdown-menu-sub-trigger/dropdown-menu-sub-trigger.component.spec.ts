import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuSubTrigger } from './dropdown-menu-sub-trigger.component';

describe('ZapDropdownMenuSubTrigger', () => {
  let component: ZapDropdownMenuSubTrigger;
  let fixture: ComponentFixture<ZapDropdownMenuSubTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuSubTrigger],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuSubTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
