import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZapToast } from './toast.component';
import { DISMISS_THRESHOLD } from './toast.constant';

describe('ZapToast', () => {
  let component: ZapToast;
  let fixture: ComponentFixture<ZapToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZapToast],
    }).compileComponents();

    fixture = TestBed.createComponent(ZapToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial Properties', () => {
    it('should have default type as default', () => {
      expect(component.type).toBe('default');
    });

    it('should initialize EventEmitters', () => {
      expect(component.dismiss).toBeTruthy();
      expect(component.actioned).toBeTruthy();
    });

    it('should set input properties correctly', () => {
      component.title = 'Test Title';
      component.text = 'Test Text';
      component.action = 'Action';
      component.shape = 'pill';
      component.zapClass = 'custom-class';
      component.type = 'error';

      expect(component.title).toBe('Test Title');
      expect(component.text).toBe('Test Text');
      expect(component.action).toBe('Action');
      expect(component.shape).toBe('pill');
      expect(component.zapClass).toBe('custom-class');
      expect(component.type).toBe('error');
    });
  });

  describe('Class Generation', () => {
    it('should generate correct classes array', () => {
      component.shape = 'pill';
      component.type = 'error';
      component.zapClass = 'custom-class';

      expect(component.classes).toEqual(['pill', 'error', 'custom-class']);
    });

    it('should filter out empty and default values from classes', () => {
      component.shape = 'pill';
      component.type = 'default';
      component.zapClass = '';

      expect(component.classes).toEqual(['pill']);
    });
  });

  describe('Event Handlers', () => {
    it('should emit dismiss event when handleDismiss is called', () => {
      spyOn(component.dismiss, 'emit');
      component.handleDismiss();
      expect(component.dismiss.emit).toHaveBeenCalled();
    });

    it('should emit actioned event when handleActionClick is called with EventEmitter', () => {
      spyOn(component.actioned, 'emit');
      component.handleActionClick();
      expect(component.actioned.emit).toHaveBeenCalled();
    });

    it('should call function when handleActionClick is called with function', () => {
      const mockFn = jasmine.createSpy('mockFn');
      component.actioned = mockFn;
      component.handleActionClick();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('Drag Functionality', () => {
    let mockEvent: MouseEvent;

    beforeEach(() => {
      mockEvent = new MouseEvent('mousedown', {
        clientX: 0,
      });
    });

    it('should start dragging on mousedown', () => {
      component.onDragStart(mockEvent);
      expect(fixture.nativeElement.style.transition).toBe('none');
    });

    it('should update position while dragging', () => {
      component.onDragStart(mockEvent);

      const moveEvent = new MouseEvent('mousemove', {
        clientX: 100,
      });

      component.onDrag(moveEvent);
      expect(fixture.nativeElement.style.transform).toBe('translateX(100px)');
    });

    it('should not allow negative drag values', () => {
      component.onDragStart(mockEvent);

      const moveEvent = new MouseEvent('mousemove', {
        clientX: -100,
      });

      component.onDrag(moveEvent);
      expect(fixture.nativeElement.style.transform).toBe('translateX(0px)');
    });

    it('should dismiss when dragged beyond threshold', () => {
      spyOn(component.dismiss, 'emit');
      component.onDragStart(mockEvent);

      const moveEvent = new MouseEvent('mousemove', {
        clientX: DISMISS_THRESHOLD + 100,
      });

      component.onDrag(moveEvent);
      component.onDragEnd();

      expect(component.dismiss.emit).toHaveBeenCalled();
    });

    it('should reset position when not dragged beyond threshold', () => {
      component.onDragStart(mockEvent);

      const moveEvent = new MouseEvent('mousemove', {
        clientX: DISMISS_THRESHOLD - 50,
      });

      component.onDrag(moveEvent);
      component.onDragEnd();

      expect(fixture.nativeElement.style.transform).toBe('translateX(0px)');
    });
  });

  describe('Template Rendering', () => {
    it('should render title when provided', () => {
      component.title = 'Test Title';
      fixture.detectChanges();
      const titleElement = fixture.nativeElement.querySelector('.__zap__toast__title');
      expect(titleElement.textContent).toBe('Test Title');
    });

    it('should render text when provided', () => {
      component.text = 'Test Text';
      fixture.detectChanges();
      const textElement = fixture.nativeElement.querySelector('.__zap__toast__text');
      expect(textElement.textContent).toBe('Test Text');
    });

    it('should render action button when provided', () => {
      component.action = 'Action';
      fixture.detectChanges();
      const actionButton = fixture.nativeElement.querySelector('.__zap__toast__actions button');
      expect(actionButton.textContent.trim()).toBe('Action');
    });

    it('should handle action button click', () => {
      spyOn(component.actioned, 'emit');
      component.action = 'Action';
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.__zap__toast__actions button');
      actionButton.click();

      expect(component.actioned.emit).toHaveBeenCalled();
    });

    it('should handle close button click', () => {
      spyOn(component.dismiss, 'emit');
      const closeButton = fixture.nativeElement.querySelector('.handler');
      closeButton.click();
      expect(component.dismiss.emit).toHaveBeenCalled();
    });
  });
});
