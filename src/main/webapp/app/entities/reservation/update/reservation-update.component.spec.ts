import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITrip } from 'app/entities/trip/trip.model';
import { TripService } from 'app/entities/trip/service/trip.service';
import { ISeat } from 'app/entities/seat/seat.model';
import { SeatService } from 'app/entities/seat/service/seat.service';
import { IReservation } from '../reservation.model';
import { ReservationService } from '../service/reservation.service';
import { ReservationFormService } from './reservation-form.service';

import { ReservationUpdateComponent } from './reservation-update.component';

describe('Reservation Management Update Component', () => {
  let comp: ReservationUpdateComponent;
  let fixture: ComponentFixture<ReservationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reservationFormService: ReservationFormService;
  let reservationService: ReservationService;
  let tripService: TripService;
  let seatService: SeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReservationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ReservationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReservationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reservationFormService = TestBed.inject(ReservationFormService);
    reservationService = TestBed.inject(ReservationService);
    tripService = TestBed.inject(TripService);
    seatService = TestBed.inject(SeatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Trip query and add missing value', () => {
      const reservation: IReservation = { id: 456 };
      const trip: ITrip = { id: 24101 };
      reservation.trip = trip;

      const tripCollection: ITrip[] = [{ id: 13546 }];
      jest.spyOn(tripService, 'query').mockReturnValue(of(new HttpResponse({ body: tripCollection })));
      const additionalTrips = [trip];
      const expectedCollection: ITrip[] = [...additionalTrips, ...tripCollection];
      jest.spyOn(tripService, 'addTripToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reservation });
      comp.ngOnInit();

      expect(tripService.query).toHaveBeenCalled();
      expect(tripService.addTripToCollectionIfMissing).toHaveBeenCalledWith(
        tripCollection,
        ...additionalTrips.map(expect.objectContaining),
      );
      expect(comp.tripsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Seat query and add missing value', () => {
      const reservation: IReservation = { id: 456 };
      const seat: ISeat = { id: 18375 };
      reservation.seat = seat;

      const seatCollection: ISeat[] = [{ id: 29090 }];
      jest.spyOn(seatService, 'query').mockReturnValue(of(new HttpResponse({ body: seatCollection })));
      const additionalSeats = [seat];
      const expectedCollection: ISeat[] = [...additionalSeats, ...seatCollection];
      jest.spyOn(seatService, 'addSeatToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reservation });
      comp.ngOnInit();

      expect(seatService.query).toHaveBeenCalled();
      expect(seatService.addSeatToCollectionIfMissing).toHaveBeenCalledWith(
        seatCollection,
        ...additionalSeats.map(expect.objectContaining),
      );
      expect(comp.seatsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reservation: IReservation = { id: 456 };
      const trip: ITrip = { id: 3248 };
      reservation.trip = trip;
      const seat: ISeat = { id: 14394 };
      reservation.seat = seat;

      activatedRoute.data = of({ reservation });
      comp.ngOnInit();

      expect(comp.tripsSharedCollection).toContain(trip);
      expect(comp.seatsSharedCollection).toContain(seat);
      expect(comp.reservation).toEqual(reservation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReservation>>();
      const reservation = { id: 123 };
      jest.spyOn(reservationFormService, 'getReservation').mockReturnValue(reservation);
      jest.spyOn(reservationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reservation }));
      saveSubject.complete();

      // THEN
      expect(reservationFormService.getReservation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reservationService.update).toHaveBeenCalledWith(expect.objectContaining(reservation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReservation>>();
      const reservation = { id: 123 };
      jest.spyOn(reservationFormService, 'getReservation').mockReturnValue({ id: null });
      jest.spyOn(reservationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reservation }));
      saveSubject.complete();

      // THEN
      expect(reservationFormService.getReservation).toHaveBeenCalled();
      expect(reservationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReservation>>();
      const reservation = { id: 123 };
      jest.spyOn(reservationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reservation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reservationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTrip', () => {
      it('Should forward to tripService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tripService, 'compareTrip');
        comp.compareTrip(entity, entity2);
        expect(tripService.compareTrip).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSeat', () => {
      it('Should forward to seatService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(seatService, 'compareSeat');
        comp.compareSeat(entity, entity2);
        expect(seatService.compareSeat).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
