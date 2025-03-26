import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuSub } from './dropdown-menu-sub.component';
import { SHAPE_TOKEN } from '../shape.token';

describe('ZapDropdownMenuSub', () => {
  let component: ZapDropdownMenuSub;
  let fixture: ComponentFixture<ZapDropdownMenuSub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuSub],
      providers: [
        {
          provide: SHAPE_TOKEN,
          useValue: 'flat',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuSub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
