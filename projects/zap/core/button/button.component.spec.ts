import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapButton } from './button.component';
import { ZapIconDirective } from '../public-api';

describe('ZapButton', () => {
  let component: ZapButton;
  let fixture: ComponentFixture<ZapButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapButton],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default text as "Submit"', () => {
    expect(component.text).toBe('Submit');
  });

  it('should apply the correct classes based on inputs', () => {
    component.shape = 'pill';
    component.size = 'compact';
    component.type = 'success';
    component.variant = 'outlined';
    component.zapClass = 'custom-class';
    fixture.detectChanges();
    expect(component.classes).toEqual(['success', 'pill', 'compact', 'outlined', 'custom-class']);
  });

  it('should set icon styles correctly after view init', () => {
    component.iconDirective = {
      el: {
        nativeElement: document.createElement('div'),
      },
    } as ZapIconDirective;
    component.iconPosition = 'right';
    component.icononly = false;
    component.ngAfterViewInit();
    expect(component.iconDirective.el.nativeElement.style.order).toBe('1');
    expect(component.iconDirective.el.nativeElement.style.marginLeft).toBe('8px');
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should render the correct text', () => {
    component.text = 'Click Me';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Click Me');
  });

  it('should apply the correct icon position', () => {
    component.iconDirective = {
      el: {
        nativeElement: document.createElement('div'),
      },
    } as ZapIconDirective;
    component.iconPosition = 'left';
    component.icononly = false;
    component.ngAfterViewInit();
    expect(component.iconDirective.el.nativeElement.style.order).toBe('0');
    expect(component.iconDirective.el.nativeElement.style.marginRight).toBe('8px');
  });

  it('should apply the correct variant class', () => {
    component.variant = 'link';
    fixture.detectChanges();
    expect(component.classes).toContain('link');
  });

  it('should apply the correct type class', () => {
    component.type = 'warning';
    fixture.detectChanges();
    expect(component.classes).toContain('warning');
  });

  it('should apply the correct shape class', () => {
    component.shape = 'curve';
    fixture.detectChanges();
    expect(component.classes).toContain('curve');
  });

  it('should apply the correct size class', () => {
    component.size = 'wide';
    fixture.detectChanges();
    expect(component.classes).toContain('wide');
  });
});
