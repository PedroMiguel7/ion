import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'; // DO not forget to Import
import { fireEvent, screen } from '@testing-library/angular';
import { ButtonComponent } from '../../button/button.component';
import { IonIconComponent } from '../../icon/icon.component';
import { SelectMockComponent } from '../mock/select-mock.component';
import { IonModalConfiguration } from './../models/modal.interface';
import { IonModalComponent } from './modal.component';

describe('IonModalComponent', () => {
  let component: IonModalComponent;
  let fixture: ComponentFixture<IonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IonModalComponent,
        IonIconComponent,
        ButtonComponent,
        SelectMockComponent,
      ],
      imports: [FormsModule],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [SelectMockComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonModalComponent);
    component = fixture.componentInstance;
    component.componentToBody = SelectMockComponent;
    fixture.detectChanges();
  });

  const footer = () => screen.getByTestId('modalFooter');
  const overlay = () => screen.getByTestId('modalOverlay');

  it('should create modal with custom component', () => {
    expect(component).toBeTruthy();
    expect(screen.getByText('Choose one')).toBeTruthy();
  });

  it('should render according to configuration with custom label, id, and without footer border', () => {
    const configuration: IonModalConfiguration = {
      id: '1',
      title: 'Ion Test',

      footer: {
        showDivider: false,
        primaryButton: {
          label: 'Ion Cancel',
          iconType: 'icon',
        },
        secondaryButton: {
          label: 'Ion Confirm',
          iconType: 'icon',
        },
      },
    };

    component.setConfig(configuration);
    fixture.detectChanges();

    expect(screen.getByTestId('modal').id).toBe(configuration.id);
    expect(screen.getByText(configuration.title)).toBeTruthy();
    expect(
      screen.getByText(configuration.footer.primaryButton.label)
    ).toBeTruthy();
    expect(
      screen.getByText(configuration.footer.secondaryButton.label)
    ).toBeTruthy();
    expect(footer().classList.contains('divider')).toBe(false);
  });

  it('should close modal using esc key', () => {
    const escapeKeyCode = 27;

    jest.spyOn(component, 'closeModal');
    fireEvent.keyDown(screen.getByTestId('modalOverlay'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: escapeKeyCode,
      charCode: escapeKeyCode,
    });
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should close modal clicking in overlay when configuration allow it', () => {
    jest.spyOn(component, 'closeModal');
    component.configuration.overlayCanDismiss = true;
    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not close modal clicking in overlay when configuration disallow it', () => {
    jest.spyOn(component, 'closeModal');
    component.configuration.overlayCanDismiss = false;
    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).not.toHaveBeenCalled();
  });

  it('should hide footer when its true on configuration', () => {
    const modalFooter = footer();
    expect(modalFooter).toBeInTheDocument();
    component.configuration.footer.hide = true;
    fixture.detectChanges();
    expect(modalFooter).not.toBeInTheDocument();
  });

  it('should hide overlay when its true on configuration', () => {
    expect(overlay().classList.contains('hide')).toBe(false);
    component.configuration.showOverlay = false;
    fixture.detectChanges();
    expect(overlay().classList.contains('hide')).toBe(true);
  });

  it('should emit event when call closeModal function', () => {
    jest.spyOn(component.ionOnClose, 'emit');
    component.closeModal(component.getChildComponentPropertiesValue());
    expect(component.ionOnClose.emit).toHaveBeenCalledWith({ state: 'ceara' });
  });

  it('should have close button', () => {
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });
});