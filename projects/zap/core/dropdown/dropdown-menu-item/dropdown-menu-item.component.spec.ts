import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuItem } from './dropdown-menu-item.component';

describe('ZapDropdownMenuItem', () => {
  let component: ZapDropdownMenuItem;
  let fixture: ComponentFixture<ZapDropdownMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
