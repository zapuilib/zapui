import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuGroup } from './dropdown-menu-group.component';

describe('ZapDropdownMenuGroup', () => {
  let component: ZapDropdownMenuGroup;
  let fixture: ComponentFixture<ZapDropdownMenuGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
