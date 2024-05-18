import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TransporterDetailComponent } from './transporter-detail.component';

describe('Transporter Management Detail Component', () => {
  let comp: TransporterDetailComponent;
  let fixture: ComponentFixture<TransporterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporterDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TransporterDetailComponent,
              resolve: { transporter: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TransporterDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load transporter on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TransporterDetailComponent);

      // THEN
      expect(instance.transporter()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
