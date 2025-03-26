import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownSeparator } from './dropdown-separator.component';

describe('ZapDropdownSeparator', () => {
  let component: ZapDropdownSeparator;
  let fixture: ComponentFixture<ZapDropdownSeparator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownSeparator],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownSeparator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
