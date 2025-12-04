import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapDropdownMenuSubTrigger } from './dropdown-menu-sub-trigger.component';
import { SHAPE_TOKEN } from '../shape.token';

describe('ZapDropdownMenuSubTrigger', () => {
  let component: ZapDropdownMenuSubTrigger;
  let fixture: ComponentFixture<ZapDropdownMenuSubTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuSubTrigger],
      providers: [
        {
          provide: SHAPE_TOKEN,
          useValue: 'flat',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuSubTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
