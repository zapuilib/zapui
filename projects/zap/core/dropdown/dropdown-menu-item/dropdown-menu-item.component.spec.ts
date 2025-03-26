import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZapDropdownMenuItem } from './dropdown-menu-item.component';
import { SHAPE_TOKEN } from '../shape.token';

describe('ZapDropdownMenuItem', () => {
  let component: ZapDropdownMenuItem;
  let fixture: ComponentFixture<ZapDropdownMenuItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapDropdownMenuItem],
      providers: [
        {
          provide: SHAPE_TOKEN,
          useValue: 'flat',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapDropdownMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the ShapeToken value from the parent', () => {
    expect(component.shape).toBe('flat');
  });
});
