import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuPortal } from './dropdown-menu-portal.component';

describe('ZapDropdownMenuPortal', () => {
  let component: ZapDropdownMenuPortal;
  let fixture: ComponentFixture<ZapDropdownMenuPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuPortal],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
