import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuSub } from './dropdown-menu-sub.component';

describe('ZapDropdownMenuSub', () => {
  let component: ZapDropdownMenuSub;
  let fixture: ComponentFixture<ZapDropdownMenuSub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuSub],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuSub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
