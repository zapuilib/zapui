import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuLabel } from './dropdown-menu-label.component';

describe('ZapDropdownMenuLabel', () => {
  let component: ZapDropdownMenuLabel;
  let fixture: ComponentFixture<ZapDropdownMenuLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
