import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuShortcut } from './dropdown-menu-shortcut.component';

describe('ZapDropdownMenuShortcut', () => {
  let component: ZapDropdownMenuShortcut;
  let fixture: ComponentFixture<ZapDropdownMenuShortcut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuShortcut],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuShortcut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
