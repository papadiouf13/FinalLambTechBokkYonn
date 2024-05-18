import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TripDetailComponent } from './trip-detail.component';

describe('Trip Management Detail Component', () => {
  let comp: TripDetailComponent;
  let fixture: ComponentFixture<TripDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TripDetailComponent,
              resolve: { trip: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TripDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load trip on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TripDetailComponent);

      // THEN
      expect(instance.trip()).toEqual(expect.objectContaining({ id: 123 }));
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
