import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SeatDetailComponent } from './seat-detail.component';

describe('Seat Management Detail Component', () => {
  let comp: SeatDetailComponent;
  let fixture: ComponentFixture<SeatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SeatDetailComponent,
              resolve: { seat: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SeatDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load seat on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SeatDetailComponent);

      // THEN
      expect(instance.seat()).toEqual(expect.objectContaining({ id: 123 }));
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
