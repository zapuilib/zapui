import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenu } from './dropdown-menu.component';

describe('ZapDropdownMenu', () => {
  let component: ZapDropdownMenu;
  let fixture: ComponentFixture<ZapDropdownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
