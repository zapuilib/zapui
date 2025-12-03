import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenu } from './dropdown-menu.component';
import { SHAPE_TOKEN } from '../shape.token';

describe('ZapDropdownMenu', () => {
  let component: ZapDropdownMenu;
  let fixture: ComponentFixture<ZapDropdownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenu],
      providers: [
        {
          provide: SHAPE_TOKEN,
          useValue: 'flat',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
