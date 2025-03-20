import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdown } from './dropdown.component';

describe('ZapDropdown', () => {
  let component: ZapDropdown;
  let fixture: ComponentFixture<ZapDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
